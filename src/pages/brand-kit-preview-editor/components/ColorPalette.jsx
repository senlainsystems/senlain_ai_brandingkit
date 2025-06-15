import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ColorPalette = ({ colors, onColorChange }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [customColor, setCustomColor] = useState('#000000');

  const checkAccessibility = (color1, color2) => {
    // Simple contrast ratio calculation (simplified)
    const getLuminance = (hex) => {
      const rgb = parseInt(hex.slice(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    };
    
    const l1 = getLuminance(color1);
    const l2 = getLuminance(color2);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    
    return {
      ratio: ratio.toFixed(2),
      aa: ratio >= 4.5,
      aaa: ratio >= 7
    };
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    console.log('Copied to clipboard:', text);
  };

  const handleColorEdit = (colorId, newColor) => {
    onColorChange(colorId, newColor);
    setShowColorPicker(false);
    setSelectedColor(null);
  };

  return (
    <div className="space-y-6">
      {/* Primary Colors */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Primary Colors</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { id: 'primary', name: 'Primary', color: colors.primary },
            { id: 'secondary', name: 'Secondary', color: colors.secondary },
            { id: 'accent', name: 'Accent', color: colors.accent },
            { id: 'neutral', name: 'Neutral', color: colors.neutral }
          ].map((colorItem) => (
            <div key={colorItem.id} className="group">
              <div 
                className="w-full h-24 rounded-lg border border-border cursor-pointer relative overflow-hidden transition-transform duration-200 group-hover:scale-105"
                style={{ backgroundColor: colorItem.color }}
                onClick={() => {
                  setSelectedColor(colorItem);
                  setCustomColor(colorItem.color);
                  setShowColorPicker(true);
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                  <Icon name="Edit2" size={16} color="white" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </div>
              
              <div className="mt-2">
                <h3 className="text-sm font-medium text-text-primary">{colorItem.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <button
                    onClick={() => copyToClipboard(colorItem.color)}
                    className="text-xs text-text-secondary hover:text-primary font-mono"
                  >
                    {colorItem.color}
                  </button>
                  <button
                    onClick={() => copyToClipboard(colorItem.color)}
                    className="p-1 rounded hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Icon name="Copy" size={12} className="text-text-muted" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Color Palette */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Complete Palette</h2>
          <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-primary hover:bg-primary-50 rounded-md transition-colors duration-200">
            <Icon name="Plus" size={16} />
            <span>Add Color</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {colors.palette.map((color, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div 
                className="w-16 h-16 rounded-lg border border-border cursor-pointer relative group"
                style={{ backgroundColor: color.hex }}
                onClick={() => {
                  setSelectedColor({ ...color, id: `palette-${index}` });
                  setCustomColor(color.hex);
                  setShowColorPicker(true);
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center rounded-lg">
                  <Icon name="Edit2" size={14} color="white" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-sm font-medium text-text-primary mb-1">{color.name}</h3>
                <p className="text-sm text-text-secondary mb-2">{color.usage}</p>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-text-muted">HEX:</span>
                    <button
                      onClick={() => copyToClipboard(color.hex)}
                      className="text-xs font-mono text-text-secondary hover:text-primary"
                    >
                      {color.hex}
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-text-muted">RGB:</span>
                    <button
                      onClick={() => copyToClipboard(color.rgb)}
                      className="text-xs font-mono text-text-secondary hover:text-primary"
                    >
                      {color.rgb}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => copyToClipboard(color.hex)}
                  className="p-2 rounded hover:bg-gray-100 transition-colors duration-200"
                >
                  <Icon name="Copy" size={16} className="text-text-muted" />
                </button>
                
                <button className="p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                  <Icon name="MoreVertical" size={16} className="text-text-muted" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessibility Checker */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Accessibility Checker</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Text on Primary */}
          <div className="p-4 rounded-lg" style={{ backgroundColor: colors.primary }}>
            <div className="space-y-2">
              <div className="text-white">
                <h3 className="font-semibold">White Text on Primary</h3>
                <p className="text-sm opacity-90">Sample text for readability testing</p>
              </div>
              
              <div className="text-black">
                <h3 className="font-semibold">Black Text on Primary</h3>
                <p className="text-sm opacity-75">Sample text for readability testing</p>
              </div>
            </div>
          </div>
          
          {/* Contrast Ratios */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">White on Primary</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-mono">{checkAccessibility(colors.primary, '#FFFFFF').ratio}:1</span>
                <div className="flex space-x-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    checkAccessibility(colors.primary, '#FFFFFF').aa 
                      ? 'bg-success-100 text-success-700' :'bg-error-100 text-error-700'
                  }`}>
                    AA {checkAccessibility(colors.primary, '#FFFFFF').aa ? '✓' : '✗'}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    checkAccessibility(colors.primary, '#FFFFFF').aaa 
                      ? 'bg-success-100 text-success-700' :'bg-error-100 text-error-700'
                  }`}>
                    AAA {checkAccessibility(colors.primary, '#FFFFFF').aaa ? '✓' : '✗'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Black on Primary</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-mono">{checkAccessibility(colors.primary, '#000000').ratio}:1</span>
                <div className="flex space-x-1">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    checkAccessibility(colors.primary, '#000000').aa 
                      ? 'bg-success-100 text-success-700' :'bg-error-100 text-error-700'
                  }`}>
                    AA {checkAccessibility(colors.primary, '#000000').aa ? '✓' : '✗'}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    checkAccessibility(colors.primary, '#000000').aaa 
                      ? 'bg-success-100 text-success-700' :'bg-error-100 text-error-700'
                  }`}>
                    AAA {checkAccessibility(colors.primary, '#000000').aaa ? '✓' : '✗'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Picker Modal */}
      {showColorPicker && selectedColor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg p-6 w-96 max-w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Edit {selectedColor.name || 'Color'}
              </h3>
              <button
                onClick={() => setShowColorPicker(false)}
                className="p-2 rounded hover:bg-gray-100 transition-colors duration-200"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Color Value
                </label>
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-full h-12 rounded border border-border cursor-pointer"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Hex Value
                </label>
                <input
                  type="text"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowColorPicker(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-text-secondary border border-border rounded-md hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleColorEdit(selectedColor.id, customColor)}
                  className="flex-1 px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary-600 transition-colors duration-200"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPalette;