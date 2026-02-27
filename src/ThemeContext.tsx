import React, { createContext, useContext } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';

export type ThemeColor = 'violet' | 'emerald' | 'rose' | 'blue' | 'amber';

interface ThemeContextType {
  theme: ThemeColor;
  setTheme: (t: ThemeColor) => void;
  themeClasses: any;
}

export const themeMap = {
  violet: { bg: 'bg-violet-600', text: 'text-violet-400', border: 'border-violet-500/50', hover: 'hover:bg-violet-500', ring: 'focus-visible:ring-violet-500', muted: 'bg-violet-500/10 text-violet-400' },
  emerald: { bg: 'bg-emerald-600', text: 'text-emerald-400', border: 'border-emerald-500/50', hover: 'hover:bg-emerald-500', ring: 'focus-visible:ring-emerald-500', muted: 'bg-emerald-500/10 text-emerald-400' },
  rose: { bg: 'bg-rose-600', text: 'text-rose-400', border: 'border-rose-500/50', hover: 'hover:bg-rose-500', ring: 'focus-visible:ring-rose-500', muted: 'bg-rose-500/10 text-rose-400' },
  blue: { bg: 'bg-blue-600', text: 'text-blue-400', border: 'border-blue-500/50', hover: 'hover:bg-blue-500', ring: 'focus-visible:ring-blue-500', muted: 'bg-blue-500/10 text-blue-400' },
  amber: { bg: 'bg-amber-600', text: 'text-amber-400', border: 'border-amber-500/50', hover: 'hover:bg-amber-500', ring: 'focus-visible:ring-amber-500', muted: 'bg-amber-500/10 text-amber-400' },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useLocalStorage<ThemeColor>('omnicalc-theme', 'violet');
  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeClasses: themeMap[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
