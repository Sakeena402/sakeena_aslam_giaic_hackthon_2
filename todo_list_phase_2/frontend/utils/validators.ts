import { TaskCreationData } from '../types/task';

// Input validation functions for the Todo application

/**
 * Validate task creation data
 */
export const validateTaskCreation = (taskData: TaskCreationData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Validate title
  if (!taskData.title || taskData.title.trim().length === 0) {
    errors.push('Title is required');
  } else if (taskData.title.length > 255) {
    errors.push('Title must be less than 256 characters');
  }

  // Validate description if provided
  if (taskData.description && taskData.description.length > 1000) {
    errors.push('Description must be less than 1001 characters');
  }

  // Validate completed field if provided
  if (taskData.completed !== undefined && typeof taskData.completed !== 'boolean') {
    errors.push('Completion status must be a boolean value');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate task update data
 */
export const validateTaskUpdate = (taskData: Partial<TaskCreationData>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Validate title if provided
  if (taskData.title !== undefined) {
    if (taskData.title.trim().length === 0) {
      errors.push('Title cannot be empty');
    } else if (taskData.title.length > 255) {
      errors.push('Title must be less than 256 characters');
    }
  }

  // Validate description if provided
  if (taskData.description !== undefined && taskData.description !== null && taskData.description.length > 1000) {
    errors.push('Description must be less than 1001 characters');
  }

  // Validate completed field if provided
  if (taskData.completed !== undefined && typeof taskData.completed !== 'boolean') {
    errors.push('Completion status must be a boolean value');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email || email.trim().length === 0) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true };
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): { isValid: boolean; error?: string } => {
  if (!password || password.length === 0) {
    return { isValid: false, error: 'Password is required' };
  }

  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long' };
  }

  // Password should have at least one uppercase, one lowercase, and one number
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);

  if (!hasUpperCase) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }

  if (!hasLowerCase) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }

  if (!hasNumbers) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }

  return { isValid: true };
};

/**
 * Validate user login credentials
 */
export const validateLoginCredentials = (email: string, password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid && emailValidation.error) {
    errors.push(emailValidation.error);
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid && passwordValidation.error) {
    errors.push(passwordValidation.error);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate task ID
 */
export const validateTaskId = (taskId: number): { isValid: boolean; error?: string } => {
  if (typeof taskId !== 'number' || isNaN(taskId) || taskId <= 0) {
    return { isValid: false, error: 'Task ID must be a positive number' };
  }

  return { isValid: true };
};

/**
 * Validate user ID
 */
export const validateUserId = (userId: number): { isValid: boolean; error?: string } => {
  if (typeof userId !== 'number' || isNaN(userId) || userId <= 0) {
    return { isValid: false, error: 'User ID must be a positive number' };
  }

  return { isValid: true };
};

/**
 * Validate a string field (for titles, descriptions, etc.)
 */
export const validateStringField = (
  value: string | null | undefined,
  fieldName: string,
  options: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    patternErrorMessage?: string;
  } = {}
): { isValid: boolean; error?: string } => {
  const { required = true, minLength, maxLength, pattern, patternErrorMessage } = options;

  if (required && (!value || value.trim().length === 0)) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (value && minLength && value.length < minLength) {
    return { isValid: false, error: `${fieldName} must be at least ${minLength} characters` };
  }

  if (value && maxLength && value.length > maxLength) {
    return { isValid: false, error: `${fieldName} must be less than ${maxLength + 1} characters` };
  }

  if (value && pattern && !pattern.test(value)) {
    return { isValid: false, error: patternErrorMessage || `${fieldName} format is invalid` };
  }

  return { isValid: true };
};

/**
 * Validate an array of items
 */
export const validateArray = <T>(
  array: T[] | undefined,
  options: {
    minLength?: number;
    maxLength?: number;
    validateItem?: (item: T) => { isValid: boolean; error?: string };
  } = {}
): { isValid: boolean; errors?: string[] } => {
  if (!array) {
    return { isValid: false, errors: ['Array is required'] };
  }

  const { minLength, maxLength, validateItem } = options;
  const errors: string[] = [];

  if (minLength && array.length < minLength) {
    errors.push(`Array must have at least ${minLength} items`);
  }

  if (maxLength && array.length > maxLength) {
    errors.push(`Array must have no more than ${maxLength} items`);
  }

  if (validateItem) {
    array.forEach((item, index) => {
      const validation = validateItem(item);
      if (!validation.isValid && validation.error) {
        errors.push(`Item at index ${index}: ${validation.error}`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
};

/**
 * Validate a number field
 */
export const validateNumberField = (
  value: number | undefined,
  fieldName: string,
  options: {
    required?: boolean;
    min?: number;
    max?: number;
    integer?: boolean;
  } = {}
): { isValid: boolean; error?: string } => {
  const { required = true, min, max, integer } = options;

  if (required && (value === undefined || value === null)) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (value !== undefined && value !== null) {
    if (typeof value !== 'number') {
      return { isValid: false, error: `${fieldName} must be a number` };
    }

    if (integer && !Number.isInteger(value)) {
      return { isValid: false, error: `${fieldName} must be an integer` };
    }

    if (min !== undefined && value < min) {
      return { isValid: false, error: `${fieldName} must be at least ${min}` };
    }

    if (max !== undefined && value > max) {
      return { isValid: false, error: `${fieldName} must be at most ${max}` };
    }
  }

  return { isValid: true };
};

/**
 * Validate URL format
 */
export const validateUrl = (url: string): { isValid: boolean; error?: string } => {
  if (!url || url.trim().length === 0) {
    return { isValid: false, error: 'URL is required' };
  }

  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Invalid URL format' };
  }
};

/**
 * Validate boolean field
 */
export const validateBoolean = (
  value: boolean | undefined,
  fieldName: string,
  options: { required?: boolean } = {}
): { isValid: boolean; error?: string } => {
  const { required = true } = options;

  if (required && (value === undefined || value === null)) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  if (value !== undefined && value !== null && typeof value !== 'boolean') {
    return { isValid: false, error: `${fieldName} must be a boolean` };
  }

  return { isValid: true };
};