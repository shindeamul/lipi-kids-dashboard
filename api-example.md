# Complete API Documentation with Example Responses

## 🔐 Authentication APIs

### 1. Admin Login
**Endpoint:** `POST /v1/admin/login`

**Request Body:**
```json
{
  "email": "superadmin@lipi.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InN1cGVyYWRtaW4iLCJlbWFpbCI6ImxpcGlzdXBlcmFkbWluQGxpcGkuY29tIiwiaWF0IjoxNzU0NDY0MjkwLCJleHAiOjE3NTUwNjkwOTB9.QP9otM5QbLtd5YgxdC73SRtjGCwMDbTcWdaIqcEogcc",
  "user": {
    "id": 1,
    "username": "superadmin",
    "email": "superadmin@lipi.com",
    "role": "superadmin",
    "school_id": null,
    "first_name": "Abrose",
    "last_name": "kode",
    "avatar_url": null
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email and password are required"
}
```

---

## 🏫 Schools Management APIs

### 2. Get All Schools (SuperAdmin)
**Endpoint:** `GET /v1/schools`

**Query Parameters:**
- `cursor` (optional): For pagination
- `limit` (optional): Number of records (default: 20)
- `search` (optional): Search term for school name or domain
- `filter` (optional): Filter by status (active/inactive)

**Example:** `GET /v1/schools?cursor=eyJpZCI6MTB9&limit=10&search=green&filter=active`

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Greenwood High School",
      "domain": "greenwood.edu",
      "total_students": 1250,
      "admin_name": "John Smith",
      "admin_email": "admin@greenwood.edu",
      "logo_url": "https://example.com/logos/greenwood.png",
      "address": "123 Education St, Learning City, LC 12345",
      "phone": "+1 (555) 123-4567",
      "status": "active",
      "created_at": "2024-01-01T00:00:00Z"
    },
    {
      "id": 2,
      "name": "Riverside Academy",
      "domain": "riverside.edu",
      "total_students": 890,
      "admin_name": "Sarah Johnson",
      "admin_email": "admin@riverside.edu",
      "logo_url": "https://example.com/logos/riverside.png",
      "address": "456 Knowledge Ave, Study Town, ST 67890",
      "phone": "+1 (555) 987-6543",
      "status": "active",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "next_cursor": "eyJpZCI6MjB9",
    "has_more": true,
    "total_count": 45
  }
}
```

### 3. Get School by ID
**Endpoint:** `GET /v1/schools/{id}`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Greenwood High School",
    "domain": "greenwood.edu",
    "total_students": 1250,
    "admin_name": "John Smith",
    "admin_email": "admin@greenwood.edu",
    "logo_url": "https://example.com/logos/greenwood.png",
    "address": "123 Education St, Learning City, LC 12345",
    "phone": "+1 (555) 123-4567",
    "status": "active",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "School not found"
}
```

### 4. Add New School
**Endpoint:** `POST /v1/schools`

**Request Body:**
```json
{
  "name": "New Academy",
  "domain": "newacademy.edu",
  "admin_name": "Jane Doe",
  "admin_email": "admin@newacademy.edu",
  "address": "789 Learning Blvd, Education City, EC 13579",
  "phone": "+1 (555) 456-7890"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "School created successfully",
  "data": {
    "id": 3,
    "name": "New Academy",
    "domain": "newacademy.edu",
    "total_students": 0,
    "admin_name": "Jane Doe",
    "admin_email": "admin@newacademy.edu",
    "logo_url": null,
    "address": "789 Learning Blvd, Education City, EC 13579",
    "phone": "+1 (555) 456-7890",
    "status": "active",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "School with this domain already exists"
}
```

### 5. Update School
**Endpoint:** `PUT /v1/schools/{id}`

**Request Body:**
```json
{
  "name": "Updated School Name",
  "admin_name": "Updated Admin Name",
  "phone": "+1 (555) 999-8888"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "School updated successfully",
  "data": {
    "id": 1,
    "name": "Updated School Name",
    "domain": "greenwood.edu",
    "total_students": 1250,
    "admin_name": "Updated Admin Name",
    "admin_email": "admin@greenwood.edu",
    "logo_url": "https://example.com/logos/greenwood.png",
    "address": "123 Education St, Learning City, LC 12345",
    "phone": "+1 (555) 999-8888",
    "status": "active",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### 6. Delete School
**Endpoint:** `DELETE /v1/schools/{id}`

**Success Response (200):**
```json
{
  "success": true,
  "message": "School deleted successfully"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Cannot delete school with active students"
}
```

---

## 📚 Categories Management APIs

### 7. Get All Global Categories (Reference)
**Endpoint:** `GET /v1/learn/category-game/categories`

**Success Response (200):**
```json
{
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
        "is_completed": false
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
        "play_mode": false,
        "allowed_lang": ["en", "te", "hi", "kn"],
        "is_completed": false
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
        "play_mode": true,
        "allowed_lang": ["en", "te", "hi", "kn", "gu"],
        "is_completed": false
      }
    ]
  }
}
```

### 8. Get School-Specific Category Settings
**Endpoint:** `GET /v1/schools/{school_id}/categories`

**Success Response (200):**
```json
{
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
        "is_completed": false
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
        "is_enabled": false,
        "allowed_lang": ["en", "te", "hi", "kn"],
        "is_completed": false
      }
    ]
  }
}
```

### 9. Update Single Category Setting for School
**Endpoint:** `PUT /v1/schools/{school_id}/categories/{category_id}`

**Request Body:**
```json
{
  "school_id": 1,
  "category_id": 20,
  "is_enabled": true
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Category setting updated successfully",
  "data": {
    "school_id": 1,
    "category_id": 20,
    "is_enabled": true,
    "updated_at": "2025-01-15T10:30:00.000Z"
  }
}
```

### 10. Batch Update Category Settings for School
**Endpoint:** `PUT /v1/schools/{school_id}/categories/batch-update`

**Request Body:**
```json
{
  "school_id": 1,
  "settings": [
    {
      "category_id": 20,
      "is_enabled": true
    },
    {
      "category_id": 21,
      "is_enabled": false
    },
    {
      "category_id": 22,
      "is_enabled": true
    }
  ]
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Category settings updated successfully",
  "data": {
    "school_id": 1,
    "updated_count": 3,
    "settings": [
      {
        "category_id": 20,
        "is_enabled": true,
        "updated_at": "2025-01-15T10:30:00.000Z"
      },
      {
        "category_id": 21,
        "is_enabled": false,
        "updated_at": "2025-01-15T10:30:00.000Z"
      },
      {
        "category_id": 22,
        "is_enabled": true,
        "updated_at": "2025-01-15T10:30:00.000Z"
      }
    ]
  }
}
```

---

## 👨‍🎓 Students Management APIs

### 9. Get All Students (School Admin)
**Endpoint:** `GET /v1/students`

**Query Parameters:**
- `cursor` (optional): For pagination
- `limit` (optional): Number of records (default: 20)
- `search` (optional): Search term for student name, email, or ID
- `filter` (optional): Filter by level or status

**Example:** `GET /v1/students?cursor=eyJpZCI6NTB9&limit=15&search=alice`

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Alice Johnson",
      "email": "alice.johnson@student.com",
      "student_id": "STU001",
      "school_id": 1,
      "created_at": "2024-01-10T00:00:00Z",
      "avatar_url": "https://example.com/avatars/alice.jpg",
      "total_words_learned": 1250,
      "level": 5
    },
    {
      "id": 2,
      "name": "Benjamin Chen",
      "email": "benjamin.chen@student.com",
      "student_id": "STU002",
      "school_id": 1,
      "created_at": "2024-01-12T00:00:00Z",
      "avatar_url": "https://example.com/avatars/benjamin.jpg",
      "total_words_learned": 1180,
      "level": 4
    }
  ],
  "pagination": {
    "next_cursor": "eyJpZCI6MTB9",
    "has_more": true,
    "total_count": 1250
  }
}
```

### 10. Add Single Student
**Endpoint:** `POST /v1/students`

**Request Body:**
```json
{
  "name": "Emma Wilson",
  "email": "emma.wilson@student.com",
  "student_id": "STU003"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Student added successfully",
  "data": {
    "id": 3,
    "name": "Emma Wilson",
    "email": "emma.wilson@student.com",
    "student_id": "STU003",
    "school_id": 1,
    "created_at": "2024-01-15T10:30:00Z",
    "avatar_url": null,
    "total_words_learned": 0,
    "level": 1
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Student with this email already exists"
}
```

### 11. Bulk Import Students
**Endpoint:** `POST /v1/students/import`

**Request:** Multipart form data with file upload

**Success Response (200):**
```json
{
  "success": true,
  "message": "Students imported successfully",
  "data": {
    "imported_count": 25,
    "failed_count": 2,
    "failed_records": [
      {
        "row": 3,
        "name": "Invalid Student",
        "email": "invalid-email",
        "error": "Invalid email format"
      },
      {
        "row": 7,
        "name": "Duplicate Student",
        "email": "existing@student.com",
        "error": "Student with this email already exists"
      }
    ]
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Invalid file format. Please upload Excel or CSV file."
}
```

### 12. Update Student
**Endpoint:** `PUT /v1/students/{id}`

**Request Body:**
```json
{
  "name": "Updated Student Name",
  "email": "updated.email@student.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Student updated successfully",
  "data": {
    "id": 1,
    "name": "Updated Student Name",
    "email": "updated.email@student.com",
    "student_id": "STU001",
    "school_id": 1,
    "created_at": "2024-01-10T00:00:00Z",
    "avatar_url": "https://example.com/avatars/alice.jpg",
    "total_words_learned": 1250,
    "level": 5
  }
}
```

### 13. Delete Student
**Endpoint:** `DELETE /v1/students/{id}`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Student deleted successfully"
}
```

---

## 🏆 Leaderboard APIs

### 14. Get School Leaderboard
**Endpoint:** `GET /v1/leaderboard/school`

**Query Parameters:**
- `type`: "all_time" | "weekly" | "daily"
- `limit` (optional): Number of records (default: 10)

**Example:** `GET /v1/leaderboard/school?type=weekly&limit=10`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "type": "weekly",
    "scope": "school",
    "school_name": "Greenwood High School",
    "last_updated": "2024-01-15T10:30:00Z",
    "leaderboard": [
      {
        "rank": 1,
        "student_id": "STU001",
        "student_name": "Alice Johnson",
        "student_group": "Advanced A",
        "date": "2024-01-15",
        "words_learned": 280,
        "cumulative_total": 1250,
        "avatar_url": "https://example.com/avatars/alice.jpg"
      },
      {
        "rank": 2,
        "student_id": "STU002",
        "student_name": "Benjamin Chen",
        "student_group": "Advanced B",
        "date": "2024-01-15",
        "words_learned": 265,
        "cumulative_total": 1180,
        "avatar_url": "https://example.com/avatars/benjamin.jpg"
      }
    ]
  }
}
```

### 15. Get Global Leaderboard
**Endpoint:** `GET /v1/leaderboard/global`

**Query Parameters:**
- `type`: "all_time" | "weekly" | "daily"
- `limit` (optional): Number of records (default: 10)

**Example:** `GET /v1/leaderboard/global?type=all_time&limit=10`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "type": "all_time",
    "scope": "global",
    "last_updated": "2024-01-15T10:30:00Z",
    "leaderboard": [
      {
        "rank": 1,
        "student_id": "STU001",
        "student_name": "Alice Johnson",
        "student_group": "Advanced A",
        "school_name": "Greenwood High School",
        "school_logo": "https://example.com/logos/greenwood.png",
        "date": "2024-01-15",
        "words_learned": 1250,
        "cumulative_total": 1250,
        "avatar_url": "https://example.com/avatars/alice.jpg"
      },
      {
        "rank": 2,
        "student_id": "STU015",
        "student_name": "Michael Zhang",
        "student_group": "Advanced A",
        "school_name": "Riverside Academy",
        "school_logo": "https://example.com/logos/riverside.png",
        "date": "2024-01-15",
        "words_learned": 1230,
        "cumulative_total": 1230,
        "avatar_url": "https://example.com/avatars/michael.jpg"
      }
    ]
  }
}
```

---

## 📊 Dashboard Statistics APIs

### 16. Get SuperAdmin Dashboard Stats
**Endpoint:** `GET /v1/admin/dashboard/stats`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "total_schools": 45,
    "total_students": 12500,
    "active_schools": 42,
    "total_words_learned": 2500000,
    "monthly_growth": {
      "schools": 5,
      "students": 250
    },
    "recent_activities": [
      {
        "type": "school_added",
        "message": "New school 'Sunshine Academy' was added",
        "timestamp": "2024-01-15T09:30:00Z"
      },
      {
        "type": "milestone",
        "message": "Total students reached 12,500",
        "timestamp": "2024-01-15T08:15:00Z"
      }
    ]
  }
}
```

### 17. Get School Admin Dashboard Stats
**Endpoint:** `GET /v1/admin/school/dashboard/stats`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "total_students": 1250,
    "enabled_categories": 8,
    "total_words_learned": 125000,
    "average_level": 3.2,
    "top_performers": [
      {
        "student_name": "Alice Johnson",
        "words_learned": 1250,
        "level": 5,
        "avatar_url": "https://example.com/avatars/alice.jpg"
      }
    ],
    "category_progress": [
      {
        "category_name": "Alphabets",
        "completion_rate": 85.5
      }
    ]
  }
}
```

---

## 🔒 Authentication Headers

All authenticated API calls should include:

```
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

---

## 📝 Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "error_code": "SPECIFIC_ERROR_CODE",
  "details": {
    "field": "Specific field error message"
  }
}
```

**Common Error Codes:**
- `UNAUTHORIZED` (401): Invalid or expired token
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `VALIDATION_ERROR` (400): Invalid input data
- `DUPLICATE_ENTRY` (409): Resource already exists
- `SERVER_ERROR` (500): Internal server error

---

## 🔄 Pagination Format

All paginated endpoints use cursor-based pagination:

**Request Parameters:**
- `cursor`: Base64 encoded cursor for next page
- `limit`: Number of records (max 100, default 20)

**Response Format:**
```json
{
  "pagination": {
    "next_cursor": "eyJpZCI6MjB9",
    "has_more": true,
    "total_count": 1250
  }
}
```

---

## 📤 File Upload Format

For file uploads (student import), use multipart/form-data:

```
Content-Type: multipart/form-data

file: [Excel/CSV file]
```

**Supported File Formats:**
- `.xlsx` (Excel)
- `.xls` (Excel Legacy)
- `.csv` (Comma Separated Values)

**Expected CSV/Excel Format:**
```
Name,Email,Student ID
Alice Johnson,alice@student.com,STU001
Benjamin Chen,benjamin@student.com,STU002
```