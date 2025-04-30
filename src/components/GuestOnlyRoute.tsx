import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

type GuestOnlyRouteProps = {
  children: React.ReactNode;
};

const GuestOnlyRoute: React.FC<GuestOnlyRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If user is authenticated, redirect to home page
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the children (login/register pages)
  return <>{children}</>;
};

export default GuestOnlyRoute; 