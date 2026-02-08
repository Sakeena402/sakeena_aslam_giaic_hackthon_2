'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import './globals.css';
import { Inter } from 'next/font/google';
import { motion } from 'framer-motion';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100`}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <motion.main
            className="flex-grow container mx-auto px-4 py-8 max-w-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.main>
          <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200/60 mt-auto py-6">
            <div className="container mx-auto px-4 text-center text-sm text-gray-600">
              © {new Date().getFullYear()} TaskFlow. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}