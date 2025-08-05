export interface School {
  id: string;
  name: string;
  domain: string;
  totalStudents: number;
  adminId: string;
  adminName: string;
  adminEmail: string;
  logo?: string;
  address: string;
  phone: string;
  status: 'active' | 'inactive';
  createdAt: string;
  categories: string[];
}

export interface Category {
  id: string;
  name: {
    en: string;
    hi: string;
    te: string;
  };
  icon: string;
  image?: string;
  enabled: boolean;
  description: string;
  totalWords: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  schoolId: string;
  studentId: string;
  dateAdded: string;
  avatar?: string;
  totalWordsLearned: number;
  level: number;
  progress: {
    [categoryId: string]: {
      wordsLearned: number;
      totalWords: number;
      completed: boolean;
    };
  };
}