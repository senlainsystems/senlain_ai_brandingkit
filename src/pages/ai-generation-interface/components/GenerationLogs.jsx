import React, { useEffect, useRef } from 'react';
import Icon from 'components/AppIcon';

const GenerationLogs = ({ logs, isGenerating }) => {
  const logsEndRef = useRef(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getLogTypeColor = (type) => {
    const colors = {
      'info': 'text-primary',
      'success': 'text-success',
      'warning': 'text-warning',
      'error': 'text-error'
    };
    return colors[type] || 'text-text-secondary';
  };

  const getLogTypeIcon = (type) => {
    const icons = {
      'info': 'Info',
      'success': 'CheckCircle',
      'warning': 'AlertTriangle',
      'error': 'XCircle'
    };
    return icons[type] || 'Info';
  };

  const getLogTypeBg = (type) => {
    const backgrounds = {
      'info': 'bg-primary-50',
      'success': 'bg-success-50',
      'warning': 'bg-warning-50',
      'error': 'bg-error-50'
    };
    return backgrounds[type] || 'bg-background';
  };

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getServiceBadgeColor = (service) => {
    const colors = {
      'logo': 'bg-primary-100 text-primary-700',
      'name': 'bg-secondary-100 text-secondary-700',
      'tagline': 'bg-accent-100 text-accent-700',
      'colorPalette': 'bg-success-100 text-success-700',
      'system': 'bg-text-100 text-text-700'
    };
    return colors[service] || 'bg-text-100 text-text-700';
  };

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Generation Logs</h3>
        {isGenerating && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-xs text-primary font-medium">Live</span>
          </div>
        )}
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {logs.map((log) => (
          <div 
            key={log.id} 
            className={`p-3 rounded-lg border ${getLogTypeBg(log.type)} border-opacity-50`}
          >
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 ${getLogTypeColor(log.type)}`}>
                <Icon name={getLogTypeIcon(log.type)} size={14} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs text-text-muted">
                    {formatTimestamp(log.timestamp)}
                  </span>
                  {log.service && (
                    <span className={`px-2 py-0.5 text-xs rounded-md ${getServiceBadgeColor(log.service)}`}>
                      {log.service}
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-primary break-words">
                  {log.message}
                </p>
              </div>
            </div>
          </div>
        ))}

        {logs.length === 0 && (
          <div className="text-center py-8">
            <Icon name="FileText" size={32} className="text-text-muted mx-auto mb-2" />
            <p className="text-sm text-text-secondary">No logs yet</p>
            <p className="text-xs text-text-muted mt-1">
              Logs will appear here during generation
            </p>
          </div>
        )}

        <div ref={logsEndRef} />
      </div>

      {/* Log Controls */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="text-xs text-text-secondary hover:text-primary transition-colors duration-200">
              Clear Logs
            </button>
            <button className="text-xs text-text-secondary hover:text-primary transition-colors duration-200">
              Export
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-text-muted">Auto-scroll</span>
            <div className="w-8 h-4 bg-primary rounded-full relative">
              <div className="w-3 h-3 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationLogs;