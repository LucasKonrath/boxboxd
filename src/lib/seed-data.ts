import { db } from '@/lib/db';
import { F1User } from '@/types/f1';

// Sample data to demonstrate the app functionality
export const seedData = {
  users: [
    {
      id: 'demo-user-1',
      username: 'F1Fan2024',
      email: 'f1fan@example.com',
      createdAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 'demo-user-2', 
      username: 'RacingEnthusiast',
      email: 'racing@example.com',
      createdAt: '2024-01-15T00:00:00Z',
    }
  ] as F1User[],
  
  ratings: [
    // Bahrain GP 2024 ratings
    {
      id: 'rating-1',
      meetingKey: 1217, // 2024 Bahrain GP
      userId: 'demo-user-1',
      rating: 4,
      review: 'Great season opener! The battle between Verstappen and the field was intense throughout the race.',
      createdAt: '2024-03-03T00:00:00Z',
      updatedAt: '2024-03-03T00:00:00Z',
    },
    {
      id: 'rating-2',
      meetingKey: 1217,
      userId: 'demo-user-2', 
      rating: 5,
      review: 'Absolutely incredible racing! The strategy battles and close wheel-to-wheel action made this a classic.',
      createdAt: '2024-03-03T00:00:00Z',
      updatedAt: '2024-03-03T00:00:00Z',
    },
    // Saudi Arabian GP 2024 ratings
    {
      id: 'rating-3',
      meetingKey: 1218,
      userId: 'demo-user-1',
      rating: 3,
      review: 'Decent race but the street circuit felt a bit processional at times. Good for qualifying though.',
      createdAt: '2024-03-10T00:00:00Z',
      updatedAt: '2024-03-10T00:00:00Z',
    }
  ]
};

export function seedDatabase() {
  if (typeof window === 'undefined') return;
  
  // Check if already seeded
  const existingRatings = db.getAllRatings();
  if (existingRatings.length > 0) return;
  
  // Seed users
  seedData.users.forEach(user => {
    const users = JSON.parse(localStorage.getItem('boxboxd-users') || '[]');
    if (!users.find((u: F1User) => u.id === user.id)) {
      users.push(user);
      localStorage.setItem('boxboxd-users', JSON.stringify(users));
    }
  });
  
  // Seed ratings
  localStorage.setItem('boxboxd-ratings', JSON.stringify(seedData.ratings));
  
  console.log('Demo data seeded successfully!');
}
