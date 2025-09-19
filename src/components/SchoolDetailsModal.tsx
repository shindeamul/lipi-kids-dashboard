import React, { useState, useEffect } from 'react';
import { X, Building, Edit, Trash2, Mail, Phone, MapPin, Users } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { schoolsAPI } from '../services/api';
import { School } from '../types/api';

interface SchoolDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  schoolId: number | null;
  onSchoolUpdated: () => void;
}

const SchoolDetailsModal: React.FC<SchoolDetailsModalProps> = ({ 
  isOpen, 
  onClose, 
  schoolId, 
  onSchoolUpdated 
}) => {
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<School>>({});

  useEffect(() => {
    if (isOpen && schoolId) {
      fetchSchoolDetails();
    }
  }, [isOpen, schoolId]);

  const fetchSchoolDetails = async () => {
    if (!schoolId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const schoolData = await schoolsAPI.getSchoolById(schoolId);
      setSchool(schoolData);
      setEditData(schoolData);
    } catch (err) {
      setError('Failed to fetch school details.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
    setSuccess(null);
  };

  const handleSave = async () => {
    if (!schoolId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await schoolsAPI.updateSchool(schoolId, editData);
      setSuccess('School updated successfully!');
      setIsEditing(false);
      onSchoolUpdated();
      await fetchSchoolDetails();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to update school.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!schoolId || !school) return;
    
    const confirmed = window.confirm(`Are you sure you want to delete ${school.name}? This action cannot be undone.`);
    if (!confirmed) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await schoolsAPI.deleteSchool(schoolId);
      setSuccess('School deleted successfully!');
      onSchoolUpdated();
      setTimeout(() => {
        onClose();
        setSuccess(null);
      }, 1500);
    } catch (err) {
      setError('Failed to delete school.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Dialog.Title className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <Building className="w-6 h-6 text-cyan-500" />
                <span>{isEditing ? 'Edit School' : 'School Details'}</span>
              </Dialog.Title>
              <Dialog.Close className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </Dialog.Close>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                {success}
              </div>
            )}

            {loading && !school ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : school ? (
              <div className="space-y-6">
                {/* School Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      School Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editData.name || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{school.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Domain
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="domain"
                        value={editData.domain || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      />
                    ) : (
                      <p className="text-gray-900">{school.domain}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="admin_name"
                        value={editData.admin_name || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <p className="text-gray-900">{school.admin_name}</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="admin_email"
                        value={editData.admin_email || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      />
                    ) : (
                      <p className="text-gray-900">{school.admin_email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <p className="text-gray-900">{school.phone}</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Students
                    </label>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-900 font-medium">{school.total_students?.toLocaleString() || 0}</p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={editData.address || ''}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none"
                      />
                    ) : (
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                        <p className="text-gray-900">{school.address}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Status:</span>
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                    school.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {school.status}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-6 border-t border-gray-200">
                  {isEditing ? (
                    <div className="flex space-x-3 w-full">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-50"
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete School</span>
                      </button>
                      <button
                        onClick={handleEdit}
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit School</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SchoolDetailsModal;