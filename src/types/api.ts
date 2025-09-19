

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  token?: string;
  user?: any;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: 'superadmin' | 'schooladmin';
    school_id: number | null;
    first_name: string;
    last_name: string;
    avatar_url: string | null;
  };
}

export interface TransformedCategory {
  id: string;
  name: { en: string; hi: string; te: string };
  icon: string;
  image: string;
  enabled: boolean;
  description: string;
  totalWords: number;
}

export interface Category {
  id: number;
  en_name: string;
  te_name: string;
  hi_name: string | null;
  kn_name: string | null;
  gu_name: string | null;
  image_url: string;
  created_at: string;
  updated_at: string;
  sort_order: number;
  play_mode: boolean;
  is_enabled: boolean;
  allowed_lang: string[];
}

export interface CategoriesResponse {
  success: boolean;
  data: {
    categories: Category[];
  };
}

export interface SchoolCategorySettingsResponse {
  success: boolean;
  data: {
    categories: Category[];
  };
}

export interface UpdateCategorySettingRequest {
  school_id: number;
  category_id: number;
  is_enabled: boolean;
}

export interface BatchUpdateCategorySettingsRequest {
  school_id: number;
  settings: {
    category_id: number;
    is_enabled: boolean;
  }[];
}
export interface Student {
  id: number;
  name: string;
  email: string;
  student_id: string;
  school_id: number;
  created_at: string;
  avatar_url?: string;
  total_words_learned: number;
  level: number;
}

export interface School {
  id: number;
  name: string;
  domain: string;
  total_students: number;
  admin_name: string;
  admin_email: string;
  logo_url?: string;
  address: string;
  phone: string;
  status: 'active' | 'inactive';
  created_at: string;
}

export interface PaginationParams {
  cursor?: string;
  limit?: number;
  search?: string;
  filter?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    next_cursor?: string;
    has_more: boolean;
    total_count: number;
  };
}