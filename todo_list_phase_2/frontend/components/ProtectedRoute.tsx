'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

// Define props interface for ProtectedRoute component
interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// ProtectedRoute component to wrap protected pages
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback = <div className="flex justify-center items-center h-screen">Redirecting...</div>
}) => {
  const router = useRouter();
  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Redirect to login if not authenticated
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  // Show loading state while checking auth status
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show fallback if not authenticated (though this shouldn't happen due to useEffect redirect)
  if (!isAuthenticated) {
    return fallback;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;