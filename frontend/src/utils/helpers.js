import { formatDistanceToNow } from 'date-fns';

/**
 * Format a date to relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

/**
 * Capitalize first letter of a string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncate text to a specified length
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Get status color classes
 */
export const getStatusColor = (status) => {
  const colors = {
    pending: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-300',
    'in-progress': 'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-300',
    resolved: 'from-green-500/20 to-green-600/20 border-green-500/30 text-green-300',
    rejected: 'from-red-500/20 to-red-600/20 border-red-500/30 text-red-300',
  };
  return colors[status] || colors.pending;
};

/**
 * Get priority color classes
 */
export const getPriorityColor = (priority) => {
  const colors = {
    low: 'text-gray-400',
    medium: 'text-yellow-400',
    high: 'text-orange-400',
    urgent: 'text-red-400',
  };
  return colors[priority] || colors.medium;
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate random ID
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Debounce function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Format number with commas
 */
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};