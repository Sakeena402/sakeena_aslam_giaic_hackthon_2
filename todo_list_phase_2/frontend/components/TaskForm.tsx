'use client';

import React, { useState, useEffect } from 'react';
import { Task, TaskCreationData } from '../types';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { validateTaskCreation, validateTaskUpdate } from '../utils/validators';

// Define props interface for TaskForm component
interface TaskFormProps {
  task?: Task | null;
  onSubmit: (taskData: TaskCreationData) => void;
  onCancel: () => void;
  loading?: boolean;
}

// TaskForm component for creating and editing tasks
const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel, loading = false }) => {
  const isEditing = !!task;

  const [formData, setFormData] = useState<TaskCreationData>({
    title: task?.title || '',
    description: task?.description || '',
    completed: task?.completed || false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data when task prop changes
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        completed: task.completed
      });
    } else {
      setFormData({
        title: '',
        description: '',
        completed: false
      });
    }
  }, [task]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: val
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof typeof errors];
        return newErrors;
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    let validation;
    if (isEditing) {
      validation = validateTaskUpdate(formData);
    } else {
      validation = validateTaskCreation(formData);
    }

    if (!validation.isValid) {
      const newErrors: Record<string, string> = {};
      validation.errors.forEach(error => {
        // Extract field name from error message
        if (error.includes('Title')) newErrors.title = error;
        else if (error.includes('Description')) newErrors.description = error;
        else if (error.includes('Completion')) newErrors.completed = error;
        else newErrors.form = error;
      });
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      setErrors({ form: 'An error occurred while submitting the task' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          label="Title"
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          placeholder="Task title"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 ${
            errors.description ? 'border-red-500 focus-visible:ring-red-500' : ''
          }`}
          placeholder="Task description (optional)"
        />
        {errors.description && (
          <p className="text-xs text-red-500 font-medium mt-1">{errors.description}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={formData.completed}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="completed" className="text-sm font-medium text-gray-700">
          Mark as completed
        </label>
      </div>

      {errors.form && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{errors.form}</span>
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || loading}
        >
          {isSubmitting || loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isEditing ? 'Updating...' : 'Creating...'}
            </span>
          ) : (
            isEditing ? 'Update Task' : 'Create Task'
          )}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;