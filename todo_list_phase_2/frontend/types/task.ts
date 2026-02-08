// Task-specific TypeScript types for the Todo application

import { Task } from './index';

export interface TaskFormData {
  title: string;
  description: string | null;
  completed: boolean;
}

export interface TaskUpdateData extends Partial<TaskFormData> {}

export interface TaskCreationData {
  title: string;
  description?: string | null;
  completed?: boolean;
}