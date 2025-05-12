import React, { createContext, useContext, useState } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Initialize userType from localStorage, default to empty string if not found
  const [userType, setUserType] = useState(() => {
    const savedUserType = localStorage.getItem('userType');
    return savedUserType || '';
  });

  // Login function
  const login = async (email, password, userType) => {
    setLoading(true);
    try {
      // In a real app, this would call an authentication API
      // For this demo, we'll just simulate a successful login
      setTimeout(() => {
        setUser({
          id: '123',
          email,
          name: 'Demo User'
        });
        setUserType(userType);
        // Save userType to localStorage
        localStorage.setItem('userType', userType);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Login failed');
      setLoading(false);
      throw new Error('Login failed');
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setUserType('');
    // Remove userType from localStorage on logout
    localStorage.removeItem('userType');
  };

  // Value object that will be passed to consumers
  const value = {
    user,
    userType,
    loading,
    error,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 