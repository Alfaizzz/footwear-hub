export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@footvibe.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'john@example.com',
    name: 'John Doe',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    createdAt: '2024-06-15T10:30:00Z',
  },
  {
    id: '3',
    email: 'jane@example.com',
    name: 'Jane Smith',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    createdAt: '2024-08-20T14:45:00Z',
  },
];

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const mockLogin = (credentials: LoginCredentials): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Demo credentials
      if (credentials.email === 'admin@footvibe.com' && credentials.password === 'admin123') {
        resolve({
          user: mockUsers[0],
          token: 'mock-admin-jwt-token-' + Date.now(),
        });
      } else if (credentials.email === 'user@footvibe.com' && credentials.password === 'user123') {
        resolve({
          user: mockUsers[1],
          token: 'mock-user-jwt-token-' + Date.now(),
        });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 800);
  });
};

export const mockSignup = (data: { email: string; password: string; name: string }): Promise<AuthResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser: User = {
        id: String(mockUsers.length + 1),
        email: data.email,
        name: data.name,
        role: 'user',
        createdAt: new Date().toISOString(),
      };
      resolve({
        user: newUser,
        token: 'mock-new-user-jwt-token-' + Date.now(),
      });
    }, 800);
  });
};
