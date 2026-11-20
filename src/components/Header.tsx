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
 * Geometric Monogram SVG `IDF`:
 * - Uniform stroke weight
 * - Sharp / subtle beveled terminal cuts on I, D, and F
 * - currentColor for automatic adaptability across light & dark themes
 */
function IDFMonogram({ className = 'h-5 w-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 46 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Letter I: crisp vertical stem with subtle 45deg beveled top-left endpoint */}
      <path d="M1.5 0H5V20H0V1.5L1.5 0Z" />
      {/* Letter D: geometric stem + clean angled/chamfered outer loop & counter */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 0H20.5L25 4.5V15.5L20.5 20H9V0ZM13.5 4.5H19.5L20.5 5.5V14.5L19.5 15.5H13.5V4.5Z"
      />
      {/* Letter F: vertical stem with beveled top/middle bars */}
      <path d="M29 0H43.5L45 1.5V4.5H33.5V8H41.5L42.5 9V12H33.5V20H29V0Z" />
    </svg>
  );
}

/**
 * 1-Slot Language Toggle Button:
 * Compact single button displaying active code (ID / EN) with slide animation on switch
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
      className={`relative h-8 min-w-[38px] px-2.5 rounded-lg inline-flex items-center justify-center overflow-hidden border transition-colors cursor-pointer select-none ${
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
          className="text-[11px] font-bold tracking-wider leading-none uppercase"
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
    { id: 'skills', label: content.nav.skills },
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
    ? 'bg-neutral-900/85 text-white border-neutral-800 shadow-[0_8px_28px_rgba(0,0,0,0.45)]'
    : 'bg-neutral-200/80 text-neutral-900 border-neutral-300/80 shadow-[0_4px_20px_rgba(0,0,0,0.05)]';

  const toggleDividerClass = isDarkTheme ? 'bg-white/15' : 'bg-neutral-300/90';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none">
      {/* Desktop Floating Pill Header (≥ 768px) */}
      <div className="hidden md:flex justify-center pt-4 px-4">
        <div
          className={`pointer-events-auto flex items-center gap-4 lg:gap-6 px-3.5 py-2 rounded-2xl border backdrop-blur-md transition-colors duration-300 ${pillSurfaceClass}`}
        >
          {/* Left: Geometric Logo Lockup IDF | IQBALDF */}
          <button
            type="button"
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 pl-1 pr-1 cursor-pointer group focus-visible:outline-2"
            aria-label="IQBALDF home"
          >
            <IDFMonogram className="h-[18px] md:h-[20px] w-auto transition-colors duration-300" />
            <span
              aria-hidden="true"
              className={`w-[1.5px] h-5 transition-colors duration-300 ${
                isDarkTheme ? 'bg-white/80' : 'bg-neutral-900/80'
              }`}
            />
            <span className="font-bold uppercase tracking-[0.06em] text-[13px] leading-none transition-colors duration-300">
              IQBALDF
            </span>
          </button>

          {/* Center: Nav Links with motion layoutId active black box */}
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-colors duration-200 cursor-pointer ${
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
                      className={`absolute inset-0 rounded-lg -z-10 ${
                        isDarkTheme
                          ? 'bg-[#050505] border border-neutral-800'
                          : 'bg-[#0A0A0A]'
                      }`}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Thin Adaptive Divider + Single Slot Language Toggle */}
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

      {/* Mobile Floating Top Bar (< 768px): mx-4 mt-3 rounded-2xl px-4 py-3 */}
      <div className="md:hidden mx-4 mt-3">
        <div
          className={`pointer-events-auto rounded-2xl px-4 py-3 border backdrop-blur-md flex items-center justify-between transition-colors duration-300 ${pillSurfaceClass}`}
        >
          {/* Left: Geometric Logo Lockup IDF | IQBALDF */}
          <button
            type="button"
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2 cursor-pointer"
            aria-label="IQBALDF home"
          >
            <IDFMonogram className="h-[16px] sm:h-[18px] w-auto transition-colors duration-300" />
            <span
              aria-hidden="true"
              className={`w-[1.5px] h-4.5 transition-colors duration-300 ${
                isDarkTheme ? 'bg-white/80' : 'bg-neutral-900/80'
              }`}
            />
            <span className="font-bold uppercase tracking-[0.06em] text-[12.5px] sm:text-[13px] leading-none transition-colors duration-300">
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
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200 cursor-pointer ${
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
              className={`pointer-events-auto mt-2 rounded-2xl p-2 border backdrop-blur-md transition-colors duration-300 ${
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
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-[15px] font-medium transition-colors cursor-pointer ${
                        isActive
                          ? isDarkTheme
                            ? 'bg-[#050505] text-white border border-neutral-800'
                            : 'bg-[#0A0A0A] text-white'
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
