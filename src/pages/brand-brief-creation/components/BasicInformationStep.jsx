import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BasicInformationStep = ({ data, onUpdate }) => {
  const [characterCount, setCharacterCount] = useState(data.businessDescription?.length || 0);

  const industries = [
    'Technology & Software', 'Healthcare & Medical', 'Finance & Banking', 'E-commerce & Retail',
    'Food & Beverage', 'Fashion & Apparel', 'Real Estate', 'Education & Training',
    'Marketing & Advertising', 'Consulting & Services', 'Manufacturing', 'Transportation & Logistics',
    'Entertainment & Media', 'Non-profit & NGO', 'Sports & Fitness', 'Beauty & Wellness',
    'Travel & Tourism', 'Agriculture & Farming', 'Construction & Architecture', 'Other'
  ];

  const popularIndustries = ['Technology & Software', 'E-commerce & Retail', 'Healthcare & Medical', 'Finance & Banking'];

  const handleBusinessNameChange = (e) => {
    const value = e.target.value;
    onUpdate({ businessName: value });
  };

  const handleIndustryChange = (industry) => {
    onUpdate({ industry });
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setCharacterCount(value.length);
    onUpdate({ businessDescription: value });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Basic Information</h2>
        <p className="text-text-secondary">
          Let's start with the fundamentals of your business
        </p>
      </div>

      {/* Business Name */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-text-primary">
          Business Name *
        </label>
        <div className="relative">
          <input
            type="text"
            value={data.businessName || ''}
            onChange={handleBusinessNameChange}
            placeholder="Enter your business name"
            className="input-field w-full"
            required
          />
        </div>
      </div>

      {/* Industry Selection */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-text-primary">
          Industry *
        </label>

        {/* Popular Industries */}
        <div className="mb-4">
          <p className="text-xs text-text-secondary mb-2">Popular choices:</p>
          <div className="flex flex-wrap gap-2">
            {popularIndustries.map((industry) => (
              <button
                key={industry}
                onClick={() => handleIndustryChange(industry)}
                className={`px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${data.industry === industry
                    ? 'border-primary bg-primary-50 text-primary' : 'border-border bg-background text-text-secondary hover:bg-surface'
                  }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        {/* All Industries Dropdown */}
        <div className="relative">
          <select
            value={data.industry || ''}
            onChange={(e) => handleIndustryChange(e.target.value)}
            className="input-field w-full appearance-none pr-10"
            required
          >
            <option value="">Select your industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          <Icon
            name="ChevronDown"
            size={16}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted pointer-events-none"
          />
        </div>
      </div>

      {/* Business Description */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-text-primary">
          Business Description *
        </label>
        <div className="relative">
          <textarea
            value={data.businessDescription || ''}
            onChange={handleDescriptionChange}
            placeholder="Describe your business, what you do, and what makes you unique..."
            rows={6}
            maxLength={500}
            className="input-field w-full resize-none"
            required
          />
          <div className="absolute bottom-3 right-3 text-xs text-text-muted">
            {characterCount}/500
          </div>
        </div>
        <p className="text-sm text-text-secondary">
          This helps our AI understand your business context and generate more relevant brand elements.
        </p>
      </div>

      {/* Tips Section */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-primary mb-2">Tips for better results:</h4>
            <ul className="text-sm text-primary-700 space-y-1">
              <li>• Be specific about what makes your business unique</li>
              <li>• Mention your target market if relevant</li>
              <li>• Include your business values or mission</li>
              <li>• Describe the problem you solve for customers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformationStep;