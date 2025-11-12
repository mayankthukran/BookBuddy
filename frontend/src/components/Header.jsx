import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBook, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navLinks = user ? [
    { path: '/', label: 'Home' },
    { path: '/my-books', label: 'My Books' },
    { path: '/recommendations', label: 'Recommendations' },
    { path: '/dashboard', label: 'Dashboard' },
  ] : [
    { path: '/', label: 'Home' },
    { path: '/login', label: 'Login' },
    { path: '/signup', label: 'Register' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{backgroundColor: '#4A70A9'}}>
              <FaBook className="text-white text-lg" />
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-bold" style={{color: '#000000'}}>
              BookBuddy
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-all duration-200 hover:opacity-80 ${
                  isActive(link.path) ? 'border-b-2' : ''
                }`}
                style={{
                  color: isActive(link.path) ? '#4A70A9' : '#000000',
                  borderColor: isActive(link.path) ? '#4A70A9' : 'transparent'
                }}
              >
                {link.label}
              </Link>
            ))}
            
            {user && (
              <div className="flex items-center space-x-4">
                <Link to="/profile">
                  {user.profileImage ? (
                    <img 
                      src={user.profileImage} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover hover:opacity-80 transition-opacity"
                    />
                  ) : (
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold hover:opacity-80 transition-opacity"
                      style={{backgroundColor: '#4A70A9'}}
                    >
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-white hover:opacity-90 transition-all duration-200"
                  style={{backgroundColor: '#8FABD4'}}
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg"
              style={{color: '#000000'}}
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-medium py-2 px-4 rounded-lg transition-all duration-200 ${
                    isActive(link.path) ? 'text-white' : 'hover:bg-gray-50'
                  }`}
                  style={isActive(link.path) ? 
                    {backgroundColor: '#4A70A9'} : 
                    {color: '#000000'}
                  }
                >
                  {link.label}
                </Link>
              ))}
              
              {user && (
                <>
                  <Link 
                    to="/profile" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    {user.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                        style={{backgroundColor: '#4A70A9'}}
                      >
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="font-medium" style={{color: '#000000'}}>{user.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-white transition-all duration-200"
                    style={{backgroundColor: '#8FABD4'}}
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;