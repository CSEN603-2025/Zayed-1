import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ element, allowedUserTypes }) => {
  const { user, userType, isAuthenticated } = useAuth();
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  // If this route requires specific user types and user doesn't have permission
  if (allowedUserTypes && !allowedUserTypes.includes(userType)) {
    // Redirect to the appropriate dashboard based on user type
    switch (userType) {
      case 'student':
      case 'proStudent':
        return <Navigate to="/dashboard" replace />;
      case 'company':
        return <Navigate to="/company/dashboard" replace />;
      case 'scadOffice':
        return <Navigate to="/scad/dashboard" replace />;
      case 'faculty':
        return <Navigate to="/faculty/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }
  
  // User is authenticated and authorized, render the element
  return element;
};

export default ProtectedRoute; 