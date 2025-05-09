import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, hasRole, loading } = useAuth();
  const location = useLocation();
  
  // If still loading auth state, show nothing or a loader
  if (loading) {
    return <div>Loading...</div>;
  }
  
  // If not authenticated, redirect to login page
  if (!isAuthenticated()) {
    // Save the location the user was trying to access for redirecting after login
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  // If roles are specified, check if user has the required role
  if (roles && !hasRole(roles)) {
    // If user doesn't have the required role, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }
  
  // If authenticated and has the required role, render the protected component
  return children;
};

export default ProtectedRoute; 