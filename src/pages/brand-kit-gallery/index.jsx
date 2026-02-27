import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';
import QuickActionsMenu from 'components/ui/QuickActionsMenu';
import Icon from 'components/AppIcon';
import SearchInput from 'components/ui/SearchInput';
import InfiniteScroll from 'components/ui/InfiniteScroll';
import { SkeletonCard } from 'components/ui/Skeleton';
import { useToast } from 'components/ui/ToastProvider';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useDebounce } from 'hooks/useDebounce';
import { db } from 'lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from 'context/AuthContext';

import FilterSidebar from './components/FilterSidebar';
import BrandKitCard from './components/BrandKitCard';
import BrandKitListView from './components/BrandKitListView';
import BulkActionsBar from './components/BulkActionsBar';
import EmptyState from './components/EmptyState';

const BrandKitGallery = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { currentUser } = useAuth();
  const [viewMode, setViewMode] = useLocalStorage('gallery-view-mode', 'grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useLocalStorage('gallery-sort-by', 'newest');
  const [selectedItems, setSelectedItems] = useState([]);
  const [filters, setFilters] = useState({
    industry: [],
    status: [],
    dateRange: 'all',
    tier: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [brandKits, setBrandKits] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Load real data from Firestore
  useEffect(() => {
    if (!currentUser) {
      setIsLoading(false);
      return;
    }

    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(db, "brand_kits"),
          where("userId", "==", currentUser.uid)
        );

        const querySnapshot = await getDocs(q);
        const kits = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Ensure dates are JavaScript Date objects
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          lastModified: doc.data().lastModified?.toDate() || new Date()
        }));

        setBrandKits(kits);
        setHasMore(false); // Pagination not implemented yet for Firestore
      } catch (error) {
        console.error("Error loading brand kits:", error);
        toast.error("Failed to load your brand kits");
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [currentUser, toast]);

  // Load more data - stubbed for now since we're using simple getDocs
  const loadMore = async () => {
    // Implementation for pagination would go here if needed
  };

  // Filter and sort brand kits
  const filteredBrandKits = useMemo(() => {
    let filtered = [...brandKits];

    // Apply search filter
    if (debouncedSearchQuery) {
      filtered = filtered.filter(kit =>
        kit.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        kit.industry.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        kit.tags.some(tag => tag.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
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

    return filtered;
  }, [brandKits, debouncedSearchQuery, filters, sortBy]);

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
    const actionMessages = {
      export: `Exported ${selectedItems.length} brand kits`,
      duplicate: `Duplicated ${selectedItems.length} brand kits`,
      archive: `Archived ${selectedItems.length} brand kits`,
      delete: `Deleted ${selectedItems.length} brand kits`
    };

    toast.success(actionMessages[action] || `Performed ${action} on ${selectedItems.length} items`);
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

  // Search suggestions
  const searchSuggestions = useMemo(() => {
    const suggestions = new Set();
    brandKits.forEach(kit => {
      suggestions.add(kit.name);
      suggestions.add(kit.industry);
      kit.tags.forEach(tag => suggestions.add(tag));
    });
    return Array.from(suggestions).filter(suggestion =>
      suggestion.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [brandKits, searchQuery]);

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
                    <SkeletonCard key={i} />
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
            <div className="mb-10">
              <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-secondary-900 rounded-2xl p-8 md:p-12 shadow-elevation-4 overflow-hidden relative">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-500/20 rounded-full blur-3xl -ml-20 -mb-20"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-white max-w-xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                      Manage Your Brand Identity
                    </h1>
                    <p className="text-primary-100 text-lg opacity-90">
                      Organize, edit, and export your AI-generated brand assets in one place.
                    </p>
                  </div>

                  <button
                    onClick={handleCreateNew}
                    className="bg-white text-primary-700 hover:bg-gray-50 px-6 py-3.5 rounded-xl font-semibold inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Icon name="Plus" size={20} />
                    <span>Create New Brand</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Search and Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 flex-1">
                <SearchInput
                  placeholder="Search brand kits..."
                  onSearch={setSearchQuery}
                  onClear={() => setSearchQuery('')}
                  suggestions={searchSuggestions}
                  showSuggestions={true}
                  className="flex-1 max-w-md"
                />
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
                  searchQuery={debouncedSearchQuery}
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

                  {/* Brand Kits Display with Infinite Scroll */}
                  <InfiniteScroll
                    hasMore={hasMore && !debouncedSearchQuery && Object.values(filters).every(f => Array.isArray(f) ? f.length === 0 : f === 'all')}
                    isLoading={isLoadingMore}
                    onLoadMore={loadMore}
                  >
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
                  </InfiniteScroll>
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