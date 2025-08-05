export interface User {
  id: string;
  email: string;
  username: string;
  role: 'superadmin' | 'schooladmin';
  schoolId?: string;
  schoolName?: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}