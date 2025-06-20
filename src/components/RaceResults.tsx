'use client';

import { useState, useEffect } from 'react';
import { Trophy, Medal, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { RaceResult } from '@/types/f1';
import { F1API } from '@/lib/f1-api';
import { PodiumSummary } from './PodiumSummary';

interface RaceResultsProps {
  meetingKey: number;
  meetingName: string;
}

export function RaceResults({ meetingKey, meetingName }: RaceResultsProps) {
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
        return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 2:
        return <Medal className="w-4 h-4 text-gray-400" />;
      case 3:
        return <Award className="w-4 h-4 text-amber-600" />;
      default:
        return null;
    }
  };

  const getPositionStyle = (position: number) => {
    switch (position) {
      case 1:
        return 'bg-yellow-50 border-yellow-200';
      case 2:
        return 'bg-gray-50 border-gray-200';
      case 3:
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <div className="mt-4">
      {/* Show podium summary even when collapsed if results are available */}
      {!expanded && results.length >= 3 && (
        <div className="mb-2">
          <PodiumSummary results={results} />
        </div>
      )}
      
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
      >
        <span className="flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          {results.length > 0 ? `Race Results (${results.length} finishers)` : 'Race Results'}
        </span>
        {expanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {expanded && (
        <div className="mt-3">
          {loading && (
            <div className="flex items-center justify-center py-4">
              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
              <span className="ml-2 text-sm text-gray-600">Loading results...</span>
            </div>
          )}

          {error && (
            <div className="text-sm text-red-600 py-2">
              {error}
            </div>
          )}

          {!loading && !error && results.length === 0 && (
            <div className="text-sm text-gray-500 py-2">
              Race results not available yet
            </div>
          )}

          {!loading && !error && results.length > 0 && (
            <div className="space-y-1">
              <div className="text-xs text-gray-500 mb-2">
                Final Classification
              </div>
              {results.slice(0, 10).map((result) => (
                <div
                  key={result.driver_number}
                  className={`flex items-center justify-between p-2 rounded border ${getPositionStyle(result.position)}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-8">
                      {getPositionIcon(result.position)}
                      <span className="text-sm font-medium">
                        {result.position}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {result.driver_acronym}
                      </div>
                      <div className="text-xs text-gray-600">
                        {result.driver_name}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: result.team_colour }}
                      title={result.team_name}
                    />
                    <div className="text-xs text-gray-600 text-right">
                      {result.team_name}
                    </div>
                  </div>
                </div>
              ))}
              {results.length > 10 && (
                <div className="text-xs text-gray-500 text-center py-2">
                  Showing top 10 finishers
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
