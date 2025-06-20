'use client';

import { useState, useEffect } from 'react';
import { Star, Calendar, MapPin, Flag } from 'lucide-react';
import { format } from 'date-fns';
import { F1Meeting, F1Rating } from '@/types/f1';
import { db } from '@/lib/db';
import { RaceResults } from './RaceResults';

interface MeetingCardProps {
  meeting: F1Meeting;
  onRate: (meetingKey: number, rating: number, review?: string) => void;
}

export function MeetingCard({ meeting, onRate }: MeetingCardProps) {
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
          className={`w-4 h-4 ${
            starValue <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300'
          } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {meeting.meeting_name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {meeting.meeting_official_name}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {format(meetingDate, 'MMM d, yyyy')}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {meeting.location}
              </div>
              <div className="flex items-center gap-1">
                <Flag className="w-4 h-4" />
                {meeting.country_name}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {meeting.meeting_code}
            </div>
            <div className="text-sm text-gray-500">
              {meeting.circuit_short_name}
            </div>
          </div>
        </div>

        {/* Rating Section */}
        {isPastEvent && (
          <div className="border-t pt-4">
            {/* Race Results */}
            <RaceResults 
              meetingKey={meeting.meeting_key} 
              meetingName={meeting.meeting_name}
            />
            
            <div className="flex items-center justify-between mb-3 mt-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Community Rating:</span>
                <div className="flex items-center gap-1">
                  {renderStars(Math.round(averageRating))}
                  <span className="text-sm text-gray-600 ml-1">
                    {averageRating.toFixed(1)} ({totalRatings} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Your Rating:</span>
                {userRating ? (
                  <div className="flex items-center gap-1">
                    {renderStars(userRating.rating)}
                    <button
                      onClick={() => setIsRating(true)}
                      className="text-xs text-blue-600 hover:text-blue-800 ml-2"
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsRating(true)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Rate this Grand Prix
                  </button>
                )}
              </div>
            </div>

            {/* Rating Interface */}
            {isRating && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium">Rate this Grand Prix:</span>
                  <div className="flex items-center gap-1">
                    {renderStars(hoverRating || userRating?.rating || 0, true)}
                  </div>
                </div>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write a review (optional)..."
                  className="w-full p-2 border border-gray-300 rounded-md text-sm resize-none"
                  rows={3}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setIsRating(false)}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* User Review */}
            {userRating?.review && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">{userRating.review}</p>
              </div>
            )}
          </div>
        )}

        {!isPastEvent && (
          <div className="border-t pt-4">
            {/* Race Information for upcoming events */}
            <RaceResults 
              meetingKey={meeting.meeting_key} 
              meetingName={meeting.meeting_name}
            />
            
            <div className="text-sm text-gray-500 italic mt-4">
              This Grand Prix hasn't happened yet. Come back after the event to rate it!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
