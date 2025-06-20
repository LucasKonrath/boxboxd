'use client';

import { useState, useEffect } from 'react';
import { Star, Calendar, MapPin, Flag } from 'lucide-react';
import { format } from 'date-fns';
import { F1Meeting, F1Rating } from '@/types/f1';
import { db } from '@/lib/db';
import { RaceResults } from './RaceResults';
import { useTheme } from '@/contexts/ThemeContext';

interface MeetingCardProps {
  meeting: F1Meeting;
  onRate: (meetingKey: number, rating: number, review?: string) => void;
}

export function MeetingCard({ meeting, onRate }: MeetingCardProps) {
  const { currentTeam } = useTheme();
  const [userRating, setUserRating] = useState<F1Rating | null>(null);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [isRating, setIsRating] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');

  useEffect(() => {
    const currentUser = db.getCurrentUser();
    if (currentUser) {
      const rating = db.getRating(meeting.meeting_key, currentUser.id);
      setUserRating(rating);
      setReview(rating?.review || '');
    }

    const stats = db.getMeetingStats(meeting.meeting_key);
    setAverageRating(stats.averageRating);
    setTotalRatings(stats.totalRatings);
  }, [meeting.meeting_key]);

  const handleRatingClick = (rating: number) => {
    const currentUser = db.getCurrentUser();
    if (!currentUser) {
      alert('Please create a user profile first');
      return;
    }

    onRate(meeting.meeting_key, rating, review);
    const newRating = db.saveRating(meeting.meeting_key, currentUser.id, rating, review);
    setUserRating(newRating);
    setIsRating(false);

    // Update stats
    const stats = db.getMeetingStats(meeting.meeting_key);
    setAverageRating(stats.averageRating);
    setTotalRatings(stats.totalRatings);
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return [...Array(5)].map((_, i) => {
      const starValue = i + 1;
      return (
        <Star
          key={i}
          className={`w-5 h-5 transition-all duration-200 ${
            starValue <= rating
              ? 'text-yellow-400'
              : interactive 
                ? 'text-gray-300 hover:text-yellow-300' 
                : 'text-gray-300'
          } ${interactive ? 'cursor-pointer hover:scale-110' : ''}`}
          style={{
            fill: starValue <= rating ? currentTeam.accentColor : 'none',
            color: starValue <= rating ? currentTeam.accentColor : undefined
          }}
          onClick={interactive ? () => handleRatingClick(starValue) : undefined}
          onMouseEnter={interactive ? () => setHoverRating(starValue) : undefined}
          onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
        />
      );
    });
  };

  const meetingDate = new Date(meeting.date_start);
  const isPastEvent = meetingDate < new Date();

  return (
    <div 
      className="rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border-2"
      style={{ 
        backgroundColor: currentTeam.surfaceColor,
        borderColor: currentTeam.borderColor
      }}
    >
      {/* Header with gradient */}
      <div 
        className="px-6 py-4 border-b-2"
        style={{ 
          background: `linear-gradient(135deg, ${currentTeam.primaryColor}15, ${currentTeam.secondaryColor}15)`,
          borderBottomColor: currentTeam.borderColor
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 
              className="text-xl font-bold mb-1"
              style={{ color: currentTeam.textColor }}
            >
              {meeting.meeting_name}
            </h3>
            <p 
              className="text-sm mb-3 font-medium"
              style={{ color: currentTeam.mutedColor }}
            >
              {meeting.meeting_official_name}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div 
                className="flex items-center gap-2 px-3 py-1 rounded-full"
                style={{ backgroundColor: currentTeam.primaryColor + '20' }}
              >
                <Calendar 
                  className="w-4 h-4" 
                  style={{ color: currentTeam.primaryColor }}
                />
                <span style={{ color: currentTeam.textColor }}>
                  {format(meetingDate, 'MMM d, yyyy')}
                </span>
              </div>
              <div 
                className="flex items-center gap-2 px-3 py-1 rounded-full"
                style={{ backgroundColor: currentTeam.secondaryColor + '20' }}
              >
                <MapPin 
                  className="w-4 h-4" 
                  style={{ color: currentTeam.secondaryColor }}
                />
                <span style={{ color: currentTeam.textColor }}>
                  {meeting.location}
                </span>
              </div>
              <div 
                className="flex items-center gap-2 px-3 py-1 rounded-full"
                style={{ backgroundColor: currentTeam.accentColor + '20' }}
              >
                <Flag 
                  className="w-4 h-4" 
                  style={{ color: currentTeam.accentColor }}
                />
                <span style={{ color: currentTeam.textColor }}>
                  {meeting.country_name}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right ml-4">
            <div 
              className="text-3xl font-black px-4 py-2 rounded-xl shadow-lg"
              style={{ 
                backgroundColor: currentTeam.primaryColor,
                color: currentTeam.textColor
              }}
            >
              {meeting.meeting_code}
            </div>
            <div 
              className="text-sm mt-2 font-semibold"
              style={{ color: currentTeam.mutedColor }}
            >
              {meeting.circuit_short_name}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">

        {/* Rating Section */}
        {isPastEvent && (
          <div 
            className="border-t-2 pt-6"
            style={{ borderTopColor: currentTeam.borderColor }}
          >
            {/* Race Results */}
            <RaceResults 
              meetingKey={meeting.meeting_key} 
              meetingName={meeting.meeting_name}
            />
            
            <div 
              className="flex items-center justify-between mb-4 mt-6 p-4 rounded-xl"
              style={{ backgroundColor: currentTeam.primaryColor + '10' }}
            >
              <div className="flex items-center gap-3">
                <span 
                  className="text-sm font-bold"
                  style={{ color: currentTeam.textColor }}
                >
                  Community Rating:
                </span>
                <div className="flex items-center gap-2">
                  {renderStars(Math.round(averageRating))}
                  <span 
                    className="text-sm font-semibold ml-2 px-2 py-1 rounded-full"
                    style={{ 
                      color: currentTeam.textColor,
                      backgroundColor: currentTeam.accentColor + '20'
                    }}
                  >
                    {averageRating.toFixed(1)} ({totalRatings} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div 
              className="flex items-center justify-between p-4 rounded-xl"
              style={{ backgroundColor: currentTeam.secondaryColor + '10' }}
            >
              <div className="flex items-center gap-3">
                <span 
                  className="text-sm font-bold"
                  style={{ color: currentTeam.textColor }}
                >
                  Your Rating:
                </span>
                {userRating ? (
                  <div className="flex items-center gap-2">
                    {renderStars(userRating.rating)}
                    <button
                      onClick={() => setIsRating(true)}
                      className="text-xs font-semibold px-3 py-1 rounded-full transition-all duration-300 hover:scale-105"
                      style={{ 
                        color: currentTeam.primaryColor,
                        backgroundColor: currentTeam.primaryColor + '20'
                      }}
                    >
                      Edit Rating
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsRating(true)}
                    className="text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                    style={{ 
                      backgroundColor: currentTeam.primaryColor,
                      color: currentTeam.textColor
                    }}
                  >
                    Rate this Grand Prix
                  </button>
                )}
              </div>
            </div>

            {/* Rating Interface */}
            {isRating && (
              <div 
                className="mt-6 p-6 rounded-xl border-2 shadow-lg"
                style={{ 
                  backgroundColor: currentTeam.backgroundColor,
                  borderColor: currentTeam.primaryColor
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span 
                    className="text-sm font-bold"
                    style={{ color: currentTeam.textColor }}
                  >
                    Rate this Grand Prix:
                  </span>
                  <div className="flex items-center gap-1">
                    {renderStars(hoverRating || userRating?.rating || 0, true)}
                  </div>
                </div>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write a review (optional)..."
                  className="w-full p-4 rounded-lg text-sm resize-none transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: currentTeam.surfaceColor,
                    color: currentTeam.textColor,
                    borderColor: currentTeam.borderColor,
                    border: `2px solid ${currentTeam.borderColor}`,
                    '--tw-ring-color': currentTeam.primaryColor
                  } as React.CSSProperties}
                  rows={4}
                />
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setIsRating(false)}
                    className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300"
                    style={{ 
                      color: currentTeam.mutedColor,
                      backgroundColor: currentTeam.mutedColor + '20'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* User Review */}
            {userRating?.review && (
              <div 
                className="mt-4 p-4 rounded-xl border-l-4"
                style={{ 
                  backgroundColor: currentTeam.accentColor + '10',
                  borderLeftColor: currentTeam.accentColor
                }}
              >
                <p 
                  className="text-sm font-medium italic"
                  style={{ color: currentTeam.textColor }}
                >
                  "{userRating.review}"
                </p>
              </div>
            )}
          </div>
        )}

        {!isPastEvent && (
          <div 
            className="border-t-2 pt-6"
            style={{ borderTopColor: currentTeam.borderColor }}
          >
            {/* Race Information for upcoming events */}
            <RaceResults 
              meetingKey={meeting.meeting_key} 
              meetingName={meeting.meeting_name}
            />
            
            <div 
              className="text-sm italic mt-6 p-4 rounded-xl text-center"
              style={{ 
                color: currentTeam.mutedColor,
                backgroundColor: currentTeam.mutedColor + '10'
              }}
            >
              🏁 This Grand Prix hasn't happened yet. Come back after the event to rate it!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
