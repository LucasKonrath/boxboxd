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
      className={`flex items-center justify-center gap-6 p-4 rounded-xl border-2 ${className}`}
      style={{
        backgroundColor: currentTeam.primaryColor + '10',
        borderColor: currentTeam.primaryColor
      }}
    >
      <div 
        className="text-sm font-bold mb-2 text-center"
        style={{ color: currentTeam.textColor }}
      >
        🏆 PODIUM
      </div>
      <div className="flex items-center gap-6">
        {podium.map((result, index) => {
          const icons = [
            <Trophy key="1st" className="w-5 h-5" style={{ color: currentTeam.accentColor }} />,
            <Medal key="2nd" className="w-5 h-5" style={{ color: currentTeam.mutedColor }} />,
            <Award key="3rd" className="w-5 h-5" style={{ color: currentTeam.secondaryColor }} />
          ];
          
          return (
            <div 
              key={result.driver_number} 
              className="flex items-center gap-3 px-3 py-2 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: currentTeam.surfaceColor,
                border: `2px solid ${currentTeam.borderColor}`
              }}
            >
              {icons[index]}
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full shadow-sm border"
                  style={{ 
                    backgroundColor: result.team_colour,
                    borderColor: currentTeam.borderColor
                  }}
                />
                <span 
                  className="text-sm font-bold"
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
