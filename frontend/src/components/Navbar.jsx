import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, MapPin, User, LogOut, Settings, Trophy, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import clsx from 'clsx';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const navLinks = [
    ...(isAdmin ? [] : [{ path: '/', label: 'Home' }]),
    { path: '/leaderboard', label: 'Leaderboard' },
  ];

  const userLinks = user ? [
    { path: isAdmin ? '/admin' : '/dashboard', label: isAdmin ? 'Official Dashboard' : 'Dashboard' },
    { path: '/map', label: 'Map View' },
    ...(isAdmin ? [] : [{ path: '/report', label: 'Report Issue' }])
  ] : [];

  return (
    <nav className="bg-gray-800/95 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <img src="/logo.png" alt="Issue tracker Logo" className="h-8 w-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Issue tracker
            </span>
          </Link>

          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={clsx(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    location.pathname === link.path
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              
              {userLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={clsx(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    location.pathname === link.path
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                {!isAdmin && (
                  <div className="flex items-center space-x-2 px-3 py-2 bg-gray-700/50 rounded-lg">
                    <Trophy className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium">{user.points}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-300">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-800/98 backdrop-blur-sm border-t border-gray-700/50">
          <div className="px-4 py-3 space-y-1">
            {[...navLinks, ...userLinks].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'block px-3 py-2 rounded-lg text-base font-medium transition-colors',
                  location.pathname === link.path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                )}
              >
                {link.label}
              </Link>
            ))}
            
            {user ? (
              <div className="pt-3 border-t border-gray-700/50">
                <div className="flex items-center space-x-2 px-3 py-2 mb-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-300">{user.name}</span>
                  {!isAdmin && (
                    <div className="flex items-center space-x-1 ml-auto">
                      <Trophy className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-medium text-yellow-400">{user.points}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-red-400 hover:text-red-300 hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-3 border-t border-gray-700/50">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-center rounded-lg font-medium transition-colors"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] p-4">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-yellow-400 mr-3 flex-shrink-0" />
              <h3 className="text-lg font-semibold text-white">Confirm Logout</h3>
            </div>
            <p className="text-gray-300 mb-6 text-center">
              Are you sure you want to logout? You'll need to sign in again to access your account.
            </p>
            <div className="flex space-x-3 justify-center">
              <button
                onClick={cancelLogout}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;