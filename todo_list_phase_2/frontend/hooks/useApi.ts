import { useState } from 'react';
import { ApiResponse } from '../types';
import { apiService } from '../services/api';

// Generic API hook for common API operations
export const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Generic GET request
  const get = async <T>(url: string, config?: any): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.get<T>(url, config);
      if (!response.success) {
        setError(response.error || 'Request failed');
      }
      return response;
    } catch (err) {
      setError('Network error occurred');
      console.error('API GET error:', err);
      return { success: false, error: 'Network error occurred', statusCode: 500 };
    } finally {
      setLoading(false);
    }
  };

  // Generic POST request
  const post = async <T, D = any>(url: string, data?: D, config?: any): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.post<T, D>(url, data, config);
      if (!response.success) {
        setError(response.error || 'Request failed');
      }
      return response;
    } catch (err) {
      setError('Network error occurred');
      console.error('API POST error:', err);
      return { success: false, error: 'Network error occurred', statusCode: 500 };
    } finally {
      setLoading(false);
    }
  };

  // Generic PUT request
  const put = async <T, D = any>(url: string, data?: D, config?: any): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.put<T, D>(url, data, config);
      if (!response.success) {
        setError(response.error || 'Request failed');
      }
      return response;
    } catch (err) {
      setError('Network error occurred');
      console.error('API PUT error:', err);
      return { success: false, error: 'Network error occurred', statusCode: 500 };
    } finally {
      setLoading(false);
    }
  };

  // Generic PATCH request
  const patch = async <T, D = any>(url: string, data?: D, config?: any): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.patch<T, D>(url, data, config);
      if (!response.success) {
        setError(response.error || 'Request failed');
      }
      return response;
    } catch (err) {
      setError('Network error occurred');
      console.error('API PATCH error:', err);
      return { success: false, error: 'Network error occurred', statusCode: 500 };
    } finally {
      setLoading(false);
    }
  };

  // Generic DELETE request
  const del = async <T>(url: string, config?: any): Promise<ApiResponse<T>> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.delete<T>(url, config);
      if (!response.success) {
        setError(response.error || 'Request failed');
      }
      return response;
    } catch (err) {
      setError('Network error occurred');
      console.error('API DELETE error:', err);
      return { success: false, error: 'Network error occurred', statusCode: 500 };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    get,
    post,
    put,
    patch,
    del,
  };
};