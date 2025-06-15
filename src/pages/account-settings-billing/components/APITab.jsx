import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const APITab = () => {
  const [showCreateKeyModal, setShowCreateKeyModal] = useState(false);
  const [showKeyDetails, setShowKeyDetails] = useState(null);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyPermissions, setNewKeyPermissions] = useState([]);

  const apiKeys = [
    {
      id: 1,
      name: 'Production API Key',
      key: 'sk_live_1234567890abcdef',
      created: '2024-01-15',
      lastUsed: '2024-02-20',
      permissions: ['read', 'write'],
      status: 'active',
      usage: {
        requests: 1250,
        limit: 10000
      }
    },
    {
      id: 2,
      name: 'Development Key',
      key: 'sk_test_abcdef1234567890',
      created: '2024-02-01',
      lastUsed: '2024-02-19',
      permissions: ['read'],
      status: 'active',
      usage: {
        requests: 450,
        limit: 1000
      }
    }
  ];

  const apiUsage = {
    totalRequests: 1700,
    monthlyLimit: 11000,
    successRate: 99.2,
    averageResponseTime: 245
  };

  const endpoints = [
    {
      method: 'POST',
      path: '/api/v1/brands/generate',
      description: 'Generate a new brand identity',
      rateLimit: '10 requests/minute'
    },
    {
      method: 'GET',
      path: '/api/v1/brands/{id}',
      description: 'Retrieve brand details',
      rateLimit: '100 requests/minute'
    },
    {
      method: 'PUT',
      path: '/api/v1/brands/{id}',
      description: 'Update brand information',
      rateLimit: '50 requests/minute'
    },
    {
      method: 'DELETE',
      path: '/api/v1/brands/{id}',
      description: 'Delete a brand',
      rateLimit: '20 requests/minute'
    }
  ];

  const permissions = [
    { id: 'read', name: 'Read', description: 'View brand data and analytics' },
    { id: 'write', name: 'Write', description: 'Create and update brands' },
    { id: 'delete', name: 'Delete', description: 'Delete brands and data' },
    { id: 'admin', name: 'Admin', description: 'Full API access including team management' }
  ];

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET':
        return 'text-success bg-success-50 border-success-200';
      case 'POST':
        return 'text-primary bg-primary-50 border-primary-200';
      case 'PUT':
        return 'text-accent bg-accent-50 border-accent-200';
      case 'DELETE':
        return 'text-error bg-error-50 border-error-200';
      default:
        return 'text-text-muted bg-gray-50 border-gray-200';
    }
  };

  const handleCreateKey = () => {
    console.log('Creating API key:', newKeyName, newKeyPermissions);
    setShowCreateKeyModal(false);
    setNewKeyName('');
    setNewKeyPermissions([]);
  };

  const handlePermissionToggle = (permissionId) => {
    setNewKeyPermissions(prev => 
      prev.includes(permissionId)
        ? prev.filter(p => p !== permissionId)
        : [...prev, permissionId]
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Show toast notification
  };

  return (
    <div className="space-y-8">
      {/* API Usage Overview */}
      <div className="bg-gradient-to-r from-accent-50 to-primary-50 border border-accent-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-text-primary mb-6">API Usage Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-surface rounded-lg p-4 border border-border">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="Activity" size={20} className="text-primary" />
              <span className="text-sm font-medium text-text-secondary">Total Requests</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">{apiUsage.totalRequests.toLocaleString()}</div>
            <div className="text-xs text-text-muted">of {apiUsage.monthlyLimit.toLocaleString()} monthly limit</div>
          </div>

          <div className="bg-surface rounded-lg p-4 border border-border">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <span className="text-sm font-medium text-text-secondary">Success Rate</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">{apiUsage.successRate}%</div>
            <div className="text-xs text-text-muted">Last 30 days</div>
          </div>

          <div className="bg-surface rounded-lg p-4 border border-border">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="Clock" size={20} className="text-accent" />
              <span className="text-sm font-medium text-text-secondary">Avg Response</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">{apiUsage.averageResponseTime}ms</div>
            <div className="text-xs text-text-muted">Response time</div>
          </div>

          <div className="bg-surface rounded-lg p-4 border border-border">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="Key" size={20} className="text-secondary" />
              <span className="text-sm font-medium text-text-secondary">Active Keys</span>
            </div>
            <div className="text-2xl font-bold text-text-primary">{apiKeys.length}</div>
            <div className="text-xs text-text-muted">API keys</div>
          </div>
        </div>
      </div>

      {/* API Keys */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">API Keys</h3>
          <button
            onClick={() => setShowCreateKeyModal(true)}
            className="btn-primary px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Icon name="Plus" size={16} />
            <span>Create API Key</span>
          </button>
        </div>

        <div className="space-y-4">
          {apiKeys.map((key) => (
            <div key={key.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium text-text-primary">{key.name}</h4>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-text-secondary">
                    <span>Created {new Date(key.created).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Last used {new Date(key.lastUsed).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="bg-success text-white px-2 py-1 rounded-full text-xs font-medium">
                    Active
                  </span>
                  <button
                    onClick={() => setShowKeyDetails(key.id)}
                    className="text-primary hover:text-primary-600 transition-colors duration-200"
                  >
                    <Icon name="Eye" size={16} />
                  </button>
                  <button className="text-error hover:text-error-600 transition-colors duration-200">
                    <Icon name="Trash2" size={16} />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono text-text-primary">
                    {showKeyDetails === key.id ? key.key : key.key.replace(/./g, '•').slice(0, 20) + '...'}
                  </code>
                  <button
                    onClick={() => copyToClipboard(key.key)}
                    className="text-primary hover:text-primary-600 transition-colors duration-200"
                  >
                    <Icon name="Copy" size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-text-secondary">Permissions:</span>
                    {key.permissions.map((permission) => (
                      <span
                        key={permission}
                        className="bg-primary-50 text-primary px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-sm text-text-secondary">
                  {key.usage.requests.toLocaleString()} / {key.usage.limit.toLocaleString()} requests
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Documentation */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">API Endpoints</h3>
        
        <div className="space-y-4">
          {endpoints.map((endpoint, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getMethodColor(endpoint.method)}`}>
                    {endpoint.method}
                  </span>
                  <code className="text-sm font-mono text-text-primary">{endpoint.path}</code>
                </div>
                <span className="text-xs text-text-muted">{endpoint.rateLimit}</span>
              </div>
              <p className="text-sm text-text-secondary">{endpoint.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="Book" size={20} className="text-primary" />
            <div>
              <h4 className="font-medium text-primary">Full API Documentation</h4>
              <p className="text-sm text-primary-600">
                View complete API documentation with examples and authentication details
              </p>
            </div>
          </div>
          <button className="mt-3 btn-primary px-4 py-2 rounded-lg text-sm">
            View Documentation
          </button>
        </div>
      </div>

      {/* Create API Key Modal */}
      {showCreateKeyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1300">
          <div className="bg-surface rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Create API Key</h3>
              <button
                onClick={() => setShowCreateKeyModal(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Key Name
                </label>
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g., Production API Key"
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Permissions
                </label>
                <div className="space-y-3">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id={permission.id}
                        checked={newKeyPermissions.includes(permission.id)}
                        onChange={() => handlePermissionToggle(permission.id)}
                        className="mt-1 rounded"
                      />
                      <div>
                        <label htmlFor={permission.id} className="text-sm font-medium text-text-primary cursor-pointer">
                          {permission.name}
                        </label>
                        <p className="text-xs text-text-muted">{permission.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-warning-50 border border-warning-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-warning-600" />
                  <p className="text-sm text-warning-700">
                    Store your API key securely. It won't be shown again after creation.
                  </p>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowCreateKeyModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-text-secondary hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateKey}
                  disabled={!newKeyName || newKeyPermissions.length === 0}
                  className="flex-1 btn-primary px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default APITab;