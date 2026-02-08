'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { CheckCircle2, PlusCircle, Calendar, User, Home, CheckSquare, LogIn } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-full">
              <CheckSquare className="h-8 w-8 text-white" />
            </div>
          </div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Streamline Your Tasks
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            A modern, intuitive todo application designed to boost your productivity and help you achieve your goals.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link href="/tasks">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <CheckSquare className="mr-2 h-5 w-5" />
                View My Tasks
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg rounded-full border-2 border-gray-300 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300">
                <LogIn className="mr-2 h-5 w-5" />
                Log In
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Task Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Create, organize, and track your tasks with our intuitive interface.
                  Mark tasks as complete and stay on top of your goals.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Organize & Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Plan your days, weeks, and months ahead. Set deadlines and reminders
                  to ensure nothing falls through the cracks.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center mb-4">
                  <User className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your data is encrypted and securely stored. We respect your privacy
                  and ensure your tasks remain confidential.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold">10K+</div>
            <div className="text-indigo-200">Tasks Completed</div>
          </div>
          <div className="bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold">5K+</div>
            <div className="text-indigo-200">Active Users</div>
          </div>
          <div className="bg-gradient-to-r from-indigo-300 to-purple-400 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold">99%</div>
            <div className="text-indigo-200">Uptime</div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <Card className="border-0 shadow-xl bg-gradient-to-r from-gray-900 to-indigo-900 text-white overflow-hidden">
            <CardContent className="py-12 px-6">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Productivity?</h2>
              <p className="text-indigo-200 mb-8 max-w-2xl mx-auto">
                Join thousands of users who have transformed the way they work with our task management platform.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/register">
                  <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/tasks">
                  <Button variant="secondary" size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full transition-all duration-300">
                    View Demo
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}