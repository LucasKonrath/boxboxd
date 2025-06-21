'use client';

import { Trophy, Medal, Award } from 'lucide-react';
import { RaceResult } from '@/types/f1';
import { useTheme } from '@/contexts/ThemeContext';

interface PodiumSummaryProps {
  results: RaceResult[];
  className?: string;
}

export function PodiumSummary({ results, className = '' }: PodiumSummaryProps) {
  const { currentTeam } = useTheme();
  const podium = results.slice(0, 3);
  
  if (podium.length === 0) {
    return null;
  }

  return (
    <div 
      className={`p-4 rounded-xl border-2 ${className}`}
      style={{
        backgroundColor: currentTeam.primaryColor + '10',
        borderColor: currentTeam.primaryColor
      }}
    >
      <div 
        className="text-sm font-bold mb-3 text-center"
        style={{ color: currentTeam.textColor }}
      >
        🏆 PODIUM
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {podium.map((result, index) => {
          const icons = [
            <Trophy key="1st" className="w-4 h-4" style={{ color: currentTeam.accentColor }} />,
            <Medal key="2nd" className="w-4 h-4" style={{ color: currentTeam.mutedColor }} />,
            <Award key="3rd" className="w-4 h-4" style={{ color: currentTeam.secondaryColor }} />
          ];
          
          return (
            <div 
              key={result.driver_number} 
              className="flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: currentTeam.surfaceColor,
                border: `1px solid ${currentTeam.borderColor}`
              }}
            >
              {icons[index]}
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ 
                    backgroundColor: result.team_colour,
                  }}
                />
                <span 
                  className="text-sm font-bold whitespace-nowrap"
                  style={{ color: currentTeam.textColor }}
                >
                  {result.driver_acronym}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
