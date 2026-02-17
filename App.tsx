
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Result from './pages/Result';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/result/:id" element={
                <ProtectedRoute>
                  <Result />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/history" element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <footer className="bg-white border-t border-gray-200 py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg text-gray-900">EcoSort<span className="text-blue-600">AI</span></span>
                  <span className="text-gray-300">|</span>
                  <span className="text-sm text-gray-500">University Diploma Project 2024</span>
                </div>
                <div className="flex space-x-6 text-sm text-gray-400">
                  <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-blue-600 transition-colors">Faculty of Computer Science</a>
                </div>
              </div>
              <p className="mt-8 text-center text-xs text-gray-400">
                © 2024 EcoSort AI. All rights reserved. Powered by Google Gemini.
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
