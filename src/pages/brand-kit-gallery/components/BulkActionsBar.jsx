import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BulkActionsBar = ({ selectedCount, onAction, onCancel }) => {
  const [showConfirmation, setShowConfirmation] = useState(null);

  const actions = [
    {
      id: 'export',
      label: 'Export',
      icon: 'Download',
      color: 'primary',
      description: 'Download selected brand kits'
    },
    {
      id: 'duplicate',
      label: 'Duplicate',
      icon: 'Copy',
      color: 'secondary',
      description: 'Create copies of selected brand kits'
    },
    {
      id: 'archive',
      label: 'Archive',
      icon: 'Archive',
      color: 'warning',
      description: 'Move selected brand kits to archive',
      requiresConfirmation: true
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: 'Trash2',
      color: 'error',
      description: 'Permanently delete selected brand kits',
      requiresConfirmation: true
    }
  ];

  const handleActionClick = (action) => {
    if (action.requiresConfirmation) {
      setShowConfirmation(action);
    } else {
      onAction(action.id);
    }
  };

  const handleConfirmAction = () => {
    if (showConfirmation) {
      onAction(showConfirmation.id);
      setShowConfirmation(null);
    }
  };

  const getActionButtonClass = (color) => {
    const colorClasses = {
      primary: 'text-primary hover:bg-primary-50 border-primary-200',
      secondary: 'text-secondary hover:bg-secondary-50 border-secondary-200',
      warning: 'text-warning hover:bg-warning-50 border-warning-200',
      error: 'text-error hover:bg-error-50 border-error-200'
    };
    return colorClasses[color] || colorClasses.primary;
  };

  return (
    <>
      {/* Bulk Actions Bar */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-1100">
        <div className="bg-surface border border-border rounded-lg shadow-elevation-4 px-6 py-4">
          <div className="flex items-center space-x-6">
            {/* Selection Info */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{selectedCount}</span>
              </div>
              <span className="text-text-primary font-medium">
                {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleActionClick(action)}
                  className={`inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium border rounded-lg transition-all duration-200 ${getActionButtonClass(action.color)}`}
                  title={action.description}
                >
                  <Icon name={action.icon} size={16} />
                  <span>{action.label}</span>
                </button>
              ))}
            </div>

            {/* Cancel */}
            <button
              onClick={onCancel}
              className="text-text-muted hover:text-text-primary transition-colors duration-200"
              title="Cancel selection"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1200">
          <div className="bg-surface border border-border rounded-lg shadow-elevation-5 max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  showConfirmation.color === 'error' ? 'bg-error-50' : 'bg-warning-50'
                }`}>
                  <Icon 
                    name={showConfirmation.icon} 
                    size={20} 
                    className={showConfirmation.color === 'error' ? 'text-error' : 'text-warning'}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {showConfirmation.label} Brand Kits
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {showConfirmation.description}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-text-secondary">
                  Are you sure you want to {showConfirmation.label.toLowerCase()} {selectedCount} brand kit{selectedCount !== 1 ? 's' : ''}?
                  {showConfirmation.id === 'delete' && (
                    <span className="block mt-2 text-error font-medium">
                      This action cannot be undone.
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmation(null)}
                  className="px-4 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAction}
                  className={`px-4 py-2 text-white rounded-lg font-medium transition-all duration-200 ${
                    showConfirmation.color === 'error' ?'bg-error hover:bg-error-600' :'bg-warning hover:bg-warning-600'
                  }`}
                >
                  {showConfirmation.label}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActionsBar;