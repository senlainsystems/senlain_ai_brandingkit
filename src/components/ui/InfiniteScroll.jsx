import React, { useEffect, useRef, useCallback } from 'react';
import { useIntersectionObserver } from 'hooks/useIntersectionObserver';
import LoadingSpinner from './LoadingSpinner';

const InfiniteScroll = ({ 
  children, 
  hasMore, 
  isLoading, 
  onLoadMore,
  threshold = 0.1,
  rootMargin = '100px',
  className = ''
}) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin
  });

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading && onLoadMore) {
      onLoadMore();
    }
  }, [hasMore, isLoading, onLoadMore]);

  useEffect(() => {
    if (isIntersecting) {
      loadMore();
    }
  }, [isIntersecting, loadMore]);

  return (
    <div className={className}>
      {children}
      
      {hasMore && (
        <div ref={elementRef} className="flex justify-center py-4">
          {isLoading && <LoadingSpinner />}
        </div>
      )}
      
      {!hasMore && (
        <div className="text-center py-4 text-text-secondary text-sm">
          No more items to load
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;