import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FilterSidebar = ({ filters, onFiltersChange, brandKits }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const industries = [...new Set(brandKits.map(kit => kit.industry))];
  const statuses = ['complete', 'draft', 'archived'];
  const tiers = ['hobby', 'pro', 'agency'];

  const handleFilterChange = (category, value) => {
    const newFilters = { ...filters };
    
    if (category === 'dateRange') {
      newFilters[category] = value;
    } else {
      const currentValues = newFilters[category] || [];
      if (currentValues.includes(value)) {
        newFilters[category] = currentValues.filter(v => v !== value);
      } else {
        newFilters[category] = [...currentValues, value];
      }
    }
    
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      industry: [],
      status: [],
      dateRange: 'all',
      tier: []
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.industry.length > 0) count += filters.industry.length;
    if (filters.status.length > 0) count += filters.status.length;
    if (filters.tier.length > 0) count += filters.tier.length;
    if (filters.dateRange !== 'all') count += 1;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className={`bg-surface border border-border rounded-lg transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-80'} flex-shrink-0`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
              {activeFilterCount > 0 && (
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </div>
          )}
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </button>
        </div>

        {!isCollapsed && (
          <>
            {activeFilterCount > 0 && (
              <div className="mb-6">
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-primary hover:text-primary-700 font-medium flex items-center space-x-1"
                >
                  <Icon name="X" size={14} />
                  <span>Clear All Filters</span>
                </button>
              </div>
            )}

            <div className="space-y-6">
              {/* Industry Filter */}
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-3">Industry</h4>
                <div className="space-y-2">
                  {industries.map(industry => (
                    <label key={industry} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.industry.includes(industry)}
                        onChange={() => handleFilterChange('industry', industry)}
                        className="rounded border-border text-primary focus:ring-primary-500"
                      />
                      <span className="text-sm text-text-secondary">{industry}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-3">Status</h4>
                <div className="space-y-2">
                  {statuses.map(status => (
                    <label key={status} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.status.includes(status)}
                        onChange={() => handleFilterChange('status', status)}
                        className="rounded border-border text-primary focus:ring-primary-500"
                      />
                      <span className="text-sm text-text-secondary capitalize">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Range Filter */}
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-3">Created</h4>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Time' },
                    { value: 'week', label: 'Past Week' },
                    { value: 'month', label: 'Past Month' },
                    { value: 'quarter', label: 'Past 3 Months' }
                  ].map(option => (
                    <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="dateRange"
                        value={option.value}
                        checked={filters.dateRange === option.value}
                        onChange={() => handleFilterChange('dateRange', option.value)}
                        className="border-border text-primary focus:ring-primary-500"
                      />
                      <span className="text-sm text-text-secondary">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tier Filter */}
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-3">Plan Tier</h4>
                <div className="space-y-2">
                  {tiers.map(tier => (
                    <label key={tier} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.tier.includes(tier)}
                        onChange={() => handleFilterChange('tier', tier)}
                        className="rounded border-border text-primary focus:ring-primary-500"
                      />
                      <span className="text-sm text-text-secondary capitalize">{tier}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Active Filters */}
              {activeFilterCount > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-text-primary mb-3">Active Filters</h4>
                  <div className="flex flex-wrap gap-2">
                    {filters.industry.map(industry => (
                      <span
                        key={`industry-${industry}`}
                        className="inline-flex items-center space-x-1 bg-primary-50 text-primary text-xs px-2 py-1 rounded-full"
                      >
                        <span>{industry}</span>
                        <button
                          onClick={() => handleFilterChange('industry', industry)}
                          className="hover:text-primary-700"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      </span>
                    ))}
                    
                    {filters.status.map(status => (
                      <span
                        key={`status-${status}`}
                        className="inline-flex items-center space-x-1 bg-secondary-50 text-secondary text-xs px-2 py-1 rounded-full"
                      >
                        <span className="capitalize">{status}</span>
                        <button
                          onClick={() => handleFilterChange('status', status)}
                          className="hover:text-secondary-700"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      </span>
                    ))}
                    
                    {filters.tier.map(tier => (
                      <span
                        key={`tier-${tier}`}
                        className="inline-flex items-center space-x-1 bg-accent-50 text-accent text-xs px-2 py-1 rounded-full"
                      >
                        <span className="capitalize">{tier}</span>
                        <button
                          onClick={() => handleFilterChange('tier', tier)}
                          className="hover:text-accent-700"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      </span>
                    ))}
                    
                    {filters.dateRange !== 'all' && (
                      <span className="inline-flex items-center space-x-1 bg-success-50 text-success text-xs px-2 py-1 rounded-full">
                        <span>
                          {filters.dateRange === 'week' ? 'Past Week' :
                           filters.dateRange === 'month' ? 'Past Month' :
                           filters.dateRange === 'quarter' ? 'Past 3 Months' : filters.dateRange}
                        </span>
                        <button
                          onClick={() => handleFilterChange('dateRange', 'all')}
                          className="hover:text-success-700"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;