import React, { forwardRef, useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const AssetCanvas = forwardRef(({ 
  selectedAsset, 
  zoomLevel, 
  background, 
  brandData, 
  onAssetSelect 
}, ref) => {
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [assetPosition, setAssetPosition] = useState({ x: 0, y: 0 });

  const currentAsset = brandData.assets.logos.find(logo => logo.id === selectedAsset);

  const getBackgroundStyle = () => {
    if (background === 'transparent') {
      return {
        backgroundColor: 'transparent',
        backgroundImage: `
          linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
          linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
          linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
      };
    }
    
    const backgroundColors = {
      'white': '#FFFFFF',
      'light-gray': '#F3F4F6',
      'dark-gray': '#374151',
      'black': '#000000',
      'primary': brandData.assets.colors.primary
    };
    
    return {
      backgroundColor: backgroundColors[background] || '#FFFFFF'
    };
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - assetPosition.x,
      y: e.clientY - assetPosition.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    setAssetPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const sizePresets = [
    { label: 'Small', size: 120 },
    { label: 'Medium', size: 200 },
    { label: 'Large', size: 300 },
    { label: 'Extra Large', size: 400 }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Canvas Controls */}
      <div className="flex items-center justify-between mb-4 p-4 bg-surface border border-border rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-primary">Zoom:</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onAssetSelect && onAssetSelect(Math.max(25, zoomLevel - 25))}
                className="p-1 rounded text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200"
              >
                <Icon name="Minus" size={16} />
              </button>
              <span className="text-sm font-mono w-12 text-center">{zoomLevel}%</span>
              <button
                onClick={() => onAssetSelect && onAssetSelect(Math.min(400, zoomLevel + 25))}
                className="p-1 rounded text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200"
              >
                <Icon name="Plus" size={16} />
              </button>
            </div>
          </div>
          
          <div className="h-4 w-px bg-border"></div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-primary">Size:</span>
            <div className="flex space-x-1">
              {sizePresets.map((preset) => (
                <button
                  key={preset.label}
                  className="px-2 py-1 text-xs font-medium text-text-secondary hover:text-primary hover:bg-primary-50 rounded transition-colors duration-200"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200">
            <Icon name="RotateCw" size={16} />
          </button>
          <button className="p-2 rounded text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200">
            <Icon name="Flip" size={16} />
          </button>
          <button className="p-2 rounded text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200">
            <Icon name="Copy" size={16} />
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div 
        ref={ref}
        className="flex-1 relative border-2 border-dashed border-border rounded-lg overflow-hidden"
        style={getBackgroundStyle()}
      >
        {/* Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Center Guidelines */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-px bg-primary opacity-20"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-full w-px bg-primary opacity-20"></div>
        </div>
        
        {/* Asset Display */}
        {currentAsset && (
          <div 
            className="absolute cursor-move select-none"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) translate(${assetPosition.x}px, ${assetPosition.y}px) scale(${zoomLevel / 100})`,
              transformOrigin: 'center'
            }}
            onMouseDown={handleMouseDown}
          >
            <div className="relative group">
              <Image
                src={currentAsset.url}
                alt={currentAsset.name}
                className="max-w-none h-48 w-auto"
              />
              
              {/* Asset Selection Indicator */}
              <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded">
                <div className="absolute -top-6 left-0 bg-primary text-white text-xs px-2 py-1 rounded">
                  {currentAsset.name}
                </div>
              </div>
              
              {/* Resize Handles */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-nw-resize"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-ne-resize"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-sw-resize"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-se-resize"></div>
            </div>
          </div>
        )}
        
        {/* Canvas Info */}
        <div className="absolute bottom-4 left-4 bg-surface bg-opacity-90 backdrop-blur-sm px-3 py-2 rounded-lg border border-border">
          <div className="text-xs text-text-secondary">
            Canvas: {canvasSize.width} × {canvasSize.height}px
          </div>
        </div>
        
        {/* Zoom Info */}
        <div className="absolute bottom-4 right-4 bg-surface bg-opacity-90 backdrop-blur-sm px-3 py-2 rounded-lg border border-border">
          <div className="text-xs text-text-secondary">
            Zoom: {zoomLevel}%
          </div>
        </div>
      </div>
      
      {/* Asset Variations */}
      {currentAsset && currentAsset.variations && (
        <div className="mt-4 p-4 bg-surface border border-border rounded-lg">
          <h3 className="text-sm font-medium text-text-primary mb-3">Variations</h3>
          <div className="flex space-x-3">
            {currentAsset.variations.map((variation) => (
              <button
                key={variation}
                className="flex flex-col items-center space-y-2 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary-50 transition-colors duration-200"
              >
                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                  <Image
                    src={currentAsset.url}
                    alt={variation}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <span className="text-xs text-text-secondary capitalize">
                  {variation.replace('-', ' ')}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

AssetCanvas.displayName = 'AssetCanvas';

export default AssetCanvas;