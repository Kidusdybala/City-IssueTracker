import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { IssueProvider } from './contexts/IssueContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ReportIssuePage from './pages/ReportIssuePage';
import MapViewPage from './pages/MapViewPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <IssueProvider>
        <Router>
          <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/report" 
                element={
                  <ProtectedRoute>
                    <ReportIssuePage />
                  </ProtectedRoute>
                } 
              />
              <Route
                path="/map"
                element={
                  <ProtectedRoute>
                    <MapViewPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </IssueProvider>
    </AuthProvider>
  );
}

export default App;