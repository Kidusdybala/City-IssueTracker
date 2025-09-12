import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, MapPin, Clock, CheckCircle, AlertTriangle, Trophy, Target, Star, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useIssues } from '../contexts/IssueContext';
import { formatDistanceToNow } from 'date-fns';
import IssueCard from '../components/IssueCard';

const DashboardPage = () => {
  const { user } = useAuth();
  const { issues } = useIssues();

  if (!user) return null;

  const userIssues = issues.filter(issue => issue.reporterId === user.id);
  const statusCounts = {
    pending: userIssues.filter(i => i.status === 'pending').length,
    'in-progress': userIssues.filter(i => i.status === 'in-progress').length,
    resolved: userIssues.filter(i => i.status === 'resolved').length,
  };

  const achievements = [
    { name: 'First Reporter', icon: '🏆', unlocked: user.points >= 10 },
    { name: 'Problem Solver', icon: '🎯', unlocked: user.points >= 50 },
    { name: 'City Guardian', icon: '🛡️', unlocked: user.points >= 100 },
    { name: 'Community Hero', icon: '⭐', unlocked: user.points >= 200 },
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-400">
              Track your reports and see the impact you're making
            </p>
          </div>
          <Link
            to="/report"
            className="mt-4 sm:mt-0 flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="h-5 w-5 mr-2" />
            Report New Issue
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm font-medium">Total Points</p>
                <p className="text-3xl font-bold text-white">{user.points}</p>
              </div>
              <Trophy className="h-8 w-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-700/20 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-300 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-white">{statusCounts.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600/20 to-purple-700/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm font-medium">In Progress</p>
                <p className="text-3xl font-bold text-white">{statusCounts['in-progress']}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600/20 to-green-700/20 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm font-medium">Resolved</p>
                <p className="text-3xl font-bold text-white">{statusCounts.resolved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Issues */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Your Recent Reports</h2>
              
              {userIssues.length > 0 ? (
                <div className="space-y-4">
                  {userIssues.slice(0, 5).map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                  ))}
                  
                  {userIssues.length > 5 && (
                    <div className="text-center pt-4">
                      <Link
                        to="/map"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        View all {userIssues.length} reports
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <MapPin className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-400 mb-2">No reports yet</h3>
                  <p className="text-gray-500 mb-6">Start making a difference by reporting your first issue</p>
                  <Link
                    to="/report"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Report First Issue
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Achievements & Profile */}
          <div className="space-y-6">
            {/* Achievements */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Achievements</h2>
              
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-r from-green-600/20 to-green-700/20 border border-green-500/20'
                        : 'bg-gray-700/30 border border-gray-600/30'
                    }`}
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <p className={`font-medium ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>
                        {achievement.name}
                      </p>
                      <p className={`text-sm ${achievement.unlocked ? 'text-green-300' : 'text-gray-500'}`}>
                        {achievement.unlocked ? 'Unlocked!' : 'Keep reporting to unlock'}
                      </p>
                    </div>
                    {achievement.unlocked && (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Your Impact</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Member since</span>
                  <span className="text-white">
                    {formatDistanceToNow(user.createdAt)} ago
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total reports</span>
                  <span className="text-white">{userIssues.length}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Issues resolved</span>
                  <span className="text-green-400 font-semibold">{statusCounts.resolved}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Badges earned</span>
                  <span className="text-yellow-400 font-semibold">{user.badges.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;