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

export interface F1Session {
  session_key: number;
  session_name: string;
  session_type: string;
  date_start: string;
  date_end: string;
  meeting_key: number;
  location: string;
  country_name: string;
  circuit_short_name: string;
  year: number;
}

export interface F1Driver {
  driver_number: number;
  broadcast_name: string;
  full_name: string;
  name_acronym: string;
  team_name: string;
  team_colour: string;
  headshot_url?: string;
  country_code: string;
  session_key: number;
  meeting_key: number;
}

export interface F1Position {
  driver_number: number;
  position: number;
  date: string;
  session_key: number;
  meeting_key: number;
}

export interface RaceResult {
  position: number;
  driver_number: number;
  driver_name: string;
  driver_acronym: string;
  team_name: string;
  team_colour: string;
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
