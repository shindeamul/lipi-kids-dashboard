import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Upload, 
  Download, 
  BookOpen, 
  List, 
  FileText,
  ArrowLeft,
  Globe,
  Image,
  Video,
  Save,
  X
} from 'lucide-react';
import { GameCategory, CategoryItem, ItemDetail } from '../types/categories';
import { categoriesManagementAPI } from '../services/categoriesAPI';
import { mockCategoriesAPI } from '../mock/categoriesData';
import AddCategoryModal from './AddCategoryModal';
import AddItemModal from './AddItemModal';
import ItemDetailsModal from './ItemDetailsModal';
import BulkImportModal from './BulkImportModal';

type ViewMode = 'categories' | 'items' | 'details';

const CategoriesManagementPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('categories');
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | null>(null);
  const [selectedItem, setSelectedItem] = useState<CategoryItem | null>(null);
  
  // Categories state
  const [categories, setCategories] = useState<GameCategory[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  
  // Items state
  const [items, setItems] = useState<CategoryItem[]>([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  
  // Item details state
  const [itemDetails, setItemDetails] = useState<ItemDetail | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  
  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Modal states
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showItemDetailsModal, setShowItemDetailsModal] = useState(false);
  const [showBulkImportModal, setShowBulkImportModal] = useState(false);
  const [bulkImportType, setBulkImportType] = useState<'categories' | 'items' | 'details'>('categories');

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      setError(null);
      
      try {
        // Use mock API for now, replace with real API
        const response = await mockCategoriesAPI.getCategories({ search: searchTerm });
        if (response.success) {
          setCategories(response.data);
        }
      } catch (err) {
        setError('Failed to fetch categories');
        console.error('Categories fetch error:', err);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, [searchTerm]);

  // Fetch items when category is selected
  useEffect(() => {
    if (selectedCategory && viewMode === 'items') {
      const fetchItems = async () => {
        setItemsLoading(true);
        setError(null);
        
        try {
          // Use mock API for now, replace with real API
          const response = await mockCategoriesAPI.getCategoryItems(selectedCategory.id, { search: searchTerm });
          if (response.success) {
            setItems(response.data);
          }
        } catch (err) {
          setError('Failed to fetch items');
          console.error('Items fetch error:', err);
        } finally {
          setItemsLoading(false);
        }
      };

      fetchItems();
    }
  }, [selectedCategory, viewMode, searchTerm]);

  // Fetch item details when item is selected
  useEffect(() => {
    if (selectedItem && viewMode === 'details') {
      const fetchItemDetails = async () => {
        setDetailsLoading(true);
        setError(null);
        
        try {
          // Use mock API for now, replace with real API
          const response = await mockCategoriesAPI.getItemDetails(selectedItem.id);
          if (response.success) {
            setItemDetails(response.data);
          }
        } catch (err) {
          setError('Failed to fetch item details');
          console.error('Item details fetch error:', err);
        } finally {
          setDetailsLoading(false);
        }
      };

      fetchItemDetails();
    }
  }, [selectedItem, viewMode]);

  const handleCategoryClick = (category: GameCategory) => {
    setSelectedCategory(category);
    setViewMode('items');
    setSearchTerm('');
  };

  const handleItemClick = (item: CategoryItem) => {
    setSelectedItem(item);
    setViewMode('details');
  };

  const handleBackToCategories = () => {
    setViewMode('categories');
    setSelectedCategory(null);
    setSearchTerm('');
  };

  const handleBackToItems = () => {
    setViewMode('items');
    setSelectedItem(null);
  };

  const handleBulkImport = (type: 'categories' | 'items' | 'details') => {
    setBulkImportType(type);
    setShowBulkImportModal(true);
  };

  const handleDeleteCategory = async (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;
    
    const confirmed = window.confirm(`Are you sure you want to delete "${category.en_name}"? This will also delete all items and details.`);
    if (!confirmed) return;
    
    try {
      // Replace with real API call
      // await categoriesManagementAPI.deleteCategory(categoryId);
      setCategories(prev => prev.filter(c => c.id !== categoryId));
      setSuccess('Category deleted successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete category');
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    
    const confirmed = window.confirm(`Are you sure you want to delete "${item.en_name}"?`);
    if (!confirmed) return;
    
    try {
      // Replace with real API call
      // await categoriesManagementAPI.deleteItem(itemId);
      setItems(prev => prev.filter(i => i.id !== itemId));
      setSuccess('Item deleted successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  const filteredCategories = categories.filter(category =>
    category.en_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.te_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.hi_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredItems = items.filter(item =>
    item.en_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.te_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.hi_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 p-4 sm:p-6 lg:p-8">
      {/* Modals */}
      <AddCategoryModal
        isOpen={showAddCategoryModal}
        onClose={() => setShowAddCategoryModal(false)}
        onCategoryAdded={() => {
          // Refresh categories
          setShowAddCategoryModal(false);
          setSuccess('Category added successfully!');
          setTimeout(() => setSuccess(null), 3000);
        }}
      />

      <AddItemModal
        isOpen={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
        categoryId={selectedCategory?.id || 0}
        onItemAdded={() => {
          // Refresh items
          setShowAddItemModal(false);
          setSuccess('Item added successfully!');
          setTimeout(() => setSuccess(null), 3000);
        }}
      />

      <ItemDetailsModal
        isOpen={showItemDetailsModal}
        onClose={() => setShowItemDetailsModal(false)}
        item={selectedItem}
        itemDetails={itemDetails}
        onDetailsUpdated={() => {
          setShowItemDetailsModal(false);
          setSuccess('Item details updated successfully!');
          setTimeout(() => setSuccess(null), 3000);
        }}
      />

      <BulkImportModal
        isOpen={showBulkImportModal}
        onClose={() => setShowBulkImportModal(false)}
        type={bulkImportType}
        categoryId={selectedCategory?.id}
        onImportCompleted={() => {
          setShowBulkImportModal(false);
          setSuccess('Bulk import completed successfully!');
          setTimeout(() => setSuccess(null), 3000);
        }}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-6">
          {viewMode !== 'categories' && (
            <button
              onClick={viewMode === 'details' ? handleBackToItems : handleBackToCategories}
              className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg border border-gray-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          )}
          
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              {viewMode === 'categories' && 'Categories Management'}
              {viewMode === 'items' && `${selectedCategory?.en_name} - Items`}
              {viewMode === 'details' && `${selectedItem?.en_name} - Details`}
            </h1>
            <p className="text-gray-600 mt-2">
              {viewMode === 'categories' && 'Manage game categories, items, and their details'}
              {viewMode === 'items' && 'Manage items within this category'}
              {viewMode === 'details' && 'Manage detailed information for this item'}
            </p>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <span className={viewMode === 'categories' ? 'text-purple-600 font-medium' : 'cursor-pointer hover:text-purple-600'} 
                onClick={handleBackToCategories}>
            Categories
          </span>
          {selectedCategory && (
            <>
              <span>/</span>
              <span className={viewMode === 'items' ? 'text-purple-600 font-medium' : 'cursor-pointer hover:text-purple-600'}
                    onClick={handleBackToItems}>
                {selectedCategory.en_name}
              </span>
            </>
          )}
          {selectedItem && (
            <>
              <span>/</span>
              <span className="text-purple-600 font-medium">{selectedItem.en_name}</span>
            </>
          )}
        </div>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
          {success}
        </div>
      )}

      {/* Categories View */}
      {viewMode === 'categories' && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all w-64"
                  />
                </div>
                <button className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Filter className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleBulkImport('categories')}
                  className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  <Upload className="w-5 h-5" />
                  <span>Bulk Import</span>
                </button>
                <button
                  onClick={() => setShowAddCategoryModal(true)}
                  className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Category</span>
                </button>
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoriesLoading ? (
              [...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 animate-pulse shadow-lg">
                  <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))
            ) : (
              filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 overflow-hidden border border-gray-100 cursor-pointer"
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="relative">
                    <img
                      src={category.image_url || 'https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&w=300'}
                      alt={category.en_name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle edit
                        }}
                        className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors shadow-md"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(category.id);
                        }}
                        className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors shadow-md"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        category.play_mode 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {category.play_mode ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{category.en_name}</h3>
                    <div className="space-y-1 text-sm text-gray-600 mb-4">
                      {category.te_name && <p>Telugu: {category.te_name}</p>}
                      {category.hi_name && <p>Hindi: {category.hi_name}</p>}
                      {category.kn_name && <p>Kannada: {category.kn_name}</p>}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {category.allowed_lang.length} languages
                        </span>
                      </div>
                      <span className="text-sm font-medium text-purple-600">
                        Order: {category.sort_order}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Items View */}
      {viewMode === 'items' && selectedCategory && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all w-64"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleBulkImport('items')}
                  className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  <Upload className="w-5 h-5" />
                  <span>Bulk Import</span>
                </button>
                <button
                  onClick={() => setShowAddItemModal(true)}
                  className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Item</span>
                </button>
              </div>
            </div>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {itemsLoading ? (
              [...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 animate-pulse shadow-lg">
                  <div className="w-full h-40 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 overflow-hidden border border-gray-100 cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="relative">
                    <img
                      src={item.image_url || 'https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&w=300'}
                      alt={item.en_name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle edit
                        }}
                        className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors shadow-md"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteItem(item.id);
                        }}
                        className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors shadow-md"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                    {item.video_url && (
                      <div className="absolute bottom-3 left-3">
                        <div className="p-2 bg-white/90 rounded-lg">
                          <Video className="w-4 h-4 text-purple-600" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.en_name}</h3>
                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      {item.te_name && <p>Telugu: {item.te_name}</p>}
                      {item.hi_name && <p>Hindi: {item.hi_name}</p>}
                    </div>
                    
                    {item.explanation && (
                      <p className="text-sm text-gray-500 line-clamp-2">{item.explanation}</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Item Details View */}
      {viewMode === 'details' && selectedItem && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedItem.image_url || 'https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg?auto=compress&cs=tinysrgb&w=300'}
                  alt={selectedItem.en_name}
                  className="w-16 h-16 object-cover rounded-xl shadow-md"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedItem.en_name}</h2>
                  <p className="text-gray-600">{selectedItem.explanation}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleBulkImport('details')}
                  className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  <Upload className="w-5 h-5" />
                  <span>Bulk Import</span>
                </button>
                <button
                  onClick={() => setShowItemDetailsModal(true)}
                  className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  <Edit className="w-5 h-5" />
                  <span>Edit Details</span>
                </button>
              </div>
            </div>
          </div>

          {/* Item Details Content */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            {detailsLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : itemDetails ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                      <FileText className="w-6 h-6 text-purple-600" />
                      <span>English Explanation</span>
                    </h3>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="text-gray-700 leading-relaxed">
                        {itemDetails.en_explanation || 'No English explanation available'}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                      <FileText className="w-6 h-6 text-purple-600" />
                      <span>Telugu Explanation</span>
                    </h3>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="text-gray-700 leading-relaxed">
                        {itemDetails.te_explanation || 'No Telugu explanation available'}
                      </p>
                      {itemDetails.te_transliteration && (
                        <p className="text-sm text-gray-500 mt-2 italic">
                          Transliteration: {itemDetails.te_transliteration}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                {itemDetails.video_url && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                      <Video className="w-6 h-6 text-purple-600" />
                      <span>Video Content</span>
                    </h3>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <a
                        href={itemDetails.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
                      >
                        <Video className="w-5 h-5" />
                        <span>View Video</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-500 mb-2">No Details Available</h3>
                <p className="text-gray-400 mb-6">This item doesn't have detailed information yet.</p>
                <button
                  onClick={() => setShowItemDetailsModal(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Details</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesManagementPage;