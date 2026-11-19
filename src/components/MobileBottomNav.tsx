import { Home, User, BarChart3, Layers, Mail } from 'lucide-react';
import type { PortfolioContent } from '../data/content';

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
  if (isHidden) return null;

  const navItems = [
    { id: 'hero', label: content.home, icon: Home },
    { id: 'about', label: content.about, icon: User },
    { id: 'projects', label: content.projects, icon: BarChart3 },
    { id: 'skills', label: content.skills, icon: Layers },
    { id: 'contact', label: content.contact, icon: Mail },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-[calc(12px+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 z-30 max-w-[calc(100vw-32px)] px-1.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center gap-1 transition-all duration-200 select-none pointer-events-auto"
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
            className={`min-w-[44px] min-h-[44px] w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isActive
                ? 'bg-[#111111] text-white shadow-xs'
                : 'text-[#555555] hover:text-black hover:bg-black/5 active:scale-95'
            }`}
            aria-label={item.label}
            title={item.label}
          >
            <Icon size={19} strokeWidth={isActive ? 2.3 : 1.8} />
          </button>
        );
      })}
    </nav>
  );
}
