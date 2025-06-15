import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const GuidelinesTab = ({ brandData, onGuidelinesChange }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editingContent, setEditingContent] = useState('');

  const guidelineSections = [
    {
      id: 'overview',
      title: 'Brand Overview',
      icon: 'Eye',
      content: `${brandData.name} is a ${brandData.industry.toLowerCase()} company that represents innovation, reliability, and forward-thinking solutions. Our brand identity reflects our commitment to excellence and our dedication to providing cutting-edge technology solutions that empower businesses to thrive in the digital age.

Our visual identity system has been carefully crafted to communicate professionalism, trustworthiness, and technological sophistication across all touchpoints and applications.`
    },
    {
      id: 'logo',
      title: 'Logo Usage',
      icon: 'Zap',
      content: `The ${brandData.name} logo is the cornerstone of our brand identity. It should be used consistently across all applications to maintain brand recognition and integrity.

LOGO VARIATIONS:
• Primary Logo: Use on light backgrounds and as the default option
• Secondary Logo: Alternative version for specific layout requirements
• Icon Version: For small applications where full logo isn't practical• Monochrome: For single-color applicationsMINIMUM SIZE REQUIREMENTS:• Digital: Never smaller than 24px in height• Print: Never smaller than 0.5 inches in heightCLEAR SPACE:Maintain clear space around the logo equal to the height of the logo mark. This ensures the logo has proper visual breathing room and isn't crowded by other elements.`
    },
    {
      id: 'colors',
      title: 'Color Guidelines',
      icon: 'Palette',
      content: `Our color palette has been carefully selected to convey trust, innovation, and professionalism. Each color serves a specific purpose in our brand hierarchy.

PRIMARY COLORS:
• Primary Blue (${brandData.assets.colors.primary}): Main brand color for logos, CTAs, and primary elements
• Secondary Purple (${brandData.assets.colors.secondary}): Supporting color for highlights and secondary elements
• Accent Amber (${brandData.assets.colors.accent}): Attention-grabbing color for warnings and special highlights

USAGE GUIDELINES:
• Use primary colors for brand elements and key interactions
• Maintain sufficient contrast ratios for accessibility (minimum 4.5:1 for normal text)
• Test colors across different devices and lighting conditions
• Never alter or modify the specified color values

ACCESSIBILITY:
All color combinations have been tested to meet WCAG AA standards for contrast and readability.`
    },
    {
      id: 'typography',
      title: 'Typography',
      icon: 'Type',
      content: `Typography plays a crucial role in our brand communication. Our font choices reflect our modern, professional, and approachable personality.

PRIMARY FONT: ${brandData.assets.typography.primary.name}
• Usage: Headlines, subheadings, and primary body text
• Weights: ${brandData.assets.typography.primary.weights.join(', ')}
• Character: Modern, clean, and highly readable

SECONDARY FONT: ${brandData.assets.typography.secondary.name}
• Usage: Code snippets, technical content, and special emphasis
• Weights: ${brandData.assets.typography.secondary.weights.join(', ')}
• Character: Technical, precise, and distinctive

HIERARCHY GUIDELINES:
• H1: 48px desktop / 32px mobile
• H2: 24px desktop / 20px mobile
• Body: 16px desktop / 14px mobile
• Caption: 12px desktop / 11px mobile

Always maintain consistent line heights and spacing for optimal readability.`
    },
    {
      id: 'applications',
      title: 'Brand Applications',
      icon: 'Layout',
      content: `These guidelines ensure consistent brand application across all touchpoints and media.

DIGITAL APPLICATIONS:
• Website headers and navigation
• Social media profiles and posts
• Email signatures and templates
• Digital advertisements and banners
• Mobile app interfaces

PRINT APPLICATIONS:
• Business cards and stationery
• Brochures and marketing materials
• Signage and environmental graphics
• Packaging and product labels
• Corporate presentations

MERCHANDISE:
• Branded apparel and accessories
• Promotional items and giveaways
• Trade show materials
• Corporate gifts

SPACING AND LAYOUT:
• Maintain consistent margins and padding
• Use grid systems for alignment
• Ensure adequate white space
• Follow established hierarchy patterns`
    },
    {
      id: 'donts',
      title: "Do\'s and Don\'ts",
      icon: 'AlertTriangle',
      content: `Follow these guidelines to maintain brand integrity and avoid common mistakes.

DO:
✓ Use approved logo variations only
✓ Maintain proper clear space around logos
✓ Follow color specifications exactly
✓ Use approved fonts and typography hierarchy
✓ Ensure sufficient contrast for accessibility
✓ Test designs across different devices and contexts
✓ Maintain consistent spacing and alignment
✓ Use high-resolution assets for all applications

DON'T:
✗ Stretch, distort, or modify the logo
✗ Use unapproved color combinations
✗ Place logos on busy or low-contrast backgrounds
✗ Use fonts outside the approved typography system
✗ Ignore minimum size requirements
✗ Crowd the logo with other elements
✗ Use low-resolution or pixelated assets
✗ Apply unauthorized effects or filters to brand elements

When in doubt, refer to these guidelines or contact the brand team for clarification.`
    }
  ];

  const handleEdit = (sectionId, content) => {
    setIsEditing(sectionId);
    setEditingContent(content);
  };

  const handleSave = (sectionId) => {
    onGuidelinesChange(sectionId, editingContent);
    setIsEditing(false);
    setEditingContent('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingContent('');
  };

  const exportGuidelines = () => {
    console.log('Exporting brand guidelines as PDF...');
  };

  const currentSection = guidelineSections.find(section => section.id === activeSection);

  return (
    <div className="flex h-full">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-surface border-r border-border flex-shrink-0">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Brand Guidelines</h2>
          <p className="text-sm text-text-secondary mt-1">
            Comprehensive brand standards
          </p>
        </div>
        
        <nav className="p-2">
          {guidelineSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeSection === section.id
                  ? 'bg-primary-50 text-primary' :'text-text-secondary hover:text-primary hover:bg-gray-50'
              }`}
            >
              <Icon name={section.icon} size={16} />
              <span>{section.title}</span>
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-border mt-auto">
          <button
            onClick={exportGuidelines}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors duration-200"
          >
            <Icon name="Download" size={16} />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Section Header */}
        <div className="p-6 border-b border-border bg-surface">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Icon name={currentSection?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-text-primary">
                  {currentSection?.title}
                </h1>
                <p className="text-sm text-text-secondary">
                  {brandData.name} Brand Guidelines
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {isEditing === activeSection ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium text-text-secondary border border-border rounded-md hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave(activeSection)}
                    className="px-4 py-2 text-sm font-medium bg-success text-white rounded-md hover:bg-success-600 transition-colors duration-200"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleEdit(activeSection, currentSection?.content)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary-50 rounded-md transition-colors duration-200"
                >
                  <Icon name="Edit2" size={16} />
                  <span>Edit</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {isEditing === activeSection ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Content
                </label>
                <textarea
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  rows={20}
                  className="w-full px-4 py-3 border border-border rounded-lg text-sm leading-relaxed focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                  placeholder="Enter your brand guidelines content..."
                />
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <span>Use **bold** for emphasis</span>
                <span>Use • for bullet points</span>
                <span>Use ✓ and ✗ for do's and don'ts</span>
              </div>
            </div>
          ) : (
            <div className="prose prose-lg max-w-none">
              <div className="text-text-primary leading-relaxed whitespace-pre-line">
                {currentSection?.content}
              </div>
            </div>
          )}
        </div>

        {/* Visual Examples Section */}
        {activeSection === 'logo' && !isEditing && (
          <div className="p-6 border-t border-border bg-gray-50">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Visual Examples</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {brandData.assets.logos.map((logo) => (
                <div key={logo.id} className="bg-white p-4 rounded-lg border border-border">
                  <div className="aspect-square flex items-center justify-center mb-2">
                    <img
                      src={logo.url}
                      alt={logo.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <p className="text-sm font-medium text-text-primary text-center">
                    {logo.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'colors' && !isEditing && (
          <div className="p-6 border-t border-border bg-gray-50">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Color Palette</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {brandData.assets.colors.palette.map((color, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-border">
                  <div 
                    className="w-full h-16 rounded-lg mb-3 border border-border"
                    style={{ backgroundColor: color.hex }}
                  />
                  <h4 className="text-sm font-medium text-text-primary mb-1">
                    {color.name}
                  </h4>
                  <p className="text-xs text-text-secondary mb-2">
                    {color.hex} • {color.rgb}
                  </p>
                  <p className="text-xs text-text-muted">
                    {color.usage}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuidelinesTab;