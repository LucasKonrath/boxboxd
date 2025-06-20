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
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search Grand Prix events..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-opacity-50"
              style={{
                '--tw-ring-color': currentTeam.primaryColor,
                'borderColor': searchTerm ? currentTeam.primaryColor : undefined
              } as React.CSSProperties}
            />
          </div>
        </div>

        {/* Year Filter */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <select
            value={selectedYear || ''}
            onChange={(e) => onYearChange(e.target.value ? parseInt(e.target.value) : null)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-opacity-50"
            style={{
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
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showRatedOnly}
                onChange={(e) => onShowRatedOnlyChange(e.target.checked)}
                className="rounded border-gray-300 focus:ring-2"
                style={{
                  accentColor: currentTeam.primaryColor,
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
