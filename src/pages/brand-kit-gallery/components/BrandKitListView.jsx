import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const BrandKitListView = ({ 
  brandKits, 
  selectedItems, 
  onSelect, 
  onEdit, 
  getStatusColor, 
  getTierColor 
}) => {
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [editingName, setEditingName] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleEditName = (brandKit) => {
    setEditingName(brandKit.id);
    setEditValue(brandKit.name);
  };

  const handleSaveName = (id) => {
    console.log(`Saving name for ${id}:`, editValue);
    setEditingName(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditingName(null);
    setEditValue('');
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getSortIcon = (column) => {
    if (sortColumn !== column) return 'ArrowUpDown';
    return sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="bg-gray-50 border-b border-border">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 text-sm font-medium text-text-secondary">
          <div className="col-span-1 flex items-center">
            <input
              type="checkbox"
              checked={selectedItems.length === brandKits.length && brandKits.length > 0}
              onChange={() => {
                if (selectedItems.length === brandKits.length) {
                  brandKits.forEach(kit => onSelect(kit.id));
                } else {
                  brandKits.forEach(kit => {
                    if (!selectedItems.includes(kit.id)) {
                      onSelect(kit.id);
                    }
                  });
                }
              }}
              className="rounded border-border text-primary focus:ring-primary-500"
            />
          </div>
          
          <div className="col-span-3">
            <button
              onClick={() => handleSort('name')}
              className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-200"
            >
              <span>Brand Name</span>
              <Icon name={getSortIcon('name')} size={14} />
            </button>
          </div>
          
          <div className="col-span-2">
            <button
              onClick={() => handleSort('industry')}
              className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-200"
            >
              <span>Industry</span>
              <Icon name={getSortIcon('industry')} size={14} />
            </button>
          </div>
          
          <div className="col-span-1">
            <button
              onClick={() => handleSort('status')}
              className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-200"
            >
              <span>Status</span>
              <Icon name={getSortIcon('status')} size={14} />
            </button>
          </div>
          
          <div className="col-span-1">
            <button
              onClick={() => handleSort('tier')}
              className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-200"
            >
              <span>Tier</span>
              <Icon name={getSortIcon('tier')} size={14} />
            </button>
          </div>
          
          <div className="col-span-2">
            <button
              onClick={() => handleSort('createdAt')}
              className="flex items-center space-x-1 hover:text-text-primary transition-colors duration-200"
            >
              <span>Created</span>
              <Icon name={getSortIcon('createdAt')} size={14} />
            </button>
          </div>
          
          <div className="col-span-2">
            <span>Assets</span>
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-border">
        {brandKits.map((brandKit) => (
          <div
            key={brandKit.id}
            className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-200 ${
              selectedItems.includes(brandKit.id) ? 'bg-primary-50' : ''
            }`}
          >
            {/* Selection */}
            <div className="col-span-1 flex items-center">
              <input
                type="checkbox"
                checked={selectedItems.includes(brandKit.id)}
                onChange={() => onSelect(brandKit.id)}
                className="rounded border-border text-primary focus:ring-primary-500"
              />
            </div>

            {/* Brand Name & Thumbnail */}
            <div className="col-span-3 flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={brandKit.thumbnail}
                  alt={brandKit.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                {editingName === brandKit.id ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="input-field px-2 py-1 text-sm flex-1"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveName(brandKit.id);
                        if (e.key === 'Escape') handleCancelEdit();
                      }}
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveName(brandKit.id)}
                      className="text-success hover:text-success-600"
                    >
                      <Icon name="Check" size={14} />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="text-error hover:text-error-600"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEdit(brandKit.id)}
                      className="text-text-primary hover:text-primary font-medium truncate text-left"
                    >
                      {brandKit.name}
                    </button>
                    <button
                      onClick={() => handleEditName(brandKit)}
                      className="text-text-muted hover:text-text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <Icon name="Edit" size={12} />
                    </button>
                  </div>
                )}
                
                {/* Color Preview */}
                <div className="flex space-x-1 mt-1">
                  {brandKit.colors.slice(0, 3).map((color, index) => (
                    <div
                      key={index}
                      className="w-3 h-3 rounded-full border border-border"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                  {brandKit.colors.length > 3 && (
                    <span className="text-xs text-text-muted">+{brandKit.colors.length - 3}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Industry */}
            <div className="col-span-2 flex items-center">
              <span className="text-text-secondary">{brandKit.industry}</span>
            </div>

            {/* Status */}
            <div className="col-span-1 flex items-center">
              <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(brandKit.status)}`}>
                {brandKit.status === 'complete' && <Icon name="CheckCircle" size={10} className="mr-1" />}
                {brandKit.status === 'draft' && <Icon name="Clock" size={10} className="mr-1" />}
                {brandKit.status === 'archived' && <Icon name="Archive" size={10} className="mr-1" />}
                <span className="capitalize">{brandKit.status}</span>
              </span>
            </div>

            {/* Tier */}
            <div className="col-span-1 flex items-center">
              <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getTierColor(brandKit.tier)}`}>
                {brandKit.tier === 'agency' && <Icon name="Crown" size={10} className="mr-1" />}
                {brandKit.tier === 'pro' && <Icon name="Star" size={10} className="mr-1" />}
                {brandKit.tier === 'hobby' && <Icon name="Heart" size={10} className="mr-1" />}
                <span className="capitalize">{brandKit.tier}</span>
              </span>
            </div>

            {/* Created Date */}
            <div className="col-span-2 flex items-center">
              <div className="text-sm">
                <div className="text-text-secondary">{formatDate(brandKit.createdAt)}</div>
                <div className="text-xs text-text-muted">Modified {formatDate(brandKit.lastModified)}</div>
              </div>
            </div>

            {/* Assets */}
            <div className="col-span-2 flex items-center">
              <div className="flex items-center space-x-4 text-xs text-text-muted">
                <div className="flex items-center space-x-1">
                  <Icon name="Image" size={12} />
                  <span>{brandKit.assets.logos}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Palette" size={12} />
                  <span>{brandKit.assets.colors}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Type" size={12} />
                  <span>{brandKit.assets.fonts}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="FileText" size={12} />
                  <span>{brandKit.assets.guidelines}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandKitListView;