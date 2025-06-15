import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [userTier, setUserTier] = useState('Pro');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Create',
      path: '/brand-brief-creation',
      icon: 'Plus',
      description: 'Start new brand project'
    },
    {
      label: 'Generate',
      path: '/ai-generation-interface',
      icon: 'Sparkles',
      description: 'AI brand generation'
    },
    {
      label: 'My Brands',
      path: '/brand-kit-gallery',
      icon: 'Palette',
      description: 'Manage brand assets',
      subItems: [
        { label: 'Gallery', path: '/brand-kit-gallery' },
        { label: 'Editor', path: '/brand-kit-preview-editor' }
      ]
    },
    {
      label: 'Account',
      path: '/account-settings-billing',
      icon: 'Settings',
      description: 'Settings & billing'
    }
  ];

  useEffect(() => {
    if (location.pathname === '/ai-generation-interface') {
      setIsGenerating(true);
      const interval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 100) {
            setIsGenerating(false);
            return 0;
          }
          return prev + 10;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [location.pathname]);

  const isActiveRoute = (path) => {
    if (path === '/brand-kit-gallery') {
      return location.pathname === '/brand-kit-gallery' || location.pathname === '/brand-kit-preview-editor';
    }
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/brand-brief-creation');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-surface border-b border-border">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={handleLogoClick}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Icon name="Zap" size={18} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors duration-200">
                  BrandAI
                </span>
                <span className="text-xs text-text-secondary -mt-1">
                  Intelligent Branding
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.path} className="relative group">
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActiveRoute(item.path)
                      ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-primary-50'
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </button>
                
                {item.subItems && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-surface border border-border rounded-lg shadow-elevation-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-1100">
                    <div className="py-2">
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.path}
                          onClick={() => handleNavigation(subItem.path)}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                            location.pathname === subItem.path
                              ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-primary-50'
                          }`}
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Generation Status & User Context */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Generation Status Indicator */}
            {isGenerating && (
              <div className="flex items-center space-x-3 px-3 py-2 bg-secondary-50 border border-secondary-200 rounded-lg">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-secondary">Generating</span>
                  <div className="w-16 h-1 bg-secondary-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-secondary transition-all duration-300"
                      style={{ width: `${generationProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* User Context Indicator */}
            <div className="flex items-center space-x-3 px-3 py-2 bg-accent-50 border border-accent-200 rounded-lg">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <Icon name="Crown" size={12} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-accent-700">{userTier} Plan</span>
                <span className="text-xs text-text-muted">15/50 brands</span>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border">
            <div className="pt-4 space-y-2">
              {navigationItems.map((item) => (
                <div key={item.path}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActiveRoute(item.path)
                        ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-primary-50'
                    }`}
                  >
                    <Icon name={item.icon} size={16} />
                    <div className="flex flex-col items-start">
                      <span>{item.label}</span>
                      <span className="text-xs text-text-muted">{item.description}</span>
                    </div>
                  </button>
                  
                  {item.subItems && isActiveRoute(item.path) && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.path}
                          onClick={() => handleNavigation(subItem.path)}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                            location.pathname === subItem.path
                              ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-primary-50'
                          }`}
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile Status Indicators */}
              <div className="pt-4 space-y-3 border-t border-border">
                {isGenerating && (
                  <div className="flex items-center space-x-3 px-3 py-2 bg-secondary-50 border border-secondary-200 rounded-lg">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-secondary">Generating</span>
                        <span className="text-xs text-secondary">{generationProgress}%</span>
                      </div>
                      <div className="w-full h-1 bg-secondary-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-secondary transition-all duration-300"
                          style={{ width: `${generationProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-3 px-3 py-2 bg-accent-50 border border-accent-200 rounded-lg">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                    <Icon name="Crown" size={12} color="white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-accent-700">{userTier} Plan</span>
                      <span className="text-xs text-text-muted">15/50 brands</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;