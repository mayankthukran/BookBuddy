import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaStar, FaChartLine, FaPlus, FaSearch, FaSignOutAlt, FaBookOpen, FaHeart, FaClock, FaUsers, FaLightbulb, FaBookmark } from 'react-icons/fa';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const stats = [
    { label: 'Books Read', value: '24', icon: FaBookOpen, color: '#4A70A9' },
    { label: 'Currently Reading', value: '3', icon: FaClock, color: '#8FABD4' },
    { label: 'Want to Read', value: '47', icon: FaHeart, color: '#4A70A9' },
    { label: 'Reading Goal', value: '50/60', icon: FaStar, color: '#8FABD4' }
  ];

  const recentBooks = [
    { title: 'The Midnight Library', author: 'Matt Haig', status: 'Reading', progress: 65 },
    { title: 'Atomic Habits', author: 'James Clear', status: 'Completed', progress: 100 },
    { title: 'Dune', author: 'Frank Herbert', status: 'Want to Read', progress: 0 }
  ];

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
        <div className="mb-12 animate-bounce-in">
          <h1 className="font-display text-4xl font-bold mb-4" style={{color: '#000000'}}>
            Your Reading Dashboard
          </h1>
          <p className="text-xl" style={{color: '#4A70A9'}}>
            Track your progress, discover new books, and achieve your reading goals.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in">
          {stats.map((stat, index) => (
            <div key={index} className="theme-card p-6 hover-lift animate-bounce-in" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{color: '#4A70A9'}}>{stat.label}</p>
                  <p className="text-2xl font-bold" style={{color: '#000000'}}>{stat.value}</p>
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{backgroundColor: stat.color}}>
                  <stat.icon className="text-xl text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="theme-card p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-bold" style={{color: '#000000'}}>Recent Books</h2>
                <button className="text-sm font-medium hover:underline" style={{color: '#4A70A9'}}>
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentBooks.map((book, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg hover-lift" style={{backgroundColor: '#f8f9fa'}}>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-16 rounded-lg flex items-center justify-center" style={{backgroundColor: '#8FABD4'}}>
                        <FaBook className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold" style={{color: '#000000'}}>{book.title}</h3>
                        <p className="text-sm" style={{color: '#4A70A9'}}>by {book.author}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          book.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          book.status === 'Reading' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {book.status}
                        </span>
                      </div>
                    </div>
                    {book.progress > 0 && (
                      <div className="text-right">
                        <p className="text-sm font-medium" style={{color: '#000000'}}>{book.progress}%</p>
                        <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                          <div 
                            className="h-2 rounded-full" 
                            style={{backgroundColor: '#4A70A9', width: `${book.progress}%`}}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Recommendations */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="theme-card p-6 animate-fade-in">
              <h2 className="font-display text-xl font-bold mb-4" style={{color: '#000000'}}>Quick Actions</h2>
              <div className="space-y-3">
                <button className="theme-button w-full py-3 flex items-center justify-center space-x-2 hover-lift">
                  <FaPlus />
                  <span>Add New Book</span>
                </button>
                <button className="theme-button w-full py-3 flex items-center justify-center space-x-2 hover-lift" style={{backgroundColor: '#8FABD4', borderColor: '#8FABD4'}}>
                  <FaSearch />
                  <span>Browse Library</span>
                </button>
                <button className="theme-button w-full py-3 flex items-center justify-center space-x-2 hover-lift" style={{backgroundColor: '#4A70A9', borderColor: '#4A70A9'}}>
                  <FaLightbulb />
                  <span>Get Recommendations</span>
                </button>
              </div>
            </div>

            {/* Reading Goals */}
            <div className="theme-card p-6 animate-fade-in">
              <h2 className="font-display text-xl font-bold mb-4" style={{color: '#000000'}}>2024 Reading Goal</h2>
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="#E5E7EB" strokeWidth="8" fill="transparent" />
                    <circle 
                      cx="48" 
                      cy="48" 
                      r="40" 
                      stroke="#4A70A9" 
                      strokeWidth="8" 
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - 50/60)}`}
                      className="transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold" style={{color: '#000000'}}>83%</span>
                  </div>
                </div>
                <p className="text-sm" style={{color: '#4A70A9'}}>50 of 60 books completed</p>
                <p className="text-xs mt-2" style={{color: '#4A70A9'}}>You're ahead of schedule! 🎉</p>
              </div>
            </div>

            {/* Community */}
            <div className="theme-card p-6 animate-fade-in">
              <h2 className="font-display text-xl font-bold mb-4" style={{color: '#000000'}}>Community</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FaUsers className="text-lg" style={{color: '#4A70A9'}} />
                  <span className="text-sm" style={{color: '#000000'}}>Join reading groups</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaBookmark className="text-lg" style={{color: '#4A70A9'}} />
                  <span className="text-sm" style={{color: '#000000'}}>Share book reviews</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaStar className="text-lg" style={{color: '#4A70A9'}} />
                  <span className="text-sm" style={{color: '#000000'}}>Rate & recommend</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;