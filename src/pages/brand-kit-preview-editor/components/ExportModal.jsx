import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ExportModal = ({ brandData, userTier, onClose, onExport }) => {
  const [selectedFormats, setSelectedFormats] = useState(['png']);
  const [selectedSizes, setSelectedSizes] = useState(['medium']);
  const [includeGuidelines, setIncludeGuidelines] = useState(true);
  const [exportType, setExportType] = useState('selected'); // 'selected', 'all', 'custom'

  const formatOptions = [
    {
      id: 'png',
      name: 'PNG',
      description: 'High-quality raster format',
      sizes: ['small', 'medium', 'large', 'xlarge'],
      tier: 'Free',
      fileSize: '~2MB per asset'
    },
    {
      id: 'svg',
      name: 'SVG',
      description: 'Scalable vector format',
      sizes: ['vector'],
      tier: 'Pro',
      fileSize: '~50KB per asset'
    },
    {
      id: 'pdf',
      name: 'PDF',
      description: 'Print-ready format',
      sizes: ['print'],
      tier: 'Pro',
      fileSize: '~1MB per asset'
    },
    {
      id: 'eps',
      name: 'EPS',
      description: 'Professional vector format',
      sizes: ['vector'],
      tier: 'Agency',
      fileSize: '~100KB per asset'
    }
  ];

  const sizeOptions = {
    small: { label: 'Small', dimensions: '256×256px', description: 'Social media avatars' },
    medium: { label: 'Medium', dimensions: '512×512px', description: 'Web headers' },
    large: { label: 'Large', dimensions: '1024×1024px', description: 'Print materials' },
    xlarge: { label: 'X-Large', dimensions: '2048×2048px', description: 'Large format print' },
    vector: { label: 'Vector', dimensions: 'Scalable', description: 'Infinite resolution' },
    print: { label: 'Print Ready', dimensions: '300 DPI', description: 'Professional printing' }
  };

  const getTierLevel = (tier) => {
    const levels = { 'Free': 1, 'Pro': 2, 'Agency': 3 };
    return levels[tier] || 0;
  };

  const canUseFormat = (formatTier) => {
    return getTierLevel(userTier) >= getTierLevel(formatTier);
  };

  const handleFormatToggle = (formatId) => {
    const format = formatOptions.find(f => f.id === formatId);
    if (!canUseFormat(format.tier)) return;

    setSelectedFormats(prev => 
      prev.includes(formatId)
        ? prev.filter(id => id !== formatId)
        : [...prev, formatId]
    );
  };

  const handleSizeToggle = (sizeId) => {
    setSelectedSizes(prev => 
      prev.includes(sizeId)
        ? prev.filter(id => id !== sizeId)
        : [...prev, sizeId]
    );
  };

  const getAvailableSizes = () => {
    const allSizes = selectedFormats.reduce((sizes, formatId) => {
      const format = formatOptions.find(f => f.id === formatId);
      return [...sizes, ...format.sizes];
    }, []);
    return [...new Set(allSizes)];
  };

  const calculateEstimatedSize = () => {
    let totalSize = 0;
    selectedFormats.forEach(formatId => {
      const format = formatOptions.find(f => f.id === formatId);
      const assetCount = brandData.assets.logos.length;
      const sizeCount = selectedSizes.filter(size => format.sizes.includes(size)).length;
      
      // Rough estimation based on format
      const baseSizes = {
        png: 2, // MB per asset
        svg: 0.05,
        pdf: 1,
        eps: 0.1
      };
      
      totalSize += (baseSizes[formatId] || 1) * assetCount * sizeCount;
    });
    
    if (includeGuidelines) {
      totalSize += 5; // Add ~5MB for guidelines PDF
    }
    
    return totalSize.toFixed(1);
  };

  const handleExport = () => {
    const exportOptions = {
      formats: selectedFormats,
      sizes: selectedSizes,
      includeGuidelines,
      exportType,
      brandId: brandData.id
    };
    
    onExport(exportOptions);
  };

  const getTierBadgeColor = (tier) => {
    switch (tier) {
      case 'Free': return 'bg-success-100 text-success-700';
      case 'Pro': return 'bg-primary-100 text-primary-700';
      case 'Agency': return 'bg-secondary-100 text-secondary-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg w-full max-w-3xl max-h-[90vh] mx-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Export Brand Kit</h2>
            <p className="text-sm text-text-secondary mt-1">
              Download your brand assets in multiple formats
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getTierBadgeColor(userTier)}`}>
              {userTier} Plan
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-text-secondary hover:text-primary hover:bg-gray-100 transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Export Type */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-3">What to Export</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'selected', label: 'Current Asset', description: 'Export the currently selected logo' },
                { id: 'all', label: 'All Assets', description: 'Export all logos and variations' },
                { id: 'custom', label: 'Custom Selection', description: 'Choose specific assets to export' }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => setExportType(type.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-colors duration-200 ${
                    exportType === type.id
                      ? 'border-primary bg-primary-50' :'border-border hover:border-gray-300'
                  }`}
                >
                  <h4 className="font-medium text-text-primary mb-1">{type.label}</h4>
                  <p className="text-sm text-text-secondary">{type.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Format Selection */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-3">File Formats</h3>
            <div className="grid grid-cols-2 gap-4">
              {formatOptions.map((format) => {
                const isAvailable = canUseFormat(format.tier);
                const isSelected = selectedFormats.includes(format.id);
                
                return (
                  <div
                    key={format.id}
                    className={`relative p-4 rounded-lg border-2 cursor-pointer transition-colors duration-200 ${
                      !isAvailable
                        ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                        : isSelected
                        ? 'border-primary bg-primary-50' :'border-border hover:border-gray-300'
                    }`}
                    onClick={() => handleFormatToggle(format.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          isSelected ? 'border-primary bg-primary' : 'border-gray-300'
                        }`}>
                          {isSelected && <Icon name="Check" size={12} color="white" />}
                        </div>
                        <h4 className={`font-medium ${isAvailable ? 'text-text-primary' : 'text-gray-400'}`}>
                          {format.name}
                        </h4>
                      </div>
                      
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTierBadgeColor(format.tier)}`}>
                        {format.tier}
                      </span>
                    </div>
                    
                    <p className={`text-sm mb-2 ${isAvailable ? 'text-text-secondary' : 'text-gray-400'}`}>
                      {format.description}
                    </p>
                    
                    <p className={`text-xs ${isAvailable ? 'text-text-muted' : 'text-gray-400'}`}>
                      {format.fileSize}
                    </p>
                    
                    {!isAvailable && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
                        <button className="px-3 py-1 text-xs font-medium text-primary hover:text-primary-600">
                          Upgrade to {format.tier}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Size Selection */}
          {selectedFormats.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-text-primary mb-3">Sizes & Resolutions</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {getAvailableSizes().map((sizeId) => {
                  const size = sizeOptions[sizeId];
                  const isSelected = selectedSizes.includes(sizeId);
                  
                  return (
                    <button
                      key={sizeId}
                      onClick={() => handleSizeToggle(sizeId)}
                      className={`p-3 rounded-lg border-2 text-left transition-colors duration-200 ${
                        isSelected
                          ? 'border-primary bg-primary-50' :'border-border hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <div className={`w-3 h-3 rounded border-2 flex items-center justify-center ${
                          isSelected ? 'border-primary bg-primary' : 'border-gray-300'
                        }`}>
                          {isSelected && <Icon name="Check" size={8} color="white" />}
                        </div>
                        <h4 className="font-medium text-text-primary">{size.label}</h4>
                      </div>
                      <p className="text-sm text-text-secondary mb-1">{size.dimensions}</p>
                      <p className="text-xs text-text-muted">{size.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Additional Options */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-3">Additional Options</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                  includeGuidelines ? 'border-primary bg-primary' : 'border-gray-300'
                }`}>
                  {includeGuidelines && <Icon name="Check" size={12} color="white" />}
                </div>
                <div>
                  <span className="text-sm font-medium text-text-primary">Include Brand Guidelines</span>
                  <p className="text-xs text-text-secondary">Export comprehensive brand guidelines as PDF</p>
                </div>
              </label>
              
              {userTier === 'Free' && (
                <div className="p-3 bg-warning-50 border border-warning-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Icon name="Info" size={16} className="text-warning-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-warning-800">Free Plan Notice</p>
                      <p className="text-xs text-warning-700 mt-1">
                        Exported assets will include a small watermark. Upgrade to Pro to remove watermarks.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              <div className="flex items-center space-x-4">
                <span>Estimated size: {calculateEstimatedSize()} MB</span>
                <span>•</span>
                <span>{selectedFormats.length} format{selectedFormats.length !== 1 ? 's' : ''}</span>
                <span>•</span>
                <span>{selectedSizes.length} size{selectedSizes.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-text-secondary border border-border rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              
              <button
                onClick={handleExport}
                disabled={selectedFormats.length === 0 || selectedSizes.length === 0}
                className="px-6 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
              >
                <Icon name="Download" size={16} />
                <span>Export Brand Kit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;