import { Task } from '../types';

// Helper functions for the Todo application

/**
 * Format date to a readable string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format date for display (just date without time)
 */
export const formatDateOnly = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Capitalize the first letter of a string
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Generate a unique ID
 */
export const generateId = (): number => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

/**
 * Check if a task is overdue
 */
export const isOverdue = (dateString: string): boolean => {
  const date = new Date(dateString);
  const now = new Date();
  return date < now;
};

/**
 * Filter tasks by completion status
 */
export const filterTasksByStatus = (tasks: Task[], completed: boolean): Task[] => {
  return tasks.filter(task => task.completed === completed);
};

/**
 * Filter tasks by search term
 */
export const filterTasksBySearch = (tasks: Task[], searchTerm: string): Task[] => {
  if (!searchTerm) return tasks;
  const lowerSearchTerm = searchTerm.toLowerCase();
  return tasks.filter(task =>
    task.title.toLowerCase().includes(lowerSearchTerm) ||
    (task.description && task.description.toLowerCase().includes(lowerSearchTerm))
  );
};

/**
 * Sort tasks by date (newest first)
 */
export const sortTasksByDate = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

/**
 * Sort tasks alphabetically
 */
export const sortTasksAlphabetically = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
};

/**
 * Group tasks by date
 */
export const groupTasksByDate = (tasks: Task[]): { [key: string]: Task[] } => {
  const groups: { [key: string]: Task[] } = {};

  tasks.forEach(task => {
    const date = new Date(task.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(task);
  });

  return groups;
};

/**
 * Format task count for display
 */
export const formatTaskCount = (count: number): string => {
  if (count === 0) return 'No tasks';
  if (count === 1) return '1 task';
  return `${count} tasks`;
};

/**
 * Get initials from a name or email
 */
export const getInitials = (name: string): string => {
  if (!name) return '';
  const names = name.trim().split(' ');
  if (names.length === 0) return '';
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Sanitize HTML to prevent XSS
 */
export const sanitizeHtml = (html: string): string => {
  // Simple HTML sanitization - in production, use a library like DOMPurify
  const temp = document.createElement('div');
  temp.textContent = html;
  return temp.innerHTML;
};

/**
 * Debounce function to limit the rate at which a function can fire
 */
export const debounce = <T extends (...args: any[]) => any>(func: T, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>): ReturnType<T> | undefined => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Deep clone an object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if objects are equal (shallow comparison)
 */
export const shallowEqual = (objA: any, objB: any): boolean => {
  if (objA === objB) return true;

  if (!objA || !objB || typeof objA !== 'object' || typeof objB !== 'object') {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (objA[key] !== objB[key]) return false;
  }

  return true;
};