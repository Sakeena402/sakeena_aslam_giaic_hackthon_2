import { User } from '../types';

// Authentication service for handling JWT tokens and user state
export const authService = {
  // Store JWT token in localStorage
  setToken: (token: string): void => {
    localStorage.setItem('jwt_token', token);
  },

  // Get JWT token from localStorage
  getToken: (): string | null => {
    return localStorage.getItem('jwt_token');
  },

  // Remove JWT token (logout)
  removeToken: (): void => {
    localStorage.removeItem('jwt_token');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('jwt_token');
    return token !== null && token.length > 0;
  },

  // Validate JWT token (basic validation)
  isValidToken: (token?: string): boolean => {
    if (!token) {
      token = localStorage.getItem('jwt_token');
    }

    if (!token) return false;

    try {
      // Basic JWT validation - check if it has 3 parts
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      // Decode payload to check if token has expired
      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      return payload.exp > currentTime;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  },

  // Get current user info from token
  getCurrentUser: (): User | null => {
    const token = localStorage.getItem('jwt_token');

    if (!token || !authService.isValidToken(token)) {
      return null;
    }

    try {
      const parts = token.split('.');
      const payload = JSON.parse(atob(parts[1]));

      return {
        id: payload.userId || payload.sub,
        email: payload.email || '',
        token: token,
        isLoggedIn: true,
      };
    } catch (error) {
      console.error('Error getting user from token:', error);
      return null;
    }
  },

  // Login function (would typically call an API endpoint)
  login: async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
    try {
      // In a real app, this would make an API call to login endpoint
      // For now, we'll simulate by storing a dummy token
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJJZCI6MSwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjk5OTk5OTk5OTl9.3O3zWYq1J9mgZ-LjWiK78UkkUcY7R23fH28vF3s7Y9Y'; // This is a mock token

      authService.setToken(mockToken);

      const user = authService.getCurrentUser();
      if (user) {
        return { success: true, user };
      } else {
        return { success: false, error: 'Unable to create user session' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  },

  // Logout function
  logout: (): void => {
    authService.removeToken();
  },
};