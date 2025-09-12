import React from 'react';
import { MapPin, Clock, User, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';

const IssueCard = ({
  issue,
  showActions = false,
  onStatusUpdate,
  onPriorityUpdate
}) => {
  const statusColors = {
    pending: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-300',
    'in-progress': 'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-300',
    resolved: 'from-green-500/20 to-green-600/20 border-green-500/30 text-green-300',
    rejected: 'from-red-500/20 to-red-600/20 border-red-500/30 text-red-300',
  };

  const priorityColors = {
    low: 'text-gray-400',
    medium: 'text-yellow-400',
    high: 'text-orange-400',
    urgent: 'text-red-400',
  };

  const categoryIcons = {
    road: '🛣️',
    waste: '🗑️',
    electricity: '⚡',
    water: '💧',
    parks: '🌳',
    safety: '🚨',
    other: '📝',
  };

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg">{categoryIcons[issue.category]}</span>
            <h3 className="text-lg font-semibold text-white">{issue.title}</h3>
          </div>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{issue.description}</p>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${statusColors[issue.status]} border`}>
          {issue.status.charAt(0).toUpperCase() + issue.status.slice(1).replace('-', ' ')}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span className="truncate max-w-[200px]">{issue.location.address}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{formatDistanceToNow(issue.createdAt)} ago</span>
          </div>
        </div>
        
        <div className={`flex items-center space-x-1 ${priorityColors[issue.priority]}`}>
          <AlertCircle className="h-4 w-4" />
          <span className="capitalize">{issue.priority}</span>
        </div>
      </div>

      {issue.photos.length > 0 && (
        <div className="mb-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {issue.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Issue ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0 border border-gray-700"
              />
            ))}
          </div>
        </div>
      )}

      {showActions && (onStatusUpdate || onPriorityUpdate) && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700/50">
          {onStatusUpdate && (
            <select
              value={issue.status}
              onChange={(e) => onStatusUpdate(issue.id, e.target.value)}
              className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
          )}
          
          {onPriorityUpdate && (
            <select
              value={issue.priority}
              onChange={(e) => onPriorityUpdate(issue.id, e.target.value)}
              className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          )}
        </div>
      )}
    </div>
  );
};

export default IssueCard;