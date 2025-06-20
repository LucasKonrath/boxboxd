import axios from 'axios';
import { F1Meeting } from '@/types/f1';

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

  static getAvailableYears(): number[] {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2023; year <= currentYear; year++) {
      years.push(year);
    }
    return years.reverse();
  }
}
