
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null); // Mock JWT

  useEffect(() => {
    const savedUser = localStorage.getItem('meenora_user');
    const savedToken = localStorage.getItem('meenora_token');
    if (savedUser && savedToken) {
      try {
        const parsedUser = JSON.parse(savedUser);
         // Basic token validation (in real app, verify with backend)
        if (parsedUser && savedToken.startsWith('mockJWT_')) {
          setUser(parsedUser);
          setToken(savedToken);
        } else {
          localStorage.removeItem('meenora_user');
          localStorage.removeItem('meenora_token');
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('meenora_user');
        localStorage.removeItem('meenora_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('meenora_user', JSON.stringify(userData));
    localStorage.setItem('meenora_token', userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('meenora_user');
    localStorage.removeItem('meenora_token');
    // Optionally, clear cart and wishlist on logout if they are user-specific server-side
    // For localStorage based cart/wishlist, this might not be necessary or desired
    toast({ title: "Logged out successfully!"});
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Mock signup function
  const signup = (newUserData) => {
    // In a real app, this would involve an API call
    // For mock, we'll just log them in and save to localStorage
    const mockToken = `mockJWT_${Date.now()}`;
    login(newUserData, mockToken);
    // Potentially store user in a mock user list in localStorage if not using a backend
    let users = JSON.parse(localStorage.getItem('meenora_users_list') || '[]');
    users.push(newUserData);
    localStorage.setItem('meenora_users_list', JSON.stringify(users));
    return { success: true, user: newUserData, token: mockToken };
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      signup,
      isAdmin,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
