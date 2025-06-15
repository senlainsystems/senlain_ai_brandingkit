import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const TypographyPanel = ({ typography, onTypographyChange }) => {
  const [selectedFont, setSelectedFont] = useState(null);
  const [showFontPicker, setShowFontPicker] = useState(false);

  const sampleTexts = {
    headline: 'The quick brown fox jumps over the lazy dog',
    subheading: 'Typography is the art and technique of arranging type',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    caption: 'Small text for captions and fine print'
  };

  const fontSizes = {
    headline: { desktop: '48px', mobile: '32px' },
    subheading: { desktop: '24px', mobile: '20px' },
    body: { desktop: '16px', mobile: '14px' },
    caption: { desktop: '12px', mobile: '11px' }
  };

  const webFontCode = `
/* Google Fonts Import */
@import url('https://fonts.googleapis.com/css2?family=${typography.primary.name.replace(' ', '+')}:wght@${typography.primary.weights.join(';')}&family=${typography.secondary.name.replace(' ', '+')}:wght@${typography.secondary.weights.join(';')}&display=swap');

/* CSS Variables */
:root {
  --font-primary: '${typography.primary.name}', ${typography.primary.category};
  --font-secondary: '${typography.secondary.name}', ${typography.secondary.category};
}

/* Typography Classes */
.font-primary { font-family: var(--font-primary); }
.font-secondary { font-family: var(--font-secondary); }
`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    console.log('Copied to clipboard');
  };

  const renderFontPreview = (font, label) => (
    <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">{label}</h3>
          <p className="text-sm text-text-secondary">
            {font.name} • {font.category} • {font.weights.length} weights
          </p>
        </div>
        
        <button
          onClick={() => {
            setSelectedFont({ ...font, label });
            setShowFontPicker(true);
          }}
          className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-primary hover:bg-primary-50 rounded-md transition-colors duration-200"
        >
          <Icon name="Edit2" size={16} />
          <span>Edit</span>
        </button>
      </div>

      <div className="space-y-4">
        {/* Headline */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">Headline</span>
            <span className="text-xs text-text-secondary">
              {fontSizes.headline.desktop} / {fontSizes.headline.mobile}
            </span>
          </div>
          <div 
            className="text-text-primary leading-tight"
            style={{ 
              fontFamily: font.name,
              fontSize: fontSizes.headline.desktop,
              fontWeight: font.weights.includes('700') ? '700' : font.weights[font.weights.length - 1]
            }}
          >
            {sampleTexts.headline}
          </div>
        </div>

        {/* Subheading */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">Subheading</span>
            <span className="text-xs text-text-secondary">
              {fontSizes.subheading.desktop} / {fontSizes.subheading.mobile}
            </span>
          </div>
          <div 
            className="text-text-primary leading-relaxed"
            style={{ 
              fontFamily: font.name,
              fontSize: fontSizes.subheading.desktop,
              fontWeight: font.weights.includes('600') ? '600' : font.weights[Math.floor(font.weights.length / 2)]
            }}
          >
            {sampleTexts.subheading}
          </div>
        </div>

        {/* Body Text */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">Body Text</span>
            <span className="text-xs text-text-secondary">
              {fontSizes.body.desktop} / {fontSizes.body.mobile}
            </span>
          </div>
          <div 
            className="text-text-secondary leading-relaxed"
            style={{ 
              fontFamily: font.name,
              fontSize: fontSizes.body.desktop,
              fontWeight: font.weights.includes('400') ? '400' : font.weights[0]
            }}
          >
            {sampleTexts.body}
          </div>
        </div>

        {/* Caption */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">Caption</span>
            <span className="text-xs text-text-secondary">
              {fontSizes.caption.desktop} / {fontSizes.caption.mobile}
            </span>
          </div>
          <div 
            className="text-text-muted leading-normal"
            style={{ 
              fontFamily: font.name,
              fontSize: fontSizes.caption.desktop,
              fontWeight: font.weights.includes('400') ? '400' : font.weights[0]
            }}
          >
            {sampleTexts.caption}
          </div>
        </div>
      </div>

      {/* Font Weights */}
      <div className="pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-text-primary mb-3">Available Weights</h4>
        <div className="flex flex-wrap gap-2">
          {font.weights.map((weight) => (
            <span
              key={weight}
              className="px-3 py-1 bg-gray-100 text-text-secondary text-sm font-medium rounded-full"
              style={{ fontFamily: font.name, fontWeight: weight }}
            >
              {weight}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Primary Font */}
      {renderFontPreview(typography.primary, 'Primary Font')}

      {/* Secondary Font */}
      {renderFontPreview(typography.secondary, 'Secondary Font')}

      {/* Font Pairing Preview */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Font Pairing Preview</h3>
        
        <div className="space-y-6">
          <div className="p-6 bg-gray-50 rounded-lg">
            <h1 
              className="text-text-primary mb-4 leading-tight"
              style={{ 
                fontFamily: typography.primary.name,
                fontSize: '36px',
                fontWeight: typography.primary.weights.includes('700') ? '700' : typography.primary.weights[typography.primary.weights.length - 1]
              }}
            >
              Brand Typography System
            </h1>
            
            <h2 
              className="text-text-primary mb-4 leading-relaxed"
              style={{ 
                fontFamily: typography.primary.name,
                fontSize: '20px',
                fontWeight: typography.primary.weights.includes('600') ? '600' : typography.primary.weights[Math.floor(typography.primary.weights.length / 2)]
              }}
            >
              Consistent typography creates visual hierarchy and brand recognition
            </h2>
            
            <p 
              className="text-text-secondary mb-4 leading-relaxed"
              style={{ 
                fontFamily: typography.primary.name,
                fontSize: '16px',
                fontWeight: typography.primary.weights.includes('400') ? '400' : typography.primary.weights[0]
              }}
            >
              This is how your primary font looks in paragraph form. It should be highly readable and work well across different sizes and weights. The spacing and proportions should feel balanced and professional.
            </p>
            
            <div 
              className="text-text-muted p-4 bg-white rounded border-l-4 border-primary"
              style={{ 
                fontFamily: typography.secondary.name,
                fontSize: '14px',
                fontWeight: typography.secondary.weights.includes('400') ? '400' : typography.secondary.weights[0]
              }}
            >
              "This is an example of your secondary font being used for quotes, code, or special emphasis. It provides contrast and visual interest while maintaining readability."
            </div>
          </div>
        </div>
      </div>

      {/* Web Font Integration */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Web Font Integration</h3>
          <button
            onClick={() => copyToClipboard(webFontCode)}
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-primary hover:bg-primary-50 rounded-md transition-colors duration-200"
          >
            <Icon name="Copy" size={16} />
            <span>Copy CSS</span>
          </button>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
            {webFontCode}
          </pre>
        </div>
      </div>

      {/* Typography Guidelines */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Typography Guidelines</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Hierarchy</h4>
            <div className="space-y-2 text-sm text-text-secondary">
              <div className="flex justify-between">
                <span>H1 Headlines:</span>
                <span className="font-mono">{fontSizes.headline.desktop}</span>
              </div>
              <div className="flex justify-between">
                <span>H2 Subheadings:</span>
                <span className="font-mono">{fontSizes.subheading.desktop}</span>
              </div>
              <div className="flex justify-between">
                <span>Body Text:</span>
                <span className="font-mono">{fontSizes.body.desktop}</span>
              </div>
              <div className="flex justify-between">
                <span>Captions:</span>
                <span className="font-mono">{fontSizes.caption.desktop}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Usage Rules</h4>
            <ul className="space-y-1 text-sm text-text-secondary">
              <li>• Use primary font for headlines and body text</li>
              <li>• Use secondary font for code and emphasis</li>
              <li>• Maintain consistent line heights</li>
              <li>• Ensure sufficient contrast ratios</li>
              <li>• Test readability at all sizes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Font Picker Modal */}
      {showFontPicker && selectedFont && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg p-6 w-96 max-w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Edit {selectedFont.label}
              </h3>
              <button
                onClick={() => setShowFontPicker(false)}
                className="p-2 rounded hover:bg-gray-100 transition-colors duration-200"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Font Family
                </label>
                <select className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value={selectedFont.name}>{selectedFont.name}</option>
                  <option value="Inter">Inter</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Open Sans">Open Sans</option>
                  <option value="Lato">Lato</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Usage
                </label>
                <textarea
                  rows={3}
                  defaultValue={selectedFont.usage}
                  className="w-full px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Describe when and how to use this font..."
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowFontPicker(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-text-secondary border border-border rounded-md hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onTypographyChange(selectedFont.label.toLowerCase().replace(' ', '_'), selectedFont);
                    setShowFontPicker(false);
                  }}
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

export default TypographyPanel;