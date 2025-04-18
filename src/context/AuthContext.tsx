
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database for demo purposes
const MOCK_USERS: User[] = [
  { id: '1', name: 'Demo User', email: 'demo@example.com' }
];

// Storage key for auth data
const AUTH_STORAGE_KEY = 'auth_user';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuthStatus();
  }, []);

  // Login function - simulated for demo
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, we'll accept any email with "demo@" and password "password"
        if (email.includes('demo@') && password === 'password') {
          const user = {
            id: '1',
            name: 'Demo User',
            email: email
          };
          setUser(user);
          setIsAuthenticated(true);
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
          setIsLoading(false);
          resolve();
        } else {
          setIsLoading(false);
          reject(new Error('Invalid credentials. Try demo@example.com / password'));
        }
      }, 1000);
    });
  };

  // Register function - simulated for demo
  const register = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password && name) {
          // In a real app, we would create a new user here
          // For demo, just simulating success
          setIsLoading(false);
          resolve();
        } else {
          setIsLoading(false);
          reject(new Error('All fields are required'));
        }
      }, 1000);
    });
  };

  // Logout function
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setIsLoading(false);
        resolve();
      }, 500);
    });
  };

  // Context value
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

