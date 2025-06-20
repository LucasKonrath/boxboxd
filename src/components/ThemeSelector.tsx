'use client';

import { useState } from 'react';
import { Palette, Check, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { F1Team } from '@/lib/teams';

export function ThemeSelector() {
  const { currentTeam, setTeam, teams } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleTeamSelect = (team: F1Team) => {
    setTeam(team);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        title="Change team theme"
      >
        <Palette className="w-4 h-4" />
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: currentTeam.primaryColor }}
        />
        <span className="hidden sm:inline">{currentTeam.shortName}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-64">
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Choose Your Team Theme</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Customize BoxBoxd with your favorite F1 team colors
            </p>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {teams.map((team) => (
              <button
                key={team.id}
                onClick={() => handleTeamSelect(team)}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: team.primaryColor }}
                    />
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: team.secondaryColor }}
                    />
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: team.accentColor }}
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">{team.shortName}</div>
                    <div className="text-xs text-gray-600">{team.name}</div>
                  </div>
                </div>
                {currentTeam.id === team.id && (
                  <Check className="w-4 h-4 text-green-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
