import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';
import QuickActionsMenu from 'components/ui/QuickActionsMenu';
import Icon from 'components/AppIcon';


// Components
import AssetCanvas from './components/AssetCanvas';
import EditingToolbar from './components/EditingToolbar';
import AssetProperties from './components/AssetProperties';
import ColorPalette from './components/ColorPalette';
import TypographyPanel from './components/TypographyPanel';
import GuidelinesTab from './components/GuidelinesTab';
import VersionControl from './components/VersionControl';
import CollaborationPanel from './components/CollaborationPanel';
import ExportModal from './components/ExportModal';

const BrandKitPreviewEditor = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  
  // State management
  const [activeTab, setActiveTab] = useState('logo');
  const [selectedAsset, setSelectedAsset] = useState('primary-logo');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [canvasBackground, setCanvasBackground] = useState('white');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isVersionControlOpen, setIsVersionControlOpen] = useState(false);
  const [isCollaborationOpen, setIsCollaborationOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [userTier, setUserTier] = useState('Pro');

  // Mock brand data
  const brandData = {
    id: 'brand-001',
    name: 'TechFlow Solutions',
    industry: 'Technology',
    createdAt: '2024-01-15',
    lastModified: '2024-01-20',
    assets: {
      logos: [
        {
          id: 'primary-logo',
          name: 'Primary Logo',
          type: 'svg',
          url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop',
          variations: ['horizontal', 'vertical', 'icon-only', 'monochrome']
        },
        {
          id: 'secondary-logo',
          name: 'Secondary Logo',
          type: 'svg',
          url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop',
          variations: ['light', 'dark', 'transparent']
        }
      ],
      colors: {
        primary: '#1E40AF',
        secondary: '#7C3AED',
        accent: '#F59E0B',
        neutral: '#6B7280',
        palette: [
          { name: 'Primary Blue', hex: '#1E40AF', rgb: 'rgb(30, 64, 175)', usage: 'Primary brand color for logos and CTAs' },
          { name: 'Secondary Purple', hex: '#7C3AED', rgb: 'rgb(124, 58, 237)', usage: 'Secondary elements and highlights' },
          { name: 'Accent Amber', hex: '#F59E0B', rgb: 'rgb(245, 158, 11)', usage: 'Accent color for warnings and highlights' },
          { name: 'Neutral Gray', hex: '#6B7280', rgb: 'rgb(107, 114, 128)', usage: 'Text and neutral elements' },
          { name: 'Light Gray', hex: '#F3F4F6', rgb: 'rgb(243, 244, 246)', usage: 'Backgrounds and subtle elements' },
          { name: 'Dark Gray', hex: '#111827', rgb: 'rgb(17, 24, 39)', usage: 'Primary text and dark elements' }
        ]
      },
      typography: {
        primary: {
          name: 'Inter',
          category: 'Sans-serif',
          weights: ['400', '500', '600', '700'],
          usage: 'Headlines and primary text'
        },
        secondary: {
          name: 'JetBrains Mono',
          category: 'Monospace',
          weights: ['400'],
          usage: 'Code and technical content'
        }
      }
    }
  };

  const tabItems = [
    { id: 'logo', label: 'Logo', icon: 'Zap', count: brandData.assets.logos.length },
    { id: 'colors', label: 'Colors', icon: 'Palette', count: brandData.assets.colors.palette.length },
    { id: 'typography', label: 'Typography', icon: 'Type', count: 2 },
    { id: 'guidelines', label: 'Guidelines', icon: 'FileText', count: null }
  ];

  const backgroundOptions = [
    { id: 'white', label: 'White', color: '#FFFFFF' },
    { id: 'light-gray', label: 'Light Gray', color: '#F3F4F6' },
    { id: 'dark-gray', label: 'Dark Gray', color: '#374151' },
    { id: 'black', label: 'Black', color: '#000000' },
    { id: 'primary', label: 'Primary', color: brandData.assets.colors.primary },
    { id: 'transparent', label: 'Transparent', color: 'transparent', pattern: 'checkerboard' }
  ];

  // Handlers
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleAssetSelect = (assetId) => {
    setSelectedAsset(assetId);
  };

  const handleZoomChange = (newZoom) => {
    setZoomLevel(Math.max(25, Math.min(400, newZoom)));
  };

  const handleBackgroundChange = (bgId) => {
    setCanvasBackground(bgId);
  };

  const handleSave = () => {
    setHasUnsavedChanges(false);
    // Mock save operation
    console.log('Saving brand kit changes...');
  };

  const handleExport = () => {
    setIsExportModalOpen(true);
  };

  const handleVersionControl = () => {
    setIsVersionControlOpen(true);
  };

  const handleCollaboration = () => {
    setIsCollaborationOpen(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'logo':
        return (
          <div className="flex-1 flex">
            <AssetCanvas
              ref={canvasRef}
              selectedAsset={selectedAsset}
              zoomLevel={zoomLevel}
              background={canvasBackground}
              brandData={brandData}
              onAssetSelect={handleAssetSelect}
            />
          </div>
        );
      case 'colors':
        return (
          <ColorPalette
            colors={brandData.assets.colors}
            onColorChange={(colorId, newColor) => {
              setHasUnsavedChanges(true);
              console.log('Color changed:', colorId, newColor);
            }}
          />
        );
      case 'typography':
        return (
          <TypographyPanel
            typography={brandData.assets.typography}
            onTypographyChange={(fontId, changes) => {
              setHasUnsavedChanges(true);
              console.log('Typography changed:', fontId, changes);
            }}
          />
        );
      case 'guidelines':
        return (
          <GuidelinesTab
            brandData={brandData}
            onGuidelinesChange={(section, content) => {
              setHasUnsavedChanges(true);
              console.log('Guidelines changed:', section, content);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="px-6 py-6">
          <BreadcrumbNavigation />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/brand-kit-gallery')}
                className="p-2 rounded-md text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200"
              >
                <Icon name="ArrowLeft" size={20} />
              </button>
              
              <div>
                <h1 className="text-2xl font-semibold text-text-primary">
                  {brandData.name}
                </h1>
                <p className="text-sm text-text-secondary">
                  Last modified: {new Date(brandData.lastModified).toLocaleDateString()}
                  {hasUnsavedChanges && (
                    <span className="ml-2 text-warning-600">• Unsaved changes</span>
                  )}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Action Buttons */}
              <button
                onClick={handleVersionControl}
                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary-50 rounded-md transition-colors duration-200 flex items-center space-x-2"
              >
                <Icon name="History" size={16} />
                <span>Versions</span>
              </button>
              
              <button
                onClick={handleCollaboration}
                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary-50 rounded-md transition-colors duration-200 flex items-center space-x-2"
              >
                <Icon name="Users" size={16} />
                <span>Collaborate</span>
              </button>
              
              <button
                onClick={handleSave}
                disabled={!hasUnsavedChanges}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 flex items-center space-x-2 ${
                  hasUnsavedChanges
                    ? 'bg-success text-white hover:bg-success-600' :'text-text-muted bg-gray-100 cursor-not-allowed'
                }`}
              >
                <Icon name="Save" size={16} />
                <span>Save</span>
              </button>
              
              <button
                onClick={handleExport}
                className="btn-primary px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
              >
                <Icon name="Download" size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-border mb-6">
            <nav className="flex space-x-8">
              {tabItems.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-primary hover:border-gray-300'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                  {tab.count && (
                    <span className="bg-gray-100 text-text-muted px-2 py-0.5 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex gap-6">
            {/* Left Toolbar */}
            {activeTab === 'logo' && (
              <div className="w-64 flex-shrink-0">
                <EditingToolbar
                  selectedAsset={selectedAsset}
                  zoomLevel={zoomLevel}
                  background={canvasBackground}
                  backgroundOptions={backgroundOptions}
                  onZoomChange={handleZoomChange}
                  onBackgroundChange={handleBackgroundChange}
                  onAssetChange={(changes) => {
                    setHasUnsavedChanges(true);
                    console.log('Asset changes:', changes);
                  }}
                />
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {renderTabContent()}
            </div>

            {/* Right Panel */}
            {activeTab === 'logo' && (
              <div className="w-80 flex-shrink-0">
                <AssetProperties
                  selectedAsset={selectedAsset}
                  brandData={brandData}
                  userTier={userTier}
                  onPropertyChange={(property, value) => {
                    setHasUnsavedChanges(true);
                    console.log('Property changed:', property, value);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      {isExportModalOpen && (
        <ExportModal
          brandData={brandData}
          userTier={userTier}
          onClose={() => setIsExportModalOpen(false)}
          onExport={(options) => {
            console.log('Export options:', options);
            setIsExportModalOpen(false);
          }}
        />
      )}

      {isVersionControlOpen && (
        <VersionControl
          brandId={brandData.id}
          onClose={() => setIsVersionControlOpen(false)}
          onRestore={(versionId) => {
            console.log('Restore version:', versionId);
            setIsVersionControlOpen(false);
          }}
        />
      )}

      {isCollaborationOpen && (
        <CollaborationPanel
          brandId={brandData.id}
          onClose={() => setIsCollaborationOpen(false)}
        />
      )}

      <QuickActionsMenu />
    </div>
  );
};

export default BrandKitPreviewEditor;