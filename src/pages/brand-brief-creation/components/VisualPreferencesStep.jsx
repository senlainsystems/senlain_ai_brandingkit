import React, { useState, useRef } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const VisualPreferencesStep = ({ data, onUpdate }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const predefinedColors = [
    '#1E40AF', '#7C3AED', '#F59E0B', '#10B981', '#EF4444',
    '#8B5CF6', '#06B6D4', '#84CC16', '#F97316', '#EC4899',
    '#6366F1', '#14B8A6', '#EAB308', '#DC2626', '#9333EA',
    '#0EA5E9', '#65A30D', '#EA580C', '#BE185D', '#4F46E5'
  ];

  const colorPalettes = [
    { name: 'Professional Blue', colors: ['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'] },
    { name: 'Creative Purple', colors: ['#7C3AED', '#8B5CF6', '#A78BFA', '#C4B5FD', '#EDE9FE'] },
    { name: 'Energetic Orange', colors: ['#F59E0B', '#FBBF24', '#FCD34D', '#FDE68A', '#FEF3C7'] },
    { name: 'Natural Green', colors: ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0', '#D1FAE5'] },
    { name: 'Bold Red', colors: ['#EF4444', '#F87171', '#FCA5A5', '#FECACA', '#FEE2E2'] },
    { name: 'Elegant Black', colors: ['#111827', '#374151', '#6B7280', '#9CA3AF', '#F3F4F6'] }
  ];

  const handleColorSelect = (color) => {
    const currentColors = data.colorPalette || [];
    if (currentColors.includes(color)) {
      onUpdate({ colorPalette: currentColors.filter(c => c !== color) });
    } else if (currentColors.length < 5) {
      onUpdate({ colorPalette: [...currentColors, color] });
    }
  };

  const handlePaletteSelect = (palette) => {
    onUpdate({ colorPalette: palette.colors });
  };

  const handleStyleToggle = (category, value) => {
    onUpdate({
      stylePreferences: {
        ...data.stylePreferences,
        [category]: value
      }
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const imageFiles = fileArray.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      const currentMoodBoard = data.moodBoard || [];
      const newImages = imageFiles.slice(0, 5 - currentMoodBoard.length).map(file => ({
        id: Date.now() + Math.random(),
        file,
        url: URL.createObjectURL(file),
        name: file.name
      }));
      
      onUpdate({ moodBoard: [...currentMoodBoard, ...newImages] });
    }
  };

  const removeMoodBoardImage = (imageId) => {
    const updatedMoodBoard = (data.moodBoard || []).filter(img => img.id !== imageId);
    onUpdate({ moodBoard: updatedMoodBoard });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Visual Preferences</h2>
        <p className="text-text-secondary">
          Define the visual style and mood for your brand
        </p>
      </div>

      {/* Color Palette Selection */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">Color Palette</h3>
          <p className="text-sm text-text-secondary mb-4">
            Choose up to 5 colors that represent your brand (selected: {(data.colorPalette || []).length}/5)
          </p>
        </div>

        {/* Predefined Palettes */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3">Suggested Palettes</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colorPalettes.map((palette, index) => (
              <button
                key={index}
                onClick={() => handlePaletteSelect(palette)}
                className="p-4 border border-border rounded-lg hover:bg-surface transition-all duration-200 text-left"
              >
                <div className="flex space-x-1 mb-2">
                  {palette.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-6 h-6 rounded border border-border"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
                <p className="text-sm font-medium text-text-primary">{palette.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Individual Color Selection */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3">Individual Colors</h4>
          <div className="grid grid-cols-10 gap-2">
            {predefinedColors.map((color, index) => (
              <button
                key={index}
                onClick={() => handleColorSelect(color)}
                className={`w-10 h-10 rounded-lg border-2 transition-all duration-200 ${
                  (data.colorPalette || []).includes(color)
                    ? 'border-text-primary scale-110' :'border-border hover:border-text-secondary'
                }`}
                style={{ backgroundColor: color }}
              >
                {(data.colorPalette || []).includes(color) && (
                  <Icon name="Check" size={16} color="white" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Colors Display */}
        {(data.colorPalette || []).length > 0 && (
          <div className="p-4 bg-surface border border-border rounded-lg">
            <h4 className="text-sm font-medium text-text-primary mb-3">Your Selected Colors</h4>
            <div className="flex space-x-2">
              {(data.colorPalette || []).map((color, index) => (
                <div key={index} className="flex flex-col items-center space-y-1">
                  <div
                    className="w-12 h-12 rounded-lg border border-border"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="text-xs text-text-secondary font-mono">{color}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mood Board Upload */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">Mood Board</h3>
          <p className="text-sm text-text-secondary mb-4">
            Upload images that inspire your brand's visual direction (up to 5 images)
          </p>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            dragActive
              ? 'border-primary bg-primary-50' :'border-border hover:border-primary hover:bg-primary-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Icon name="Upload" size={32} className="text-text-muted mx-auto mb-4" />
          <p className="text-text-primary font-medium mb-2">
            Drag and drop images here, or click to browse
          </p>
          <p className="text-sm text-text-secondary mb-4">
            PNG, JPG, GIF up to 10MB each
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-primary px-6 py-2 rounded-lg"
          >
            Choose Files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
        </div>

        {/* Uploaded Images */}
        {(data.moodBoard || []).length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {(data.moodBoard || []).map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border border-border">
                  <Image
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => removeMoodBoardImage(image.id)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Style Preferences */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">Style Preferences</h3>
          <p className="text-sm text-text-secondary mb-4">
            Choose the style direction that best fits your brand
          </p>
        </div>

        <div className="space-y-6">
          {/* Modern vs Classic */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-text-primary">Design Era</h4>
            <div className="flex space-x-4">
              <button
                onClick={() => handleStyleToggle('modernClassic', 'modern')}
                className={`flex-1 p-4 border rounded-lg transition-all duration-200 ${
                  data.stylePreferences?.modernClassic === 'modern' ?'border-primary bg-primary-50 text-primary' :'border-border bg-background text-text-secondary hover:bg-surface'
                }`}
              >
                <Icon name="Zap" size={20} className="mx-auto mb-2" />
                <p className="font-medium">Modern</p>
                <p className="text-xs opacity-80">Clean, minimal, contemporary</p>
              </button>
              <button
                onClick={() => handleStyleToggle('modernClassic', 'classic')}
                className={`flex-1 p-4 border rounded-lg transition-all duration-200 ${
                  data.stylePreferences?.modernClassic === 'classic' ?'border-primary bg-primary-50 text-primary' :'border-border bg-background text-text-secondary hover:bg-surface'
                }`}
              >
                <Icon name="Crown" size={20} className="mx-auto mb-2" />
                <p className="font-medium">Classic</p>
                <p className="text-xs opacity-80">Timeless, traditional, elegant</p>
              </button>
            </div>
          </div>

          {/* Bold vs Subtle */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-text-primary">Visual Impact</h4>
            <div className="flex space-x-4">
              <button
                onClick={() => handleStyleToggle('boldSubtle', 'bold')}
                className={`flex-1 p-4 border rounded-lg transition-all duration-200 ${
                  data.stylePreferences?.boldSubtle === 'bold' ?'border-primary bg-primary-50 text-primary' :'border-border bg-background text-text-secondary hover:bg-surface'
                }`}
              >
                <Icon name="Volume2" size={20} className="mx-auto mb-2" />
                <p className="font-medium">Bold</p>
                <p className="text-xs opacity-80">Strong, vibrant, attention-grabbing</p>
              </button>
              <button
                onClick={() => handleStyleToggle('boldSubtle', 'subtle')}
                className={`flex-1 p-4 border rounded-lg transition-all duration-200 ${
                  data.stylePreferences?.boldSubtle === 'subtle' ?'border-primary bg-primary-50 text-primary' :'border-border bg-background text-text-secondary hover:bg-surface'
                }`}
              >
                <Icon name="VolumeX" size={20} className="mx-auto mb-2" />
                <p className="font-medium">Subtle</p>
                <p className="text-xs opacity-80">Refined, understated, sophisticated</p>
              </button>
            </div>
          </div>

          {/* Playful vs Professional */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-text-primary">Brand Personality</h4>
            <div className="flex space-x-4">
              <button
                onClick={() => handleStyleToggle('playfulProfessional', 'playful')}
                className={`flex-1 p-4 border rounded-lg transition-all duration-200 ${
                  data.stylePreferences?.playfulProfessional === 'playful' ?'border-primary bg-primary-50 text-primary' :'border-border bg-background text-text-secondary hover:bg-surface'
                }`}
              >
                <Icon name="Smile" size={20} className="mx-auto mb-2" />
                <p className="font-medium">Playful</p>
                <p className="text-xs opacity-80">Fun, creative, approachable</p>
              </button>
              <button
                onClick={() => handleStyleToggle('playfulProfessional', 'professional')}
                className={`flex-1 p-4 border rounded-lg transition-all duration-200 ${
                  data.stylePreferences?.playfulProfessional === 'professional' ?'border-primary bg-primary-50 text-primary' :'border-border bg-background text-text-secondary hover:bg-surface'
                }`}
              >
                <Icon name="Briefcase" size={20} className="mx-auto mb-2" />
                <p className="font-medium">Professional</p>
                <p className="text-xs opacity-80">Serious, trustworthy, corporate</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualPreferencesStep;