'use client';

import { useState, useEffect } from 'react';
import { User, Settings, Database } from 'lucide-react';
import { F1User } from '@/types/f1';
import { db } from '@/lib/db';
import { seedDatabase } from '@/lib/seed-data';

interface UserProfileProps {
  onUserChange: (user: F1User | null) => void;
}

export function UserProfile({ onUserChange }: UserProfileProps) {
  const [currentUser, setCurrentUser] = useState<F1User | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const user = db.getCurrentUser();
    setCurrentUser(user);
    onUserChange(user);
  }, [onUserChange]);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim()) return;

    const newUser = db.createUser(username.trim(), email.trim());
    setCurrentUser(newUser);
    onUserChange(newUser);
    setShowCreateForm(false);
    setUsername('');
    setEmail('');
  };

  const handleSeedData = () => {
    seedDatabase();
    // Refresh the page to show seeded data
    window.location.reload();
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('boxboxd-current-user');
    }
    setCurrentUser(null);
    onUserChange(null);
  };

  if (!currentUser) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Join BoxBoxd</h3>
            <p className="text-gray-600 mb-4">
              Create an account to start rating Formula 1 Grand Prix events
            </p>
            
            {!showCreateForm ? (
              <button
                onClick={() => setShowCreateForm(true)}
                className="w-full bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Create Account
              </button>
            ) : (
              <form onSubmit={handleCreateUser} className="space-y-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Create Account
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        
        {/* Demo Data Seeder */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-blue-600" />
            <h4 className="font-medium text-blue-900">Try Demo Data</h4>
          </div>
          <p className="text-sm text-blue-700 mb-3">
            Load sample ratings and users to explore the app features
          </p>
          <button
            onClick={handleSeedData}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Load Demo Data
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{currentUser.username}</h3>
            <p className="text-sm text-gray-600">{currentUser.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
