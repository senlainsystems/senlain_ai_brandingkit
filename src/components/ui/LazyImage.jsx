import React, { useState, useRef } from 'react';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import Skeleton from './Skeleton';

const LazyImage = ({ 
  src, 
  alt, 
  className = '',
  placeholder,
  fallback = '/assets/images/no_image.png',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div ref={elementRef} className={`relative ${className}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0">
          {placeholder || <Skeleton variant="rectangular" className="w-full h-full" />}
        </div>
      )}
      
      {hasIntersected && (
        <img
          src={hasError ? fallback : src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`
            transition-opacity duration-300 
            ${isLoaded ? 'opacity-100' : 'opacity-0'} 
            ${className}
          `}
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage;