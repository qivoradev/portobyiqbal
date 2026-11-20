import { useState, useEffect, useCallback, useRef } from 'react';
import { useLenis, scrollToLenis } from './hooks/useLenis';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Credentials } from './sections/Credentials';
import { Contact } from './sections/Contact';
import { CVModal } from './components/CVModal';
import { AnimatePresence, motion, useScroll } from 'motion/react';
import { content, type Language } from './data/content';

export default function App() {
  useLenis();
  const { scrollYProgress } = useScroll();

  // Language state with safe localStorage read
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('iqbaldf_lang');
      if (saved === 'in' || saved === 'en') return saved;
    } catch {
      // LocalStorage access restricted / SSR fallback
    }
    return 'in';
  });

  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const cvTriggerRef = useRef<HTMLButtonElement | null>(null);

  const isAnyModalOpen = isCvOpen || isProjectModalOpen || isCertModalOpen;

  // Sync <html lang> on change and initial mount
  useEffect(() => {
    try {
      localStorage.setItem('iqbaldf_lang', lang);
    } catch {
      // Ignore localStorage errors
    }
    document.documentElement.lang = lang === 'in' ? 'id' : 'en';
    document.title =
      lang === 'in'
        ? 'iqbaldf — Iqbal Dwi Fathonah | Data Analyst'
        : 'iqbaldf — Iqbal Dwi Fathonah | Data Analyst Portfolio';
  }, [lang]);

  // Section observer to update active nav indicator
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'projects', 'skills', 'credentials', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.4) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
      if (scrollY < 120) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleLang = useCallback(() => {
    setLang((prev) => (prev === 'in' ? 'en' : 'in'));
  }, []);

  const handleNavigate = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      scrollToLenis(target, -88);
    }
  };

  const currentContent = content[lang];

  return (
    <div className="relative min-h-screen selection:bg-black selection:text-white">
      {/* 2px Scroll Progress Bar at very top (z-30: below header & modals) */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#111111] origin-left z-30 pointer-events-none"
        aria-hidden="true"
      />

      {/* Sticky / Fixed Navigation Header */}
      <Header
        onNavigate={handleNavigate}
        lang={lang}
        onToggleLang={handleToggleLang}
        content={currentContent}
        activeSection={activeSection}
      />

      {/* Main Sections: Hero → About Me → Projects → Core Skills → Credentials → Contact */}
      <main className="relative z-10 pb-28 md:pb-0">
        <Hero
          onNavigate={handleNavigate}
          onOpenCV={() => setIsCvOpen(true)}
          lang={lang}
          content={currentContent}
          cvTriggerRef={cvTriggerRef}
        />
        <About content={currentContent} lang={lang} />
        <Projects
          content={currentContent}
          lang={lang}
          onModalStateChange={setIsProjectModalOpen}
        />
        <Skills content={currentContent} lang={lang} />
        <Credentials
          content={currentContent}
          lang={lang}
          onModalStateChange={setIsCertModalOpen}
        />
        <Contact content={currentContent} lang={lang} />
      </main>

      {/* Floating Bottom Nav for Mobile Only */}
      <MobileBottomNav
        activeSection={activeSection}
        onNavigate={handleNavigate}
        content={currentContent.nav}
        isHidden={isAnyModalOpen}
      />

      {/* CV Preview Modal */}
      <AnimatePresence>
        {isCvOpen && (
          <CVModal
            content={currentContent.cvModal}
            onClose={() => setIsCvOpen(false)}
            triggerRef={cvTriggerRef}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
