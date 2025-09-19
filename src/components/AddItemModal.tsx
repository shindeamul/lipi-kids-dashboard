import React, { useState } from 'react';
import { X, List, Globe, Image, Video, Save } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { CreateItemRequest } from '../types/categories';
import { mockCategoriesAPI } from '../mock/categoriesData';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: number;
  onItemAdded: () => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, categoryId, onItemAdded }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [itemData, setItemData] = useState<CreateItemRequest>({
    category_id: categoryId,
    en_name: '',
    te_name: '',
    te_transliteration: '',
    hi_name: '',
    hi_transliteration: '',
    kn_name: '',
    kn_transliteration: '',
    gu_name: '',
    gu_transliteration: '',
    image_url: '',
    explanation: '',
    video_url: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Use mock API for now, replace with real API
      await mockCategoriesAPI.createItem({ ...itemData, category_id: categoryId });
      
      // Reset form
      setItemData({
        category_id: categoryId,
        en_name: '',
        te_name: '',
        te_transliteration: '',
        hi_name: '',
        hi_transliteration: '',
        kn_name: '',
        kn_transliteration: '',
        gu_name: '',
        gu_transliteration: '',
        image_url: '',
        explanation: '',
        video_url: ''
      });
      
      onItemAdded();
    } catch (err) {
      setError('Failed to create item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItemData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Dialog.Title className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <List className="w-6 h-6 text-cyan-600" />
                <span>Add New Item</span>
              </Dialog.Title>
              <Dialog.Close className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </Dialog.Close>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      English Name
                    </label>
                    <input
                      type="text"
                      name="en_name"
                      value={itemData.en_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      placeholder="Enter English name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL
                    </label>
                    <div className="relative">
                      <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="url"
                        name="image_url"
                        value={itemData.image_url}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Explanation
                  </label>
                  <textarea
                    name="explanation"
                    value={itemData.explanation}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none"
                    placeholder="Brief explanation about this item"
                  />
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video URL
                  </label>
                  <div className="relative">
                    <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="url"
                      name="video_url"
                      value={itemData.video_url}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      placeholder="https://example.com/video.mp4"
                    />
                  </div>
                </div>
              </div>

              {/* Telugu */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-orange-600" />
                  <span>Telugu Translation</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telugu Name
                    </label>
                    <input
                      type="text"
                      name="te_name"
                      value={itemData.te_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="తెలుగు పేరు"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telugu Transliteration
                    </label>
                    <input
                      type="text"
                      name="te_transliteration"
                      value={itemData.te_transliteration}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Telugu transliteration"
                    />
                  </div>
                </div>
              </div>

              {/* Hindi */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-green-600" />
                  <span>Hindi Translation</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hindi Name
                    </label>
                    <input
                      type="text"
                      name="hi_name"
                      value={itemData.hi_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="हिंदी नाम"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hindi Transliteration
                    </label>
                    <input
                      type="text"
                      name="hi_transliteration"
                      value={itemData.hi_transliteration}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Hindi transliteration"
                    />
                  </div>
                </div>
              </div>

              {/* Kannada */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-purple-600" />
                  <span>Kannada Translation</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kannada Name
                    </label>
                    <input
                      type="text"
                      name="kn_name"
                      value={itemData.kn_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="ಕನ್ನಡ ಹೆಸರು"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kannada Transliteration
                    </label>
                    <input
                      type="text"
                      name="kn_transliteration"
                      value={itemData.kn_transliteration}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Kannada transliteration"
                    />
                  </div>
                </div>
              </div>

              {/* Gujarati */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-yellow-600" />
                  <span>Gujarati Translation</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gujarati Name
                    </label>
                    <input
                      type="text"
                      name="gu_name"
                      value={itemData.gu_name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="ગુજરાતી નામ"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gujarati Transliteration
                    </label>
                    <input
                      type="text"
                      name="gu_transliteration"
                      value={itemData.gu_transliteration}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="Gujarati transliteration"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-4 rounded-xl font-medium hover:from-cyan-600 hover:to-blue-600 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Save className="w-4 h-4" />
                      <span>Create Item</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddItemModal;