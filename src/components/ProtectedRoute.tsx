import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // If still checking authentication status, show nothing or a spinner
  if (isLoading) {
    return null; // No need for a spinner here as AuthProvider already shows one
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute; 