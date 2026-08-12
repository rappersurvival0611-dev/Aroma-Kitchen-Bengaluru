import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { onValue, ref, type Unsubscribe } from 'firebase/database';
import { isFirebaseConfigured, realtimeDatabase } from '@/lib/firebase';

export interface FestivalTheme {
  id: string;
  name: string;
  emoji?: string;
  bannerText?: string;
  active?: boolean;
  startDate?: string;
  endDate?: string;
  priority?: number;
  primary?: string;
  primaryForeground?: string;
  accent?: string;
  accentForeground?: string;
  background?: string;
  foreground?: string;
  secondary?: string;
  secondaryForeground?: string;
  muted?: string;
}

interface FestivalThemeContextValue {
  theme: FestivalTheme | null;
  themes: FestivalTheme[];
  isConnected: boolean;
}

const FestivalThemeContext = createContext<FestivalThemeContextValue>({
  theme: null,
  themes: [],
  isConnected: false,
});

const DEFAULT_THEME: Required<Pick<FestivalTheme, 'primary' | 'accent' | 'background' | 'foreground' | 'secondary'>> = {
  primary: '#D97706',
  accent: '#16A34A',
  background: '#FFF8F0',
  foreground: '#1E293B',
  secondary: '#0F172A',
};

function toThemeArray(value: unknown): FestivalTheme[] {
  if (!value || typeof value !== 'object') return [];

  return Object.entries(value as Record<string, unknown>)
    .filter(([, rawTheme]) => rawTheme && typeof rawTheme === 'object')
    .map(([id, rawTheme]) => ({ id, ...(rawTheme as Omit<FestivalTheme, 'id'>) }))
    .filter((theme) => typeof theme.name === 'string');
}

function isWithinDateRange(theme: FestivalTheme, now: Date): boolean {
  if (theme.active === false) return false;

  const startsAt = theme.startDate ? new Date(`${theme.startDate}T00:00:00`) : null;
  const endsAt = theme.endDate ? new Date(`${theme.endDate}T23:59:59`) : null;

  if (startsAt && !Number.isNaN(startsAt.getTime()) && now < startsAt) return false;
  if (endsAt && !Number.isNaN(endsAt.getTime()) && now > endsAt) return false;
  return true;
}

function chooseActiveTheme(themes: FestivalTheme[]): FestivalTheme | null {
  const now = new Date();

  return themes
    .filter((theme) => isWithinDateRange(theme, now))
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))[0] ?? null;
}

function hexToHsl(hex: string): string | null {
  const normalized = hex.replace('#', '').trim();
  if (!/^[0-9a-f]{6}$/i.test(normalized)) return null;

  const r = parseInt(normalized.slice(0, 2), 16) / 255;
  const g = parseInt(normalized.slice(2, 4), 16) / 255;
  const b = parseInt(normalized.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;

  if (max === min) return `0 0% ${Math.round(lightness * 100)}%`;

  const difference = max - min;
  const saturation = lightness > 0.5
    ? difference / (2 - max - min)
    : difference / (max + min);
  let hue = 0;

  if (max === r) hue = (g - b) / difference + (g < b ? 6 : 0);
  else if (max === g) hue = (b - r) / difference + 2;
  else hue = (r - g) / difference + 4;

  return `${Math.round((hue / 6) * 360)} ${Math.round(saturation * 100)}% ${Math.round(lightness * 100)}%`;
}

function applyTheme(theme: FestivalTheme | null) {
  const root = document.documentElement;
  const colors = { ...DEFAULT_THEME, ...(theme ?? {}) };

  const variableMap: Record<string, string | null | undefined> = {
    '--primary': hexToHsl(colors.primary),
    '--primary-foreground': hexToHsl(theme?.primaryForeground ?? '#FFFFFF'),
    '--accent': hexToHsl(colors.accent),
    '--accent-foreground': hexToHsl(theme?.accentForeground ?? '#FFFFFF'),
    '--background': hexToHsl(colors.background),
    '--foreground': hexToHsl(colors.foreground),
    '--secondary': hexToHsl(colors.secondary),
    '--secondary-foreground': hexToHsl(theme?.secondaryForeground ?? '#FFFFFF'),
    '--muted': hexToHsl(theme?.muted ?? colors.background),
    '--ring': hexToHsl(colors.primary),
  };

  Object.entries(variableMap).forEach(([name, value]) => {
    if (value) root.style.setProperty(name, value);
  });

  root.dataset.festivalTheme = theme?.id ?? 'default';
  if (theme?.primary) root.style.setProperty('--festival-primary-hex', theme.primary);
  else root.style.removeProperty('--festival-primary-hex');
}

export function FestivalThemeProvider({ children }: { children: ReactNode }) {
  const [themes, setThemes] = useState<FestivalTheme[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured || !realtimeDatabase) {
      applyTheme(null);
      return;
    }

    let unsubscribe: Unsubscribe | undefined;
    try {
      unsubscribe = onValue(
        ref(realtimeDatabase, 'festivalThemes'),
        (snapshot) => {
          setThemes(toThemeArray(snapshot.val()));
          setIsConnected(true);
        },
        (error) => {
          console.error('Unable to read festival themes from Firebase:', error);
          setIsConnected(false);
        },
      );
    } catch (error) {
      console.error('Unable to subscribe to Firebase festival themes:', error);
      setIsConnected(false);
    }

    return () => unsubscribe?.();
  }, []);

  const theme = useMemo(() => chooseActiveTheme(themes), [themes]);

  useEffect(() => {
    applyTheme(theme);
    const timer = window.setInterval(() => setThemes((current) => [...current]), 60_000);
    return () => window.clearInterval(timer);
  }, [theme]);

  return (
    <FestivalThemeContext.Provider value={{ theme, themes, isConnected }}>
      {children}
    </FestivalThemeContext.Provider>
  );
}

export function useFestivalTheme() {
  return useContext(FestivalThemeContext);
}