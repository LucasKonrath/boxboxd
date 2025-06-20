'use client';

import { useState, useEffect } from 'react';
import { F1Meeting, F1User } from '@/types/f1';
import { F1API } from '@/lib/f1-api';
import { db } from '@/lib/db';
import { MeetingCard } from '@/components/MeetingCard';
import { UserProfile } from '@/components/UserProfile';
import { Filters } from '@/components/Filters';
import { ThemeSelector } from '@/components/ThemeSelector';
import { useTheme } from '@/contexts/ThemeContext';
import { Flag, Trophy, Star } from 'lucide-react';

export default function Home() {
  const { currentTeam } = useTheme();
  const [meetings, setMeetings] = useState<F1Meeting[]>([]);
  const [filteredMeetings, setFilteredMeetings] = useState<F1Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<F1User | null>(null);
  
  // Filter states
  const [selectedYear, setSelectedYear] = useState<number | null>(new Date().getFullYear());
  const [searchTerm, setSearchTerm] = useState('');
  const [showRatedOnly, setShowRatedOnly] = useState(false);

  const availableYears = F1API.getAvailableYears();

  useEffect(() => {
    loadMeetings();
  }, [selectedYear]);

  useEffect(() => {
    filterMeetings();
  }, [meetings, searchTerm, showRatedOnly, currentUser]);

  const loadMeetings = async () => {
    try {
      setLoading(true);
      const data = await F1API.getMeetings(selectedYear || undefined);
      setMeetings(data);
    } catch (err) {
      setError('Failed to load F1 meetings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterMeetings = () => {
    let filtered = meetings;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(meeting =>
        meeting.meeting_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.country_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.circuit_short_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by rated only
    if (showRatedOnly && currentUser) {
      filtered = filtered.filter(meeting =>
        db.getRating(meeting.meeting_key, currentUser.id) !== null
      );
    }

    // Sort by date (most recent first)
    filtered.sort((a, b) => new Date(b.date_start).getTime() - new Date(a.date_start).getTime());

    setFilteredMeetings(filtered);
  };

  const handleRate = (meetingKey: number, rating: number, review?: string) => {
    if (!currentUser) return;
    
    db.saveRating(meetingKey, currentUser.id, rating, review);
    // Trigger re-render by updating filtered meetings
    filterMeetings();
  };

  const getStats = () => {
    if (!currentUser) return { totalRatings: 0, averageRating: 0 };
    
    const userRatings = db.getAllRatings().filter(r => r.userId === currentUser.id);
    const totalRatings = userRatings.length;
    const averageRating = totalRatings > 0 
      ? userRatings.reduce((sum, r) => sum + r.rating, 0) / totalRatings 
      : 0;
    
    return { totalRatings, averageRating };
  };

  const stats = getStats();

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: currentTeam.backgroundColor }}
    >
      {/* Header */}
      <header 
        className="shadow-lg border-b-2 transition-colors duration-300"
        style={{ 
          backgroundColor: currentTeam.surfaceColor,
          borderBottomColor: currentTeam.borderColor
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: currentTeam.primaryColor }}
              >
                <Flag className="w-7 h-7" style={{ color: currentTeam.textColor }} />
              </div>
              <div>
                <h1 
                  className="text-3xl font-bold"
                  style={{ color: currentTeam.textColor }}
                >
                  BoxBoxd
                </h1>
                <p 
                  className="text-sm"
                  style={{ color: currentTeam.mutedColor }}
                >
                  Rate and review Formula 1 Grand Prix events
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {currentUser && (
                <div className="flex items-center gap-6 text-sm">
                  <div 
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-300"
                    style={{ backgroundColor: currentTeam.primaryColor + '20' }}
                  >
                    <Trophy 
                      className="w-4 h-4" 
                      style={{ color: currentTeam.accentColor }}
                    />
                    <span 
                      className="font-medium"
                      style={{ color: currentTeam.textColor }}
                    >
                      {stats.totalRatings}
                    </span>
                    <span 
                      style={{ color: currentTeam.mutedColor }}
                    >
                      races rated
                    </span>
                  </div>
                  <div 
                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-300"
                    style={{ backgroundColor: currentTeam.primaryColor + '20' }}
                  >
                    <Star 
                      className="w-4 h-4" 
                      style={{ color: currentTeam.accentColor }}
                    />
                    <span 
                      className="font-medium"
                      style={{ color: currentTeam.textColor }}
                    >
                      {stats.averageRating.toFixed(1)}
                    </span>
                    <span 
                      style={{ color: currentTeam.mutedColor }}
                    >
                      avg rating
                    </span>
                  </div>
                </div>
              )}
              <ThemeSelector />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <UserProfile onUserChange={setCurrentUser} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Filters
              years={availableYears}
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              showRatedOnly={showRatedOnly}
              onShowRatedOnlyChange={setShowRatedOnly}
              currentUser={currentUser}
            />

            {loading && (
              <div className="text-center py-12">
                <div 
                  className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-transparent"
                  style={{ borderTopColor: currentTeam.primaryColor }}
                ></div>
                <p 
                  className="mt-2"
                  style={{ color: currentTeam.mutedColor }}
                >
                  Loading Formula 1 events...
                </p>
              </div>
            )}

            {error && (
              <div 
                className="border rounded-lg p-4 transition-colors duration-300"
                style={{ 
                  backgroundColor: currentTeam.accentColor + '20',
                  borderColor: currentTeam.accentColor,
                  color: currentTeam.textColor
                }}
              >
                {error}
              </div>
            )}

            {!loading && !error && filteredMeetings.length === 0 && (
              <div className="text-center py-12">
                <Flag 
                  className="w-12 h-12 mx-auto mb-4" 
                  style={{ color: currentTeam.mutedColor }}
                />
                <h3 
                  className="text-lg font-semibold mb-2"
                  style={{ color: currentTeam.textColor }}
                >
                  No races found
                </h3>
                <p style={{ color: currentTeam.mutedColor }}>
                  {searchTerm || showRatedOnly
                    ? 'Try adjusting your filters'
                    : 'No Formula 1 events available for the selected year'}
                </p>
              </div>
            )}

            <div className="space-y-4">
              {filteredMeetings.map((meeting) => (
                <MeetingCard
                  key={meeting.meeting_key}
                  meeting={meeting}
                  onRate={handleRate}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
