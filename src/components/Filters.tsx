'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { F1Meeting, F1User } from '@/types/f1';
import { useTheme } from '@/contexts/ThemeContext';

interface FiltersProps {
  years: number[];
  selectedYear: number | null;
  onYearChange: (year: number | null) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  showRatedOnly: boolean;
  onShowRatedOnlyChange: (show: boolean) => void;
  currentUser: F1User | null;
}

export function Filters({
  years,
  selectedYear,
  onYearChange,
  searchTerm,
  onSearchChange,
  showRatedOnly,
  onShowRatedOnlyChange,
  currentUser,
}: FiltersProps) {
  const { currentTeam } = useTheme();
  
  return (
    <div 
      className="rounded-lg shadow-lg p-6 mb-6 border transition-all duration-300"
      style={{ 
        backgroundColor: currentTeam.surfaceColor,
        borderColor: currentTeam.borderColor
      }}
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" 
              style={{ color: searchTerm ? currentTeam.primaryColor : currentTeam.mutedColor }}
            />
            <input
              type="text"
              placeholder="Search Grand Prix events..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:outline-none transition-all duration-300"
              style={{
                backgroundColor: currentTeam.backgroundColor,
                color: currentTeam.textColor,
                border: `2px solid ${searchTerm ? currentTeam.primaryColor : currentTeam.borderColor}`,
                '--tw-ring-color': currentTeam.primaryColor
              } as React.CSSProperties}
            />
          </div>
        </div>

        {/* Year Filter */}
        <div className="flex items-center gap-3">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: currentTeam.primaryColor + '20' }}
          >
            <Calendar 
              className="w-4 h-4" 
              style={{ color: currentTeam.primaryColor }}
            />
          </div>
          <select
            value={selectedYear || ''}
            onChange={(e) => onYearChange(e.target.value ? parseInt(e.target.value) : null)}
            className="px-4 py-3 rounded-lg focus:ring-2 focus:outline-none transition-all duration-300 font-medium"
            style={{
              backgroundColor: currentTeam.backgroundColor,
              color: currentTeam.textColor,
              border: `2px solid ${currentTeam.borderColor}`,
              '--tw-ring-color': currentTeam.primaryColor
            } as React.CSSProperties}
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Show Rated Only */}
        {currentUser && (
          <div className="flex items-center gap-3">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: currentTeam.accentColor + '20' }}
            >
              <Filter 
                className="w-4 h-4" 
                style={{ color: currentTeam.accentColor }}
              />
            </div>
            <label 
              className="flex items-center gap-2 text-sm font-medium cursor-pointer px-3 py-2 rounded-lg transition-all duration-300"
              style={{ 
                color: currentTeam.textColor,
                backgroundColor: showRatedOnly ? currentTeam.primaryColor + '20' : 'transparent'
              }}
            >
              <input
                type="checkbox"
                checked={showRatedOnly}
                onChange={(e) => onShowRatedOnlyChange(e.target.checked)}
                className="rounded border-2 focus:ring-2 w-4 h-4"
                style={{
                  accentColor: currentTeam.primaryColor,
                  borderColor: currentTeam.borderColor,
                  '--tw-ring-color': currentTeam.primaryColor
                } as React.CSSProperties}
              />
              My Ratings Only
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
