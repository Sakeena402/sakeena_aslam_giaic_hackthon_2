import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse, ApiError } from '../types';

// Create the base axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  timeout: 10000,
});

// Request interceptor to add JWT token to all requests
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses globally
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Return response data if successful
    return response;
  },
  (error) => {
    // Handle errors globally
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;

// Generic API service functions
export const apiService = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.get<T>(url, config);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'An error occurred',
        statusCode: error.response?.status || 500,
      };
    }
  },

  post: async <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.post<T, AxiosResponse<T>, D>(url, data, config);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'An error occurred',
        statusCode: error.response?.status || 500,
      };
    }
  },

  put: async <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.put<T, AxiosResponse<T>, D>(url, data, config);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'An error occurred',
        statusCode: error.response?.status || 500,
      };
    }
  },

  patch: async <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.patch<T, AxiosResponse<T>, D>(url, data, config);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'An error occurred',
        statusCode: error.response?.status || 500,
      };
    }
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.delete<T>(url, config);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'An error occurred',
        statusCode: error.response?.status || 500,
      };
    }
  },
};