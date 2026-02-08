'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Task } from '../types';
import { Button } from './ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { formatDate } from '../utils/helpers';
import { Check, Edit3, Trash2, Calendar, User } from 'lucide-react';

// Define props interface for TaskCard component
interface TaskCardProps {
  task: Task;
  onToggleCompletion: (taskId: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

// TaskCard component to display individual tasks
const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleCompletion, onEdit, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`
        group relative overflow-hidden transition-all duration-300 hover:shadow-lg
        ${task.completed
          ? 'bg-gradient-to-r from-green-50/50 to-emerald-50/30 border border-green-200/70'
          : 'bg-gradient-to-r from-white to-gray-50/80 border border-gray-200/50'
        }
      `}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

        <CardHeader className="relative z-10 pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 mr-4">
              <CardTitle className={`
                text-lg font-semibold break-words leading-tight
                ${task.completed
                  ? 'line-through text-gray-500/80'
                  : 'text-gray-800'
                }
              `}>
                {task.title}
              </CardTitle>
              {task.description && (
                <p className={`
                  mt-2 text-sm break-words leading-relaxed
                  ${task.completed
                    ? 'text-gray-400/70 italic'
                    : 'text-gray-600'
                  }
                `}>
                  {task.description}
                </p>
              )}
            </div>

            <Button
              variant={task.completed ? 'outline' : 'default'}
              size="sm"
              onClick={() => onToggleCompletion(task.id)}
              className={`
                relative z-10 flex-shrink-0 transition-all duration-200
                ${task.completed
                  ? 'border-green-300/80 text-green-700 hover:bg-green-50/80'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg'
                }
              `}
              aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {task.completed ? (
                <span className="flex items-center">
                  <Check className="h-4 w-4 mr-1.5" />
                  <span className="hidden sm:inline">Undo</span>
                </span>
              ) : (
                <span className="flex items-center">
                  <Check className="h-4 w-4 mr-1.5" />
                  <span className="hidden sm:inline">Complete</span>
                </span>
              )}
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
            <div className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
              <span>Created: {formatDate(task.createdAt)}</span>
            </div>
            {task.updatedAt !== task.createdAt && (
              <div className="flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                <span>Updated: {formatDate(task.updatedAt)}</span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardFooter className="relative z-10 flex justify-end gap-2 pt-2 border-t border-gray-100/60 bg-white/30">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(task)}
            className="flex items-center gap-1.5 transition-colors duration-200"
          >
            <Edit3 className="h-4 w-4" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(task.id)}
            className="flex items-center gap-1.5 transition-colors duration-200"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default TaskCard;