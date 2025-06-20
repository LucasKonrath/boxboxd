import axios from 'axios';
import { F1Meeting, F1Session, F1Driver, F1Position, RaceResult } from '@/types/f1';

const F1_API_BASE = 'https://api.openf1.org/v1';

export class F1API {
  static async getMeetings(year?: number): Promise<F1Meeting[]> {
    try {
      const url = year 
        ? `${F1_API_BASE}/meetings?year=${year}`
        : `${F1_API_BASE}/meetings`;
      
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch F1 meetings:', error);
      throw new Error('Failed to fetch F1 meetings');
    }
  }

  static async getMeeting(meetingKey: number): Promise<F1Meeting | null> {
    try {
      const response = await axios.get(`${F1_API_BASE}/meetings?meeting_key=${meetingKey}`);
      return response.data[0] || null;
    } catch (error) {
      console.error('Failed to fetch F1 meeting:', error);
      return null;
    }
  }

  static async getRaceResults(meetingKey: number): Promise<RaceResult[]> {
    try {
      // Get sessions for the meeting to find the race session
      const sessionsResponse = await axios.get(`${F1_API_BASE}/sessions?meeting_key=${meetingKey}&session_type=Race`);
      const sessions: F1Session[] = sessionsResponse.data;
      
      if (sessions.length === 0) {
        return [];
      }

      // Find the main race session (not sprint)
      const raceSession = sessions.find(s => 
        s.session_name === 'Race' || 
        (s.session_name !== 'Sprint' && s.session_type === 'Race')
      ) || sessions[0];

      // Get final positions for the race
      const positionsResponse = await axios.get(`${F1_API_BASE}/position?session_key=${raceSession.session_key}`);
      const positions: F1Position[] = positionsResponse.data;

      if (positions.length === 0) {
        return [];
      }

      // Get drivers for the session
      const driversResponse = await axios.get(`${F1_API_BASE}/drivers?session_key=${raceSession.session_key}`);
      const drivers: F1Driver[] = driversResponse.data;

      // Get the final positions (latest timestamp for each driver)
      const finalPositions = new Map<number, F1Position>();
      positions.forEach(pos => {
        const existing = finalPositions.get(pos.driver_number);
        if (!existing || new Date(pos.date) > new Date(existing.date)) {
          finalPositions.set(pos.driver_number, pos);
        }
      });

      // Combine position data with driver data
      const results: RaceResult[] = [];
      finalPositions.forEach(pos => {
        const driver = drivers.find(d => d.driver_number === pos.driver_number);
        if (driver) {
          results.push({
            position: pos.position,
            driver_number: pos.driver_number,
            driver_name: driver.broadcast_name || driver.full_name,
            driver_acronym: driver.name_acronym,
            team_name: driver.team_name,
            team_colour: `#${driver.team_colour}`,
          });
        }
      });

      // Sort by position
      return results.sort((a, b) => a.position - b.position);
    } catch (error) {
      console.error('Failed to fetch race results:', error);
      return [];
    }
  }

  static getAvailableYears(): number[] {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2023; year <= currentYear; year++) {
      years.push(year);
    }
    return years.reverse();
  }
}
