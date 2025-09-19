import React, { useState, useEffect } from 'react';
import { X, FileText, Video, Save } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { CategoryItem, ItemDetail, CreateItemDetailRequest } from '../types/categories';
import { mockCategoriesAPI } from '../mock/categoriesData';

interface ItemDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CategoryItem | null;
  itemDetails: ItemDetail | null;
  onDetailsUpdated: () => void;
}

const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({ 
  isOpen, 
  onClose, 
  item, 
  itemDetails, 
  onDetailsUpdated 
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [detailsData, setDetailsData] = useState<CreateItemDetailRequest>({
    item_id: item?.id || 0,
    en_explanation: '',
    te_explanation: '',
    video_url: '',
    te_transliteration: ''
  });

  useEffect(() => {
    if (item && itemDetails) {
      setDetailsData({
        item_id: item.id,
        en_explanation: itemDetails.en_explanation || '',
        te_explanation: itemDetails.te_explanation || '',
        video_url: itemDetails.video_url || '',
        te_transliteration: itemDetails.te_transliteration || ''
      });
    } else if (item) {
      setDetailsData({
        item_id: item.id,
        en_explanation: '',
        te_explanation: '',
        video_url: '',
        te_transliteration: ''
      });
    }
  }, [item, itemDetails]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Use mock API for now, replace with real API
      // await categoriesManagementAPI.createOrUpdateItemDetails(detailsData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
      
      onDetailsUpdated();
    } catch (err) {
      setError('Failed to save item details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetailsData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!item) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Dialog.Title className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <FileText className="w-6 h-6 text-purple-600" />
                <span>Item Details - {item.en_name}</span>
              </Dialog.Title>
              <Dialog.Close className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </Dialog.Close>
            </div>

            {/* Item Info */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={item.image_url || 'https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&w=300'}
                  alt={item.en_name}
                  className="w-16 h-16 object-cover rounded-lg shadow-md"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.en_name}</h3>
                  <p className="text-sm text-gray-600">{item.explanation}</p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    {item.te_name && <span>Telugu: {item.te_name}</span>}
                    {item.hi_name && <span>Hindi: {item.hi_name}</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* English Explanation */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span>English Explanation</span>
                </h3>
                <textarea
                  name="en_explanation"
                  value={detailsData.en_explanation}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Provide a detailed explanation in English..."
                />
              </div>

              {/* Telugu Explanation */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-orange-600" />
                  <span>Telugu Explanation</span>
                </h3>
                <textarea
                  name="te_explanation"
                  value={detailsData.te_explanation}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                  placeholder="తెలుగులో వివరణ ఇవ్వండి..."
                />
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telugu Transliteration
                  </label>
                  <input
                    type="text"
                    name="te_transliteration"
                    value={detailsData.te_transliteration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Telugu transliteration in English"
                  />
                </div>
              </div>

              {/* Video URL */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Video className="w-5 h-5 text-purple-600" />
                  <span>Video Content</span>
                </h3>
                <div className="relative">
                  <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="url"
                    name="video_url"
                    value={detailsData.video_url}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="https://example.com/video.mp4"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Add a video URL to provide visual learning content for this item.
                </p>
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
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Save className="w-4 h-4" />
                      <span>Save Details</span>
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

export default ItemDetailsModal;