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
        className="flex items-center gap-3 px-4 py-2 text-sm rounded-xl transition-all duration-300 hover:scale-105 shadow-lg border-2"
        style={{
          backgroundColor: currentTeam.surfaceColor,
          borderColor: currentTeam.borderColor,
          color: currentTeam.textColor
        }}
        title="Change team theme"
      >
        <Palette 
          className="w-5 h-5" 
          style={{ color: currentTeam.primaryColor }}
        />
        <div className="flex gap-1">
          <div
            className="w-3 h-3 rounded-full shadow-sm"
            style={{ backgroundColor: currentTeam.primaryColor }}
          />
          <div
            className="w-3 h-3 rounded-full shadow-sm"
            style={{ backgroundColor: currentTeam.secondaryColor }}
          />
          <div
            className="w-3 h-3 rounded-full shadow-sm"
            style={{ backgroundColor: currentTeam.accentColor }}
          />
        </div>
        <span className="hidden sm:inline font-semibold">{currentTeam.shortName}</span>
      </button>

      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-2 rounded-xl shadow-2xl z-50 min-w-80 max-w-96 border-2"
          style={{
            backgroundColor: currentTeam.surfaceColor,
            borderColor: currentTeam.borderColor
          }}
        >
          <div 
            className="p-4 border-b-2"
            style={{ 
              borderBottomColor: currentTeam.borderColor,
              background: `linear-gradient(135deg, ${currentTeam.primaryColor}15, ${currentTeam.secondaryColor}15)`
            }}
          >
            <div className="flex items-center justify-between">
              <h3 
                className="text-sm font-bold"
                style={{ color: currentTeam.textColor }}
              >
                🏎️ Choose Your Team Theme
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                style={{ 
                  color: currentTeam.mutedColor,
                  backgroundColor: currentTeam.mutedColor + '20'
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p 
              className="text-xs mt-1"
              style={{ color: currentTeam.mutedColor }}
            >
              Customize BoxBoxd with your favorite F1 team colors
            </p>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {teams.map((team) => (
              <button
                key={team.id}
                onClick={() => handleTeamSelect(team)}
                className="w-full flex items-center justify-between p-3 transition-all duration-300 hover:scale-[1.01] border-b last:border-b-0"
                style={{
                  borderBottomColor: currentTeam.borderColor + '30',
                  backgroundColor: currentTeam.id === team.id ? team.primaryColor + '20' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = team.primaryColor + '30';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = currentTeam.id === team.id ? team.primaryColor + '20' : 'transparent';
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div
                      className="w-4 h-4 rounded-lg shadow-sm border"
                      style={{ 
                        backgroundColor: team.primaryColor,
                        borderColor: team.borderColor
                      }}
                    />
                    <div
                      className="w-4 h-4 rounded-lg shadow-sm border"
                      style={{ 
                        backgroundColor: team.secondaryColor,
                        borderColor: team.borderColor
                      }}
                    />
                    <div
                      className="w-4 h-4 rounded-lg shadow-sm border"
                      style={{ 
                        backgroundColor: team.accentColor,
                        borderColor: team.borderColor
                      }}
                    />
                  </div>
                  <div className="text-left">
                    <div 
                      className="text-sm font-bold"
                      style={{ color: currentTeam.textColor }}
                    >
                      {team.shortName}
                    </div>
                    <div 
                      className="text-xs truncate max-w-48"
                      style={{ color: currentTeam.mutedColor }}
                    >
                      {team.name}
                    </div>
                  </div>
                </div>
                {currentTeam.id === team.id && (
                  <div 
                    className="p-1 rounded-full flex-shrink-0"
                    style={{ backgroundColor: team.primaryColor }}
                  >
                    <Check 
                      className="w-4 h-4" 
                      style={{ color: team.textColor }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
