import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ReviewSummaryStep = ({ data, onEdit }) => {
  const getPersonalityDescription = () => {
    const traits = Object.entries(data.targetAudience?.brandPersonality || {})
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([key, value]) => ({ key, value }));

    const traitLabels = {
      innovative: 'Innovative',
      trustworthy: 'Trustworthy', 
      friendly: 'Friendly',
      professional: 'Professional',
      creative: 'Creative'
    };

    return traits.map(trait => `${traitLabels[trait.key]} (${trait.value}/10)`).join(', ');
  };

  const getStyleDescription = () => {
    const styles = data.visualPreferences?.stylePreferences || {};
    return `${styles.modernClassic || 'Modern'}, ${styles.boldSubtle || 'Bold'}, ${styles.playfulProfessional || 'Professional'}`;
  };

  const getDemographicsDescription = () => {
    const demo = data.targetAudience?.demographics || {};
    return `${demo.ageRange || '25-34'} years, ${demo.gender === 'all' ? 'All genders' : demo.gender || 'All genders'}, ${demo.location || 'Global'} reach`;
  };

  const sections = [
    {
      id: 1,
      title: 'Basic Information',
      icon: 'Info',
      content: (
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-1">Business Name</h4>
            <p className="text-text-secondary">{data.basicInfo?.businessName || 'Not specified'}</p>
            {data.basicInfo?.isNameAvailable === true && (
              <p className="text-xs text-success flex items-center space-x-1 mt-1">
                <Icon name="CheckCircle" size={12} />
                <span>Name appears available</span>
              </p>
            )}
          </div>
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-1">Industry</h4>
            <p className="text-text-secondary">{data.basicInfo?.industry || 'Not specified'}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-1">Business Description</h4>
            <p className="text-text-secondary text-sm leading-relaxed">
              {data.basicInfo?.businessDescription || 'Not provided'}
            </p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: 'Visual Preferences',
      icon: 'Palette',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-2">Color Palette</h4>
            {(data.visualPreferences?.colorPalette || []).length > 0 ? (
              <div className="flex space-x-2 mb-2">
                {(data.visualPreferences.colorPalette || []).map((color, index) => (
                  <div key={index} className="flex flex-col items-center space-y-1">
                    <div
                      className="w-8 h-8 rounded border border-border"
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="text-xs text-text-muted font-mono">{color}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-muted text-sm">No colors selected</p>
            )}
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-2">Style Direction</h4>
            <p className="text-text-secondary text-sm">{getStyleDescription()}</p>
          </div>

          {(data.visualPreferences?.moodBoard || []).length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-2">
                Mood Board ({(data.visualPreferences.moodBoard || []).length} images)
              </h4>
              <div className="flex space-x-2">
                {(data.visualPreferences.moodBoard || []).slice(0, 4).map((image) => (
                  <div key={image.id} className="w-12 h-12 rounded border border-border overflow-hidden">
                    <Image
                      src={image.url}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {(data.visualPreferences.moodBoard || []).length > 4 && (
                  <div className="w-12 h-12 rounded border border-border bg-surface flex items-center justify-center">
                    <span className="text-xs text-text-muted">
                      +{(data.visualPreferences.moodBoard || []).length - 4}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      id: 3,
      title: 'Target Audience',
      icon: 'Users',
      content: (
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-1">Demographics</h4>
            <p className="text-text-secondary text-sm">{getDemographicsDescription()}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-1">Market Segment</h4>
            <p className="text-text-secondary text-sm capitalize">
              {data.targetAudience?.demographics?.income || 'Middle-income'} consumers
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-1">Brand Personality</h4>
            <p className="text-text-secondary text-sm">{getPersonalityDescription()}</p>
          </div>
        </div>
      )
    }
  ];

  const isComplete = sections.every(section => {
    switch (section.id) {
      case 1:
        return data.basicInfo?.businessName && data.basicInfo?.industry && data.basicInfo?.businessDescription;
      case 2:
        return (data.visualPreferences?.colorPalette || []).length > 0;
      case 3:
        return true; // Demographics have defaults
      default:
        return false;
    }
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Review & Generate</h2>
        <p className="text-text-secondary">
          Review your brand brief and generate your AI-powered brand identity
        </p>
      </div>

      {/* Completion Status */}
      <div className={`p-4 rounded-lg border ${
        isComplete 
          ? 'bg-success-50 border-success-200' :'bg-warning-50 border-warning-200'
      }`}>
        <div className="flex items-center space-x-2">
          <Icon 
            name={isComplete ? "CheckCircle" : "AlertTriangle"} 
            size={20} 
            className={isComplete ? "text-success" : "text-warning"} 
          />
          <div>
            <p className={`font-medium ${isComplete ? "text-success-700" : "text-warning-700"}`}>
              {isComplete ? "Ready to Generate!" : "Almost Ready"}
            </p>
            <p className={`text-sm ${isComplete ? "text-success-600" : "text-warning-600"}`}>
              {isComplete 
                ? "Your brand brief is complete and ready for AI generation."
                : "Please complete all required sections before generating your brand."
              }
            </p>
          </div>
        </div>
      </div>

      {/* Summary Sections */}
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                  <Icon name={section.icon} size={16} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">{section.title}</h3>
              </div>
              <button
                onClick={() => onEdit(section.id)}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-primary hover:bg-primary-50 rounded-md transition-colors duration-200"
              >
                <Icon name="Edit2" size={14} />
                <span>Edit</span>
              </button>
            </div>
            {section.content}
          </div>
        ))}
      </div>

      {/* Generation Preview */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Sparkles" size={20} color="white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text-primary mb-2">What You'll Get</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span>Professional logo designs</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span>Brand name suggestions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span>Compelling taglines</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span>Color palette variations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span>Typography recommendations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span>Brand guidelines document</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white/50 rounded-lg">
              <p className="text-sm text-text-primary">
                <strong>Estimated generation time:</strong> 2-3 minutes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final Tips */}
      <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-accent mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-accent-700 mb-1">Before You Generate</h4>
            <ul className="text-sm text-accent-600 space-y-1">
              <li>• Make sure your business description clearly explains what you do</li>
              <li>• Your color preferences will influence the entire brand palette</li>
              <li>• You can always regenerate with different settings later</li>
              <li>• The AI will create multiple variations for you to choose from</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummaryStep;