import React, { useState } from 'react';
import { X, Upload, UserPlus, FileSpreadsheet } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { studentsAPI } from '../services/api';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStudentAdded: () => void;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ isOpen, onClose, onStudentAdded }) => {
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Single student form state
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    student_id: '',
  });
  
  // Bulk import state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSingleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await studentsAPI.addStudent(studentData);
      setSuccess('Student added successfully!');
      setStudentData({ name: '', email: '', student_id: '' });
      onStudentAdded();
      setTimeout(() => {
        onClose();
        setSuccess(null);
      }, 1500);
    } catch (err) {
      setError('Failed to add student. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkImport = async () => {
    if (!selectedFile) {
      setError('Please select a file to import.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await studentsAPI.importStudents(selectedFile);
      setSuccess('Students imported successfully!');
      setSelectedFile(null);
      onStudentAdded();
      setTimeout(() => {
        onClose();
        setSuccess(null);
      }, 1500);
    } catch (err) {
      setError('Failed to import students. Please check your file format.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Dialog.Title className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <UserPlus className="w-6 h-6 text-cyan-500" />
                <span>Add Students</span>
              </Dialog.Title>
              <Dialog.Close className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </Dialog.Close>
            </div>

            {/* Tab Selector */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                onClick={() => setActiveTab('single')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'single'
                    ? 'bg-white text-cyan-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Single Student
              </button>
              <button
                onClick={() => setActiveTab('bulk')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'bulk'
                    ? 'bg-white text-cyan-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Bulk Import
              </button>
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

            {/* Single Student Form */}
            {activeTab === 'single' && (
              <form onSubmit={handleSingleStudentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Name
                  </label>
                  <input
                    type="text"
                    required
                    value={studentData.name}
                    onChange={(e) => setStudentData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Enter student name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={studentData.email}
                    onChange={(e) => setStudentData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student ID
                  </label>
                  <input
                    type="text"
                    required
                    value={studentData.student_id}
                    onChange={(e) => setStudentData(prev => ({ ...prev, student_id: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Enter student ID"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Adding Student...</span>
                    </div>
                  ) : (
                    'Add Student'
                  )}
                </button>
              </form>
            )}

            {/* Bulk Import */}
            {activeTab === 'bulk' && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-cyan-400 transition-colors">
                  <FileSpreadsheet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Upload Excel or CSV file with student data
                    </p>
                    <input
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Choose File</span>
                    </label>
                  </div>
                  {selectedFile && (
                    <p className="mt-2 text-sm text-green-600">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">File Format Requirements:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Columns: Name, Email, Student ID</li>
                    <li>• First row should contain headers</li>
                    <li>• Supported formats: .xlsx, .xls, .csv</li>
                  </ul>
                </div>

                <button
                  onClick={handleBulkImport}
                  disabled={loading || !selectedFile}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Importing...</span>
                    </div>
                  ) : (
                    'Import Students'
                  )}
                </button>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddStudentModal;