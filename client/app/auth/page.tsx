'use client';
import React, { useState, useEffect, JSX } from 'react';
import axios, { AxiosError } from 'axios';

// --- Type Definitions ---
interface User {
  id: number;
  email: string;
  google_id?: string;
}

interface AuthResponse {
    user: User;
    token?: string;
}

// --- Prop Types ---
interface LoggedInViewProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface AuthFormsProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface LoginFormProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface RegisterFormProps {
  setIsLoginView: React.Dispatch<React.SetStateAction<boolean>>;
}


// --- Helper Components ---

// A simple loading spinner component
const Spinner = (): JSX.Element => (
  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
);

// An icon for the Google button
const GoogleIcon = (): JSX.Element => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 9.92C34.553 6.113 29.61 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691c-1.645 3.113-2.606 6.643-2.606 10.309s.961 7.196 2.606 10.309l7.374-5.769C12.593 25.763 12 24.91 12 24s.593-1.763 1.68-2.539l-7.374-5.77z"></path>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-4.82c-2.11 1.434-4.75 2.312-7.219 2.312-4.387 0-8.217-2.54-9.829-6.13l-7.374 5.77c2.998 5.78 9.026 9.73 16.2 9.73z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.16-4.082 5.571l6.19 4.82c3.56-3.273 6.433-8.337 6.189-14.392z"></path>
    </svg>
);


// --- Main Authentication Page Component ---

export default function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await axios.get<User>('/api/auth/profile');
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Spinner />
      </div>
    );
  }

  if (user) {
    return <LoggedInView user={user} setUser={setUser} />;
  }

  return <AuthForms setUser={setUser} />;
}

export async function isLoggedIn(): Promise<() => Promise<boolean>> {
  return async () => {
      try {
        const { data } = await axios.get<User>('/api/auth/profile');
        return true
      } catch (error) {
        return false;
      }
    };
}


// --- View for Logged-In Users ---

const LoggedInView = ({ user, setUser }: LoggedInViewProps): JSX.Element => {
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


// --- View for Login/Register Forms ---

const AuthForms = ({ setUser }: AuthFormsProps): JSX.Element => {
  const [isLoginView, setIsLoginView] = useState<boolean>(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center border-b">
          
          <div className='px-4 py-2 text-lg font-medium text-gray-500'>Sign in to Your Account</div>
        </div>


        <GoogleLoginButton />
      </div>
    </div>
  );
};

const GoogleLoginButton = (): JSX.Element => {
  return (
    <a
      href="/api/auth/google"
      className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <GoogleIcon />
      Continue with Google
    </a>
  );
};
