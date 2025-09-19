import {
    LoginRequest,
    LoginResponse,
    CategoriesResponse,
    PaginatedResponse,
    Student,
    School,
    PaginationParams,
    SchoolCategorySettingsResponse
} from '../types/api';

// const API_BASE_URL = 'https://api.kids.lipi.game/v1';
const API_BASE_URL = 'http://localhost:8080/v1';
const MOCK_API = true;

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

// Generic API call function with error handling
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

// const apiCall = async <T>(
//   endpoint: string,
//   options: RequestInit = {}
// ): Promise<T> => {
//   try {
//     const method = (options.method || 'GET').toUpperCase();

//     // Only add headers if method is not GET
//     const headers = method === 'GET'
//       ? options.headers || {}
//       : {
//           ...createHeaders(),
//           ...options.headers,
//         };

//     const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//       ...options,
//       headers,
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(`API call failed for ${endpoint}:`, error);
//     throw error;
//   }
// };


// Auth API calls
export const authAPI = {
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {


        if (MOCK_API) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            if (credentials.email === 'lipisuperadmin@lipi.com') {
                return {
                    success: true,
                    message: "Login successful",
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InN1cGVyYWRtaW4iLCJlbWFpbCI6ImxpcGlzdXBlcmFkbWluQGxpcGkuY29tIiwiaWF0IjoxNzU0NDY0MjkwLCJleHAiOjE3NTUwNjkwOTB9.QP9otM5QbLtd5YgxdC73SRtjGCwMDbTcWdaIqcEogcc",
                    user: {
                        id: 1,
                        username: "lipisuperadmin",
                        email: "lipisuperadmin@lipi.com",
                        role: "superadmin",
                        school_id: null,
                        first_name: "Lipi",
                        last_name: "Kid",
                        avatar_url: null,
                    },
                };

            } else {
                return {
                    success: true,
                    message: "Login successful",
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsInJvbGUiOiJzY2hvb2xhZG1pbiIsImVtYWlsIjoic2Nob29sYWRtaW4xQGV4YW1wbGUuY29tIiwiaWF0IjoxNzU0NTQ4NTI5LCJleHAiOjE3NTUxNTMzMjl9.oqXq4qiTPV0LAN6IoXlPrXpCYOB9vEvKWVEBR61jUuo",
                    user: {
                        id: 1,
                        username: "schooladmin1",
                        email: "schooladmin1@example.com",
                        role: "schooladmin",
                        school_id: 1,
                        first_name: "School",
                        last_name: "Admin",
                        avatar_url: null,
                    },
                };
            }

        }


        return apiCall<LoginResponse>('/admin/login', {
            method: 'POST',
            headers: createHeaders(true),
            body: JSON.stringify(credentials),
        });
    },
};

// Categories API calls
export const categoriesAPI = {
    getAllCategories: async (): Promise<CategoriesResponse> => {
        return apiCall<CategoriesResponse>('/learn/category-game/categories');
    },

    // Get school-specific category settings
    getSchoolCategories: async (schoolId: number): Promise<SchoolCategorySettingsResponse> => {
                if (MOCK_API) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            return {
                "success": true,
                "data": {
                    "categories": [
                        {
                            "id": 20,
                            "en_name": "Alphabets",
                            "te_name": "ఆంగ్ల అక్షరాలు",
                            "hi_name": "वर्णमाला",
                            "kn_name": "ಅಕ್ಷರಗಳು",
                            "gu_name": "અક્ષરો",
                            "image_url": "https://example.com/main_categories/alphabets.jpg",
                            "created_at": "2025-01-15T06:34:16.910Z",
                            "updated_at": "2025-01-15T06:34:16.910Z",
                            "sort_order": 1,
                            "play_mode": true,
                            "is_enabled": true,
                            "allowed_lang": ["en", "te", "hi"],
                        },
                        {
                            "id": 21,
                            "en_name": "Numbers",
                            "te_name": "సంఖ్యలు",
                            "hi_name": "संख्या",
                            "kn_name": "ಸಂಖ್ಯೆಗಳು",
                            "gu_name": "સંખ્યાઓ",
                            "image_url": "https://example.com/main_categories/numbers.jpg",
                            "created_at": "2025-01-15T06:35:16.910Z",
                            "updated_at": "2025-01-15T06:35:16.910Z",
                            "sort_order": 2,
                            "play_mode": true,
                            "is_enabled": true,
                            "allowed_lang": ["en", "te", "hi", "kn"],
                        },
                        {
                            "id": 22,
                            "en_name": "Animals",
                            "te_name": "జంతువులు",
                            "hi_name": "जानवर",
                            "kn_name": "ಪ್ರಾಣಿಗಳು",
                            "gu_name": "પ્રાણીઓ",
                            "image_url": "https://example.com/main_categories/animals.jpg",
                            "created_at": "2025-01-15T06:36:16.910Z",
                            "updated_at": "2025-01-15T06:36:16.910Z",
                            "sort_order": 3,
                            "play_mode": true,
                            "is_enabled": true,
                            "allowed_lang": ["en", "te", "hi", "kn", "gu"],
                        }
                    ]
                }
            }
        }
        return apiCall<SchoolCategorySettingsResponse>(`/schools/${schoolId}/categories`);
    },

    // Update single category setting for a school
    updateSchoolCategorySetting: async (
        schoolId: number,
        categoryId: number,
        isEnabled: boolean
    ): Promise<any> => {
        return apiCall(`/schools/${schoolId}/categories/${categoryId}`, {
            method: 'PUT',
            body: JSON.stringify({
                school_id: schoolId,
                category_id: categoryId,
                is_enabled: isEnabled
            }),
        });
    },

    // Batch update multiple category settings for a school
    batchUpdateSchoolCategorySettings: async (
        schoolId: number,
        settings: { category_id: number; is_enabled: boolean }[]
    ): Promise<any> => {
        return apiCall(`/schools/${schoolId}/categories/batch-update`, {
            method: 'PUT',
            body: JSON.stringify({
                school_id: schoolId,
                settings: settings
            }),
        });
    },

    // updateCategory: async (categoryId: number, playMode: boolean): Promise<any> => {
    //     return apiCall(`/learn/category-game/categories/${categoryId}`, {
    //         method: 'PUT',
    //         body: JSON.stringify({ play_mode: playMode }),
    //     });
    // },
};

// Students API calls
export const studentsAPI = {
    getStudents: async (params: PaginationParams = {}): Promise<PaginatedResponse<Student>> => {
        const queryParams = new URLSearchParams();
        if (params.cursor) queryParams.append('cursor', params.cursor);
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.search) queryParams.append('search', params.search);
        if (params.filter) queryParams.append('filter', params.filter);

        const endpoint = `/students${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        return apiCall<PaginatedResponse<Student>>(endpoint);
    },

    addStudent: async (studentData: Partial<Student>): Promise<any> => {
        return apiCall('/students', {
            method: 'POST',
            body: JSON.stringify(studentData),
        });
    },

    updateStudent: async (studentId: number, studentData: Partial<Student>): Promise<any> => {
        return apiCall(`/students/${studentId}`, {
            method: 'PUT',
            body: JSON.stringify(studentData),
        });
    },

    deleteStudent: async (studentId: number): Promise<any> => {
        return apiCall(`/students/${studentId}`, {
            method: 'DELETE',
        });
    },

    importStudents: async (file: File): Promise<any> => {
        const formData = new FormData();
        formData.append('file', file);

        return fetch(`${API_BASE_URL}/students/import`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
            },
            body: formData,
        }).then(res => res.json());
    },
};

// Schools API calls
export const schoolsAPI = {
    getSchools: async (params: PaginationParams = {}): Promise<PaginatedResponse<School>> => {
        const queryParams = new URLSearchParams();
        if (params.cursor) queryParams.append('cursor', params.cursor);
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.search) queryParams.append('search', params.search);
        if (params.filter) queryParams.append('filter', params.filter);

        const endpoint = `/schools${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;


        if (MOCK_API) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            return {
                "success": true,
                "data": [
                    {
                        "id": 1,
                        "name": "Greenwood High School",
                        "domain": "greenwood.edu",
                        "logo_url": "https://example.com/logos/greenwood.png",
                        "address": "123 Green St, Bangalore",
                        "phone": "9876543210",
                        "status": "active",
                        "total_students": 1023,
                        "admin_name": "Priya Sharma",
                        "admin_email": "admin@greenwood.edu",
                        "created_at": "2025-08-06T10:30:54.929Z"
                    },
                    {
                        "id": 2,
                        "name": "Sunrise Public School",
                        "domain": "sunrise.edu",
                        "logo_url": "https://example.com/logos/sunrise.png",
                        "address": "456 Sunrise Ave, Hyderabad",
                        "phone": "9123456780",
                        "status": "active",
                        "total_students": 1023,
                        "admin_name": "Priya Sharma",
                        "admin_email": "admin@greenwood.edu",
                        "created_at": "2025-08-06T10:30:54.929Z"
                    }
                ],
                pagination: {
                    "next_cursor": "",
                    "has_more": false,
                    "total_count": 0
                }
            }
        }
        return apiCall<PaginatedResponse<School>>(endpoint);
    },

    addSchool: async (schoolData: Partial<School>): Promise<any> => {
        return apiCall('/schools', {
            method: 'POST',
            body: JSON.stringify(schoolData),
        });
    },

    updateSchool: async (schoolId: number, schoolData: Partial<School>): Promise<any> => {
        return apiCall(`/schools/${schoolId}`, {
            method: 'PUT',
            body: JSON.stringify(schoolData),
        });
    },

    deleteSchool: async (schoolId: number): Promise<any> => {
        return apiCall(`/schools/${schoolId}`, {
            method: 'DELETE',
        });
    },

    getSchoolById: async (schoolId: number): Promise<School> => {
        return apiCall<{ success: boolean; data: School }>(`/schools/${schoolId}`)
            .then(response => response.data);
    },
};