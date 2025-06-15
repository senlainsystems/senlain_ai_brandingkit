import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/brand-brief-creation': { label: 'Create Brief', parent: null },
    '/ai-generation-interface': { label: 'AI Generation', parent: '/brand-brief-creation' },
    '/brand-kit-gallery': { label: 'Brand Gallery', parent: null },
    '/brand-kit-preview-editor': { label: 'Brand Editor', parent: '/brand-kit-gallery' },
    '/account-settings-billing': { label: 'Account Settings', parent: null },
    '/login-registration': { label: 'Authentication', parent: null }
  };

  const buildBreadcrumbs = () => {
    const breadcrumbs = [];
    let currentPath = location.pathname;
    
    while (currentPath && routeMap[currentPath]) {
      const route = routeMap[currentPath];
      breadcrumbs.unshift({
        label: route.label,
        path: currentPath,
        isActive: currentPath === location.pathname
      });
      currentPath = route.parent;
    }

    if (breadcrumbs.length > 0) {
      breadcrumbs.unshift({
        label: 'Home',
        path: '/brand-brief-creation',
        isActive: false
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = buildBreadcrumbs();

  if (breadcrumbs.length <= 1 || location.pathname === '/login-registration') {
    return null;
  }

  const handleBreadcrumbClick = (path) => {
    if (path !== location.pathname) {
      navigate(path);
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.path} className="flex items-center space-x-2">
          {index > 0 && (
            <Icon 
              name="ChevronRight" 
              size={14} 
              className="text-text-muted flex-shrink-0" 
            />
          )}
          
          {breadcrumb.isActive ? (
            <span className="text-text-primary font-medium truncate">
              {breadcrumb.label}
            </span>
          ) : (
            <button
              onClick={() => handleBreadcrumbClick(breadcrumb.path)}
              className="text-text-secondary hover:text-primary transition-colors duration-200 truncate focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-1 py-0.5"
            >
              {breadcrumb.label}
            </button>
          )}
        </div>
      ))}
    </nav>
  );
};

export default BreadcrumbNavigation;