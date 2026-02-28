import React, { createContext, useContext } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';

export type ThemeColor = 'mustard' | 'charcoal' | 'sage';

interface ThemeContextType {
  theme: ThemeColor;
  setTheme: (t: ThemeColor) => void;
  themeClasses: any;
}

// Map all themes to the new blocky aesthetic to ensure consistency across all legacy calculators
export const themeMap = {
  mustard: { 
    bg: 'bg-charcoal', 
    text: 'text-mustard', 
    border: 'border-charcoal', 
    hover: 'hover:bg-mustard hover:text-charcoal', 
    ring: 'focus-visible:ring-charcoal', 
    muted: 'bg-charcoal text-mustard border-2 border-charcoal/20' 
  },
  charcoal: { 
    bg: 'bg-charcoal', 
    text: 'text-mustard', 
    border: 'border-charcoal', 
    hover: 'hover:bg-mustard hover:text-charcoal', 
    ring: 'focus-visible:ring-charcoal', 
    muted: 'bg-charcoal text-mustard border-2 border-charcoal/20' 
  },
  sage: { 
    bg: 'bg-charcoal', 
    text: 'text-mustard', 
    border: 'border-charcoal', 
    hover: 'hover:bg-mustard hover:text-charcoal', 
    ring: 'focus-visible:ring-charcoal', 
    muted: 'bg-charcoal text-mustard border-2 border-charcoal/20' 
  },
  // Fallbacks for legacy saved themes
  violet: { bg: 'bg-charcoal', text: 'text-mustard', border: 'border-charcoal', hover: 'hover:bg-mustard hover:text-charcoal', ring: 'focus-visible:ring-charcoal', muted: 'bg-charcoal text-mustard border-2 border-charcoal/20' },
  emerald: { bg: 'bg-charcoal', text: 'text-mustard', border: 'border-charcoal', hover: 'hover:bg-mustard hover:text-charcoal', ring: 'focus-visible:ring-charcoal', muted: 'bg-charcoal text-mustard border-2 border-charcoal/20' },
  rose: { bg: 'bg-charcoal', text: 'text-mustard', border: 'border-charcoal', hover: 'hover:bg-mustard hover:text-charcoal', ring: 'focus-visible:ring-charcoal', muted: 'bg-charcoal text-mustard border-2 border-charcoal/20' },
  blue: { bg: 'bg-charcoal', text: 'text-mustard', border: 'border-charcoal', hover: 'hover:bg-mustard hover:text-charcoal', ring: 'focus-visible:ring-charcoal', muted: 'bg-charcoal text-mustard border-2 border-charcoal/20' },
  amber: { bg: 'bg-charcoal', text: 'text-mustard', border: 'border-charcoal', hover: 'hover:bg-mustard hover:text-charcoal', ring: 'focus-visible:ring-charcoal', muted: 'bg-charcoal text-mustard border-2 border-charcoal/20' },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useLocalStorage<ThemeColor>('omnicalc-theme', 'mustard');
  
  // Ensure legacy themes map to mustard
  const activeTheme = themeMap[theme] ? theme : 'mustard';

  return (
    <ThemeContext.Provider value={{ theme: activeTheme as ThemeColor, setTheme, themeClasses: themeMap[activeTheme as keyof typeof themeMap] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
