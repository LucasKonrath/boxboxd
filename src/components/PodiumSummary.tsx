'use client';

import { Trophy, Medal, Award } from 'lucide-react';
import { RaceResult } from '@/types/f1';

interface PodiumSummaryProps {
  results: RaceResult[];
  className?: string;
}

export function PodiumSummary({ results, className = '' }: PodiumSummaryProps) {
  const podium = results.slice(0, 3);
  
  if (podium.length === 0) {
    return null;
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {podium.map((result, index) => {
        const icons = [
          <Trophy key="1st" className="w-4 h-4 text-yellow-500" />,
          <Medal key="2nd" className="w-4 h-4 text-gray-400" />,
          <Award key="3rd" className="w-4 h-4 text-amber-600" />
        ];
        
        return (
          <div key={result.driver_number} className="flex items-center gap-2">
            {icons[index]}
            <div className="flex items-center gap-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: result.team_colour }}
              />
              <span className="text-sm font-medium text-gray-900">
                {result.driver_acronym}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
