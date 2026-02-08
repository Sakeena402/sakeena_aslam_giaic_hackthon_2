import { apiService } from './api';
import { Task, ApiResponse } from '../types';
import { TaskCreationData, TaskUpdateData } from '../types/task';

// Tasks API service for all task-related operations
export const tasksService = {
  // Get all tasks for a user
  getUserTasks: async (userId: number): Promise<ApiResponse<Task[]>> => {
    return apiService.get<Task[]>(`/api/${userId}/tasks`);
  },

  // Get a specific task by ID for a user
  getTaskById: async (userId: number, taskId: number): Promise<ApiResponse<Task>> => {
    return apiService.get<Task>(`/api/${userId}/tasks/${taskId}`);
  },

  // Create a new task for a user
  createTask: async (userId: number, taskData: TaskCreationData): Promise<ApiResponse<Task>> => {
    return apiService.post<Task, TaskCreationData>(`/api/${userId}/tasks`, taskData);
  },

  // Update an existing task
  updateTask: async (userId: number, taskId: number, taskData: TaskUpdateData): Promise<ApiResponse<Task>> => {
    return apiService.put<Task, TaskUpdateData>(`/api/${userId}/tasks/${taskId}`, taskData);
  },

  // Toggle task completion status
  toggleTaskCompletion: async (userId: number, taskId: number, completed: boolean): Promise<ApiResponse<Task>> => {
    return apiService.patch<Task, { completed: boolean }>(`/api/${userId}/tasks/${taskId}/complete`, { completed });
  },

  // Delete a task
  deleteTask: async (userId: number, taskId: number): Promise<ApiResponse<void>> => {
    return apiService.delete<void>(`/api/${userId}/tasks/${taskId}`);
  },
};