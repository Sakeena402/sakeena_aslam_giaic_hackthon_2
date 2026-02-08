// Application constants for the Todo application

export const APP_CONSTANTS = {
  // API endpoints
  API_ENDPOINTS: {
    BASE: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
    TASKS: '/api/{userId}/tasks',
    TASK_BY_ID: '/api/{userId}/tasks/{taskId}',
    TASK_COMPLETION: '/api/{userId}/tasks/{taskId}/complete',
  },

  // Storage keys
  STORAGE_KEYS: {
    JWT_TOKEN: 'jwt_token',
    USER_PREFERENCES: 'user_preferences',
    THEME: 'theme_preference',
  },

  // Error messages
  ERROR_MESSAGES: {
    NETWORK_ERROR: 'Network error occurred. Please check your connection.',
    AUTH_ERROR: 'Authentication failed. Please log in again.',
    VALIDATION_ERROR: 'Invalid input provided.',
    SERVER_ERROR: 'Server error occurred. Please try again later.',
    NOT_FOUND_ERROR: 'Requested resource not found.',
  },

  // Success messages
  SUCCESS_MESSAGES: {
    TASK_CREATED: 'Task created successfully.',
    TASK_UPDATED: 'Task updated successfully.',
    TASK_DELETED: 'Task deleted successfully.',
    LOGIN_SUCCESS: 'Login successful.',
    LOGOUT_SUCCESS: 'Logged out successfully.',
  },

  // Validation rules
  VALIDATION: {
    MAX_TITLE_LENGTH: 255,
    MAX_DESCRIPTION_LENGTH: 1000,
    MIN_PASSWORD_LENGTH: 8,
  },

  // UI constants
  UI: {
    LOADING_DELAY_MS: 300, // Delay before showing loading spinner
    TOAST_DURATION: 3000, // Duration for toast notifications in ms
    DEBOUNCE_DELAY: 300, // Debounce delay for search inputs
  },

  // Theme options
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
  },
} as const;

// Export individual constants for convenience
export const {
  API_ENDPOINTS,
  STORAGE_KEYS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  VALIDATION,
  UI,
  THEMES,
} = APP_CONSTANTS;