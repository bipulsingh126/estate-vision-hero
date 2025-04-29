import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  address?: string;
  profileImage?: string;
};

type ProfileUpdateData = {
  name?: string;
  email?: string;
  phone?: string;
  bio?: string;
  address?: string;
  profileImage?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: ProfileUpdateData) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for existing user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, we'll accept any email with a valid password
      // In a real app, this would be an API call to your backend
      if (password.length < 6) {
        toast.error('Invalid credentials');
        return false;
      }
      
      // Mock successful login with simulated delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockUser = {
        id: Math.random().toString(36).substring(2, 9),
        name: email.split('@')[0],
        email
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast.success('Login successful!');
      return true;
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, we'll just validate the inputs
      // In a real app, this would be an API call to your backend
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
      }
      
      // Mock successful registration with simulated delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockUser = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast.success('Registration successful!');
      return true;
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      return false;
    }
  };
  
  const updateProfile = async (data: ProfileUpdateData): Promise<boolean> => {
    try {
      if (!user) {
        toast.error('You must be logged in to update your profile');
        return false;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update the user with new data
      const updatedUser = {
        ...user,
        ...data
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success('Profile updated successfully');
      return true;
    } catch (error) {
      toast.error('Failed to update profile');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      register, 
      logout,
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 