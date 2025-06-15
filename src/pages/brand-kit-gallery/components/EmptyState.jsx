import React from 'react';
import Icon from 'components/AppIcon';

const EmptyState = ({ searchQuery, hasFilters, onCreateNew, onClearFilters }) => {
  if (searchQuery || hasFilters) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Search" size={32} className="text-text-muted" />
        </div>
        
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          No brand kits found
        </h3>
        
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          {searchQuery 
            ? `No brand kits match "${searchQuery}". Try adjusting your search terms or filters.`
            : "No brand kits match your current filters. Try adjusting your filter criteria."
          }
        </p>

        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={onClearFilters}
            className="px-6 py-3 text-primary border border-primary rounded-lg hover:bg-primary-50 transition-all duration-200 font-medium"
          >
            Clear {searchQuery ? 'Search & ' : ''}Filters
          </button>
          
          <button
            onClick={onCreateNew}
            className="btn-primary px-6 py-3 rounded-lg font-medium inline-flex items-center space-x-2"
          >
            <Icon name="Plus" size={18} />
            <span>Create New Brand</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-16">
      <div className="w-32 h-32 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-full flex items-center justify-center mx-auto mb-8">
        <Icon name="Palette" size={48} className="text-primary" />
      </div>
      
      <h3 className="text-2xl font-bold text-text-primary mb-4">
        Start Building Your Brand Collection
      </h3>
      
      <p className="text-text-secondary mb-8 max-w-lg mx-auto">
        Create your first brand kit with AI-powered tools. Generate logos, color palettes, 
        typography, and complete brand guidelines in minutes.
      </p>

      <div className="space-y-4">
        <button
          onClick={onCreateNew}
          className="btn-primary px-8 py-4 rounded-lg font-medium inline-flex items-center space-x-3 text-lg"
        >
          <Icon name="Sparkles" size={20} />
          <span>Create Your First Brand</span>
        </button>
        
        <div className="flex items-center justify-center space-x-8 text-sm text-text-muted">
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={16} className="text-accent" />
            <span>AI-Powered Generation</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Download" size={16} className="text-success" />
            <span>Multiple Export Formats</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-secondary" />
            <span>Team Collaboration</span>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="Wand2" size={24} className="text-primary" />
          </div>
          <h4 className="text-lg font-semibold text-text-primary mb-2">AI Brand Generation</h4>
          <p className="text-text-secondary text-sm">
            Generate complete brand identities with logos, colors, and typography using advanced AI
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-secondary-50 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="Layers" size={24} className="text-secondary" />
          </div>
          <h4 className="text-lg font-semibold text-text-primary mb-2">Complete Brand Kits</h4>
          <p className="text-text-secondary text-sm">
            Get everything you need: logos, color palettes, fonts, and brand guidelines
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-accent-50 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="Share2" size={24} className="text-accent" />
          </div>
          <h4 className="text-lg font-semibold text-text-primary mb-2">Easy Export & Share</h4>
          <p className="text-text-secondary text-sm">
            Download assets in multiple formats and share with your team or clients
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;