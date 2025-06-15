import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const QuickActionsMenu = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const menuRef = useRef(null);

  const shouldShowQuickActions = [
    '/brand-kit-gallery',
    '/brand-kit-preview-editor'
  ].includes(location.pathname);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getContextualActions = () => {
    const baseActions = [
      {
        id: 'create-new',
        label: 'Create New Brand',
        icon: 'Plus',
        color: 'primary',
        action: () => console.log('Create new brand')
      }
    ];

    if (location.pathname === '/brand-kit-gallery') {
      return [
        ...baseActions,
        {
          id: 'bulk-export',
          label: 'Bulk Export',
          icon: 'Download',
          color: 'secondary',
          action: () => console.log('Bulk export'),
          requiresSelection: true
        },
        {
          id: 'duplicate',
          label: 'Duplicate Selected',
          icon: 'Copy',
          color: 'accent',
          action: () => console.log('Duplicate selected'),
          requiresSelection: true
        },
        {
          id: 'archive',
          label: 'Archive Selected',
          icon: 'Archive',
          color: 'warning',
          action: () => console.log('Archive selected'),
          requiresSelection: true
        }
      ];
    }

    if (location.pathname === '/brand-kit-preview-editor') {
      return [
        ...baseActions,
        {
          id: 'save-version',
          label: 'Save Version',
          icon: 'Save',
          color: 'success',
          action: () => console.log('Save version')
        },
        {
          id: 'export-assets',
          label: 'Export Assets',
          icon: 'Download',
          color: 'secondary',
          action: () => console.log('Export assets')
        },
        {
          id: 'share-preview',
          label: 'Share Preview',
          icon: 'Share2',
          color: 'accent',
          action: () => console.log('Share preview')
        },
        {
          id: 'revert-changes',
          label: 'Revert Changes',
          icon: 'RotateCcw',
          color: 'error',
          action: () => console.log('Revert changes')
        }
      ];
    }

    return baseActions;
  };

  const actions = getContextualActions();
  const availableActions = actions.filter(action => 
    !action.requiresSelection || selectedItems.length > 0
  );

  const handleActionClick = (action) => {
    action.action();
    setIsOpen(false);
  };

  const getActionButtonClass = (color) => {
    const colorClasses = {
      primary: 'text-primary hover:bg-primary-50',
      secondary: 'text-secondary hover:bg-secondary-50',
      accent: 'text-accent hover:bg-accent-50',
      success: 'text-success hover:bg-success-50',
      warning: 'text-warning hover:bg-warning-50',
      error: 'text-error hover:bg-error-50'
    };
    return colorClasses[color] || colorClasses.primary;
  };

  const getFloatingButtonClass = () => {
    if (location.pathname === '/brand-kit-preview-editor') {
      return 'bg-secondary hover:bg-secondary-600 focus:ring-secondary-500';
    }
    return 'bg-primary hover:bg-primary-600 focus:ring-primary-500';
  };

  if (!shouldShowQuickActions) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-1200" ref={menuRef}>
      {/* Quick Actions Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-56 bg-surface border border-border rounded-lg shadow-elevation-4 animate-slide-up">
          <div className="py-2">
            <div className="px-3 py-2 border-b border-border">
              <h3 className="text-sm font-medium text-text-primary">Quick Actions</h3>
              {selectedItems.length > 0 && (
                <p className="text-xs text-text-secondary mt-1">
                  {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
                </p>
              )}
            </div>
            
            <div className="py-1">
              {availableActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleActionClick(action)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-sm transition-colors duration-200 ${getActionButtonClass(action.color)}`}
                >
                  <Icon name={action.icon} size={16} />
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
            
            {availableActions.length === 0 && (
              <div className="px-3 py-4 text-center">
                <Icon name="Info" size={16} className="text-text-muted mx-auto mb-2" />
                <p className="text-xs text-text-muted">
                  Select items to see more actions
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-elevation-3 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${getFloatingButtonClass()} ${
          isOpen ? 'rotate-45' : 'hover:scale-105'
        }`}
        aria-label="Quick actions menu"
      >
        <Icon 
          name={isOpen ? "X" : "Zap"} 
          size={20} 
          color="white" 
        />
      </button>

      {/* Selection indicator for gallery */}
      {location.pathname === '/brand-kit-gallery' && selectedItems.length > 0 && (
        <div className="absolute bottom-16 right-16 bg-accent text-white text-xs font-medium px-2 py-1 rounded-full">
          {selectedItems.length}
        </div>
      )}
    </div>
  );
};

export default QuickActionsMenu;