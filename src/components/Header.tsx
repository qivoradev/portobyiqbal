import { useState, useEffect } from 'react';
import type { Language, PortfolioContent } from '../data/content';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  lang: Language;
  onToggleLang: () => void;
  content: PortfolioContent;
  activeSection?: string;
}

export function Header({
  onNavigate,
  lang,
  onToggleLang,
  content,
  activeSection = 'hero',
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 select-none bg-[#EFEFEF]/82 backdrop-blur-[12px] transition-all duration-200 ${
        isScrolled ? 'border-b border-black/10 shadow-[0_2px_12px_rgba(0,0,0,0.03)]' : 'border-b border-transparent'
      }`}
    >
      {/* Gradient fade ±24px underneath header */}
      <div className="absolute top-full left-0 right-0 h-6 bg-gradient-to-b from-[#EFEFEF]/82 to-transparent pointer-events-none" />

      {/* Desktop Header (≥ md / 768px): Nav pill at center, language & contact at right */}
      <div className="hidden md:flex site-container items-center justify-between py-3.5">
        {/* Left: Text Logo */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => onNavigate('hero')}
            className="text-[19px] font-bold tracking-tight text-[#111111] hover:opacity-75 transition-opacity cursor-pointer"
            aria-label="iqbaldf home"
          >
            {content.brand}
          </button>
        </div>

        {/* Center: Desktop Nav Pill with Curved Arrows */}
        <nav
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E5E5E5]/80 backdrop-blur-md border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-[13px] sm:text-[14px] text-[#444444]"
          aria-label="Main navigation"
        >
          <button
            type="button"
            onClick={() => onNavigate('hero')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
              activeSection === 'hero' ? 'bg-white text-black font-semibold shadow-2xs' : 'hover:text-black'
            }`}
          >
            <span className="text-[#888888] text-[12px]">↪</span>
            <span>{content.nav.home}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('about')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
              activeSection === 'about' ? 'bg-white text-black font-semibold shadow-2xs' : 'hover:text-black'
            }`}
          >
            <span className="text-[#888888] text-[12px]">↪</span>
            <span>{content.nav.about}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
              activeSection === 'projects' ? 'bg-white text-black font-semibold shadow-2xs' : 'hover:text-black'
            }`}
          >
            <span className="text-[#888888] text-[12px]">↪</span>
            <span>{content.nav.projects}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('skills')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
              activeSection === 'skills' ? 'bg-white text-black font-semibold shadow-2xs' : 'hover:text-black'
            }`}
          >
            <span className="text-[#888888] text-[12px]">↪</span>
            <span>{content.nav.skills}</span>
          </button>
        </nav>

        {/* Right: Desktop Actions (Lang Toggle + Contact Button) */}
        <div className="flex items-center gap-2.5">
          {/* Language Toggle Pill */}
          <button
            type="button"
            onClick={onToggleLang}
            className="px-3 py-1.5 rounded-full border border-black/10 bg-white/90 backdrop-blur-sm text-[12px] font-semibold text-[#222222] shadow-xs hover:bg-white hover:border-black/25 active:scale-95 transition-all cursor-pointer"
            aria-label={lang === 'in' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            title={lang === 'in' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
          >
            <span className="inline-block transition-opacity duration-150">
              {lang === 'in' ? 'IN' : 'EN'}
            </span>
          </button>

          {/* Contact Button */}
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className={`px-4 sm:px-5 py-1.5 rounded-full border border-black/15 bg-white/90 backdrop-blur-sm text-[13px] sm:text-[14px] font-medium shadow-xs hover:bg-white hover:border-black/30 active:scale-98 transition-all cursor-pointer ${
              activeSection === 'contact' ? 'border-black/40 text-black font-semibold bg-white' : 'text-black'
            }`}
          >
            {content.nav.contact}
          </button>
        </div>
      </div>

      {/* Mobile Header (< md): Exactly 56px height, consistent padding. Left: Logo, Right: Lang Toggle. No Nav! */}
      <div className="flex md:hidden site-container h-[56px] items-center justify-between">
        <div>
          <button
            type="button"
            onClick={() => onNavigate('hero')}
            className="text-[18px] font-bold tracking-tight text-[#111111] hover:opacity-75 transition-opacity cursor-pointer"
            aria-label="iqbaldf home"
          >
            {content.brand}
          </button>
        </div>

        <div>
          <button
            type="button"
            onClick={onToggleLang}
            className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full border border-black/10 bg-white/90 backdrop-blur-md text-[12px] font-bold text-[#222222] shadow-xs flex items-center justify-center active:scale-95 transition-all cursor-pointer"
            aria-label={lang === 'in' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            title={lang === 'in' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
          >
            <span>{lang === 'in' ? 'IN' : 'EN'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
