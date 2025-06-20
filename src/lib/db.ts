import { F1Rating, F1User } from '@/types/f1';

// In a real app, this would connect to a database
class LocalStorageDB {
  private getRatings(): F1Rating[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('boxboxd-ratings');
    return stored ? JSON.parse(stored) : [];
  }

  private saveRatings(ratings: F1Rating[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('boxboxd-ratings', JSON.stringify(ratings));
  }

  private getUsers(): F1User[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('boxboxd-users');
    return stored ? JSON.parse(stored) : [];
  }

  private saveUsers(users: F1User[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('boxboxd-users', JSON.stringify(users));
  }

  getCurrentUser(): F1User | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('boxboxd-current-user');
    return stored ? JSON.parse(stored) : null;
  }

  setCurrentUser(user: F1User): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('boxboxd-current-user', JSON.stringify(user));
  }

  createUser(username: string, email: string): F1User {
    const users = this.getUsers();
    const newUser: F1User = {
      id: Date.now().toString(),
      username,
      email,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    this.saveUsers(users);
    this.setCurrentUser(newUser);
    return newUser;
  }

  getRating(meetingKey: number, userId: string): F1Rating | null {
    const ratings = this.getRatings();
    return ratings.find(r => r.meetingKey === meetingKey && r.userId === userId) || null;
  }

  saveRating(meetingKey: number, userId: string, rating: number, review?: string): F1Rating {
    const ratings = this.getRatings();
    const existingIndex = ratings.findIndex(r => r.meetingKey === meetingKey && r.userId === userId);
    
    const ratingData: F1Rating = {
      id: existingIndex >= 0 ? ratings[existingIndex].id : Date.now().toString(),
      meetingKey,
      userId,
      rating,
      review,
      createdAt: existingIndex >= 0 ? ratings[existingIndex].createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      ratings[existingIndex] = ratingData;
    } else {
      ratings.push(ratingData);
    }

    this.saveRatings(ratings);
    return ratingData;
  }

  getMeetingStats(meetingKey: number): { averageRating: number; totalRatings: number } {
    const ratings = this.getRatings().filter(r => r.meetingKey === meetingKey);
    const totalRatings = ratings.length;
    const averageRating = totalRatings > 0 
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings 
      : 0;
    
    return { averageRating, totalRatings };
  }

  getAllRatings(): F1Rating[] {
    return this.getRatings();
  }
}

export const db = new LocalStorageDB();
