import React, { useState } from 'react';
import Header from 'components/ui/Header';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';
import QuickActionsMenu from 'components/ui/QuickActionsMenu';
import Icon from 'components/AppIcon';


// Components
import ProfileTab from './components/ProfileTab';
import SubscriptionTab from './components/SubscriptionTab';
import BillingTab from './components/BillingTab';
import TeamTab from './components/TeamTab';
import SecurityTab from './components/SecurityTab';
import APITab from './components/APITab';

const AccountSettingsBilling = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userTier, setUserTier] = useState('Pro');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'subscription', label: 'Subscription', icon: 'Crown' },
    { id: 'billing', label: 'Billing', icon: 'CreditCard' },
    { id: 'team', label: 'Team', icon: 'Users', requiresTier: ['Pro', 'Agency'] },
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'api', label: 'API Access', icon: 'Code', requiresTier: ['Agency'] }
  ];

  const visibleTabs = tabs.filter(tab => 
    !tab.requiresTier || tab.requiresTier.includes(userTier)
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'subscription':
        return <SubscriptionTab userTier={userTier} setUserTier={setUserTier} />;
      case 'billing':
        return <BillingTab />;
      case 'team':
        return <TeamTab userTier={userTier} />;
      case 'security':
        return <SecurityTab />;
      case 'api':
        return <APITab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <BreadcrumbNavigation />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Account Settings
                </h1>
                <p className="text-text-secondary">
                  Manage your profile, subscription, and account preferences
                </p>
              </div>
              
              <div className="flex items-center space-x-3 px-4 py-2 bg-accent-50 border border-accent-200 rounded-lg">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="Crown" size={12} color="white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-accent-700">{userTier} Plan</span>
                  <span className="text-xs text-text-muted">Active subscription</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-surface border border-border rounded-lg shadow-elevation-2 mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8 px-6" aria-label="Account settings tabs">
                {visibleTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-primary hover:border-primary-200'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                    {tab.requiresTier && (
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>

      <QuickActionsMenu />
    </div>
  );
};

export default AccountSettingsBilling;