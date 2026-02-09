import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'components/ui/Header';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';
import QuickActionsMenu from 'components/ui/QuickActionsMenu';
import Icon from 'components/AppIcon';
import { useBrandContext } from 'context/BrandContext';

import BasicInformationStep from './components/BasicInformationStep';
import VisualPreferencesStep from './components/VisualPreferencesStep';
import TargetAudienceStep from './components/TargetAudienceStep';
import ReviewSummaryStep from './components/ReviewSummaryStep';

const BrandBriefCreation = () => {
  const navigate = useNavigate();
  const { brandBrief, updateBrandBrief } = useBrandContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Use brandBrief from context instead of local formData
  const formData = brandBrief;

  const steps = [
    { id: 1, title: 'Basic Information', description: 'Business details and industry' },
    { id: 2, title: 'Visual Preferences', description: 'Colors, style, and mood' },
    { id: 3, title: 'Target Audience', description: 'Demographics and personality' },
    { id: 4, title: 'Review & Generate', description: 'Summary and final review' }
  ];

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setTimeout(() => {
      if (formData.basicInfo.businessName || formData.basicInfo.businessDescription) {
        setLastSaved(new Date());
      }
    }, 2000);

    return () => clearTimeout(autoSave);
  }, [formData]);

  const updateLocalFormData = (section, data) => {
    updateBrandBrief(section, data);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      navigate('/ai-generation-interface');
    }, 2000);
  };

  const handleStepClick = (stepId) => {
    setCurrentStep(stepId);
  };

  const isStepComplete = (stepId) => {
    switch (stepId) {
      case 1:
        return formData.basicInfo.businessName && formData.basicInfo.industry && formData.basicInfo.businessDescription;
      case 2:
        return formData.visualPreferences.colorPalette.length > 0;
      case 3:
        return true; // Demographics have defaults
      case 4:
        return isStepComplete(1) && isStepComplete(2) && isStepComplete(3);
      default:
        return false;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInformationStep
            data={formData.basicInfo}
            onUpdate={(data) => updateLocalFormData('basicInfo', data)}
          />
        );
      case 2:
        return (
          <VisualPreferencesStep
            data={formData.visualPreferences}
            onUpdate={(data) => updateLocalFormData('visualPreferences', data)}
          />
        );
      case 3:
        return (
          <TargetAudienceStep
            data={formData.targetAudience}
            onUpdate={(data) => updateLocalFormData('targetAudience', data)}
          />
        );
      case 4:
        return (
          <ReviewSummaryStep
            data={formData}
            onEdit={handleStepClick}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <BreadcrumbNavigation />

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">Create Brand Brief</h1>
                <p className="text-text-secondary">
                  Tell us about your business to generate the perfect brand identity
                </p>
              </div>

              {lastSaved && (
                <div className="flex items-center space-x-2 text-sm text-success">
                  <Icon name="Check" size={16} />
                  <span>Auto-saved {lastSaved.toLocaleTimeString()}</span>
                </div>
              )}
            </div>

            {/* Progress Indicator */}
            <div className="bg-surface border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-text-secondary">
                  Step {currentStep} of {steps.length}
                </span>
                <span className="text-sm text-text-secondary">
                  {Math.round((currentStep / steps.length) * 100)}% Complete
                </span>
              </div>

              <div className="w-full bg-border rounded-full h-2 mb-4">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(step.id)}
                    className={`text-left p-3 rounded-lg border transition-all duration-200 ${currentStep === step.id
                        ? 'border-primary bg-primary-50 text-primary'
                        : isStepComplete(step.id)
                          ? 'border-success bg-success-50 text-success hover:bg-success-100' : 'border-border bg-background text-text-secondary hover:bg-surface'
                      }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {isStepComplete(step.id) && currentStep !== step.id ? (
                        <Icon name="CheckCircle" size={16} />
                      ) : (
                        <span className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">
                          {step.id}
                        </span>
                      )}
                      <span className="font-medium text-sm">{step.title}</span>
                    </div>
                    <p className="text-xs opacity-80">{step.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-surface border border-border rounded-lg p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Brief Summary</h3>

                <div className="space-y-4">
                  {/* Basic Info Summary */}
                  <div className="pb-4 border-b border-border">
                    <h4 className="text-sm font-medium text-text-primary mb-2">Basic Information</h4>
                    {formData.basicInfo.businessName ? (
                      <div className="space-y-1">
                        <p className="text-sm text-text-secondary">
                          <span className="font-medium">Business:</span> {formData.basicInfo.businessName}
                        </p>
                        {formData.basicInfo.industry && (
                          <p className="text-sm text-text-secondary">
                            <span className="font-medium">Industry:</span> {formData.basicInfo.industry}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-text-muted italic">Not completed</p>
                    )}
                  </div>

                  {/* Visual Preferences Summary */}
                  <div className="pb-4 border-b border-border">
                    <h4 className="text-sm font-medium text-text-primary mb-2">Visual Style</h4>
                    {formData.visualPreferences.colorPalette.length > 0 ? (
                      <div className="space-y-2">
                        <div className="flex space-x-1">
                          {formData.visualPreferences.colorPalette.slice(0, 5).map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded border border-border"
                              style={{ backgroundColor: color }}
                            ></div>
                          ))}
                        </div>
                        <p className="text-sm text-text-secondary">
                          {Object.entries(formData.visualPreferences.stylePreferences)
                            .map(([key, value]) => value)
                            .join(', ')}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-text-muted italic">Not completed</p>
                    )}
                  </div>

                  {/* Target Audience Summary */}
                  <div>
                    <h4 className="text-sm font-medium text-text-primary mb-2">Target Audience</h4>
                    <div className="space-y-1">
                      <p className="text-sm text-text-secondary">
                        <span className="font-medium">Age:</span> {formData.targetAudience.demographics.ageRange}
                      </p>
                      <p className="text-sm text-text-secondary">
                        <span className="font-medium">Location:</span> {formData.targetAudience.demographics.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Tips */}
                <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
                    <div>
                      <h5 className="text-sm font-medium text-primary mb-1">Pro Tip</h5>
                      <p className="text-xs text-primary-700">
                        The more detailed your brief, the better your AI-generated brand will match your vision.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-12 lg:col-span-8">
              <div className="bg-surface border border-border rounded-lg p-8">
                {renderCurrentStep()}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-6 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${currentStep === 1
                    ? 'bg-background text-text-muted cursor-not-allowed' : 'bg-background text-text-secondary hover:bg-border border border-border'
                  }`}
              >
                <Icon name="ChevronLeft" size={18} />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-text-secondary">
                  Step {currentStep} of {steps.length}
                </span>

                {currentStep === 4 ? (
                  <button
                    onClick={handleGenerate}
                    disabled={!isStepComplete(4) || isLoading}
                    className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-medium transition-all duration-200 ${isStepComplete(4) && !isLoading
                        ? 'btn-primary' : 'bg-text-muted text-white cursor-not-allowed'
                      }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Icon name="Sparkles" size={18} />
                        <span>Generate Brand</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="flex items-center space-x-2 px-6 py-3 btn-primary rounded-lg font-medium"
                  >
                    <span>Next</span>
                    <Icon name="ChevronRight" size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuickActionsMenu />
    </div>
  );
};

export default BrandBriefCreation;