import React, { useState } from 'react';
import { Users, AlertTriangle, CheckCircle, Clock, Filter, Download, UserCheck, Settings } from 'lucide-react';
import { useIssues } from '../contexts/IssueContext';
import IssueCard from '../components/IssueCard';

const AdminDashboard = () => {
  const { issues, updateIssueStatus, updateIssuePriority } = useIssues();
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const stats = {
    total: issues.length,
    pending: issues.filter(i => i.status === 'pending').length,
    inProgress: issues.filter(i => i.status === 'in-progress').length,
    resolved: issues.filter(i => i.status === 'resolved').length,
    highPriority: issues.filter(i => i.priority === 'high' || i.priority === 'urgent').length,
  };

  const filteredIssues = issues.filter(issue => {
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || issue.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateIssueStatus(id, status);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handlePriorityUpdate = async (id, priority) => {
    try {
      await updateIssuePriority(id, priority);
    } catch (error) {
      console.error('Failed to update priority:', error);
    }
  };

  const departments = [
    { name: 'Road Maintenance', issues: issues.filter(i => i.category === 'road').length, color: 'from-blue-500 to-blue-600' },
    { name: 'Waste Management', issues: issues.filter(i => i.category === 'waste').length, color: 'from-green-500 to-green-600' },
    { name: 'Utilities', issues: issues.filter(i => i.category === 'electricity' || i.category === 'water').length, color: 'from-yellow-500 to-yellow-600' },
    { name: 'Parks & Recreation', issues: issues.filter(i => i.category === 'parks').length, color: 'from-emerald-500 to-emerald-600' },
    { name: 'Public Safety', issues: issues.filter(i => i.category === 'safety').length, color: 'from-red-500 to-red-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">City Official Dashboard</h1>
          <p className="text-gray-400">Review and respond to citizen-reported issues</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">{stats.pending}</p>
              <p className="text-sm text-gray-400">Pending Review</p>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">{stats.inProgress}</p>
              <p className="text-sm text-gray-400">In Progress</p>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">{stats.resolved}</p>
              <p className="text-sm text-gray-400">Resolved</p>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-sm text-gray-400">Total Issues</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Issues List */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg">
          <div className="p-6 border-b border-gray-700/50">
            <h2 className="text-xl font-semibold text-white">Issue Reports</h2>
            <p className="text-gray-400 text-sm">Manage and respond to reported issues</p>
          </div>

          <div className="p-6">
            {filteredIssues.length > 0 ? (
              <div className="space-y-4">
                {filteredIssues.map((issue) => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    showActions={true}
                    onStatusUpdate={handleStatusUpdate}
                    onPriorityUpdate={handlePriorityUpdate}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <AlertTriangle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-400 mb-2">No issues found</h3>
                <p className="text-gray-500">Try adjusting your filters or check back later for new reports</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;