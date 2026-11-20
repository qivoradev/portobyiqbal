import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { useLenis, scrollToLenis } from './hooks/useLenis';
import { Preloader } from './components/Preloader';
import { Header } from './components/Header';
import { Hero } from './sections/Hero';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { CVModal } from './components/CVModal';
import { ENABLE_CV_MODAL } from './config/features';
import { content, type Language } from './data/content';

export default function App() {
  useLenis();

  // Language state (default 'in')
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('iqbaldf_lang');
      if (saved === 'in' || saved === 'en') return saved;
    } catch {
      // Ignore storage access restrictions
    }
    return 'in';
  });

  // Synchronous session check for editorial preloader (1x per browser session)
  const [showPreloader, setShowPreloader] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return false;
      }
      const seen = sessionStorage.getItem('iqbaldf_preloader_seen');
      if (seen === '1') {
        return false;
      }
      sessionStorage.setItem('iqbaldf_preloader_seen', '1');
      return true;
    } catch {
      return false;
    }
  });

  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isDarkNav, setIsDarkNav] = useState<boolean>(false);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const cvTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('iqbaldf_lang', lang);
    } catch {
      // Ignore storage errors
    }
    document.documentElement.lang = lang === 'in' ? 'id' : 'en';
    document.title = 'portobyiqbaldf.vercel.app';
  }, [lang]);

  // Adaptive Theme & Active Section Tracking
  useEffect(() => {
    const sectionIds = ['hero', 'skills', 'projects', 'about', 'contact'];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Exact light -> dark transition check at Projects boundary
      const projectsEl = document.getElementById('projects');
      if (projectsEl) {
        const projectsRect = projectsEl.getBoundingClientRect();
        setIsDarkNav(projectsRect.top <= 64);
      }

      // Active section indicator
      if (scrollY < 100) {
        setActiveSection('hero');
        return;
      }

      // Check bottom of page -> Contact active
      if (scrollY + windowHeight >= document.documentElement.scrollHeight - 40) {
        setActiveSection('contact');
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.35) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectLang = useCallback((nextLang: Language) => {
    setLang(nextLang);
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      const offset = sectionId === 'hero' ? 0 : -24;
      scrollToLenis(target, offset);
    }
  }, []);

  const currentContent = content[lang];

  return (
    <div className="relative min-h-screen overflow-x-clip selection:bg-[#259B52] selection:text-white">
      {/* Editorial Preloader (SessionStorage 1x per session, curtain reveal) */}
      <AnimatePresence>
        {showPreloader && (
          <Preloader onComplete={() => setShowPreloader(false)} />
        )}
      </AnimatePresence>

      {/* Adaptive Floating Pill Header (Desktop & Mobile) */}
      <Header
        onNavigate={handleNavigate}
        lang={lang}
        onSelectLang={handleSelectLang}
        content={currentContent}
        activeSection={activeSection}
        isDarkTheme={isDarkNav}
      />

      {/* Main Editorial Flow: Light (Hero → Skills) → Dark (Projects → About & Credentials → Contact & Footer) */}
      <main className="relative">
        <Hero
          onNavigate={handleNavigate}
          onOpenCV={() => {
            if (ENABLE_CV_MODAL) setIsCvOpen(true);
          }}
          lang={lang}
          content={currentContent}
          cvTriggerRef={cvTriggerRef}
        />
        <Skills content={currentContent} lang={lang} />
        <Projects content={currentContent} lang={lang} />
        <About content={currentContent} lang={lang} />
        <Contact content={currentContent} lang={lang} />
      </main>

      {/* Preserved CV Preview Modal (Controlled by ENABLE_CV_MODAL feature flag) */}
      {ENABLE_CV_MODAL && (
        <AnimatePresence>
          {isCvOpen && (
            <CVModal
              content={currentContent.cvModal}
              onClose={() => setIsCvOpen(false)}
              triggerRef={cvTriggerRef}
            />
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
