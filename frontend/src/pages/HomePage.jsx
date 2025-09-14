import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, TrendingUp, Shield, Camera, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { user, isAdmin } = useAuth();

  // Helper function to get the correct redirect path based on auth status
  const getPrimaryActionPath = () => {
    if (user) {
      return isAdmin ? '/admin' : '/dashboard';
    }
    return '/login';
  };

  const getSecondaryActionPath = () => {
    if (user) {
      return isAdmin ? '/admin' : '/report';
    }
    return '/login';
  };

  const getPrimaryActionText = () => {
    if (user) {
      return isAdmin ? 'Go to Dashboard' : 'View Dashboard';
    }
    return 'Explore Issues';
  };

  const getSecondaryActionText = () => {
    if (user) {
      return isAdmin ? 'Manage Issues' : 'Report Issue';
    }
    return 'Get Started';
  };

  const features = [
    {
      icon: Camera,
      title: 'Report Issues',
      description: 'Take photos and report city problems with GPS location',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: MapPin,
      title: 'Interactive Map',
      description: 'View all reported issues on an interactive city map',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor the status of your reports in real-time',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join thousands of citizens improving their city',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Shield,
      title: 'Official Response',
      description: 'Direct connection with city officials and departments',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Bell,
      title: 'Get Notified',
      description: 'Receive updates when your issues are addressed',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const stats = [
    { label: 'Issues Resolved', value: '2,847' },
    { label: 'Active Citizens', value: '1,523' },
    { label: 'City Departments', value: '12' },
    { label: 'Response Time', value: '< 24h' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Make Your City{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Better
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Report city issues, track their progress, and help build a better community. 
              Join thousands of citizens making a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={user ? getPrimaryActionPath() : "/map"}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                {user ? getPrimaryActionText() : "Explore Issues"}
              </Link>
              <Link
                to={getSecondaryActionPath()}
                className="px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 text-white font-semibold rounded-xl border border-gray-600 transition-all duration-200 backdrop-blur-sm"
              >
                {getSecondaryActionText()}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm sm:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              City Overview
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore your city and see reported issues at a glance
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=38.6,8.9,38.9,9.1&layer=mapnik&marker=9.1450,38.7379"
              width="100%"
              height="400"
              style={{ border: 'none' }}
              title="City Map"
            ></iframe>
            <div className="p-4 text-center">
              <p className="text-gray-400 text-sm">
                Interactive city map - Login to view detailed issue reports
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to report, track, and resolve city issues efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our community and start reporting issues in your neighborhood today.
          </p>
          <Link
            to={getSecondaryActionPath()}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-xl"
          >
            {user ? (isAdmin ? 'Manage Issues' : 'Start Reporting Issues') : 'Start Reporting Issues'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;