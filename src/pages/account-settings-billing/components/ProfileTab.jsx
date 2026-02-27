import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import { useAuth } from 'context/AuthContext';

const ProfileTab = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: currentUser?.displayName?.split(' ')[0] || '',
    lastName: currentUser?.displayName?.split(' ')[1] || '',
    email: currentUser?.email || '',
    phone: '',
    company: '',
    jobTitle: '',
    bio: '',
    location: '',
    website: '',
    avatar: currentUser?.photoURL || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&crop=face'
  });

  // Sync profile data with currentUser if it changes
  useEffect(() => {
    if (currentUser) {
      setProfileData(prev => ({
        ...prev,
        firstName: currentUser.displayName?.split(' ')[0] || prev.firstName,
        lastName: currentUser.displayName?.split(' ')[1] || prev.lastName,
        email: currentUser.email || prev.email,
        avatar: currentUser.photoURL || prev.avatar
      }));
    }
  }, [currentUser]);

  const [notifications, setNotifications] = useState({
    emailMarketing: true,
    generationComplete: true,
    weeklyReports: false,
    teamUpdates: true,
    billingAlerts: true,
    securityAlerts: true
  });

  const handleSave = () => {
    setIsEditing(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-success-50 border border-success-200 rounded-lg p-4 flex items-center space-x-3">
          <Icon name="CheckCircle" size={20} className="text-success-600" />
          <span className="text-success-700 font-medium">Profile updated successfully!</span>
        </div>
      )}

      {/* Profile Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-border">
              <Image
                src={profileData.avatar}
                alt="Profile avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-600 transition-colors duration-200">
                <Icon name="Camera" size={16} color="white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-text-primary">
              {profileData.firstName} {profileData.lastName}
            </h2>
            <p className="text-text-secondary">{profileData.jobTitle} at {profileData.company}</p>
            <p className="text-text-muted text-sm mt-1">{profileData.location}</p>
          </div>
        </div>

        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${isEditing
              ? 'bg-success text-white hover:bg-success-600' : 'bg-primary text-white hover:bg-primary-600'
            }`}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      {/* Personal Information */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Personal Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              First Name
            </label>
            <input
              type="text"
              value={profileData.firstName}
              onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
              disabled={!isEditing}
              className="input-field w-full disabled:bg-gray-50 disabled:text-text-muted"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={profileData.lastName}
              onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
              disabled={!isEditing}
              className="input-field w-full disabled:bg-gray-50 disabled:text-text-muted"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
              disabled={!isEditing}
              className="input-field w-full disabled:bg-gray-50 disabled:text-text-muted"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
              disabled={!isEditing}
              className="input-field w-full disabled:bg-gray-50 disabled:text-text-muted"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Company
            </label>
            <input
              type="text"
              value={profileData.company}
              onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
              disabled={!isEditing}
              className="input-field w-full disabled:bg-gray-50 disabled:text-text-muted"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Job Title
            </label>
            <input
              type="text"
              value={profileData.jobTitle}
              onChange={(e) => setProfileData(prev => ({ ...prev, jobTitle: e.target.value }))}
              disabled={!isEditing}
              className="input-field w-full disabled:bg-gray-50 disabled:text-text-muted"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Location
            </label>
            <input
              type="text"
              value={profileData.location}
              onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
              disabled={!isEditing}
              className="input-field w-full disabled:bg-gray-50 disabled:text-text-muted"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Website
            </label>
            <input
              type="url"
              value={profileData.website}
              onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
              disabled={!isEditing}
              className="input-field w-full disabled:bg-gray-50 disabled:text-text-muted"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Bio
          </label>
          <textarea
            value={profileData.bio}
            onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
            disabled={!isEditing}
            rows={4}
            className="input-field w-full disabled:bg-gray-50 disabled:text-text-muted resize-none"
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Notification Preferences</h3>

        <div className="space-y-4">
          {[
            { key: 'emailMarketing', label: 'Marketing emails', description: 'Receive updates about new features and promotions' },
            { key: 'generationComplete', label: 'Generation complete', description: 'Get notified when your brand generation is finished' },
            { key: 'weeklyReports', label: 'Weekly reports', description: 'Receive weekly usage and performance reports' },
            { key: 'teamUpdates', label: 'Team updates', description: 'Notifications about team member activities' },
            { key: 'billingAlerts', label: 'Billing alerts', description: 'Important billing and payment notifications' },
            { key: 'securityAlerts', label: 'Security alerts', description: 'Critical security and account notifications' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h4 className="text-sm font-medium text-text-primary">{item.label}</h4>
                </div>
                <p className="text-xs text-text-muted mt-1">{item.description}</p>
              </div>

              <button
                onClick={() => handleNotificationChange(item.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${notifications[item.key] ? 'bg-primary' : 'bg-gray-200'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;