import React from 'react';
import Icon from 'components/AppIcon';

const TargetAudienceStep = ({ data, onUpdate }) => {
  const ageRanges = [
    '18-24', '25-34', '35-44', '45-54', '55-64', '65+'
  ];

  const genderOptions = [
    { value: 'all', label: 'All Genders', icon: 'Users' },
    { value: 'male', label: 'Male', icon: 'User' },
    { value: 'female', label: 'Female', icon: 'User' },
    { value: 'other', label: 'Other', icon: 'User' }
  ];

  const locationOptions = [
    'Local', 'Regional', 'National', 'Global'
  ];

  const incomeOptions = [
    { value: 'low', label: 'Budget-conscious', description: 'Price-sensitive consumers' },
    { value: 'middle', label: 'Middle-income', description: 'Balanced value seekers' },
    { value: 'high', label: 'Premium', description: 'Quality-focused buyers' },
    { value: 'luxury', label: 'Luxury', description: 'Exclusive, high-end market' }
  ];

  const personalityTraits = [
    { key: 'innovative', label: 'Innovative', description: 'Cutting-edge and forward-thinking' },
    { key: 'trustworthy', label: 'Trustworthy', description: 'Reliable and dependable' },
    { key: 'friendly', label: 'Friendly', description: 'Approachable and warm' },
    { key: 'professional', label: 'Professional', description: 'Serious and business-focused' },
    { key: 'creative', label: 'Creative', description: 'Artistic and imaginative' }
  ];

  const handleDemographicChange = (field, value) => {
    onUpdate({
      demographics: {
        ...data.demographics,
        [field]: value
      }
    });
  };

  const handlePersonalityChange = (trait, value) => {
    onUpdate({
      brandPersonality: {
        ...data.brandPersonality,
        [trait]: value
      }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Target Audience</h2>
        <p className="text-text-secondary">
          Define who your brand will connect with and how you want to be perceived
        </p>
      </div>

      {/* Demographics */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-4">Demographics</h3>
        </div>

        {/* Age Range */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-primary">
            Primary Age Range
          </label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {ageRanges.map((range) => (
              <button
                key={range}
                onClick={() => handleDemographicChange('ageRange', range)}
                className={`p-3 text-sm font-medium rounded-lg border transition-all duration-200 ${
                  data.demographics?.ageRange === range
                    ? 'border-primary bg-primary-50 text-primary' :'border-border bg-background text-text-secondary hover:bg-surface'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Gender */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-primary">
            Gender Focus
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {genderOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleDemographicChange('gender', option.value)}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  data.demographics?.gender === option.value
                    ? 'border-primary bg-primary-50 text-primary' :'border-border bg-background text-text-secondary hover:bg-surface'
                }`}
              >
                <Icon name={option.icon} size={20} className="mx-auto mb-2" />
                <p className="text-sm font-medium">{option.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-primary">
            Geographic Reach
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {locationOptions.map((location) => (
              <button
                key={location}
                onClick={() => handleDemographicChange('location', location.toLowerCase())}
                className={`p-3 text-sm font-medium rounded-lg border transition-all duration-200 ${
                  data.demographics?.location === location.toLowerCase()
                    ? 'border-primary bg-primary-50 text-primary' :'border-border bg-background text-text-secondary hover:bg-surface'
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </div>

        {/* Income Level */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-primary">
            Target Market Segment
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {incomeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleDemographicChange('income', option.value)}
                className={`p-4 text-left rounded-lg border transition-all duration-200 ${
                  data.demographics?.income === option.value
                    ? 'border-primary bg-primary-50 text-primary' :'border-border bg-background text-text-secondary hover:bg-surface'
                }`}
              >
                <p className="font-medium mb-1">{option.label}</p>
                <p className="text-xs opacity-80">{option.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Personality */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">Brand Personality</h3>
          <p className="text-sm text-text-secondary mb-4">
            Rate how important each trait is for your brand (1 = not important, 10 = very important)
          </p>
        </div>

        <div className="space-y-6">
          {personalityTraits.map((trait) => (
            <div key={trait.key} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-text-primary">{trait.label}</h4>
                  <p className="text-xs text-text-secondary">{trait.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-text-secondary">
                    {data.brandPersonality?.[trait.key] || 5}
                  </span>
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {data.brandPersonality?.[trait.key] || 5}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={data.brandPersonality?.[trait.key] || 5}
                  onChange={(e) => handlePersonalityChange(trait.key, parseInt(e.target.value))}
                  className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${((data.brandPersonality?.[trait.key] || 5) - 1) * 11.11}%, var(--color-border) ${((data.brandPersonality?.[trait.key] || 5) - 1) * 11.11}%, var(--color-border) 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-text-muted mt-1">
                  <span>1</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audience Insights */}
      <div className="bg-accent-50 border border-accent-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Target" size={20} className="text-accent mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-accent-700 mb-2">Audience Insights</h4>
            <div className="text-sm text-accent-700 space-y-2">
              <p>
                <strong>Primary Audience:</strong> {data.demographics?.ageRange || '25-34'} year-olds, 
                {data.demographics?.gender === 'all' ? ' all genders' : ` ${data.demographics?.gender || 'all genders'}`}, 
                {data.demographics?.location || 'global'} reach
              </p>
              <p>
                <strong>Market Segment:</strong> {
                  incomeOptions.find(opt => opt.value === (data.demographics?.income || 'middle'))?.label || 'Middle-income'
                } consumers
              </p>
              <p>
                <strong>Brand Perception:</strong> Most important traits are{' '}
                {Object.entries(data.brandPersonality || {})
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 2)
                  .map(([key]) => personalityTraits.find(t => t.key === key)?.label)
                  .filter(Boolean)
                  .join(' and ') || 'Professional and Trustworthy'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetAudienceStep;