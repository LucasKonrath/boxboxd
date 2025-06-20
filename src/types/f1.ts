export interface F1Meeting {
  meeting_key: number;
  circuit_key: number;
  circuit_short_name: string;
  meeting_code: string;
  location: string;
  country_key: number;
  country_code: string;
  country_name: string;
  meeting_name: string;
  meeting_official_name: string;
  gmt_offset: string;
  date_start: string;
  year: number;
}

export interface F1Rating {
  id: string;
  meetingKey: number;
  userId: string;
  rating: number; // 1-5 stars
  review?: string;
  createdAt: string;
  updatedAt: string;
}

export interface F1User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface MeetingWithRating extends F1Meeting {
  userRating?: F1Rating;
  averageRating?: number;
  totalRatings?: number;
}
