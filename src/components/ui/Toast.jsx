import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const Toast = ({ 
  message, 
  type = 'info', 
  duration = 4000, 
  onClose,
  position = 'top-right'
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeConfig = {
    success: {
      icon: 'CheckCircle',
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200',
      textColor: 'text-success-800',
      iconColor: 'text-success-600'
    },
    error: {
      icon: 'XCircle',
      bgColor: 'bg-error-50',
      borderColor: 'border-error-200',
      textColor: 'text-error-800',
      iconColor: 'text-error-600'
    },
    warning: {
      icon: 'AlertTriangle',
      bgColor: 'bg-warning-50',
      borderColor: 'border-warning-200',
      textColor: 'text-warning-800',
      iconColor: 'text-warning-600'
    },
    info: {
      icon: 'Info',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
      textColor: 'text-primary-800',
      iconColor: 'text-primary-600'
    }
  };

  const config = typeConfig[type];
  
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed z-50 ${positionClasses[position]} transition-all duration-300 ${
        isExiting ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className={`
        flex items-center space-x-3 p-4 rounded-lg border shadow-lg max-w-sm
        ${config.bgColor} ${config.borderColor}
      `}>
        <Icon 
          name={config.icon} 
          size={20} 
          className={config.iconColor}
        />
        <p className={`text-sm font-medium ${config.textColor} flex-1`}>
          {message}
        </p>
        <button
          onClick={() => {
            setIsExiting(true);
            setTimeout(() => {
              setIsVisible(false);
              onClose?.();
            }, 300);
          }}
          className={`${config.iconColor} hover:opacity-70 transition-opacity`}
        >
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;