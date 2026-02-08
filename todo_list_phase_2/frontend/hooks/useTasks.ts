import { useState, useEffect } from 'react';
import { Task } from '../types';
import { tasksService } from '../services/tasks';

// Custom hook for task data management
export const useTasks = (userId: number) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load tasks for the user
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await tasksService.getUserTasks(userId);
        if (response.success) {
          setTasks(response.data || []);
        } else {
          setError(response.error || 'Failed to fetch tasks');
        }
      } catch (err) {
        setError('Network error occurred while fetching tasks');
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  // Create a new task
  const createTask = async (taskData: { title: string; description?: string; completed?: boolean }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await tasksService.createTask(userId, {
        title: taskData.title,
        description: taskData.description || null,
        completed: taskData.completed || false
      });

      if (response.success && response.data) {
        setTasks(prev => [...prev, response.data]);
        return { success: true, task: response.data };
      } else {
        setError(response.error || 'Failed to create task');
        return { success: false, error: response.error || 'Failed to create task' };
      }
    } catch (err) {
      setError('Network error occurred while creating task');
      console.error('Error creating task:', err);
      return { success: false, error: 'Network error occurred while creating task' };
    } finally {
      setLoading(false);
    }
  };

  // Update an existing task
  const updateTask = async (taskId: number, taskData: Partial<Task>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await tasksService.updateTask(userId, taskId, taskData);

      if (response.success && response.data) {
        setTasks(prev => prev.map(task => task.id === taskId ? response.data! : task));
        return { success: true, task: response.data };
      } else {
        setError(response.error || 'Failed to update task');
        return { success: false, error: response.error || 'Failed to update task' };
      }
    } catch (err) {
      setError('Network error occurred while updating task');
      console.error('Error updating task:', err);
      return { success: false, error: 'Network error occurred while updating task' };
    } finally {
      setLoading(false);
    }
  };

  // Toggle task completion status
  const toggleTaskCompletion = async (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
      setError('Task not found');
      return { success: false, error: 'Task not found' };
    }

    setLoading(true);
    setError(null);

    try {
      const response = await tasksService.toggleTaskCompletion(userId, taskId, !task.completed);

      if (response.success && response.data) {
        setTasks(prev => prev.map(t => t.id === taskId ? response.data! : t));
        return { success: true, task: response.data };
      } else {
        setError(response.error || 'Failed to update task completion');
        return { success: false, error: response.error || 'Failed to update task completion' };
      }
    } catch (err) {
      setError('Network error occurred while updating task completion');
      console.error('Error updating task completion:', err);
      return { success: false, error: 'Network error occurred while updating task completion' };
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (taskId: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await tasksService.deleteTask(userId, taskId);

      if (response.success) {
        setTasks(prev => prev.filter(task => task.id !== taskId));
        return { success: true };
      } else {
        setError(response.error || 'Failed to delete task');
        return { success: false, error: response.error || 'Failed to delete task' };
      }
    } catch (err) {
      setError('Network error occurred while deleting task');
      console.error('Error deleting task:', err);
      return { success: false, error: 'Network error occurred while deleting task' };
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    toggleTaskCompletion,
    deleteTask,
  };
};