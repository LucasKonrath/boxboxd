'use client';

import { useState, useEffect } from 'react';
import { User, Settings, Database } from 'lucide-react';
import { F1User } from '@/types/f1';
import { db } from '@/lib/db';
import { seedDatabase } from '@/lib/seed-data';
import { useTheme } from '@/contexts/ThemeContext';

interface UserProfileProps {
  onUserChange: (user: F1User | null) => void;
}

export function UserProfile({ onUserChange }: UserProfileProps) {
  const { currentTeam } = useTheme();
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
        <div 
          className="rounded-lg shadow-lg p-6 border transition-all duration-300"
          style={{ 
            backgroundColor: currentTeam.surfaceColor,
            borderColor: currentTeam.borderColor
          }}
        >
          <div className="text-center">
            <div 
              className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: currentTeam.mutedColor }}
            >
              <User 
                className="w-6 h-6" 
                style={{ color: currentTeam.textColor }}
              />
            </div>
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ color: currentTeam.textColor }}
            >
              Join BoxBoxd
            </h3>
            <p 
              className="mb-4"
              style={{ color: currentTeam.mutedColor }}
            >
              Create an account to start rating Formula 1 Grand Prix events
            </p>
            
            {!showCreateForm ? (
              <button
                onClick={() => setShowCreateForm(true)}
                className="w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                style={{ 
                  backgroundColor: currentTeam.primaryColor,
                  color: currentTeam.textColor
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = currentTeam.hoverColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = currentTeam.primaryColor;
                }}
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
                  className="w-full p-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: currentTeam.backgroundColor,
                    color: currentTeam.textColor,
                    borderColor: currentTeam.borderColor,
                    border: `1px solid ${currentTeam.borderColor}`,
                    '--tw-ring-color': currentTeam.primaryColor
                  } as React.CSSProperties}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2"
                  style={{ 
                    backgroundColor: currentTeam.backgroundColor,
                    color: currentTeam.textColor,
                    borderColor: currentTeam.borderColor,
                    border: `1px solid ${currentTeam.borderColor}`,
                    '--tw-ring-color': currentTeam.primaryColor
                  } as React.CSSProperties}
                  required
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-lg font-semibold transition-all duration-300"
                    style={{ 
                      backgroundColor: currentTeam.primaryColor,
                      color: currentTeam.textColor
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = currentTeam.hoverColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = currentTeam.primaryColor;
                    }}
                  >
                    Create Account
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 py-2 rounded-lg font-semibold transition-all duration-300"
                    style={{ 
                      backgroundColor: currentTeam.mutedColor,
                      color: currentTeam.backgroundColor
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        
        {/* Demo Data Seeder */}
        <div 
          className="border rounded-lg p-4 transition-all duration-300"
          style={{ 
            backgroundColor: currentTeam.accentColor + '20',
            borderColor: currentTeam.accentColor
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Database 
              className="w-4 h-4" 
              style={{ color: currentTeam.accentColor }}
            />
            <h4 
              className="font-medium"
              style={{ color: currentTeam.textColor }}
            >
              Try Demo Data
            </h4>
          </div>
          <p 
            className="text-sm mb-3"
            style={{ color: currentTeam.mutedColor }}
          >
            Load sample ratings and users to explore the app features
          </p>
          <button
            onClick={handleSeedData}
            className="w-full px-4 py-2 rounded-lg transition-all duration-300 text-sm font-semibold hover:scale-105"
            style={{ 
              backgroundColor: currentTeam.accentColor,
              color: currentTeam.backgroundColor
            }}
          >
            Load Demo Data
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="rounded-lg shadow-lg p-6 border transition-all duration-300"
      style={{ 
        backgroundColor: currentTeam.surfaceColor,
        borderColor: currentTeam.borderColor
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: currentTeam.primaryColor }}
          >
            <User 
              className="w-6 h-6" 
              style={{ color: currentTeam.textColor }}
            />
          </div>
          <div>
            <h3 
              className="font-semibold"
              style={{ color: currentTeam.textColor }}
            >
              {currentUser.username}
            </h3>
            <p 
              className="text-sm"
              style={{ color: currentTeam.mutedColor }}
            >
              {currentUser.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
            style={{ color: currentTeam.mutedColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = currentTeam.primaryColor + '20';
              e.currentTarget.style.color = currentTeam.primaryColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = currentTeam.mutedColor;
            }}
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={handleLogout}
            className="text-sm font-semibold px-3 py-1 rounded-lg transition-all duration-300"
            style={{ 
              color: currentTeam.accentColor,
              backgroundColor: currentTeam.accentColor + '20'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = currentTeam.accentColor;
              e.currentTarget.style.color = currentTeam.backgroundColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = currentTeam.accentColor + '20';
              e.currentTarget.style.color = currentTeam.accentColor;
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
