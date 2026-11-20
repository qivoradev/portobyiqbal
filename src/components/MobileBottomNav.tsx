import { useState, useEffect, useRef } from 'react';
import { Home, User, BarChart3, Layers, Mail } from 'lucide-react';
import type { PortfolioContent } from '../data/content';
import { usePrefersReducedMotion } from './ScrollAnimations';

interface MobileBottomNavProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  content: PortfolioContent['nav'];
  isHidden?: boolean;
}

export function MobileBottomNav({
  onNavigate,
  activeSection,
  content,
  isHidden = false,
}: MobileBottomNavProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const lastScrollYRef = useRef(0);

  // Auto-hide when scrolling down, show when scrolling up or near top of page
  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;

      if (currentScrollY < 120) {
        setIsVisible(true);
      } else if (delta > 6) {
        // Scrolling down
        setIsVisible(false);
      } else if (delta < -6) {
        // Scrolling up
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion]);

  if (isHidden) return null;

  const navItems = [
    { id: 'hero', label: content.home, icon: Home },
    { id: 'about', label: content.about, icon: User },
    { id: 'projects', label: content.projects, icon: BarChart3 },
    { id: 'skills', label: content.skills, icon: Layers },
    { id: 'contact', label: content.contact, icon: Mail },
  ];

  const shouldShow = isVisible || isFocused || reducedMotion;

  return (
    <nav
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`md:hidden fixed bottom-[calc(12px+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 z-30 max-w-[calc(100vw-32px)] h-14 p-1.5 rounded-full bg-white/88 backdrop-blur-md border border-black/10 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.12)] flex items-center gap-1 select-none transition-all duration-300 ease-out ${
        shouldShow
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-[150%] opacity-0 pointer-events-none'
      }`}
      aria-label="Mobile Bottom Navigation"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={`min-h-[44px] rounded-full flex items-center justify-center transition-all duration-300 ease-out cursor-pointer ${
              isActive
                ? 'min-w-[44px] px-3.5 bg-[#111111] text-white shadow-xs gap-1.5'
                : 'w-11 min-w-[44px] text-[#555555] hover:text-[#111111] hover:bg-black/5 active:scale-95'
            }`}
            aria-label={item.label}
            title={item.label}
          >
            <Icon size={18} strokeWidth={isActive ? 2.3 : 1.9} className="shrink-0" />
            {isActive && (
              <span className="text-[12px] font-semibold tracking-tight whitespace-nowrap overflow-hidden">
                {item.label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
