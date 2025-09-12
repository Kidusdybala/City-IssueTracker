/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {'citizen' | 'admin'} role
 * @property {number} points
 * @property {Badge[]} badges
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} Issue
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {IssueCategory} category
 * @property {IssueStatus} status
 * @property {Priority} priority
 * @property {Location} location
 * @property {string[]} photos
 * @property {string} reporterId
 * @property {string} [assignedTo]
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} [resolvedAt]
 * @property {string[]} [resolutionProof]
 */

/**
 * @typedef {Object} Location
 * @property {number} latitude
 * @property {number} longitude
 * @property {string} address
 */

/**
 * @typedef {Object} Badge
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} icon
 * @property {Date} earnedAt
 */

/**
 * @typedef {'road' | 'waste' | 'electricity' | 'water' | 'parks' | 'safety' | 'other'} IssueCategory
 */

/**
 * @typedef {'pending' | 'in-progress' | 'resolved' | 'rejected'} IssueStatus
 */

/**
 * @typedef {'low' | 'medium' | 'high' | 'urgent'} Priority
 */

/**
 * @typedef {Object} LoginCredentials
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} SignupData
 * @property {string} email
 * @property {string} password
 * @property {string} name
 * @property {'citizen' | 'admin'} role
 */

/**
 * @typedef {Object} IssueFormData
 * @property {string} title
 * @property {string} description
 * @property {IssueCategory} category
 * @property {Location} location
 * @property {File[]} photos
 */

// Export the type values for runtime use
export const ISSUE_CATEGORIES = ['road', 'waste', 'electricity', 'water', 'parks', 'safety', 'other'];
export const ISSUE_STATUSES = ['pending', 'in-progress', 'resolved', 'rejected'];
export const PRIORITIES = ['low', 'medium', 'high', 'urgent'];
export const USER_ROLES = ['citizen', 'admin'];

export const CATEGORIES = [
  { value: 'all', label: 'All Categories', icon: '📋' },
  { value: 'road', label: 'Roads', icon: '🛣️' },
  { value: 'waste', label: 'Waste', icon: '🗑️' },
  { value: 'electricity', label: 'Electricity', icon: '⚡' },
  { value: 'water', label: 'Water', icon: '💧' },
  { value: 'parks', label: 'Parks', icon: '🌳' },
  { value: 'safety', label: 'Safety', icon: '🚨' },
  { value: 'other', label: 'Other', icon: '📝' },
];

export const STATUS_OPTIONS = [
  { value: 'all', label: 'All Status', color: 'text-gray-400' },
  { value: 'pending', label: 'Pending', color: 'text-yellow-400' },
  { value: 'in-progress', label: 'In Progress', color: 'text-blue-400' },
  { value: 'resolved', label: 'Resolved', color: 'text-green-400' },
  { value: 'rejected', label: 'Rejected', color: 'text-red-400' },
];

export const PRIORITY_OPTIONS = [
  { value: 'all', label: 'All Priority', color: 'text-gray-400' },
  { value: 'low', label: 'Low', color: 'text-gray-400' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-400' },
  { value: 'high', label: 'High', color: 'text-orange-400' },
  { value: 'urgent', label: 'Urgent', color: 'text-red-400' },
];