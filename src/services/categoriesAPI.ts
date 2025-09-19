import { 
  GameCategory, 
  CategoryItem, 
  ItemDetail, 
  CreateCategoryRequest, 
  CreateItemRequest, 
  CreateItemDetailRequest,
  BulkImportResponse 
} from '../types/categories';
import { PaginatedResponse, PaginationParams } from '../types/api';

const API_BASE_URL = 'http://localhost:8080/v1';

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Create headers with auth token
const createHeaders = (includeAuth = true): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

// Generic API call function
const apiCall = async <T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...createHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
};

// Categories API
export const categoriesManagementAPI = {
  // Categories CRUD
  getCategories: async (params: PaginationParams = {}): Promise<PaginatedResponse<GameCategory>> => {
    const queryParams = new URLSearchParams();
    if (params.cursor) queryParams.append('cursor', params.cursor);
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    
    const endpoint = `/admin/categories${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiCall<PaginatedResponse<GameCategory>>(endpoint);
  },

  createCategory: async (categoryData: CreateCategoryRequest): Promise<{ success: boolean; data: GameCategory }> => {
    return apiCall('/admin/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  },

  updateCategory: async (categoryId: number, categoryData: Partial<CreateCategoryRequest>): Promise<{ success: boolean; data: GameCategory }> => {
    return apiCall(`/admin/categories/${categoryId}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    });
  },

  deleteCategory: async (categoryId: number): Promise<{ success: boolean; message: string }> => {
    return apiCall(`/admin/categories/${categoryId}`, {
      method: 'DELETE',
    });
  },

  bulkImportCategories: async (file: File): Promise<BulkImportResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    return fetch(`${API_BASE_URL}/admin/categories/bulk-import`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: formData,
    }).then(res => res.json());
  },

  // Items CRUD
  getCategoryItems: async (categoryId: number, params: PaginationParams = {}): Promise<PaginatedResponse<CategoryItem>> => {
    const queryParams = new URLSearchParams();
    if (params.cursor) queryParams.append('cursor', params.cursor);
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    
    const endpoint = `/admin/categories/${categoryId}/items${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiCall<PaginatedResponse<CategoryItem>>(endpoint);
  },

  createItem: async (itemData: CreateItemRequest): Promise<{ success: boolean; data: CategoryItem }> => {
    return apiCall('/admin/category-items', {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
  },

  updateItem: async (itemId: number, itemData: Partial<CreateItemRequest>): Promise<{ success: boolean; data: CategoryItem }> => {
    return apiCall(`/admin/category-items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify(itemData),
    });
  },

  deleteItem: async (itemId: number): Promise<{ success: boolean; message: string }> => {
    return apiCall(`/admin/category-items/${itemId}`, {
      method: 'DELETE',
    });
  },

  bulkImportItems: async (categoryId: number, file: File): Promise<BulkImportResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category_id', categoryId.toString());
    
    return fetch(`${API_BASE_URL}/admin/categories/${categoryId}/items/bulk-import`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: formData,
    }).then(res => res.json());
  },

  // Item Details CRUD
  getItemDetails: async (itemId: number): Promise<{ success: boolean; data: ItemDetail }> => {
    return apiCall(`/admin/category-items/${itemId}/details`);
  },

  createOrUpdateItemDetails: async (detailData: CreateItemDetailRequest): Promise<{ success: boolean; data: ItemDetail }> => {
    return apiCall(`/admin/category-items/${detailData.item_id}/details`, {
      method: 'PUT',
      body: JSON.stringify(detailData),
    });
  },

  deleteItemDetails: async (itemId: number): Promise<{ success: boolean; message: string }> => {
    return apiCall(`/admin/category-items/${itemId}/details`, {
      method: 'DELETE',
    });
  },

  bulkImportItemDetails: async (file: File): Promise<BulkImportResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    return fetch(`${API_BASE_URL}/admin/category-items/details/bulk-import`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: formData,
    }).then(res => res.json());
  },
};