
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'History', path: '/history' },
    { label: 'Admin', path: '/admin' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-blue-600 p-2 rounded-lg shadow-sm shadow-blue-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">EcoSort<span className="text-blue-600">AI</span></span>
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile" className="flex items-center space-x-2 p-1 px-3 rounded-full hover:bg-gray-100 transition-colors">
                  <img 
                    src={user.avatar} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full border border-gray-200"
                  />
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.name}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 border border-gray-200 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
