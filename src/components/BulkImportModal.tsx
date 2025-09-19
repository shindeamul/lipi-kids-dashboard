import React, { useState } from 'react';
import { X, Upload, FileSpreadsheet, Download, AlertCircle, CheckCircle } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { mockCategoriesAPI } from '../mock/categoriesData';

interface BulkImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'categories' | 'items' | 'details';
  categoryId?: number;
  onImportCompleted: () => void;
}

const BulkImportModal: React.FC<BulkImportModalProps> = ({ 
  isOpen, 
  onClose, 
  type, 
  categoryId, 
  onImportCompleted 
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setSuccess(null);
      setImportResult(null);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) {
      setError('Please select a file to import.');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Use mock API for now, replace with real API
      const result = await mockCategoriesAPI.bulkImport(selectedFile);
      
      if (result.success) {
        setImportResult(result);
        setSuccess(`Import completed! ${result.imported_count} records imported successfully.`);
        setTimeout(() => {
          onImportCompleted();
        }, 2000);
      } else {
        setError('Import failed. Please check your file format.');
      }
    } catch (err) {
      setError('Failed to import file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getTypeInfo = () => {
    switch (type) {
      case 'categories':
        return {
          title: 'Bulk Import Categories',
          description: 'Import multiple categories from Excel or Google Sheets',
          sampleColumns: ['en_name', 'te_name', 'hi_name', 'kn_name', 'gu_name', 'image_url', 'sort_order', 'play_mode', 'allowed_lang'],
          sampleData: [
            ['Animals', 'జంతువులు', 'जानवर', 'ಪ್ರಾಣಿಗಳು', 'પ્રાણીઓ', 'https://example.com/animals.jpg', '1', 'true', 'en,te,hi'],
            ['Colors', 'రంగులు', 'रंग', 'ಬಣ್ಣಗಳು', 'રંગો', 'https://example.com/colors.jpg', '2', 'true', 'en,te,hi,kn']
          ]
        };
      case 'items':
        return {
          title: 'Bulk Import Items',
          description: 'Import multiple items for this category',
          sampleColumns: ['en_name', 'te_name', 'te_transliteration', 'hi_name', 'hi_transliteration', 'image_url', 'explanation', 'video_url'],
          sampleData: [
            ['Cat', 'పిల్లి', 'Pilli', 'बिल्ली', 'Billi', 'https://example.com/cat.jpg', 'A small domesticated carnivorous mammal', 'https://example.com/cat.mp4'],
            ['Dog', 'కుక్క', 'Kukka', 'कुत्ता', 'Kutta', 'https://example.com/dog.jpg', 'A domesticated carnivorous mammal', '']
          ]
        };
      case 'details':
        return {
          title: 'Bulk Import Item Details',
          description: 'Import detailed explanations for items',
          sampleColumns: ['item_id', 'en_explanation', 'te_explanation', 'te_transliteration', 'video_url'],
          sampleData: [
            ['1', 'Cats are independent pets that love to play...', 'పిల్లులు స్వతంత్ర పెంపుడు జంతువులు...', 'Pillulu swatantra pempudu jantuvulu', 'https://example.com/cat-detailed.mp4'],
            ['2', 'Dogs are loyal companions that love their owners...', 'కుక్కలు తమ యజమానులను ప్రేమించే నమ్మకమైన సహచరులు...', 'Kukkalu tama yajamanulanu premimche nammakamaina sahacharulu', '']
          ]
        };
    }
  };

  const typeInfo = getTypeInfo();

  const downloadSampleFile = () => {
    const csvContent = [
      typeInfo.sampleColumns.join(','),
      ...typeInfo.sampleData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sample_${type}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Dialog.Title className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <Upload className="w-6 h-6 text-green-600" />
                <span>{typeInfo.title}</span>
              </Dialog.Title>
              <Dialog.Close className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </Dialog.Close>
            </div>

            <p className="text-gray-600 mb-6">{typeInfo.description}</p>

            {/* Error/Success Messages */}
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
            {success && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <p className="text-green-700 text-sm">{success}</p>
              </div>
            )}

            {/* Import Results */}
            {importResult && (
              <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Import Results</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-green-600 font-medium">✓ Imported: </span>
                    <span className="text-green-700">{importResult.imported_count} records</span>
                  </div>
                  <div>
                    <span className="text-red-600 font-medium">✗ Failed: </span>
                    <span className="text-red-700">{importResult.failed_count} records</span>
                  </div>
                </div>
                
                {importResult.failed_records && importResult.failed_records.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-red-900 mb-2">Failed Records:</h4>
                    <div className="max-h-32 overflow-y-auto space-y-1">
                      {importResult.failed_records.map((record: any, index: number) => (
                        <div key={index} className="text-xs text-red-700 bg-red-100 p-2 rounded">
                          Row {record.row}: {record.error}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* File Upload */}
            <div className="mb-6">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors">
                <FileSpreadsheet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-700">
                    Upload Excel or CSV file
                  </p>
                  <p className="text-sm text-gray-500">
                    Supported formats: .xlsx, .xls, .csv
                  </p>
                  <input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileChange}
                    className="hidden"
                    id="bulk-file-upload"
                  />
                  <label
                    htmlFor="bulk-file-upload"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 cursor-pointer transition-all transform hover:scale-105 shadow-lg"
                  >
                    <Upload className="w-5 h-5" />
                    <span>Choose File</span>
                  </label>
                </div>
                {selectedFile && (
                  <p className="mt-4 text-sm text-green-600 font-medium">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>
            </div>

            {/* Sample File */}
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Sample File Format</h3>
                <button
                  onClick={downloadSampleFile}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Sample</span>
                </button>
              </div>
              
              <div className="bg-white rounded-lg p-4 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b">
                      {typeInfo.sampleColumns.map((col, index) => (
                        <th key={index} className="text-left p-2 font-medium text-gray-700">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {typeInfo.sampleData.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="p-2 text-gray-600">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={loading || !selectedFile}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Importing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Upload className="w-5 h-5" />
                    <span>Import {type}</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default BulkImportModal;