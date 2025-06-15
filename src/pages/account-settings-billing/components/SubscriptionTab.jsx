import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SubscriptionTab = ({ userTier, setUserTier }) => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);

  const subscriptionData = {
    currentTier: userTier,
    renewalDate: '2024-03-15',
    creditsUsed: 15,
    creditsTotal: 50,
    generationsUsed: 8,
    generationsTotal: 25,
    teamMembers: 3,
    teamMembersMax: 5
  };

  const tiers = [
    {
      id: 'Hobby',
      name: 'Hobby',
      price: 0,
      period: 'Free forever',
      features: [
        '5 brand generations per month',
        '10 credits included',
        'Basic templates',
        'PNG downloads',
        'Community support'
      ],
      limitations: [
        'Watermarked exports',
        'Limited customization',
        'No team collaboration'
      ]
    },
    {
      id: 'Pro',
      name: 'Pro',
      price: 29,
      period: 'per month',
      popular: true,
      features: [
        '25 brand generations per month',
        '50 credits included',
        'Premium templates',
        'PNG & SVG downloads',
        'Priority support',
        'Team collaboration (5 members)',
        'Brand guidelines export',
        'Advanced customization'
      ],
      limitations: []
    },
    {
      id: 'Agency',
      name: 'Agency',
      price: 99,
      period: 'per month',
      features: [
        'Unlimited brand generations',
        '200 credits included',
        'All templates & features',
        'White-label options',
        'API access',
        'Unlimited team members',
        'Custom branding',
        'Dedicated support',
        'Advanced analytics',
        'Bulk operations'
      ],
      limitations: []
    }
  ];

  const handleUpgrade = (tier) => {
    setSelectedTier(tier);
    setShowUpgradeModal(true);
  };

  const confirmUpgrade = () => {
    setUserTier(selectedTier.id);
    setShowUpgradeModal(false);
    setSelectedTier(null);
  };

  const currentTierData = tiers.find(tier => tier.id === userTier);

  return (
    <div className="space-y-8">
      {/* Current Subscription Overview */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-text-primary mb-2">
              Current Plan: {subscriptionData.currentTier}
            </h3>
            <p className="text-text-secondary">
              {currentTierData?.price === 0 ? 'Free forever' : `$${currentTierData?.price}/month`}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Crown" size={24} color="white" />
            </div>
            {userTier !== 'Agency' && (
              <button
                onClick={() => handleUpgrade(tiers.find(t => t.id === 'Agency'))}
                className="btn-primary px-4 py-2 rounded-lg"
              >
                Upgrade Plan
              </button>
            )}
          </div>
        </div>

        {/* Usage Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-secondary">Credits Used</span>
              <span className="text-sm text-text-muted">
                {subscriptionData.creditsUsed}/{subscriptionData.creditsTotal}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(subscriptionData.creditsUsed / subscriptionData.creditsTotal) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-surface rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-secondary">Generations</span>
              <span className="text-sm text-text-muted">
                {subscriptionData.generationsUsed}/{subscriptionData.generationsTotal}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-secondary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(subscriptionData.generationsUsed / subscriptionData.generationsTotal) * 100}%` }}
              ></div>
            </div>
          </div>

          {userTier !== 'Hobby' && (
            <div className="bg-surface rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text-secondary">Team Members</span>
                <span className="text-sm text-text-muted">
                  {subscriptionData.teamMembers}/{subscriptionData.teamMembersMax}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(subscriptionData.teamMembers / subscriptionData.teamMembersMax) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {userTier !== 'Hobby' && (
          <div className="mt-4 flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Calendar" size={16} />
            <span>Next renewal: {new Date(subscriptionData.renewalDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {/* Plan Comparison */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Available Plans</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative border rounded-lg p-6 transition-all duration-200 ${
                tier.id === userTier
                  ? 'border-primary bg-primary-50'
                  : tier.popular
                  ? 'border-secondary bg-secondary-50' :'border-border bg-surface hover:border-primary-200'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {tier.id === userTier && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                    Current Plan
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-text-primary mb-2">{tier.name}</h4>
                <div className="mb-4">
                  {tier.price === 0 ? (
                    <span className="text-2xl font-bold text-text-primary">Free</span>
                  ) : (
                    <>
                      <span className="text-3xl font-bold text-text-primary">${tier.price}</span>
                      <span className="text-text-secondary">/{tier.period.split(' ')[1]}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {tier.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </div>
                ))}
                
                {tier.limitations.map((limitation, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Icon name="X" size={16} className="text-error flex-shrink-0" />
                    <span className="text-sm text-text-muted">{limitation}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => tier.id !== userTier && handleUpgrade(tier)}
                disabled={tier.id === userTier}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                  tier.id === userTier
                    ? 'bg-gray-100 text-text-muted cursor-not-allowed'
                    : tier.popular
                    ? 'btn-secondary' :'btn-primary'
                }`}
              >
                {tier.id === userTier ? 'Current Plan' : `Upgrade to ${tier.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && selectedTier && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1300">
          <div className="bg-surface rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Upgrade to {selectedTier.name}
              </h3>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-text-secondary mb-4">
                You're about to upgrade to the {selectedTier.name} plan for ${selectedTier.price}/month.
              </p>
              
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <h4 className="font-medium text-text-primary mb-2">What you'll get:</h4>
                <ul className="space-y-1">
                  {selectedTier.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                      <Icon name="Check" size={14} className="text-success" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 px-4 py-2 border border-border rounded-lg text-text-secondary hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmUpgrade}
                className="flex-1 btn-primary px-4 py-2 rounded-lg"
              >
                Confirm Upgrade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionTab;