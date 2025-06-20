'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { F1Team, F1_TEAMS, getTeamById, ThemeContextType } from '@/lib/teams';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTeam, setCurrentTeam] = useState<F1Team>(F1_TEAMS[F1_TEAMS.length - 1]); // Default theme

  useEffect(() => {
    // Load saved theme from localStorage
    if (typeof window !== 'undefined') {
      const savedTeamId = localStorage.getItem('boxboxd-team-theme');
      if (savedTeamId) {
        setCurrentTeam(getTeamById(savedTeamId));
      }
    }
  }, []);

  useEffect(() => {
    // Apply CSS custom properties to the document
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--team-primary', currentTeam.primaryColor);
      root.style.setProperty('--team-secondary', currentTeam.secondaryColor);
      root.style.setProperty('--team-accent', currentTeam.accentColor);
      root.style.setProperty('--team-text', currentTeam.textColor);
    }
  }, [currentTeam]);

  const setTeam = (team: F1Team) => {
    setCurrentTeam(team);
    if (typeof window !== 'undefined') {
      localStorage.setItem('boxboxd-team-theme', team.id);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTeam, setTeam, teams: F1_TEAMS }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
