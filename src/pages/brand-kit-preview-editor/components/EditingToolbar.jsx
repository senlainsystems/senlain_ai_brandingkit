import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const EditingToolbar = ({ 
  selectedAsset, 
  zoomLevel, 
  background, 
  backgroundOptions, 
  onZoomChange, 
  onBackgroundChange, 
  onAssetChange 
}) => {
  const [activeColorPicker, setActiveColorPicker] = useState(null);
  const [logoSettings, setLogoSettings] = useState({
    opacity: 100,
    rotation: 0,
    brightness: 100,
    contrast: 100,
    saturation: 100
  });

  const handleSettingChange = (setting, value) => {
    const newSettings = { ...logoSettings, [setting]: value };
    setLogoSettings(newSettings);
    onAssetChange(newSettings);
  };

  const resetSettings = () => {
    const defaultSettings = {
      opacity: 100,
      rotation: 0,
      brightness: 100,
      contrast: 100,
      saturation: 100
    };
    setLogoSettings(defaultSettings);
    onAssetChange(defaultSettings);
  };

  const toolSections = [
    {
      title: 'Canvas',
      tools: [
        {
          type: 'zoom',
          label: 'Zoom',
          value: zoomLevel,
          min: 25,
          max: 400,
          step: 25,
          onChange: onZoomChange
        },
        {
          type: 'background',
          label: 'Background',
          value: background,
          options: backgroundOptions,
          onChange: onBackgroundChange
        }
      ]
    },
    {
      title: 'Logo Adjustments',
      tools: [
        {
          type: 'slider',
          label: 'Opacity',
          value: logoSettings.opacity,
          min: 0,
          max: 100,
          step: 1,
          unit: '%',
          onChange: (value) => handleSettingChange('opacity', value)
        },
        {
          type: 'slider',
          label: 'Rotation',
          value: logoSettings.rotation,
          min: -180,
          max: 180,
          step: 1,
          unit: '°',
          onChange: (value) => handleSettingChange('rotation', value)
        },
        {
          type: 'slider',
          label: 'Brightness',
          value: logoSettings.brightness,
          min: 0,
          max: 200,
          step: 1,
          unit: '%',
          onChange: (value) => handleSettingChange('brightness', value)
        },
        {
          type: 'slider',
          label: 'Contrast',
          value: logoSettings.contrast,
          min: 0,
          max: 200,
          step: 1,
          unit: '%',
          onChange: (value) => handleSettingChange('contrast', value)
        },
        {
          type: 'slider',
          label: 'Saturation',
          value: logoSettings.saturation,
          min: 0,
          max: 200,
          step: 1,
          unit: '%',
          onChange: (value) => handleSettingChange('saturation', value)
        }
      ]
    }
  ];

  const renderTool = (tool) => {
    switch (tool.type) {
      case 'zoom':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-primary">{tool.label}</span>
              <span className="text-sm text-text-secondary">{tool.value}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => tool.onChange(Math.max(tool.min, tool.value - tool.step))}
                className="p-1 rounded text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200"
              >
                <Icon name="Minus" size={14} />
              </button>
              <input
                type="range"
                min={tool.min}
                max={tool.max}
                step={tool.step}
                value={tool.value}
                onChange={(e) => tool.onChange(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <button
                onClick={() => tool.onChange(Math.min(tool.max, tool.value + tool.step))}
                className="p-1 rounded text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200"
              >
                <Icon name="Plus" size={14} />
              </button>
            </div>
          </div>
        );

      case 'background':
        return (
          <div className="space-y-2">
            <span className="text-sm font-medium text-text-primary">{tool.label}</span>
            <div className="grid grid-cols-3 gap-2">
              {tool.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => tool.onChange(option.id)}
                  className={`relative w-full h-8 rounded border-2 transition-colors duration-200 ${
                    tool.value === option.id
                      ? 'border-primary' :'border-border hover:border-gray-300'
                  }`}
                  style={{
                    backgroundColor: option.pattern === 'checkerboard' ? 'transparent' : option.color,
                    backgroundImage: option.pattern === 'checkerboard' ? `
                      linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
                      linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
                      linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
                      linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)
                    ` : 'none',
                    backgroundSize: option.pattern === 'checkerboard' ? '8px 8px' : 'auto',
                    backgroundPosition: option.pattern === 'checkerboard' ? '0 0, 0 4px, 4px -4px, -4px 0px' : 'auto'
                  }}
                  title={option.label}
                >
                  {tool.value === option.id && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon name="Check" size={12} color={option.id === 'white' || option.id === 'light-gray' ? '#000' : '#fff'} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 'slider':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-primary">{tool.label}</span>
              <span className="text-sm text-text-secondary">
                {tool.value}{tool.unit}
              </span>
            </div>
            <input
              type="range"
              min={tool.min}
              max={tool.max}
              step={tool.step}
              value={tool.value}
              onChange={(e) => tool.onChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text-primary">Editing Tools</h2>
        <button
          onClick={resetSettings}
          className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
        >
          Reset
        </button>
      </div>

      {toolSections.map((section) => (
        <div key={section.title} className="space-y-4">
          <h3 className="text-sm font-medium text-text-primary border-b border-border pb-2">
            {section.title}
          </h3>
          
          <div className="space-y-4">
            {section.tools.map((tool, index) => (
              <div key={`${section.title}-${index}`}>
                {renderTool(tool)}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-text-primary border-b border-border pb-2">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center space-x-2 p-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary-50 rounded-md transition-colors duration-200">
            <Icon name="RotateCw" size={14} />
            <span>Rotate</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary-50 rounded-md transition-colors duration-200">
            <Icon name="FlipHorizontal" size={14} />
            <span>Flip</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary-50 rounded-md transition-colors duration-200">
            <Icon name="Copy" size={14} />
            <span>Duplicate</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-2 text-sm font-medium text-text-secondary hover:text-primary hover:bg-primary-50 rounded-md transition-colors duration-200">
            <Icon name="Trash2" size={14} />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Format Options */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-text-primary border-b border-border pb-2">
          Format Options
        </h3>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Size</span>
            <select className="text-sm border border-border rounded px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option>Small (256px)</option>
              <option>Medium (512px)</option>
              <option>Large (1024px)</option>
              <option>Custom</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Format</span>
            <select className="text-sm border border-border rounded px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option>PNG</option>
              <option>SVG</option>
              <option>JPG</option>
              <option>PDF</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditingToolbar;