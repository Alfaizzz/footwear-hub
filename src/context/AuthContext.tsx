import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, mockLogin, mockSignup, LoginCredentials } from '@/api/mock/mockUsers';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: { email: string; password: string; name: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'footvibe_auth';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load auth from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (savedAuth) {
      try {
        const { user, token } = JSON.parse(savedAuth);
        setUser(user);
        setToken(token);
      } catch (error) {
        console.error('Failed to load auth from storage:', error);
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await mockLogin(credentials);
    setUser(response.user);
    setToken(response.token);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(response));
  };

  const signup = async (data: { email: string; password: string; name: string }) => {
    const response = await mockSignup(data);
    setUser(response.user);
    setToken(response.token);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(response));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
