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

interface LangSegmentedToggleProps {
  lang: Language;
  onSelectLang: (nextLang: Language) => void;
  isDarkTheme: boolean;
  layoutId: string;
}

function LangSegmentedToggle({
  lang,
  onSelectLang,
  isDarkTheme,
  layoutId,
}: LangSegmentedToggleProps) {
  const options: { value: Language; code: string; ariaLabel: string }[] = [
    { value: 'in', code: 'ID', ariaLabel: 'Bahasa Indonesia' },
    { value: 'en', code: 'EN', ariaLabel: 'English' },
  ];

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className={`inline-flex items-center p-0.5 rounded-lg border transition-colors duration-300 ${
        isDarkTheme
          ? 'bg-white/[0.07] border-white/[0.08]'
          : 'bg-black/[0.06] border-black/[0.06]'
      }`}
    >
      {options.map((opt) => {
        const isActive = lang === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelectLang(opt.value)}
            aria-label={opt.ariaLabel}
            aria-pressed={isActive}
            className={`relative px-2 py-1 text-[11px] font-semibold tracking-wide rounded-md transition-colors duration-200 cursor-pointer leading-none ${
              isActive
                ? isDarkTheme
                  ? 'text-neutral-950'
                  : 'text-white'
                : isDarkTheme
                  ? 'text-neutral-400 hover:text-white'
                  : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                className={`absolute inset-0 rounded-md shadow-xs ${
                  isDarkTheme ? 'bg-white' : 'bg-neutral-950'
                }`}
              />
            )}
            <span className="relative z-10">{opt.code}</span>
          </button>
        );
      })}
    </div>
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

  const brandDividerClass = isDarkTheme ? 'bg-neutral-700' : 'bg-neutral-400/70';
  const toggleDividerClass = isDarkTheme ? 'bg-white/15' : 'bg-neutral-300/90';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none">
      {/* Desktop Floating Pill Header (≥ 768px) */}
      <div className="hidden md:flex justify-center pt-4 px-4">
        <div
          className={`pointer-events-auto flex items-center gap-4 lg:gap-6 px-3.5 py-2 rounded-2xl border backdrop-blur-md transition-colors duration-300 ${pillSurfaceClass}`}
        >
          {/* Left: Monogram ID | iqbaldf */}
          <button
            type="button"
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 pl-1 pr-1 cursor-pointer group focus-visible:outline-2"
            aria-label="iqbaldf home"
          >
            <span className="text-[19px] font-extrabold tracking-tighter leading-none">
              {content.monogram}
            </span>
            <span className={`w-px h-5 transition-colors duration-300 ${brandDividerClass}`} />
            <span className="text-[13px] font-bold tracking-tight leading-none">
              {content.brand}
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

          {/* Right: Thin Adaptive Divider + Compact Segmented ID / EN Pill Toggle */}
          <div className="flex items-center gap-3.5">
            <span
              aria-hidden="true"
              className={`h-4 w-px transition-colors duration-300 ${toggleDividerClass}`}
            />
            <LangSegmentedToggle
              lang={lang}
              onSelectLang={onSelectLang}
              isDarkTheme={isDarkTheme}
              layoutId="lang-pill"
            />
          </div>
        </div>
      </div>

      {/* Mobile Floating Top Bar (< 768px): mx-4 mt-3 rounded-2xl px-4 py-3 */}
      <div className="md:hidden mx-4 mt-3">
        <div
          className={`pointer-events-auto rounded-2xl px-4 py-3 border backdrop-blur-md flex items-center justify-between transition-colors duration-300 ${pillSurfaceClass}`}
        >
          {/* Left: Monogram ID | iqbaldf */}
          <button
            type="button"
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 cursor-pointer"
            aria-label="iqbaldf home"
          >
            <span className="text-[19px] font-extrabold tracking-tighter leading-none">
              {content.monogram}
            </span>
            <span className={`w-px h-5 transition-colors duration-300 ${brandDividerClass}`} />
            <span className="text-[13.5px] font-bold tracking-tight leading-none">
              {content.brand}
            </span>
          </button>

          {/* Right: Compact Segmented ID / EN Toggle + Hamburger Menu */}
          <div className="flex items-center gap-2.5">
            <LangSegmentedToggle
              lang={lang}
              onSelectLang={onSelectLang}
              isDarkTheme={isDarkTheme}
              layoutId="mobile-lang-pill"
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
