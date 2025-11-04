import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaStar, FaChartLine, FaPlus, FaSearch, FaSignOutAlt } from 'react-icons/fa';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#EFECE3'}}>
      {/* Navigation */}
      <nav className="theme-nav sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="h-10 w-10 theme-gradient rounded-xl flex items-center justify-center hover-lift">
                <FaBook className="text-white text-lg animate-float" />
              </div>
              <h1 className="font-display text-2xl font-bold" style={{color: '#000000'}}>
                BookBuddy
              </h1>
            </div>
            <div className="flex items-center space-x-4 animate-fade-in">
              <div className="text-right">
                <p className="text-sm" style={{color: '#4A70A9'}}>Welcome back,</p>
                <p className="font-semibold" style={{color: '#000000'}}>{user?.name}</p>
              </div>
              <button
                onClick={handleLogout}
                className="theme-button flex items-center space-x-2"
                style={{backgroundColor: '#8FABD4', borderColor: '#8FABD4'}}
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="text-center mb-12 animate-bounce-in">
          <div className="inline-flex items-center justify-center w-20 h-20 theme-gradient rounded-full mb-6 animate-float hover-lift">
            <FaBook className="text-3xl text-white" />
          </div>
          <h1 className="font-display text-4xl font-bold mb-4" style={{color: '#000000'}}>
            Welcome to Your Library
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{color: '#4A70A9'}}>
            Your personal book tracking and recommendation system is ready to help you discover your next great read.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 animate-fade-in">
          <div className="theme-card p-6 hover-lift animate-bounce-in">
            <div className="text-center">
              <div className="w-12 h-12 theme-gradient rounded-xl flex items-center justify-center mx-auto mb-4 hover-lift">
                <FaBook className="text-2xl text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2" style={{color: '#000000'}}>Track Books</h3>
              <p className="text-sm" style={{color: '#4A70A9'}}>Keep track of books you've read, are reading, and want to read</p>
            </div>
          </div>
          
          <div className="theme-card p-6 hover-lift animate-bounce-in" style={{animationDelay: '0.2s'}}>
            <div className="text-center">
              <div className="w-12 h-12 theme-gradient rounded-xl flex items-center justify-center mx-auto mb-4 hover-lift">
                <FaStar className="text-2xl text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2" style={{color: '#000000'}}>Get Recommendations</h3>
              <p className="text-sm" style={{color: '#4A70A9'}}>Discover new books based on your reading preferences and history</p>
            </div>
          </div>
          
          <div className="theme-card p-6 hover-lift animate-bounce-in" style={{animationDelay: '0.4s'}}>
            <div className="text-center">
              <div className="w-12 h-12 theme-gradient rounded-xl flex items-center justify-center mx-auto mb-4 hover-lift">
                <FaChartLine className="text-2xl text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2" style={{color: '#000000'}}>Reading Stats</h3>
              <p className="text-sm" style={{color: '#4A70A9'}}>View your reading progress and statistics over time</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="theme-card p-8 animate-fade-in">
          <h2 className="font-display text-2xl font-bold mb-6 text-center" style={{color: '#000000'}}>Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <button className="theme-button py-4 px-6 text-lg hover-lift flex items-center justify-center space-x-2">
              <FaPlus />
              <span>Add New Book</span>
            </button>
            <button className="theme-button py-4 px-6 text-lg hover-lift flex items-center justify-center space-x-2" style={{backgroundColor: '#8FABD4', borderColor: '#8FABD4'}}>
              <FaSearch />
              <span>Browse Library</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;