import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SecurityTab = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Security data removed for production readiness
  const activeSessions = [];
  const securityEvents = [];

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 25, label: 'Weak', color: 'text-error' };
    if (password.length < 10) return { strength: 50, label: 'Fair', color: 'text-warning' };
    if (password.length < 12) return { strength: 75, label: 'Good', color: 'text-accent' };
    return { strength: 100, label: 'Strong', color: 'text-success' };
  };

  const passwordStrength = getPasswordStrength(passwordData.newPassword);

  const getDeviceIcon = (device) => {
    if (device.toLowerCase().includes('iphone')) return 'Smartphone';
    if (device.toLowerCase().includes('ipad')) return 'Tablet';
    if (device.toLowerCase().includes('mac')) return 'Laptop';
    return 'Monitor';
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'login':
        return 'LogIn';
      case 'password_change':
        return 'Key';
      case 'failed_login':
        return 'AlertTriangle';
      default:
        return 'Info';
    }
  };

  const getEventColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-text-muted';
    }
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Mock password change
    console.log('Password changed successfully');
    setShowPasswordForm(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleEnable2FA = () => {
    setTwoFactorEnabled(true);
    setShow2FASetup(false);
  };

  const handleTerminateSession = (sessionId) => {
    console.log('Terminating session:', sessionId);
  };

  return (
    <div className="space-y-8">
      {/* Password Security */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Password Security</h3>
            <p className="text-text-secondary">Manage your account password and security settings</p>
          </div>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="btn-primary px-4 py-2 rounded-lg"
          >
            Change Password
          </button>
        </div>

        {showPasswordForm && (
          <div className="border-t border-border pt-6">
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="input-field w-full"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="input-field w-full"
                  placeholder="Enter new password"
                />
                {passwordData.newPassword && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-text-secondary">Password strength</span>
                      <span className={`text-xs font-medium ${passwordStrength.color}`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className={`h-1 rounded-full transition-all duration-300 ${passwordStrength.strength <= 25 ? 'bg-error' :
                          passwordStrength.strength <= 50 ? 'bg-warning' :
                            passwordStrength.strength <= 75 ? 'bg-accent' : 'bg-success'
                          }`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="input-field w-full"
                  placeholder="Confirm new password"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowPasswordForm(false)}
                  className="px-4 py-2 border border-border rounded-lg text-text-secondary hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasswordChange}
                  className="btn-primary px-4 py-2 rounded-lg"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Two-Factor Authentication</h3>
            <p className="text-text-secondary">
              Add an extra layer of security to your account
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${twoFactorEnabled
              ? 'text-success bg-success-50 border-success-200' : 'text-warning bg-warning-50 border-warning-200'
              }`}>
              {twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </span>

            <button
              onClick={() => twoFactorEnabled ? setTwoFactorEnabled(false) : setShow2FASetup(true)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${twoFactorEnabled
                ? 'bg-error text-white hover:bg-error-600' : 'btn-primary'
                }`}
            >
              {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </button>
          </div>
        </div>

        {twoFactorEnabled && (
          <div className="bg-success-50 border border-success-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Shield" size={20} className="text-success-600" />
              <div>
                <p className="font-medium text-success-700">Two-factor authentication is active</p>
                <p className="text-sm text-success-600">Your account is protected with 2FA</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Sessions */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Active Sessions</h3>

        <div className="space-y-4">
          {activeSessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                <Icon name="Monitor" size={24} className="text-text-muted" />
              </div>
              <h4 className="text-sm font-medium text-text-primary mb-1">No active sessions</h4>
              <p className="text-xs text-text-secondary max-w-[200px]">
                Your current session will appear here when you sign in.
              </p>
            </div>
          ) : activeSessions.map((session) => (
            <div key={session.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                    <Icon name={getDeviceIcon(session.device)} size={20} className="text-primary" />
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-text-primary">{session.device}</h4>
                      {session.isCurrent && (
                        <span className="bg-success text-white px-2 py-1 rounded-full text-xs font-medium">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary">{session.browser}</p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-text-muted">
                      <span>{session.location}</span>
                      <span>•</span>
                      <span>{session.ipAddress}</span>
                      <span>•</span>
                      <span>Last active {new Date(session.lastActive).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {!session.isCurrent && (
                  <button
                    onClick={() => handleTerminateSession(session.id)}
                    className="text-sm text-error hover:text-error-600 transition-colors duration-200"
                  >
                    Terminate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Events */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Recent Security Events</h3>

        <div className="space-y-4">
          {securityEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                <Icon name="ShieldAlert" size={24} className="text-text-muted" />
              </div>
              <h4 className="text-sm font-medium text-text-primary mb-1">No security events</h4>
              <p className="text-xs text-text-secondary max-w-[200px]">
                Recent security-related activity will be logged here.
              </p>
            </div>
          ) : securityEvents.map((event) => (
            <div key={event.id} className="flex items-center space-x-4 py-3 border-b border-border last:border-b-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${event.status === 'success' ? 'bg-success-50' :
                event.status === 'warning' ? 'bg-warning-50' : 'bg-error-50'
                }`}>
                <Icon
                  name={getEventIcon(event.type)}
                  size={16}
                  className={getEventColor(event.status)}
                />
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">{event.description}</p>
                <div className="flex items-center space-x-4 mt-1 text-xs text-text-muted">
                  <span>{new Date(event.timestamp).toLocaleString()}</span>
                  <span>•</span>
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2FA Setup Modal */}
      {show2FASetup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1300">
          <div className="bg-surface rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Enable Two-Factor Authentication</h3>
              <button
                onClick={() => setShow2FASetup(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Icon name="QrCode" size={48} className="text-text-muted" />
                </div>
                <p className="text-sm text-text-secondary">
                  Scan this QR code with your authenticator app
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  className="input-field w-full text-center font-mono"
                  maxLength={6}
                />
              </div>

              <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
                <p className="text-sm text-text-secondary">
                  Download an authenticator app like Google Authenticator or Authy to get started.
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShow2FASetup(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-text-secondary hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEnable2FA}
                  className="flex-1 btn-primary px-4 py-2 rounded-lg"
                >
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityTab;