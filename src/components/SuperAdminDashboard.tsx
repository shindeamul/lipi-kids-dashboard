import React, { useState, useEffect } from 'react';
import { School } from '../types/api';
import { schoolsAPI } from '../services/api';
import { Plus, Edit, Trash2, Users, Building, Search, Filter, BookOpen } from 'lucide-react';
import AddSchoolModal from './AddSchoolModal';
import SchoolDetailsModal from './SchoolDetailsModal';

const SuperAdminDashboard: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddSchoolModal, setShowAddSchoolModal] = useState(false);
  const [showSchoolDetailsModal, setShowSchoolDetailsModal] = useState(false);
  const [selectedSchoolId, setSelectedSchoolId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await schoolsAPI.getSchools({ search: searchTerm });
        if (response.success) {
          setSchools(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch schools:', error);
        setError('Failed to load schools. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, [searchTerm]);

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStudents = schools.reduce((sum, school) => sum + (school.total_students || 0), 0);

  const handleSchoolClick = (schoolId: number) => {
    setSelectedSchoolId(schoolId);
    setShowSchoolDetailsModal(true);
  };

  const handleEditSchool = (e: React.MouseEvent, schoolId: number) => {
    e.stopPropagation();
    setSelectedSchoolId(schoolId);
    setShowSchoolDetailsModal(true);
  };

  const handleDeleteSchool = async (e: React.MouseEvent, schoolId: number) => {
    e.stopPropagation();
    const school = schools.find(s => s.id === schoolId);
    if (!school) return;
    
    const confirmed = window.confirm(`Are you sure you want to delete ${school.name}? This action cannot be undone.`);
    if (!confirmed) return;
    
    try {
      await schoolsAPI.deleteSchool(schoolId);
      setSchools(prev => prev.filter(s => s.id !== schoolId));
    } catch (error) {
      console.error('Failed to delete school:', error);
      setError('Failed to delete school. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Add School Modal */}
      <AddSchoolModal
        isOpen={showAddSchoolModal}
        onClose={() => setShowAddSchoolModal(false)}
        onSchoolAdded={() => {
          // Refresh schools data
          setLoading(true);
          schoolsAPI.getSchools({ search: searchTerm }).then(response => {
            if (response.success) {
              setSchools(response.data);
            }
            setLoading(false);
          });
        }}
      />

      {/* School Details Modal */}
      <SchoolDetailsModal
        isOpen={showSchoolDetailsModal}
        onClose={() => {
          setShowSchoolDetailsModal(false);
          setSelectedSchoolId(null);
        }}
        schoolId={selectedSchoolId}
        onSchoolUpdated={() => {
          // Refresh schools data
          setLoading(true);
          schoolsAPI.getSchools({ search: searchTerm }).then(response => {
            if (response.success) {
              setSchools(response.data);
            }
            setLoading(false);
          });
        }}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SuperAdmin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage schools and administrators</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowAddSchoolModal(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add School</span>
          </button>
          <button 
            onClick={() => window.location.href = '/categories'}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
          >
            <BookOpen className="w-5 h-5" />
            <span>Manage Categories</span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg border border-blue-200 p-6 transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Schools</p>
              <p className="text-3xl font-bold text-gray-900">{schools.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
              <Building className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg border border-green-200 p-6 transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">{totalStudents.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg border border-purple-200 p-6 transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Schools</p>
              <p className="text-3xl font-bold text-gray-900">
                {schools.filter(s => s.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
              <Building className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Schools Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
            <h2 className="text-xl font-semibold text-gray-900">Schools Management</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search schools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                />
              </div>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  School
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Domain
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSchools.map((school) => (
                <tr 
                  key={school.id} 
                  className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all cursor-pointer"
                  onClick={() => handleSchoolClick(school.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
                        <Building className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{school.name}</div>
                        <div className="text-sm text-gray-500">{school.address || 'No address provided'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{school.domain}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{school.admin_name}</div>
                      <div className="text-sm text-gray-500">{school.admin_email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{(school.total_students || 0).toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      school.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {school.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={(e) => handleEditSchool(e, school.id)}
                        className="text-cyan-600 hover:text-cyan-900 p-1 hover:bg-cyan-50 rounded transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => handleDeleteSchool(e, school.id)}
                        className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;