import { School, Category, Student } from '../types/school';

export const mockSchools: School[] = [
  {
    id: 'school-1',
    name: 'Greenwood High School',
    domain: 'greenwood.edu',
    totalStudents: 1250,
    adminId: 'school-1',
    adminName: 'John Smith',
    adminEmail: 'admin@greenwood.edu',
    logo: 'https://i.pravatar.cc/150?img=10',
    address: '123 Education St, Learning City, LC 12345',
    phone: '+1 (555) 123-4567',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    categories: ['cat-1', 'cat-2', 'cat-3', 'cat-4']
  },
  {
    id: 'school-2',
    name: 'Riverside Academy',
    domain: 'riverside.edu',
    totalStudents: 890,
    adminId: 'school-2',
    adminName: 'Sarah Johnson',
    adminEmail: 'admin@riverside.edu',
    logo: 'https://i.pravatar.cc/150?img=11',
    address: '456 Knowledge Ave, Study Town, ST 67890',
    phone: '+1 (555) 987-6543',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    categories: ['cat-1', 'cat-2', 'cat-5']
  },
  {
    id: 'school-3',
    name: 'Oakwood Elementary',
    domain: 'oakwood.edu',
    totalStudents: 650,
    adminId: 'school-3',
    adminName: 'Michael Brown',
    adminEmail: 'admin@oakwood.edu',
    logo: 'https://i.pravatar.cc/150?img=12',
    address: '789 Wisdom Blvd, Education City, EC 13579',
    phone: '+1 (555) 456-7890',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    categories: ['cat-1', 'cat-3', 'cat-4']
  }
];

export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    name: {
      en: 'Animals',
      hi: 'जानवर',
      te: 'జంతువులు'
    },
    icon: '🐾',
    image: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=300',
    enabled: true,
    description: 'Learn about different animals and their characteristics',
    totalWords: 150
  },
  {
    id: 'cat-2',
    name: {
      en: 'Colors',
      hi: 'रंग',
      te: 'రంగులు'
    },
    icon: '🎨',
    image: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=300',
    enabled: true,
    description: 'Discover the world of colors and their names',
    totalWords: 50
  },
  {
    id: 'cat-3',
    name: {
      en: 'Numbers',
      hi: 'संख्या',
      te: 'సంఖ్యలు'
    },
    icon: '🔢',
    image: 'https://images.pexels.com/photos/1314543/pexels-photo-1314543.jpeg?auto=compress&cs=tinysrgb&w=300',
    enabled: true,
    description: 'Learn numbers and basic counting',
    totalWords: 100
  },
  {
    id: 'cat-4',
    name: {
      en: 'Fruits',
      hi: 'फल',
      te: 'పండ్లు'
    },
    icon: '🍎',
    image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=300',
    enabled: false,
    description: 'Explore different types of fruits',
    totalWords: 80
  },
  {
    id: 'cat-5',
    name: {
      en: 'Vehicles',
      hi: 'वाहन',
      te: 'వాహనాలు'
    },
    icon: '🚗',
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=300',
    enabled: true,
    description: 'Learn about different modes of transportation',
    totalWords: 120
  }
];

export const mockStudents: Student[] = [
  {
    id: 'student-1',
    name: 'Alice Johnson',
    email: 'alice.johnson@student.com',
    schoolId: 'school-1',
    studentId: 'STU001',
    dateAdded: '2024-01-10T00:00:00Z',
    avatar: 'https://i.pravatar.cc/150?img=20',
    totalWordsLearned: 1250,
    level: 5,
    progress: {
      'cat-1': { wordsLearned: 150, totalWords: 150, completed: true },
      'cat-2': { wordsLearned: 50, totalWords: 50, completed: true },
      'cat-3': { wordsLearned: 85, totalWords: 100, completed: false }
    }
  },
  {
    id: 'student-2',
    name: 'Benjamin Chen',
    email: 'benjamin.chen@student.com',
    schoolId: 'school-1',
    studentId: 'STU002',
    dateAdded: '2024-01-12T00:00:00Z',
    avatar: 'https://i.pravatar.cc/150?img=21',
    totalWordsLearned: 1180,
    level: 4,
    progress: {
      'cat-1': { wordsLearned: 140, totalWords: 150, completed: false },
      'cat-2': { wordsLearned: 50, totalWords: 50, completed: true },
      'cat-3': { wordsLearned: 75, totalWords: 100, completed: false }
    }
  }
];

export const mockSchoolAPI = {
  getSchools: async (): Promise<School[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockSchools;
  },
  
  getSchoolById: async (id: string): Promise<School | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockSchools.find(school => school.id === id) || null;
  },
  
  getCategories: async (): Promise<Category[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCategories;
  },
  
  getStudents: async (schoolId: string): Promise<Student[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockStudents.filter(student => student.schoolId === schoolId);
  },
  
  updateCategory: async (categoryId: string, enabled: boolean): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const category = mockCategories.find(cat => cat.id === categoryId);
    if (category) {
      category.enabled = enabled;
    }
  }
};