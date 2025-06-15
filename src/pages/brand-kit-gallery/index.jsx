import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';
import QuickActionsMenu from 'components/ui/QuickActionsMenu';
import Icon from 'components/AppIcon';

import FilterSidebar from './components/FilterSidebar';
import BrandKitCard from './components/BrandKitCard';
import BrandKitListView from './components/BrandKitListView';
import BulkActionsBar from './components/BulkActionsBar';
import EmptyState from './components/EmptyState';

const BrandKitGallery = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedItems, setSelectedItems] = useState([]);
  const [filters, setFilters] = useState({
    industry: [],
    status: [],
    dateRange: 'all',
    tier: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Mock brand kits data
  const mockBrandKits = [
    {
      id: 'brand-001',
      name: 'TechFlow Solutions',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      industry: 'Technology',
      status: 'complete',
      createdAt: new Date('2024-01-15'),
      lastModified: new Date('2024-01-20'),
      colors: ['#2563EB', '#F59E0B', '#10B981'],
      tags: ['modern', 'professional', 'tech'],
      tier: 'pro',
      assets: {
        logos: 5,
        colors: 8,
        fonts: 3,
        guidelines: 1
      }
    },
    {
      id: 'brand-002',
      name: 'Green Earth Organics',
      thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop',
      industry: 'Food & Beverage',
      status: 'complete',
      createdAt: new Date('2024-01-10'),
      lastModified: new Date('2024-01-18'),
      colors: ['#10B981', '#F59E0B', '#8B5CF6'],
      tags: ['organic', 'natural', 'eco-friendly'],
      tier: 'hobby',
      assets: {
        logos: 3,
        colors: 5,
        fonts: 2,
        guidelines: 1
      }
    },
    {
      id: 'brand-003',
      name: 'Urban Fitness Studio',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      industry: 'Health & Fitness',
      status: 'draft',
      createdAt: new Date('2024-01-12'),
      lastModified: new Date('2024-01-22'),
      colors: ['#EF4444', '#1F2937', '#F59E0B'],
      tags: ['fitness', 'energy', 'bold'],
      tier: 'pro',
      assets: {
        logos: 2,
        colors: 4,
        fonts: 1,
        guidelines: 0
      }
    },
    {
      id: 'brand-004',
      name: 'Artisan Coffee Co.',
      thumbnail: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop',
      industry: 'Food & Beverage',
      status: 'complete',
      createdAt: new Date('2024-01-08'),
      lastModified: new Date('2024-01-16'),
      colors: ['#8B4513', '#F5DEB3', '#2F4F4F'],
      tags: ['artisan', 'premium', 'coffee'],
      tier: 'agency',
      assets: {
        logos: 8,
        colors: 12,
        fonts: 5,
        guidelines: 2
      }
    },
    {
      id: 'brand-005',
      name: 'Digital Marketing Hub',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      industry: 'Marketing',
      status: 'archived',
      createdAt: new Date('2023-12-20'),
      lastModified: new Date('2024-01-05'),
      colors: ['#7C3AED', '#EC4899', '#F59E0B'],
      tags: ['digital', 'creative', 'marketing'],
      tier: 'pro',
      assets: {
        logos: 4,
        colors: 6,
        fonts: 2,
        guidelines: 1
      }
    },
    {
      id: 'brand-006',
      name: 'Sustainable Fashion',
      thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
      industry: 'Fashion',
      status: 'complete',
      createdAt: new Date('2024-01-05'),
      lastModified: new Date('2024-01-14'),
      colors: ['#059669', '#F3F4F6', '#1F2937'],
      tags: ['sustainable', 'fashion', 'eco'],
      tier: 'hobby',
      assets: {
        logos: 3,
        colors: 4,
        fonts: 2,
        guidelines: 1
      }
    }
  ];

  const [brandKits, setBrandKits] = useState([]);
  const [filteredBrandKits, setFilteredBrandKits] = useState([]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setBrandKits(mockBrandKits);
      setFilteredBrandKits(mockBrandKits);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...brandKits];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(kit =>
        kit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kit.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        kit.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply filters
    if (filters.industry.length > 0) {
      filtered = filtered.filter(kit => filters.industry.includes(kit.industry));
    }

    if (filters.status.length > 0) {
      filtered = filtered.filter(kit => filters.status.includes(kit.status));
    }

    if (filters.tier.length > 0) {
      filtered = filtered.filter(kit => filters.tier.includes(kit.tier));
    }

    // Apply date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters.dateRange) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        default:
          break;
      }
      
      if (filters.dateRange !== 'all') {
        filtered = filtered.filter(kit => kit.createdAt >= filterDate);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.createdAt - a.createdAt;
        case 'oldest':
          return a.createdAt - b.createdAt;
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        case 'mostUsed':
          return b.lastModified - a.lastModified;
        default:
          return 0;
      }
    });

    setFilteredBrandKits(filtered);
  }, [brandKits, searchQuery, filters, sortBy]);

  const handleSelectItem = (id) => {
    setSelectedItems(prev => {
      const newSelection = prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id];
      
      setShowBulkActions(newSelection.length > 0);
      return newSelection;
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredBrandKits.length) {
      setSelectedItems([]);
      setShowBulkActions(false);
    } else {
      const allIds = filteredBrandKits.map(kit => kit.id);
      setSelectedItems(allIds);
      setShowBulkActions(true);
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on:`, selectedItems);
    // Implement bulk actions here
    setSelectedItems([]);
    setShowBulkActions(false);
  };

  const handleCreateNew = () => {
    navigate('/brand-brief-creation');
  };

  const handleEditBrand = (id) => {
    navigate('/brand-kit-preview-editor', { state: { brandId: id } });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete':
        return 'text-success bg-success-50 border-success-200';
      case 'draft':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'archived':
        return 'text-text-muted bg-gray-50 border-gray-200';
      default:
        return 'text-text-secondary bg-gray-50 border-gray-200';
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'agency':
        return 'text-secondary bg-secondary-50 border-secondary-200';
      case 'pro':
        return 'text-primary bg-primary-50 border-primary-200';
      case 'hobby':
        return 'text-accent bg-accent-50 border-accent-200';
      default:
        return 'text-text-secondary bg-gray-50 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 px-6">
          <div className="max-w-7xl mx-auto">
            <BreadcrumbNavigation />
            <div className="flex gap-6">
              {/* Sidebar Skeleton */}
              <div className="w-80 flex-shrink-0">
                <div className="bg-surface border border-border rounded-lg p-6">
                  <div className="space-y-6">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="space-y-2">
                          {[1, 2, 3].map(j => (
                            <div key={j} className="h-3 bg-gray-100 rounded animate-pulse"></div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content Skeleton */}
              <div className="flex-1">
                <div className="mb-6 flex items-center justify-between">
                  <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
                  <div className="flex space-x-3">
                    <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <div key={i} className="bg-surface border border-border rounded-lg overflow-hidden">
                      <div className="h-48 bg-gray-200 animate-pulse"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 bg-gray-100 rounded w-2/3 animate-pulse"></div>
                        <div className="flex space-x-2">
                          <div className="h-6 bg-gray-100 rounded w-16 animate-pulse"></div>
                          <div className="h-6 bg-gray-100 rounded w-20 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 px-6">
        <div className="max-w-7xl mx-auto">
          <BreadcrumbNavigation />
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-text-primary">Brand Kit Gallery</h1>
                <p className="text-text-secondary mt-1">
                  Manage and organize your brand identity collections
                </p>
              </div>
              
              <button
                onClick={handleCreateNew}
                className="btn-primary px-6 py-3 rounded-lg font-medium inline-flex items-center space-x-2"
              >
                <Icon name="Plus" size={18} />
                <span>Create New Brand</span>
              </button>
            </div>

            {/* Search and Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Icon 
                    name="Search" 
                    size={18} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" 
                  />
                  <input
                    type="text"
                    placeholder="Search brand kits..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-10 pr-4 py-2 w-full"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field px-3 py-2 text-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="alphabetical">Alphabetical</option>
                  <option value="mostUsed">Recently Modified</option>
                </select>

                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-text-secondary hover:text-primary'}`}
                  >
                    <Icon name="Grid3X3" size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-text-secondary hover:text-primary'}`}
                  >
                    <Icon name="List" size={16} />
                  </button>
                </div>

                {filteredBrandKits.length > 0 && (
                  <button
                    onClick={handleSelectAll}
                    className="text-sm text-primary hover:text-primary-700 font-medium"
                  >
                    {selectedItems.length === filteredBrandKits.length ? 'Deselect All' : 'Select All'}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Filter Sidebar */}
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              brandKits={brandKits}
            />

            {/* Main Content */}
            <div className="flex-1">
              {filteredBrandKits.length === 0 ? (
                <EmptyState
                  searchQuery={searchQuery}
                  hasFilters={Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f !== 'all')}
                  onCreateNew={handleCreateNew}
                  onClearFilters={() => {
                    setFilters({
                      industry: [],
                      status: [],
                      dateRange: 'all',
                      tier: []
                    });
                    setSearchQuery('');
                  }}
                />
              ) : (
                <>
                  {/* Results Summary */}
                  <div className="mb-6 flex items-center justify-between">
                    <p className="text-text-secondary">
                      Showing {filteredBrandKits.length} of {brandKits.length} brand kits
                      {selectedItems.length > 0 && (
                        <span className="ml-2 text-primary font-medium">
                          ({selectedItems.length} selected)
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Brand Kits Display */}
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredBrandKits.map((kit) => (
                        <BrandKitCard
                          key={kit.id}
                          brandKit={kit}
                          isSelected={selectedItems.includes(kit.id)}
                          onSelect={handleSelectItem}
                          onEdit={handleEditBrand}
                          getStatusColor={getStatusColor}
                          getTierColor={getTierColor}
                        />
                      ))}
                    </div>
                  ) : (
                    <BrandKitListView
                      brandKits={filteredBrandKits}
                      selectedItems={selectedItems}
                      onSelect={handleSelectItem}
                      onEdit={handleEditBrand}
                      getStatusColor={getStatusColor}
                      getTierColor={getTierColor}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {showBulkActions && (
        <BulkActionsBar
          selectedCount={selectedItems.length}
          onAction={handleBulkAction}
          onCancel={() => {
            setSelectedItems([]);
            setShowBulkActions(false);
          }}
        />
      )}

      <QuickActionsMenu />
    </div>
  );
};

export default BrandKitGallery;