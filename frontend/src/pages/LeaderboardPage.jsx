import React from 'react';
import { Trophy, Medal, Award, Star, Crown, Target, TrendingUp } from 'lucide-react';

const LeaderboardPage = () => {
  // Mock leaderboard data
  const topReporters = [
    { id: '1', name: 'Sarah Chen', points: 1250, reports: 45, resolved: 38, badge: '👑', rank: 1 },
    { id: '2', name: 'Mike Johnson', points: 980, reports: 35, resolved: 29, badge: '🥈', rank: 2 },
    { id: '3', name: 'Emily Rodriguez', points: 850, reports: 30, resolved: 26, badge: '🥉', rank: 3 },
    { id: '4', name: 'David Kim', points: 720, reports: 28, resolved: 22, badge: '🏆', rank: 4 },
    { id: '5', name: 'Lisa Wang', points: 650, reports: 24, resolved: 20, badge: '⭐', rank: 5 },
    { id: '6', name: 'John Smith', points: 580, reports: 22, resolved: 18, badge: '🎯', rank: 6 },
    { id: '7', name: 'Maria Garcia', points: 520, reports: 19, resolved: 16, badge: '🚀', rank: 7 },
    { id: '8', name: 'Alex Thompson', points: 480, reports: 17, resolved: 14, badge: '💫', rank: 8 },
  ];

  const achievements = [
    { name: 'First Reporter', description: 'Report your first issue', icon: '🏆', holders: 1247 },
    { name: 'Problem Solver', description: 'Have 10+ issues resolved', icon: '🎯', holders: 156 },
    { name: 'City Guardian', description: 'Earn 500+ points', icon: '🛡️', holders: 89 },
    { name: 'Community Hero', description: 'Top 10 reporter this month', icon: '⭐', holders: 10 },
    { name: 'Neighborhood Watch', description: 'Report 25+ issues in your area', icon: '👁️', holders: 67 },
    { name: 'Quality Reporter', description: '95%+ issue approval rate', icon: '💎', holders: 34 },
  ];

  const stats = [
    { label: 'Total Reports', value: '2,847', icon: TrendingUp, color: 'from-blue-500 to-blue-600' },
    { label: 'Active Citizens', value: '1,523', icon: Trophy, color: 'from-green-500 to-green-600' },
    { label: 'Issues Resolved', value: '2,156', icon: Target, color: 'from-purple-500 to-purple-600' },
    { label: 'Points Awarded', value: '45,890', icon: Star, color: 'from-yellow-500 to-yellow-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Community <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Leaderboard</span>
          </h1>
          <p className="text-xl text-gray-400">
            Celebrating our top contributors making the city better
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`bg-gradient-to-r ${stat.color} p-6 rounded-xl text-white`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90 font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className="h-8 w-8 opacity-80" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top 3 Podium */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Top Contributors</h2>
              
              {/* Podium */}
              <div className="flex items-end justify-center space-x-4 mb-12">
                {/* 2nd Place */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mb-2 text-2xl">
                    🥈
                  </div>
                  <div className="text-center mb-4">
                    <p className="text-white font-semibold">{topReporters[1].name}</p>
                    <p className="text-gray-400 text-sm">{topReporters[1].points} points</p>
                  </div>
                  <div className="w-24 h-20 bg-gradient-to-t from-gray-600 to-gray-500 rounded-t-lg flex items-end justify-center">
                    <span className="text-white font-bold text-lg mb-2">2</span>
                  </div>
                </div>

                {/* 1st Place */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mb-2 text-3xl animate-pulse">
                    👑
                  </div>
                  <div className="text-center mb-4">
                    <p className="text-white font-bold text-lg">{topReporters[0].name}</p>
                    <p className="text-yellow-400 text-sm font-semibold">{topReporters[0].points} points</p>
                  </div>
                  <div className="w-24 h-24 bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-t-lg flex items-end justify-center">
                    <span className="text-white font-bold text-xl mb-2">1</span>
                  </div>
                </div>

                {/* 3rd Place */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center mb-2 text-2xl">
                    🥉
                  </div>
                  <div className="text-center mb-4">
                    <p className="text-white font-semibold">{topReporters[2].name}</p>
                    <p className="text-gray-400 text-sm">{topReporters[2].points} points</p>
                  </div>
                  <div className="w-24 h-16 bg-gradient-to-t from-amber-700 to-amber-600 rounded-t-lg flex items-end justify-center">
                    <span className="text-white font-bold text-lg mb-2">3</span>
                  </div>
                </div>
              </div>

              {/* Full Rankings */}
              <div className="space-y-3">
                {topReporters.map((user, index) => (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                      index < 3 
                        ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20' 
                        : 'bg-gray-700/30 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        index < 3 ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
                      }`}>
                        {user.rank}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{user.name}</p>
                        <p className="text-gray-400 text-sm">
                          {user.reports} reports • {user.resolved} resolved
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{user.badge}</span>
                      <div className="text-right">
                        <p className="text-white font-bold">{user.points}</p>
                        <p className="text-gray-400 text-xs">points</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Award className="h-6 w-6 mr-2 text-yellow-400" />
                Achievements
              </h2>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/30 hover:border-gray-500/50 transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-sm">{achievement.name}</p>
                        <p className="text-gray-400 text-xs">{achievement.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-400 text-sm font-medium">
                        {achievement.holders} citizens
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Join CTA */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20 rounded-lg text-center">
                <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">Join the Ranks!</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Start reporting issues to earn points and unlock achievements
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;