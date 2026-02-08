// Common TypeScript types for the Todo application

export interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  userId: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface User {
  id: number;
  email: string;
  token: string;
  isLoggedIn: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string | null;
  statusCode: number;
}

export interface ApiError {
  error: string;
  statusCode: number;
}