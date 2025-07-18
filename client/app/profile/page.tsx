import React from 'react'
import axios from 'axios';
import { User } from '../auth/page'; 
// --- Type Definitions ---

interface LoggedInViewProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}


export default function Profile({ user, setUser }: LoggedInViewProps) {
  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Failed to log out', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center">Welcome!</h1>
            <p className="text-center text-lg">You are logged in as:</p>
            <p className="text-center text-xl font-semibold text-indigo-600 break-all">{user.email}</p>
            <button
                onClick={handleLogout}
                className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
            >
                Logout
            </button>
        </div>
    </div>
  );
};
