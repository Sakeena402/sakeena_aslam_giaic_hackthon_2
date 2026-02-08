import { useState, useEffect } from 'react';
import { User } from '../types';
import { authService } from '../services/auth';

// Custom hook for authentication state management
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is authenticated on initial load
    const checkAuthStatus = () => {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    checkAuthStatus();

    // Listen for storage changes (in case of logout from another tab)
    const handleStorageChange = () => {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, this would make an API call to login endpoint
      // For now, we'll simulate by storing a dummy token
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJJZCI6MSwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjk5OTk5OTk5OTl9.3O3zWYq1J9mgZ-LjWiK78UkkUcY7R23fH28vF3s7Y9Y'; // This is a mock token

      authService.setToken(mockToken);

      const currentUser = authService.getCurrentUser();
      setUser(currentUser);

      return { success: true, user: currentUser };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  };
};