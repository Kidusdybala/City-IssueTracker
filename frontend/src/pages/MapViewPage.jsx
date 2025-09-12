import React, { useState } from 'react';
import { Filter, Search, MapPin, Eye } from 'lucide-react';
import { useIssues } from '../contexts/IssueContext';
import { CATEGORIES, STATUS_OPTIONS, PRIORITY_OPTIONS } from '../types';
import IssueCard from '../components/IssueCard';

const MapViewPage = () => {
  const { issues } = useIssues();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          issue.location.address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || issue.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || issue.priority === priorityFilter;

    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  // Mock map component
  const MapComponent = () => (
    <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mx-auto mb-4">
          <img src="/logo.png" alt="Issue tracker Logo" className="h-12 w-12" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Interactive Map</h3>
        <p className="text-gray-400 mb-4 max-w-md">
          This is where the interactive map would display all reported issues with markers, clusters, and heatmap visualization.
        </p>
        <div className="text-sm text-gray-500">
          Integration requires Google Maps API or Mapbox
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Issue Management Map</h1>
          <p className="text-gray-400">View and manage reported issues across the city</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search issues by location, description, or reporter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {STATUS_OPTIONS.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {PRIORITY_OPTIONS.map(priority => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Summary */}
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="text-gray-400">
              Showing {filteredIssues.length} of {issues.length} issues
            </div>
            {(categoryFilter !== 'all' || statusFilter !== 'all' || priorityFilter !== 'all' || searchTerm) && (
              <button
                onClick={() => {
                  setCategoryFilter('all');
                  setStatusFilter('all');
                  setPriorityFilter('all');
                  setSearchTerm('');
                }}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="order-2 lg:order-1">
            <MapComponent />
          </div>

          {/* Issues List */}
          <div className="order-1 lg:order-2">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl">
              <div className="p-6 border-b border-gray-700/50">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Reported Issues
                </h2>
              </div>
              
              <div className="p-6">
                {filteredIssues.length > 0 ? (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {filteredIssues.map((issue) => (
                      <IssueCard key={issue.id} issue={issue} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Filter className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-400 mb-2">No issues found</h3>
                    <p className="text-gray-500">
                      {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all' || priorityFilter !== 'all'
                        ? 'Try adjusting your filters or search terms'
                        : 'No issues have been reported yet'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapViewPage;