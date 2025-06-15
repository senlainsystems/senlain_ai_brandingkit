import React from 'react';

const Skeleton = ({ 
  width = 'w-full', 
  height = 'h-4', 
  className = '',
  variant = 'rectangular',
  animation = true
}) => {
  const baseClasses = `bg-gray-200 ${animation ? 'animate-pulse' : ''}`;
  
  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded'
  };

  return (
    <div 
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${width} 
        ${height} 
        ${className}
      `}
    />
  );
};

export const SkeletonCard = ({ className = '' }) => (
  <div className={`bg-surface border border-border rounded-lg p-4 ${className}`}>
    <div className="space-y-3">
      <Skeleton height="h-32" />
      <Skeleton height="h-4" width="w-3/4" />
      <Skeleton height="h-3" width="w-1/2" />
      <div className="flex space-x-2">
        <Skeleton height="h-6" width="w-6" variant="circular" />
        <Skeleton height="h-6" width="w-6" variant="circular" />
        <Skeleton height="h-6" width="w-6" variant="circular" />
      </div>
    </div>
  </div>
);

export const SkeletonText = ({ lines = 3, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton 
        key={index}
        height="h-3"
        width={index === lines - 1 ? 'w-3/4' : 'w-full'}
      />
    ))}
  </div>
);

export default Skeleton;