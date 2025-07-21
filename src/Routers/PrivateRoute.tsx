import React from 'react';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hook/useAuth';

interface PrivateRouteProps {
  children: ReactNode;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth) {
    // Optionally, you can render a fallback or redirect
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }

  const { user, loading } = auth;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="w-12 h-12 border-4 border-purple-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (user && user.email) {
    return <>{children}</>;
  }

  return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
};


export default PrivateRoute;
