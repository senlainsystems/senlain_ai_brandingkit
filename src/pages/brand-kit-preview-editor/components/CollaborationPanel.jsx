import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const CollaborationPanel = ({ brandId, onClose }) => {
  const [activeTab, setActiveTab] = useState('comments');
  const [newComment, setNewComment] = useState('');
  const [selectedElement, setSelectedElement] = useState(null);

  // Mock collaboration data
  const comments = [
    {
      id: 1,
      author: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      timestamp: '2024-01-20T14:30:00Z',
      element: 'Primary Logo',
      content: 'The logo looks great! Could we try a slightly bolder version for better visibility at small sizes?',
      status: 'open',
      replies: [
        {
          id: 11,
          author: 'Mike Chen',
          avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
          timestamp: '2024-01-20T15:15:00Z',
          content: 'Good point! I\'ll create a bold variant and update the minimum size guidelines.'
        }
      ]
    },
    {
      id: 2,
      author: 'Alex Rivera',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      timestamp: '2024-01-20T11:45:00Z',
      element: 'Color Palette',
      content: 'The accessibility contrast ratios look perfect. All colors meet WCAG AA standards.',
      status: 'resolved',
      replies: []
    },
    {
      id: 3,
      author: 'Emily Davis',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      timestamp: '2024-01-19T16:20:00Z',
      element: 'Typography',
      content: 'Should we consider adding a third font for special use cases like quotes or callouts?',
      status: 'open',
      replies: []
    }
  ];

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      role: 'Brand Manager',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      status: 'online',
      permissions: 'admin'
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike@company.com',
      role: 'Senior Designer',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      status: 'online',
      permissions: 'editor'
    },
    {
      id: 3,
      name: 'Alex Rivera',
      email: 'alex@company.com',
      role: 'UX Designer',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      status: 'away',
      permissions: 'editor'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily@company.com',
      role: 'Marketing Lead',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      status: 'offline',
      permissions: 'viewer'
    }
  ];

  const approvals = [
    {
      id: 1,
      element: 'Primary Logo',
      status: 'approved',
      approver: 'Sarah Johnson',
      timestamp: '2024-01-20T16:00:00Z',
      comments: 'Approved for production use'
    },
    {
      id: 2,
      element: 'Color Palette',
      status: 'pending',
      approver: 'Marketing Team',
      timestamp: null,
      comments: 'Waiting for final review'
    },
    {
      id: 3,
      element: 'Typography System',
      status: 'changes_requested',
      approver: 'Alex Rivera',
      timestamp: '2024-01-19T14:30:00Z',
      comments: 'Please add more font weight options'
    }
  ];

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'away': return 'bg-warning';
      case 'offline': return 'bg-gray-400';
      case 'approved': return 'bg-success-100 text-success-700';
      case 'pending': return 'bg-warning-100 text-warning-700';
      case 'changes_requested': return 'bg-error-100 text-error-700';
      case 'open': return 'bg-primary-100 text-primary-700';
      case 'resolved': return 'bg-success-100 text-success-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    console.log('Adding comment:', {
      content: newComment,
      element: selectedElement
    });
    
    setNewComment('');
    setSelectedElement(null);
  };

  const handleInviteMember = () => {
    console.log('Inviting team member...');
  };

  const renderCommentsTab = () => (
    <div className="space-y-4">
      {/* Add Comment */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="User" size={16} color="white" />
          </div>
          
          <div className="flex-1 space-y-3">
            <div>
              <select
                value={selectedElement || ''}
                onChange={(e) => setSelectedElement(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select element to comment on...</option>
                <option value="Primary Logo">Primary Logo</option>
                <option value="Color Palette">Color Palette</option>
                <option value="Typography">Typography</option>
                <option value="Guidelines">Guidelines</option>
              </select>
            </div>
            
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your comment or feedback..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-text-muted">
                <Icon name="AtSign" size={12} />
                <span>Use @name to mention team members</span>
              </div>
              
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim() || !selectedElement}
                className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <img
                src={comment.avatar}
                alt={comment.author}
                className="w-8 h-8 rounded-full"
              />
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-text-primary">
                    {comment.author}
                  </span>
                  <span className="text-xs text-text-muted">
                    {formatDate(comment.timestamp)}
                  </span>
                  <span className="text-xs text-text-muted">•</span>
                  <span className="text-xs text-primary font-medium">
                    {comment.element}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(comment.status)}`}>
                    {comment.status}
                  </span>
                </div>
                
                <p className="text-sm text-text-secondary mb-3">
                  {comment.content}
                </p>
                
                {comment.replies.length > 0 && (
                  <div className="space-y-3 pl-4 border-l-2 border-gray-200">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start space-x-3">
                        <img
                          src={reply.avatar}
                          alt={reply.author}
                          className="w-6 h-6 rounded-full"
                        />
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-text-primary">
                              {reply.author}
                            </span>
                            <span className="text-xs text-text-muted">
                              {formatDate(reply.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-text-secondary">
                            {reply.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center space-x-4 mt-3 text-xs">
                  <button className="text-text-muted hover:text-primary transition-colors duration-200">
                    Reply
                  </button>
                  {comment.status === 'open' && (
                    <button className="text-text-muted hover:text-success transition-colors duration-200">
                      Resolve
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTeamTab = () => (
    <div className="space-y-4">
      {/* Invite Member */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-text-primary">Invite Team Member</h3>
        </div>
        
        <div className="flex space-x-2">
          <input
            type="email"
            placeholder="Enter email address..."
            className="flex-1 px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <select className="px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
          <button
            onClick={handleInviteMember}
            className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary-600 transition-colors duration-200"
          >
            Invite
          </button>
        </div>
      </div>

      {/* Team Members */}
      <div className="space-y-3">
        {teamMembers.map((member) => (
          <div key={member.id} className="flex items-center justify-between p-3 bg-surface border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`}></div>
              </div>
              
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-text-primary">
                    {member.name}
                  </span>
                  <span className="text-xs text-text-muted capitalize">
                    {member.status}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-text-secondary">
                  <span>{member.email}</span>
                  <span>•</span>
                  <span>{member.role}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                member.permissions === 'admin' ? 'bg-secondary-100 text-secondary-700' :
                member.permissions === 'editor'? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {member.permissions}
              </span>
              
              <button className="p-1 rounded text-text-muted hover:text-primary transition-colors duration-200">
                <Icon name="MoreVertical" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderApprovalsTab = () => (
    <div className="space-y-4">
      {approvals.map((approval) => (
        <div key={approval.id} className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <h3 className="text-sm font-medium text-text-primary">
                {approval.element}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(approval.status)}`}>
                {approval.status.replace('_', ' ')}
              </span>
            </div>
            
            {approval.status === 'pending' && (
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-xs font-medium text-error hover:bg-error-50 rounded transition-colors duration-200">
                  Request Changes
                </button>
                <button className="px-3 py-1 text-xs font-medium bg-success text-white rounded hover:bg-success-600 transition-colors duration-200">
                  Approve
                </button>
              </div>
            )}
          </div>
          
          <div className="text-sm text-text-secondary mb-2">
            <span className="font-medium">Approver:</span> {approval.approver}
          </div>
          
          {approval.timestamp && (
            <div className="text-sm text-text-secondary mb-2">
              <span className="font-medium">Date:</span> {formatDate(approval.timestamp)}
            </div>
          )}
          
          {approval.comments && (
            <div className="text-sm text-text-secondary">
              <span className="font-medium">Comments:</span> {approval.comments}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const tabs = [
    { id: 'comments', label: 'Comments', icon: 'MessageCircle', count: comments.length },
    { id: 'team', label: 'Team', icon: 'Users', count: teamMembers.length },
    { id: 'approvals', label: 'Approvals', icon: 'CheckCircle', count: approvals.length }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg w-full max-w-2xl max-h-[90vh] mx-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Collaboration</h2>
            <p className="text-sm text-text-secondary mt-1">
              Work together on brand assets
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-md text-text-secondary hover:text-primary hover:bg-gray-100 transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-gray-50'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className="bg-gray-200 text-text-muted px-2 py-0.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'comments' && renderCommentsTab()}
          {activeTab === 'team' && renderTeamTab()}
          {activeTab === 'approvals' && renderApprovalsTab()}
        </div>
      </div>
    </div>
  );
};

export default CollaborationPanel;