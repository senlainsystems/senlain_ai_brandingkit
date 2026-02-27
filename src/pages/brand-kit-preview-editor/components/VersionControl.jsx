import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const VersionControl = ({ brandId, onClose, onRestore }) => {
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  // Mock version history data removed for production readiness
  const versions = [];

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getVersionStatus = (version) => {
    if (version.isCurrent) {
      return { label: 'Current', color: 'bg-success-100 text-success-700' };
    }
    return { label: 'Previous', color: 'bg-gray-100 text-gray-600' };
  };

  const handleVersionSelect = (version) => {
    setSelectedVersion(selectedVersion?.id === version.id ? null : version);
  };

  const handleRestore = (versionId) => {
    if (window.confirm('Are you sure you want to restore this version? This will create a new version with these changes.')) {
      onRestore(versionId);
    }
  };

  const handleCompare = () => {
    setShowComparison(true);
  };

  const handleDownload = (versionId) => {
    console.log('Downloading version:', versionId);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg w-full max-w-4xl max-h-[90vh] mx-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Version History</h2>
            <p className="text-sm text-text-secondary mt-1">
              Track and manage brand kit versions
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {selectedVersion && !selectedVersion.isCurrent && (
              <>
                <button
                  onClick={handleCompare}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary-50 rounded-md transition-colors duration-200"
                >
                  <Icon name="GitCompare" size={16} />
                  <span>Compare</span>
                </button>

                <button
                  onClick={() => handleRestore(selectedVersion.id)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary-600 transition-colors duration-200"
                >
                  <Icon name="RotateCcw" size={16} />
                  <span>Restore</span>
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-md text-text-secondary hover:text-primary hover:bg-gray-100 transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        {/* Version List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {versions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Icon name="History" size={32} className="text-text-muted" />
                </div>
                <h3 className="text-lg font-medium text-text-primary mb-2">No version history yet</h3>
                <p className="text-text-secondary max-w-sm">
                  Once you start making changes to your brand kit, you'll be able to track and restore previous versions here.
                </p>
              </div>
            ) : versions.map((version) => {
              const status = getVersionStatus(version);
              const isSelected = selectedVersion?.id === version.id;

              return (
                <div
                  key={version.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${isSelected
                    ? 'border-primary bg-primary-50' : 'border-border hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  onClick={() => handleVersionSelect(version)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-text-primary">
                          {version.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                          {status.label}
                        </span>
                        <span className="text-sm font-mono text-text-secondary">
                          {version.id}
                        </span>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
                        <div className="flex items-center space-x-1">
                          <Icon name="User" size={14} />
                          <span>{version.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={14} />
                          <span>{formatDate(version.timestamp)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="HardDrive" size={14} />
                          <span>{version.size}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-sm font-medium text-text-primary">Changes:</h4>
                        <ul className="text-sm text-text-secondary space-y-1">
                          {version.changes.map((change, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <Icon name="GitCommit" size={12} className="mt-0.5 flex-shrink-0" />
                              <span>{change}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(version.id);
                        }}
                        className="p-2 rounded text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200"
                        title="Download version"
                      >
                        <Icon name="Download" size={16} />
                      </button>

                      {!version.isCurrent && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRestore(version.id);
                          }}
                          className="p-2 rounded text-text-secondary hover:text-primary hover:bg-primary-50 transition-colors duration-200"
                          title="Restore version"
                        >
                          <Icon name="RotateCcw" size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              {versions.length} versions • Total size: 12.3 MB
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => console.log('Creating new version...')}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary-50 rounded-md transition-colors duration-200"
              >
                <Icon name="Plus" size={16} />
                <span>Create Version</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-text-secondary border border-border rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Modal */}
      {showComparison && selectedVersion && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-60">
          <div className="bg-surface rounded-lg w-full max-w-6xl max-h-[90vh] mx-4 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-text-primary">
                Compare Versions
              </h3>
              <button
                onClick={() => setShowComparison(false)}
                className="p-2 rounded text-text-secondary hover:text-primary hover:bg-gray-100 transition-colors duration-200"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="flex-1 p-6">
              <div className="grid grid-cols-2 gap-6 h-full">
                <div>
                  <h4 className="text-sm font-medium text-text-primary mb-4">
                    Current Version (v1.0.0)
                  </h4>
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                    <span className="text-text-muted">Current brand kit preview</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-text-primary mb-4">
                    {selectedVersion.name} ({selectedVersion.id})
                  </h4>
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                    <span className="text-text-muted">Selected version preview</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VersionControl;