import { User, LoginCredentials } from '../types/auth';

const mockUsers: User[] = [
  {
    id: 'super-1',
    email: 'super@admin.com',
    username: 'superadmin',
    role: 'superadmin',
    firstName: 'Super',
    lastName: 'Admin',
    avatar: 'https://i.pravatar.cc/150?img=1',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T10:30:00Z'
  },
  {
    id: 'school-1',
    email: 'admin@greenwood.edu',
    username: 'greenwood_admin',
    role: 'schooladmin',
    schoolId: 'school-1',
    schoolName: 'Greenwood High School',
    firstName: 'John',
    lastName: 'Smith',
    avatar: 'https://i.pravatar.cc/150?img=2',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T09:15:00Z'
  },
  {
    id: 'school-2',
    email: 'admin@riverside.edu',
    username: 'riverside_admin',
    role: 'schooladmin',
    schoolId: 'school-2',
    schoolName: 'Riverside Academy',
    firstName: 'Sarah',
    lastName: 'Johnson',
    avatar: 'https://i.pravatar.cc/150?img=3',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T08:45:00Z'
  }
];

export const mockAuthAPI = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => 
      u.email === credentials.email || u.username === credentials.email
    );
    
    if (!user) {
      throw new Error('Invalid email or username');
    }
    
    // In a real app, you'd verify the password hash
    if (credentials.password !== 'password123') {
      throw new Error('Invalid password');
    }
    
    return {
      ...user,
      lastLogin: new Date().toISOString()
    };
  }
};