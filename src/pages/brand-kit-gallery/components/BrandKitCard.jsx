import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import LazyImage from 'components/ui/LazyImage';
import Tooltip from 'components/ui/Tooltip';

const BrandKitCard = ({
  brandKit,
  isSelected,
  onSelect,
  onEdit,
  getStatusColor,
  getTierColor
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleCardClick = (e) => {
    if (e.target.type === 'checkbox') return;
    onEdit(brandKit.id);
  };

  const handleQuickAction = (action, e) => {
    e.stopPropagation();
    console.log(`${action} action for brand:`, brandKit.id);

    switch (action) {
      case 'edit':
        onEdit(brandKit.id);
        break;
      case 'duplicate':
        console.log('Duplicating brand kit');
        break;
      case 'export':
        console.log('Exporting brand kit');
        break;
      case 'archive':
        console.log('Archiving brand kit');
        break;
      default:
        break;
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div
      className={`bg-surface rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-elevation-3 transform hover:-translate-y-1 ${isSelected ? 'ring-2 ring-primary shadow-elevation-2' : 'shadow-elevation-1 hover:shadow-elevation-3'
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowActions(false);
      }}
      onClick={handleCardClick}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <LazyImage
          src={brandKit.thumbnail}
          alt={brandKit.name}
          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
          placeholder={
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Icon name="Image" size={32} className="text-gray-400" />
            </div>
          }
        />

        {/* Selection Checkbox */}
        <div className="absolute top-3 left-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(brandKit.id)}
            className="w-4 h-4 rounded border-2 border-white bg-white/80 backdrop-blur-sm text-primary focus:ring-primary-500"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Quick Actions */}
        {(isHovered || showActions) && (
          <div className="absolute top-3 right-3">
            <div className="relative">
              <Tooltip content="More actions">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowActions(!showActions);
                  }}
                  className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  <Icon name="MoreVertical" size={16} />
                </button>
              </Tooltip>

              {showActions && (
                <div className="absolute top-full right-0 mt-1 w-40 bg-surface border border-border rounded-lg shadow-elevation-3 z-10">
                  <div className="py-1">
                    <button
                      onClick={(e) => handleQuickAction('edit', e)}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200"
                    >
                      <Icon name="Edit" size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={(e) => handleQuickAction('duplicate', e)}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200"
                    >
                      <Icon name="Copy" size={14} />
                      <span>Duplicate</span>
                    </button>
                    <button
                      onClick={(e) => handleQuickAction('export', e)}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200"
                    >
                      <Icon name="Download" size={14} />
                      <span>Export</span>
                    </button>
                    <div className="border-t border-border my-1"></div>
                    <button
                      onClick={(e) => handleQuickAction('archive', e)}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-warning hover:text-warning-600 hover:bg-warning-50 transition-colors duration-200"
                    >
                      <Icon name="Archive" size={14} />
                      <span>Archive</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute bottom-3 left-3">
          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(brandKit.status)}`}>
            {brandKit.status === 'complete' && <Icon name="CheckCircle" size={12} className="mr-1" />}
            {brandKit.status === 'draft' && <Icon name="Clock" size={12} className="mr-1" />}
            {brandKit.status === 'archived' && <Icon name="Archive" size={12} className="mr-1" />}
            <span className="capitalize">{brandKit.status}</span>
          </span>
        </div>

        {/* Tier Badge */}
        <div className="absolute bottom-3 right-3">
          <Tooltip content={`${brandKit.tier.charAt(0).toUpperCase() + brandKit.tier.slice(1)} tier`}>
            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getTierColor(brandKit.tier)}`}>
              {brandKit.tier === 'agency' && <Icon name="Crown" size={12} className="mr-1" />}
              {brandKit.tier === 'pro' && <Icon name="Star" size={12} className="mr-1" />}
              {brandKit.tier === 'hobby' && <Icon name="Heart" size={12} className="mr-1" />}
              <span className="capitalize">{brandKit.tier}</span>
            </span>
          </Tooltip>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-text-primary mb-1 truncate">
            {brandKit.name}
          </h3>
          <p className="text-sm text-text-secondary">{brandKit.industry}</p>
        </div>

        {/* Color Palette Preview */}
        <div className="mb-3">
          <div className="flex items-center space-x-1 mb-2">
            <Icon name="Palette" size={14} className="text-text-muted" />
            <span className="text-xs text-text-muted">Colors</span>
          </div>
          <div className="flex space-x-1">
            {brandKit.colors.slice(0, 5).map((color, index) => (
              <Tooltip key={index} content={color}>
                <div
                  className="w-6 h-6 rounded-full border border-border flex-shrink-0 cursor-help"
                  style={{ backgroundColor: color }}
                ></div>
              </Tooltip>
            ))}
            {brandKit.colors.length > 5 && (
              <div className="w-6 h-6 rounded-full border border-border bg-gray-100 flex items-center justify-center">
                <span className="text-xs text-text-muted">+{brandKit.colors.length - 5}</span>
              </div>
            )}
          </div>
        </div>

        {/* Assets Summary */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <div className="flex items-center space-x-3">
              <Tooltip content="Logo variations">
                <div className="flex items-center space-x-1">
                  <Icon name="Image" size={12} />
                  <span>{brandKit.assets.logos}</span>
                </div>
              </Tooltip>
              <Tooltip content="Color palette">
                <div className="flex items-center space-x-1">
                  <Icon name="Palette" size={12} />
                  <span>{brandKit.assets.colors}</span>
                </div>
              </Tooltip>
              <Tooltip content="Typography options">
                <div className="flex items-center space-x-1">
                  <Icon name="Type" size={12} />
                  <span>{brandKit.assets.fonts}</span>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {brandKit.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 text-xs bg-gray-100 text-text-muted rounded"
              >
                {tag}
              </span>
            ))}
            {brandKit.tags.length > 3 && (
              <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-text-muted rounded">
                +{brandKit.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-text-muted pt-3 border-t border-border">
          <span>Created {formatDate(brandKit.createdAt)}</span>
          <span>Modified {formatDate(brandKit.lastModified)}</span>
        </div>
      </div>
    </div>
  );
};

export default BrandKitCard;