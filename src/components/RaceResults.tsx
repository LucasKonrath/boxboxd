'use client';

import { useState, useEffect } from 'react';
import { Trophy, Medal, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { RaceResult } from '@/types/f1';
import { F1API } from '@/lib/f1-api';
import { PodiumSummary } from './PodiumSummary';
import { useTheme } from '@/contexts/ThemeContext';

interface RaceResultsProps {
  meetingKey: number;
  meetingName: string;
}

export function RaceResults({ meetingKey, meetingName }: RaceResultsProps) {
  const { currentTeam } = useTheme();
  const [results, setResults] = useState<RaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (expanded && results.length === 0) {
      loadResults();
    }
  }, [expanded, meetingKey]);

  const loadResults = async () => {
    try {
      setLoading(true);
      setError(null);
      const raceResults = await F1API.getRaceResults(meetingKey);
      setResults(raceResults);
    } catch (err) {
      setError('Failed to load race results');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-5 h-5" style={{ color: currentTeam.accentColor }} />;
      case 2:
        return <Medal className="w-5 h-5" style={{ color: currentTeam.mutedColor }} />;
      case 3:
        return <Award className="w-5 h-5" style={{ color: currentTeam.secondaryColor }} />;
      default:
        return null;
    }
  };

  const getPositionStyle = (position: number) => {
    switch (position) {
      case 1:
        return {
          backgroundColor: currentTeam.accentColor + '15',
          borderColor: currentTeam.accentColor
        };
      case 2:
        return {
          backgroundColor: currentTeam.mutedColor + '15',
          borderColor: currentTeam.mutedColor
        };
      case 3:
        return {
          backgroundColor: currentTeam.secondaryColor + '15',
          borderColor: currentTeam.secondaryColor
        };
      default:
        return {
          backgroundColor: currentTeam.surfaceColor,
          borderColor: currentTeam.borderColor
        };
    }
  };

  return (
    <div className="mt-4">
      {/* Show podium summary even when collapsed if results are available */}
      {!expanded && results.length >= 3 && (
        <div className="mb-3">
          <PodiumSummary results={results} />
        </div>
      )}
      
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-left text-sm font-bold transition-all duration-300 hover:scale-[1.02] p-3 rounded-lg"
        style={{
          color: currentTeam.textColor,
          backgroundColor: currentTeam.primaryColor + '20'
        }}
      >
        <span className="flex items-center gap-3">
          <Trophy 
            className="w-5 h-5" 
            style={{ color: currentTeam.primaryColor }}
          />
          <span>
            {results.length > 0 ? `🏁 Race Results (${results.length} finishers)` : '🏁 Race Results'}
          </span>
        </span>
        {expanded ? (
          <ChevronUp 
            className="w-5 h-5" 
            style={{ color: currentTeam.primaryColor }}
          />
        ) : (
          <ChevronDown 
            className="w-5 h-5" 
            style={{ color: currentTeam.primaryColor }}
          />
        )}
      </button>

      {expanded && (
        <div className="mt-4">
          {loading && (
            <div className="flex items-center justify-center py-6">
              <div 
                className="inline-block animate-spin rounded-full h-6 w-6 border-4 border-transparent"
                style={{ borderTopColor: currentTeam.primaryColor }}
              ></div>
              <span 
                className="ml-3 text-sm font-medium"
                style={{ color: currentTeam.mutedColor }}
              >
                Loading results...
              </span>
            </div>
          )}

          {error && (
            <div 
              className="text-sm py-3 px-4 rounded-lg border"
              style={{
                color: currentTeam.accentColor,
                backgroundColor: currentTeam.accentColor + '20',
                borderColor: currentTeam.accentColor
              }}
            >
              {error}
            </div>
          )}

          {!loading && !error && results.length === 0 && (
            <div 
              className="text-sm py-3 px-4 rounded-lg text-center"
              style={{ 
                color: currentTeam.mutedColor,
                backgroundColor: currentTeam.mutedColor + '10'
              }}
            >
              Race results not available yet
            </div>
          )}

          {!loading && !error && results.length > 0 && (
            <div className="space-y-2">
              <div 
                className="text-xs font-bold mb-3 px-3 py-2 rounded-lg"
                style={{ 
                  color: currentTeam.textColor,
                  backgroundColor: currentTeam.secondaryColor + '20'
                }}
              >
                🏆 FINAL CLASSIFICATION
              </div>
              {results.slice(0, 10).map((result) => (
                <div
                  key={result.driver_number}
                  className="flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-300 hover:scale-[1.02] shadow-sm"
                  style={getPositionStyle(result.position)}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 w-12">
                      {getPositionIcon(result.position)}
                      <span 
                        className="text-lg font-black"
                        style={{ color: currentTeam.textColor }}
                      >
                        {result.position}
                      </span>
                    </div>
                    <div>
                      <div 
                        className="text-sm font-bold"
                        style={{ color: currentTeam.textColor }}
                      >
                        {result.driver_acronym}
                      </div>
                      <div 
                        className="text-xs font-medium"
                        style={{ color: currentTeam.mutedColor }}
                      >
                        {result.driver_name}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full shadow-lg border-2"
                      style={{ 
                        backgroundColor: result.team_colour,
                        borderColor: currentTeam.borderColor
                      }}
                      title={result.team_name}
                    />
                    <div 
                      className="text-xs font-semibold text-right"
                      style={{ color: currentTeam.mutedColor }}
                    >
                      {result.team_name}
                    </div>
                  </div>
                </div>
              ))}
              {results.length > 10 && (
                <div 
                  className="text-xs text-center py-3 font-medium"
                  style={{ color: currentTeam.mutedColor }}
                >
                  Showing top 10 finishers • {results.length - 10} more drivers finished
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
