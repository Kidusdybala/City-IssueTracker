export const ISSUE_CATEGORIES = [
  { value: 'road', label: 'Roads & Infrastructure', icon: '🛣️', color: 'from-blue-500 to-blue-600' },
  { value: 'waste', label: 'Waste Management', icon: '🗑️', color: 'from-green-500 to-green-600' },
  { value: 'electricity', label: 'Electricity & Lighting', icon: '⚡', color: 'from-yellow-500 to-yellow-600' },
  { value: 'water', label: 'Water & Sewage', icon: '💧', color: 'from-cyan-500 to-cyan-600' },
  { value: 'parks', label: 'Parks & Recreation', icon: '🌳', color: 'from-emerald-500 to-emerald-600' },
  { value: 'safety', label: 'Public Safety', icon: '🚨', color: 'from-red-500 to-red-600' },
  { value: 'other', label: 'Other', icon: '📝', color: 'from-gray-500 to-gray-600' },
];

export const ISSUE_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-300' },
  { value: 'in-progress', label: 'In Progress', color: 'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-300' },
  { value: 'resolved', label: 'Resolved', color: 'from-green-500/20 to-green-600/20 border-green-500/30 text-green-300' },
  { value: 'rejected', label: 'Rejected', color: 'from-red-500/20 to-red-600/20 border-red-500/30 text-red-300' },
];

export const ISSUE_PRIORITIES = [
  { value: 'low', label: 'Low', color: 'text-gray-400' },
  { value: 'medium', label: 'Medium', color: 'text-yellow-400' },
  { value: 'high', label: 'High', color: 'text-orange-400' },
  { value: 'urgent', label: 'Urgent', color: 'text-red-400' },
];

export const DEPARTMENT_MAPPING = {
  'pothole': 'roads',
  'streetlight': 'electricity',
  'garbage': 'sanitation',
  'water': 'water',
  'sewage': 'sanitation',
  'traffic': 'traffic'
};