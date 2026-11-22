import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import type { Language, PortfolioContent } from '../data/content';
import { EDITORIAL_EASE } from './ScrollAnimations';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  lang: Language;
  onSelectLang: (nextLang: Language) => void;
  content: PortfolioContent;
  activeSection: string;
  isDarkTheme: boolean;
}

/**
 * Geometric Stroked Monogram `IDF`:
 * - Clean stroke line (fill="none" stroke="currentColor" strokeWidth="2.2")
 * - Crisp square terminal caps and miter joins
 * - Slender, architectural silhouette matching reference
 */
function IDFMonogram({ className = 'h-5 w-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 46 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      aria-hidden="true"
    >
      {/* Letter I */}
      <line x1="3" y1="2" x2="3" y2="18" />
      {/* Letter D with geometric chamfered outer loop */}
      <line x1="11" y1="2" x2="11" y2="18" />
      <path d="M11 2H18.5L23.5 7V13L18.5 18H11" />
      {/* Letter F */}
      <line x1="29" y1="2" x2="29" y2="18" />
      <line x1="29" y1="2" x2="42" y2="2" />
      <line x1="29" y1="10" x2="39" y2="10" />
    </svg>
  );
}

/**
 * 1-Slot Language Toggle Button:
 * Height 38px, min-width 40px, rounded-[10px], font-semibold text-[12px]
 */
interface SingleSlotLangButtonProps {
  lang: Language;
  onToggle: () => void;
  isDarkTheme: boolean;
}

function SingleSlotLangButton({ lang, onToggle, isDarkTheme }: SingleSlotLangButtonProps) {
  const code = lang === 'in' ? 'ID' : 'EN';
  const ariaLabel =
    lang === 'in'
      ? 'Bahasa Indonesia aktif, klik untuk beralih ke English'
      : 'English active, click to switch to Bahasa Indonesia';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={ariaLabel}
      className={`relative h-[38px] min-w-[40px] px-2.5 rounded-[10px] inline-flex items-center justify-center overflow-hidden border transition-colors cursor-pointer select-none text-[12px] font-semibold ${
        isDarkTheme
          ? 'bg-white/[0.08] hover:bg-white/[0.15] border-white/[0.12] text-white'
          : 'bg-black/[0.06] hover:bg-black/[0.11] border-black/[0.08] text-neutral-950'
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={code}
          initial={{ x: 12, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -12, opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="text-[12px] font-semibold tracking-wider leading-none uppercase"
        >
          {code}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Header({
  onNavigate,
  lang,
  onSelectLang,
  content,
  activeSection,
  isDarkTheme,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: content.nav.home },
    { id: 'projects', label: content.nav.projects },
    { id: 'about', label: content.nav.about },
    { id: 'contact', label: content.nav.contact },
  ];

  // Close mobile menu on Escape or resize to desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  const pillSurfaceClass = isDarkTheme
    ? 'bg-[#151515]/90 text-white border-white/[0.1] shadow-md'
    : 'bg-[#E2E2E2]/90 text-neutral-900 border-black/[0.08] shadow-sm';

  const toggleDividerClass = isDarkTheme ? 'bg-white/15' : 'bg-neutral-400/50';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none">
      {/* Desktop Floating Navbar (≥ 768px): rounded-[14px], compact p-1.5 pl-4 pr-2, height ~56px */}
      <div className="hidden md:flex justify-center pt-4 px-4">
        <div
          className={`pointer-events-auto flex items-center gap-4 lg:gap-6 p-1.5 pl-4 pr-2 rounded-[14px] border backdrop-blur-md transition-colors duration-300 ${pillSurfaceClass}`}
        >
          {/* Left: Monogram IDF | IQBALDF */}
          <button
            type="button"
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 pl-1 pr-1 cursor-pointer group focus-visible:outline-2"
            aria-label="IQBALDF home"
          >
            <IDFMonogram className="h-[18px] md:h-[19px] w-auto transition-colors duration-300" />
            <span
              aria-hidden="true"
              className="w-[1.5px] h-6 bg-current opacity-80 transition-colors duration-300"
            />
            <span className="font-semibold uppercase tracking-[0.06em] text-[13px] leading-none transition-colors duration-300">
              IQBALDF
            </span>
          </button>

          {/* Center: Nav Links with tall active black box rounded-[10px] */}
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-5 py-2.5 rounded-[10px] text-[14px] font-medium transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : isDarkTheme
                        ? 'text-neutral-300 hover:text-white'
                        : 'text-neutral-700 hover:text-neutral-950'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="desktop-nav-active-pill"
                      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                      className={`absolute inset-0 rounded-[10px] -z-10 ${
                        isDarkTheme
                          ? 'bg-[#000000] border border-white/15'
                          : 'bg-[#050505]'
                      }`}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Thin Divider + 1-Slot Language Toggle */}
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className={`h-4 w-px transition-colors duration-300 ${toggleDividerClass}`}
            />
            <SingleSlotLangButton
              lang={lang}
              onToggle={() => onSelectLang(lang === 'in' ? 'en' : 'in')}
              isDarkTheme={isDarkTheme}
            />
          </div>
        </div>
      </div>

      {/* Mobile Floating Top Bar (< 768px): rounded-[14px] px-3.5 py-2.5 */}
      <div className="md:hidden mx-4 mt-3">
        <div
          className={`pointer-events-auto rounded-[14px] px-3.5 py-2.5 border backdrop-blur-md flex items-center justify-between transition-colors duration-300 ${pillSurfaceClass}`}
        >
          {/* Left: Monogram IDF | IQBALDF */}
          <button
            type="button"
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2 cursor-pointer"
            aria-label="IQBALDF home"
          >
            <IDFMonogram className="h-[16px] w-auto transition-colors duration-300" />
            <span
              aria-hidden="true"
              className="w-[1.5px] h-5 bg-current opacity-80 transition-colors duration-300"
            />
            <span className="font-semibold uppercase tracking-[0.06em] text-[12.5px] sm:text-[13px] leading-none transition-colors duration-300">
              IQBALDF
            </span>
          </button>

          {/* Right: Single Slot Language Toggle + Hamburger Menu */}
          <div className="flex items-center gap-2">
            <SingleSlotLangButton
              lang={lang}
              onToggle={() => onSelectLang(lang === 'in' ? 'en' : 'in')}
              isDarkTheme={isDarkTheme}
            />

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? content.nav.closeMenuLabel : content.nav.menuLabel}
              className={`w-9 h-9 rounded-[10px] flex items-center justify-center transition-colors duration-200 cursor-pointer ${
                isDarkTheme
                  ? 'text-white hover:bg-neutral-800'
                  : 'text-neutral-900 hover:bg-neutral-300/60'
              }`}
            >
              {mobileMenuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: EDITORIAL_EASE }}
              aria-label="Mobile navigation"
              className={`pointer-events-auto mt-2 rounded-[14px] p-2 border backdrop-blur-md transition-colors duration-300 ${
                isDarkTheme
                  ? 'bg-neutral-900/95 border-neutral-800 text-white shadow-[0_16px_36px_rgba(0,0,0,0.6)]'
                  : 'bg-white/95 border-neutral-300 text-neutral-900 shadow-[0_16px_36px_rgba(0,0,0,0.08)]'
              }`}
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-[10px] text-[15px] font-medium transition-colors cursor-pointer ${
                        isActive
                          ? isDarkTheme
                            ? 'bg-[#000000] text-white border border-neutral-800'
                            : 'bg-[#050505] text-white'
                          : isDarkTheme
                            ? 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                            : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
