'use client';

import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTasks } from '../../hooks/useTasks';
import TaskList from '../../components/TaskList';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

export default function DashboardPage() {
  const { user } = useAuth();
  const { tasks, loading, error, toggleTaskCompletion, deleteTask } = useTasks(user?.id || 0);

  // Filter tasks for stats
  const completedTasks = tasks.filter(task => task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed);

  const handleToggleCompletion = async (taskId: number) => {
    await toggleTaskCompletion(taskId);
  };

  const handleDelete = async (taskId: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(taskId);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
            <p className="text-xs text-muted-foreground">All tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks.length}</div>
            <p className="text-xs text-muted-foreground">Finished tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{incompleteTasks.length}</div>
            <p className="text-xs text-muted-foreground">To be completed</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
        <TaskList
          tasks={tasks.slice(0, 5)} // Show only the 5 most recent tasks
          onToggleCompletion={handleToggleCompletion}
          onEdit={() => {}} // Editing will be handled differently on dashboard
          onDelete={handleDelete}
          loading={loading}
          error={error}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <a href="/tasks" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            View All Tasks
          </a>
          <a href="/tasks/new" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
            Create New Task
          </a>
        </div>
      </div>
    </div>
  );
}