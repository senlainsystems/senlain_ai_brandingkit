import React from 'react';
import Icon from 'components/AppIcon';

const GenerationQueue = ({ 
  items, 
  concurrentLimit, 
  activeGenerations, 
  userTier, 
  onRetry 
}) => {
  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'text-error',
      'normal': 'text-text-secondary',
      'low': 'text-text-muted'
    };
    return colors[priority] || 'text-text-secondary';
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      'high': 'ArrowUp',
      'normal': 'Minus',
      'low': 'ArrowDown'
    };
    return icons[priority] || 'Minus';
  };

  const getStatusColor = (status) => {
    const colors = {
      'processing': 'text-primary',
      'queued': 'text-warning',
      'failed': 'text-error',
      'completed': 'text-success'
    };
    return colors[status] || 'text-text-secondary';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'processing': 'Loader',
      'queued': 'Clock',
      'failed': 'AlertCircle',
      'completed': 'CheckCircle'
    };
    return icons[status] || 'Clock';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Generation Queue</h3>
        <div className="text-xs text-text-secondary">
          {activeGenerations}/{concurrentLimit} active
        </div>
      </div>

      {/* Tier Limit Info */}
      <div className="mb-4 p-3 bg-accent-50 border border-accent-200 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Crown" size={14} className="text-accent" />
          <span className="text-sm font-medium text-accent-700">{userTier} Plan</span>
        </div>
        <p className="text-xs text-text-secondary">
          Concurrent generations: {concurrentLimit}
        </p>
        {activeGenerations >= concurrentLimit && (
          <p className="text-xs text-warning mt-1">
            Queue limit reached. Upgrade for more concurrent generations.
          </p>
        )}
      </div>

      {/* Queue Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="border border-border rounded-lg p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-text-primary mb-1">
                  {item.name}
                </h4>
                <div className="flex items-center space-x-2">
                  <div className={`flex items-center space-x-1 ${getStatusColor(item.status)}`}>
                    <Icon name={getStatusIcon(item.status)} size={12} />
                    <span className="text-xs font-medium capitalize">{item.status}</span>
                  </div>
                  <div className={`flex items-center space-x-1 ${getPriorityColor(item.priority)}`}>
                    <Icon name={getPriorityIcon(item.priority)} size={12} />
                    <span className="text-xs">{item.priority}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {item.status === 'processing' && (
              <div className="mb-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-text-secondary">Progress</span>
                  <span className="text-text-primary font-medium">{item.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Services */}
            <div className="flex flex-wrap gap-1 mb-2">
              {item.services.map((service) => (
                <span 
                  key={service}
                  className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-md"
                >
                  {service}
                </span>
              ))}
            </div>

            {/* Time and Actions */}
            <div className="flex items-center justify-between">
              <div className="text-xs text-text-secondary">
                {item.status === 'processing' && item.estimatedTime > 0 && (
                  <span>~{formatTime(item.estimatedTime)} remaining</span>
                )}
                {item.status === 'queued' && (
                  <span>Estimated: {formatTime(item.estimatedTime)}</span>
                )}
                {item.status === 'failed' && item.error && (
                  <span className="text-error">{item.error}</span>
                )}
              </div>
              
              {item.status === 'failed' && (
                <button
                  onClick={() => onRetry(item.id)}
                  className="text-xs text-secondary hover:text-secondary-700 font-medium"
                >
                  Retry
                </button>
              )}
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Clock" size={32} className="text-text-muted mx-auto mb-2" />
            <p className="text-sm text-text-secondary">No items in queue</p>
            <p className="text-xs text-text-muted mt-1">
              Start a generation to see it here
            </p>
          </div>
        )}
      </div>

      {/* Upgrade Prompt */}
      {userTier === 'Hobby' && (
        <div className="mt-4 p-3 bg-secondary-50 border border-secondary-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Zap" size={14} className="text-secondary" />
            <span className="text-sm font-medium text-secondary-700">Upgrade to Pro</span>
          </div>
          <p className="text-xs text-text-secondary mb-2">
            Get 3 concurrent generations and priority processing
          </p>
          <button className="text-xs text-secondary hover:text-secondary-700 font-medium">
            Upgrade Now →
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerationQueue;