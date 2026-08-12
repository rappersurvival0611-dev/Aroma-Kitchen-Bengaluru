import { Sparkles } from 'lucide-react';
import { useFestivalTheme } from '@/context/FestivalThemeContext';

export function FestivalThemeBanner() {
  const { theme } = useFestivalTheme();
  if (!theme) return null;

  return (
    <div
      className="relative z-[55] flex min-h-9 items-center justify-center gap-2 bg-primary px-4 py-2 text-center text-xs font-semibold text-primary-foreground shadow-sm"
      role="status"
    >
      <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>
        {theme.emoji ? `${theme.emoji} ` : ''}
        {theme.bannerText || `Celebrate ${theme.name} with Aroma Kitchen`}
      </span>
      <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
    </div>
  );
}