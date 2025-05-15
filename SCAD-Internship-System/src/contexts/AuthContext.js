import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage, default to null if not found
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Initialize userType from localStorage, default to empty string if not found
  const [userType, setUserType] = useState(() => {
    const savedUserType = localStorage.getItem('userType');
    return savedUserType || '';
  });

  // Computed property to check if user is authenticated
  const isAuthenticated = !!user;

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Login function
  const login = async (email, password, userType) => {
    setLoading(true);
    try {
      setUser({
        id: '123',
        email,
        name: 'Demo User'
      });
      setUserType(userType);
      // Save userType to localStorage
      localStorage.setItem('userType', userType);
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
    isAuthenticated,
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