import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AssetProperties = ({ selectedAsset, brandData, userTier, onPropertyChange }) => {
  const [activeSection, setActiveSection] = useState('details');
  
  const currentAsset = brandData.assets.logos.find(logo => logo.id === selectedAsset);
  
  const downloadFormats = [
    { 
      format: 'PNG', 
      sizes: ['256px', '512px', '1024px', '2048px'], 
      description: 'Best for web and digital use',
      tier: 'Free'
    },
    { 
      format: 'SVG', 
      sizes: ['Vector'], 
      description: 'Scalable vector format',
      tier: 'Pro'
    },
    { 
      format: 'PDF', 
      sizes: ['Print Ready'], 
      description: 'High-quality print format',
      tier: 'Pro'
    },
    { 
      format: 'EPS', 
      sizes: ['Vector'], 
      description: 'Professional vector format',
      tier: 'Agency'
    }
  ];

  const usageGuidelines = [
    {
      title: 'Minimum Size',
      description: 'Never use the logo smaller than 24px in height for digital or 0.5 inches for print.',
      icon: 'Minimize'
    },
    {
      title: 'Clear Space',
      description: 'Maintain clear space around the logo equal to the height of the logo mark.',
      icon: 'Square'
    },
    {
      title: 'Color Usage',
      description: 'Use the primary logo on light backgrounds and the reverse version on dark backgrounds.',
      icon: 'Palette'
    },
    {
      title: 'Modifications',
      description: 'Do not modify, distort, or alter the logo in any way without approval.',
      icon: 'Shield'
    }
  ];

  const sections = [
    { id: 'details', label: 'Details', icon: 'Info' },
    { id: 'usage', label: 'Usage', icon: 'BookOpen' },
    { id: 'download', label: 'Download', icon: 'Download' }
  ];

  const getTierBadgeColor = (tier) => {
    switch (tier) {
      case 'Free': return 'bg-success-100 text-success-700';
      case 'Pro': return 'bg-primary-100 text-primary-700';
      case 'Agency': return 'bg-secondary-100 text-secondary-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const canDownload = (requiredTier) => {
    const tierLevels = { 'Free': 1, 'Pro': 2, 'Agency': 3 };
    return tierLevels[userTier] >= tierLevels[requiredTier];
  };

  const handleDownload = (format, size) => {
    if (!canDownload(downloadFormats.find(f => f.format === format)?.tier)) {
      // Show upgrade modal
      console.log('Upgrade required for', format);
      return;
    }
    
    console.log('Downloading', format, size);
  };

  const renderDetailsSection = () => (
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="aspect-square w-24 h-24 mx-auto mb-4 bg-white rounded-lg border border-border flex items-center justify-center">
          <img
            src={currentAsset?.url}
            alt={currentAsset?.name}
            className="w-16 h-16 object-contain"
          />
        </div>
        <h3 className="text-lg font-semibold text-text-primary text-center mb-2">
          {currentAsset?.name}
        </h3>
        <p className="text-sm text-text-secondary text-center">
          {currentAsset?.type.toUpperCase()} • Vector Format
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-text-primary">Asset ID</span>
          <span className="text-sm text-text-secondary font-mono">{currentAsset?.id}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-text-primary">Type</span>
          <span className="text-sm text-text-secondary">{currentAsset?.type.toUpperCase()}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-text-primary">Variations</span>
          <span className="text-sm text-text-secondary">{currentAsset?.variations?.length || 0}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-text-primary">Created</span>
          <span className="text-sm text-text-secondary">
            {new Date(brandData.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-text-primary mb-3">Properties</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Alt Text
            </label>
            <input
              type="text"
              defaultValue={currentAsset?.name}
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              onChange={(e) => onPropertyChange('altText', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Description
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Add a description for this asset..."
              onChange={(e) => onPropertyChange('description', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsageSection = () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Usage Guidelines</h3>
        <div className="space-y-4">
          {usageGuidelines.map((guideline, index) => (
            <div key={index} className="flex space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon name={guideline.icon} size={16} className="text-primary" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-1">
                  {guideline.title}
                </h4>
                <p className="text-sm text-text-secondary">
                  {guideline.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-text-primary mb-3">Do's and Don'ts</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm font-medium text-success-700 mb-2 flex items-center">
              <Icon name="Check" size={14} className="mr-1" />
              Do
            </h5>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Use on appropriate backgrounds</li>
              <li>• Maintain proper proportions</li>
              <li>• Follow color guidelines</li>
              <li>• Respect minimum sizes</li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-sm font-medium text-error-700 mb-2 flex items-center">
              <Icon name="X" size={14} className="mr-1" />
              Don't
            </h5>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Stretch or distort</li>
              <li>• Change colors</li>
              <li>• Add effects or shadows</li>
              <li>• Use on busy backgrounds</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDownloadSection = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Download Options</h3>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTierBadgeColor(userTier)}`}>
          {userTier} Plan
        </div>
      </div>

      <div className="space-y-3">
        {downloadFormats.map((formatOption) => (
          <div key={formatOption.format} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-medium text-text-primary">
                  {formatOption.format}
                </h4>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTierBadgeColor(formatOption.tier)}`}>
                  {formatOption.tier}
                </span>
              </div>
              
              {!canDownload(formatOption.tier) && (
                <button className="text-xs text-primary hover:text-primary-600 font-medium">
                  Upgrade
                </button>
              )}
            </div>
            
            <p className="text-sm text-text-secondary mb-3">
              {formatOption.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {formatOption.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleDownload(formatOption.format, size)}
                  disabled={!canDownload(formatOption.tier)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200 ${
                    canDownload(formatOption.tier)
                      ? 'bg-primary-50 text-primary hover:bg-primary-100' :'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-text-primary mb-3">Bulk Download</h4>
        <div className="space-y-3">
          <button
            className={`w-full flex items-center justify-center space-x-2 p-3 rounded-lg border-2 border-dashed transition-colors duration-200 ${
              canDownload('Pro')
                ? 'border-primary text-primary hover:bg-primary-50' :'border-gray-300 text-gray-400 cursor-not-allowed'
            }`}
            disabled={!canDownload('Pro')}
          >
            <Icon name="Download" size={16} />
            <span className="font-medium">Download All Formats</span>
          </button>
          
          {!canDownload('Pro') && (
            <p className="text-xs text-text-secondary text-center">
              Bulk download available with Pro plan
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'details': return renderDetailsSection();
      case 'usage': return renderUsageSection();
      case 'download': return renderDownloadSection();
      default: return renderDetailsSection();
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Section Tabs */}
      <div className="border-b border-border">
        <nav className="flex">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
                activeSection === section.id
                  ? 'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-gray-50'
              }`}
            >
              <Icon name={section.icon} size={16} />
              <span>{section.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Section Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default AssetProperties;