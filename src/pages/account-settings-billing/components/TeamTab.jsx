import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const TeamTab = ({ userTier }) => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      role: 'owner',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      joinedDate: '2023-01-15',
      lastActive: '2024-02-20',
      status: 'active',
      creditsUsed: 15
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      joinedDate: '2023-03-22',
      lastActive: '2024-02-19',
      status: 'active',
      creditsUsed: 8
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@example.com',
      role: 'member',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      joinedDate: '2023-06-10',
      lastActive: '2024-02-18',
      status: 'active',
      creditsUsed: 12
    }
  ];

  const pendingInvites = [
    {
      id: 1,
      email: 'john.doe@example.com',
      role: 'member',
      invitedDate: '2024-02-15',
      invitedBy: 'Sarah Johnson'
    }
  ];

  const roles = [
    {
      id: 'member',
      name: 'Member',
      description: 'Can create and edit brand projects',
      permissions: ['Create brands', 'Edit own brands', 'View team brands']
    },
    {
      id: 'admin',
      name: 'Admin',
      description: 'Can manage team members and settings',
      permissions: ['All member permissions', 'Manage team members', 'View usage analytics', 'Manage billing']
    },
    {
      id: 'owner',
      name: 'Owner',
      description: 'Full access to all features and settings',
      permissions: ['All admin permissions', 'Delete team', 'Transfer ownership']
    }
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case 'owner':
        return 'text-primary bg-primary-50 border-primary-200';
      case 'admin':
        return 'text-secondary bg-secondary-50 border-secondary-200';
      case 'member':
        return 'text-accent bg-accent-50 border-accent-200';
      default:
        return 'text-text-muted bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success-50 border-success-200';
      case 'inactive':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'suspended':
        return 'text-error bg-error-50 border-error-200';
      default:
        return 'text-text-muted bg-gray-50 border-gray-200';
    }
  };

  const handleInvite = () => {
    // Mock invite functionality
    console.log('Inviting:', inviteEmail, 'as', inviteRole);
    setShowInviteModal(false);
    setInviteEmail('');
    setInviteRole('member');
  };

  const maxMembers = userTier === 'Pro' ? 5 : userTier === 'Agency' ? 999 : 1;
  const currentMembers = teamMembers.length;

  return (
    <div className="space-y-8">
      {/* Team Overview */}
      <div className="bg-gradient-to-r from-secondary-50 to-accent-50 border border-secondary-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-text-primary mb-2">Team Overview</h3>
            <p className="text-text-secondary">
              {currentMembers} of {maxMembers === 999 ? 'unlimited' : maxMembers} members
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{teamMembers.reduce((sum, member) => sum + member.creditsUsed, 0)}</div>
              <div className="text-sm text-text-secondary">Credits Used</div>
            </div>
            
            {currentMembers < maxMembers && (
              <button
                onClick={() => setShowInviteModal(true)}
                className="btn-secondary px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <Icon name="UserPlus" size={16} />
                <span>Invite Member</span>
              </button>
            )}
          </div>
        </div>

        {maxMembers !== 999 && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-secondary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentMembers / maxMembers) * 100}%` }}
            ></div>
          </div>
        )}
      </div>

      {/* Team Members */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Team Members</h3>
        
        <div className="space-y-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-text-primary">{member.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(member.role)}`}>
                        {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(member.status)}`}>
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">{member.email}</p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-text-muted">
                      <span>Joined {new Date(member.joinedDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Last active {new Date(member.lastActive).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{member.creditsUsed} credits used</span>
                    </div>
                  </div>
                </div>

                {member.role !== 'owner' && (
                  <div className="flex items-center space-x-2">
                    <button className="text-sm text-primary hover:text-primary-600 transition-colors duration-200">
                      Edit Role
                    </button>
                    <button className="text-sm text-error hover:text-error-600 transition-colors duration-200">
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pending Invites */}
      {pendingInvites.length > 0 && (
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-6">Pending Invites</h3>
          
          <div className="space-y-4">
            {pendingInvites.map((invite) => (
              <div key={invite.id} className="border border-warning-200 bg-warning-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Mail" size={16} className="text-warning-600" />
                      <span className="font-medium text-text-primary">{invite.email}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(invite.role)}`}>
                        {invite.role.charAt(0).toUpperCase() + invite.role.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary mt-1">
                      Invited by {invite.invitedBy} on {new Date(invite.invitedDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="text-sm text-primary hover:text-primary-600 transition-colors duration-200">
                      Resend
                    </button>
                    <button className="text-sm text-error hover:text-error-600 transition-colors duration-200">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Role Permissions */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-6">Role Permissions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div key={role.id} className="border border-border rounded-lg p-4">
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(role.id)}`}>
                    {role.name}
                  </span>
                </div>
                <p className="text-sm text-text-secondary">{role.description}</p>
              </div>
              
              <div className="space-y-2">
                {role.permissions.map((permission, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={14} className="text-success flex-shrink-0" />
                    <span className="text-sm text-text-secondary">{permission}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1300">
          <div className="bg-surface rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Invite Team Member</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-text-muted hover:text-text-primary"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@example.com"
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
                <p className="text-xs text-text-muted mt-1">
                  {roles.find(r => r.id === inviteRole)?.description}
                </p>
              </div>

              <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
                <p className="text-sm text-text-secondary">
                  An invitation email will be sent to {inviteEmail || 'the specified email address'} with instructions to join your team.
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-text-secondary hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInvite}
                  disabled={!inviteEmail}
                  className="flex-1 btn-secondary px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Invite
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamTab;