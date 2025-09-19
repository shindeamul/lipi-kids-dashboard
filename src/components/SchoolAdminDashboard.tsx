import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Student } from '../types/school';
import { Category, TransformedCategory } from '../types/api';
import { categoriesAPI, studentsAPI } from '../services/api';
import { Users, BookOpen, TrendingUp, Settings, Plus, Search, Edit, Trash2 } from 'lucide-react';
import * as Switch from '@radix-ui/react-switch';
import AddStudentModal from './AddStudentModal';

const SchoolAdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<TransformedCategory[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'categories' | 'students'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === 'categories' || activeTab === 'overview') {
          setCategoriesLoading(true);
          // Get school-specific category settings
          const schoolId = parseInt(user?.schoolId || '1'); // Get from user context
          const categoriesResponse = await categoriesAPI.getSchoolCategories(schoolId);
          if (categoriesResponse.success) {
            // Transform API response to our Category type
            const transformedCategories = categoriesResponse.data.categories.map(cat => ({
              id: cat.id.toString(),
              name: {
                en: cat.en_name,
                hi: cat.hi_name || '',
                te: cat.te_name || '',
              },
              icon: '📚', // Default icon, you can map specific icons
              image: cat.image_url,
              enabled: cat.is_enabled,
              description: `Learn ${cat.en_name.toLowerCase()}`,
              totalWords: 100, // This should come from API
            }));
            setCategories(transformedCategories);
          }
          setCategoriesLoading(false);
        }
        
        if (activeTab === 'students' || activeTab === 'overview') {
          setStudentsLoading(true);
          const studentsResponse = await studentsAPI.getStudents({ search: searchTerm });
          if (studentsResponse.success) {
            // Transform API response to our Student type
            const transformedStudents = studentsResponse.data.map(student => ({
              id: student.id.toString(),
              name: student.name,
              email: student.email,
              schoolId: student.school_id.toString(),
              studentId: student.student_id,
              dateAdded: student.created_at,
              avatar: student.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random`,
              totalWordsLearned: student.total_words_learned,
              level: student.level,
              progress: {}, // This should come from API
            }));
            setStudents(transformedStudents);
          }
          setStudentsLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.schoolId, activeTab, searchTerm]);

  const handleCategoryToggle = (categoryId: string, enabled: boolean) => {
    setCategories(prev => 
      prev.map(cat => 
        cat.id === categoryId ? { ...cat, enabled } : cat
      )
    );
  };

  const handleSaveCategories = async () => {
    setSaveLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Get school ID from user context
      const schoolId = parseInt(user?.schoolId || '1');
      
      // Prepare batch update data
      const settings = categories.map(category => ({
        category_id: parseInt(category.id),
        is_enabled: category.enabled
      }));
      
      // Save all category changes in batch
      await categoriesAPI.batchUpdateSchoolCategorySettings(schoolId, settings);
      setSuccess('Categories updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error('Failed to update categories:', error);
      setError('Failed to save changes. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const enabledCategories = categories.filter(cat => cat.enabled);
  const totalWordsLearned = students.reduce((sum, student) => sum + student.totalWordsLearned, 0);

  if (loading && categories.length === 0 && students.length === 0) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Add Student Modal */}
      <AddStudentModal
        isOpen={showAddStudentModal}
        onClose={() => setShowAddStudentModal(false)}
        onStudentAdded={() => {
          // Refresh students data
          if (activeTab === 'students' || activeTab === 'overview') {
            setActiveTab('students'); // This will trigger useEffect to refetch
          }
        }}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{user?.schoolName}</h1>
          <p className="text-gray-600 mt-1">School Administration Dashboard</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 ${
              activeTab === 'overview' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' 
                : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 hover:from-purple-200 hover:to-pink-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 ${
              activeTab === 'categories' 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
                : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 hover:from-green-200 hover:to-emerald-200'
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 ${
              activeTab === 'students' 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
                : 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 hover:from-orange-200 hover:to-red-200'
            }`}
          >
            Students
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 text-sm">
              {success}
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg border border-blue-200 p-6 transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-3xl font-bold text-gray-900">{students.length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg border border-green-200 p-6 transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Enabled Categories</p>
                  <p className="text-3xl font-bold text-gray-900">{enabledCategories.length}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg border border-purple-200 p-6 transform hover:scale-105 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Words Learned</p>
                  <p className="text-3xl font-bold text-gray-900">{totalWordsLearned.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Student Activity</h2>
            {studentsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
            <div className="space-y-4">
              {students.slice(0, 5).map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg hover:from-blue-50 hover:to-cyan-50 transition-all">
                  <div className="flex items-center space-x-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">Level {student.level}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{student.totalWordsLearned} words</p>
                    <p className="text-sm text-gray-500">Total learned</p>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        </>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            {/* Error/Success Messages */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 text-sm">
                {success}
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Manage Categories</h2>
              <button 
                onClick={handleSaveCategories}
                disabled={saveLoading}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saveLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
            <p className="text-gray-600 mt-1">Enable or disable learning categories for your students</p>
          </div>

          <div className="p-6">
            {categoriesLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div key={category.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all transform hover:scale-105 bg-gradient-to-br from-white to-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{category.icon}</div>
                      <div>
                        <h3 className="font-medium text-gray-900">{category.name.en}</h3>
                        <p className="text-sm text-gray-500">{category.name.hi} • {category.name.te}</p>
                      </div>
                    </div>
                    <Switch.Root
                      checked={category.enabled}
                      onCheckedChange={(checked) => handleCategoryToggle(category.id, checked)}
                      className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-blue-500 transition-all shadow-inner"
                    >
                      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px] shadow-md" />
                    </Switch.Root>
                  </div>
                  <img
                    src={category.image}
                    alt={category.name.en}
                    className="w-full h-32 object-cover rounded-lg mb-3 shadow-md"
                  />
                  <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                  <p className="text-sm font-medium text-gray-900">{category.totalWords} words</p>
                </div>
              ))}
            </div>
            )}
          </div>
        </div>
      )}

      {/* Students Tab */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            {/* Error/Success Messages */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 text-sm">
                {success}
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
              <h2 className="text-xl font-semibold text-gray-900">Manage Students</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                  />
                </div>
                <button 
                  onClick={() => setShowAddStudentModal(true)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Student</span>
                </button>
              </div>
            </div>
          </div>

          {studentsLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student ID
                  </th>
                  <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="hidden lg:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Words Learned
                  </th>
                  <th className="hidden xl:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Added
                  </th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3 flex-shrink-0 border-2 border-white shadow-md"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="sm:hidden text-xs text-gray-500">{student.studentId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.studentId}</div>
                    </td>
                    <td className="hidden md:table-cell px-3 sm:px-6 py-4">
                      <div className="text-sm text-gray-900 break-all">{student.email}</div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800">
                        Level {student.level}
                      </span>
                      <div className="lg:hidden mt-1 text-xs text-gray-500">
                        {student.totalWordsLearned} words
                      </div>
                    </td>
                    <td className="hidden lg:table-cell px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.totalWordsLearned}</div>
                    </td>
                    <td className="hidden xl:table-cell px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(student.dateAdded).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-cyan-600 hover:text-cyan-900 p-1 hover:bg-cyan-50 rounded transition-all">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SchoolAdminDashboard;