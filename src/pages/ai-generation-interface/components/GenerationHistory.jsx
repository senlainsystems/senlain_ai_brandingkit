import React from 'react';
import Icon from 'components/AppIcon';

const GenerationHistory = ({ history, onRegenerate }) => {
  const getStatusColor = (status) => {
    const colors = {
      'completed': 'text-success',
      'partial': 'text-warning',
      'failed': 'text-error'
    };
    return colors[status] || 'text-text-secondary';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'completed': 'CheckCircle',
      'partial': 'AlertCircle',
      'failed': 'XCircle'
    };
    return icons[status] || 'Clock';
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatRelativeTime = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMins = Math.floor((now - date) / (1000 * 60));
      return `${diffInMins}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const getServiceIcon = (service) => {
    const icons = {
      'logo': 'Palette',
      'name': 'Type',
      'tagline': 'MessageSquare',
      'colorPalette': 'Droplet'
    };
    return icons[service] || 'Circle';
  };

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Generation History</h3>
        <button className="text-xs text-text-secondary hover:text-primary transition-colors duration-200">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {history.map((item) => (
          <div key={item.id} className="border border-border rounded-lg p-3 hover:bg-background transition-colors duration-200">
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
                  <span className="text-xs text-text-muted">
                    {formatRelativeTime(item.completedAt)}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => onRegenerate(item.id)}
                className="text-xs text-secondary hover:text-secondary-700 font-medium ml-2"
              >
                Regenerate
              </button>
            </div>

            {/* Services Generated */}
            <div className="flex items-center space-x-1 mb-2">
              {item.services.map((service) => (
                <div 
                  key={service}
                  className="w-6 h-6 bg-primary-50 rounded-md flex items-center justify-center"
                  title={service}
                >
                  <Icon 
                    name={getServiceIcon(service)} 
                    size={12} 
                    className="text-primary" 
                  />
                </div>
              ))}
              <span className="text-xs text-text-muted ml-2">
                {item.services.length} service{item.services.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Duration */}
            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span>Duration: {formatDuration(item.duration)}</span>
              <div className="flex items-center space-x-2">
                <button className="hover:text-primary transition-colors duration-200">
                  <Icon name="Eye" size={12} />
                </button>
                <button className="hover:text-primary transition-colors duration-200">
                  <Icon name="Download" size={12} />
                </button>
                <button className="hover:text-primary transition-colors duration-200">
                  <Icon name="Share2" size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {history.length === 0 && (
          <div className="text-center py-8">
            <Icon name="History" size={32} className="text-text-muted mx-auto mb-2" />
            <p className="text-sm text-text-secondary">No generation history</p>
            <p className="text-xs text-text-muted mt-1">
              Completed generations will appear here
            </p>
          </div>
        )}
      </div>

      {/* History Stats */}
      {history.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-text-primary">
                {history.filter(h => h.status === 'completed').length}
              </div>
              <div className="text-xs text-text-secondary">Completed</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-text-primary">
                {Math.round(history.reduce((sum, h) => sum + h.duration, 0) / history.length)}s
              </div>
              <div className="text-xs text-text-secondary">Avg. Time</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-text-primary">
                {history.reduce((sum, h) => sum + h.services.length, 0)}
              </div>
              <div className="text-xs text-text-secondary">Total Assets</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerationHistory;