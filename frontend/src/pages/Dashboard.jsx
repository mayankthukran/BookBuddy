import { useAuth } from '../context/AuthContext';
import { FaBook, FaStar, FaChartLine, FaPlus, FaSearch, FaBookOpen, FaHeart, FaClock, FaUsers, FaLightbulb, FaBookmark } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();

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
    <div className="min-h-screen light-bg">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8 sm:mb-12 animate-bounce-in text-center sm:text-left">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{color: '#000000'}}>
            Your Reading Dashboard
          </h1>
          <p className="text-lg sm:text-xl" style={{color: '#4A70A9'}}>
            Track your progress, discover new books, and achieve your reading goals.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 animate-fade-in">
          {stats.map((stat, index) => (
            <div key={index} className="form-card p-4 sm:p-6 hover-lift animate-bounce-in" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex flex-col sm:flex-row items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm font-medium" style={{color: '#4A70A9'}}>{stat.label}</p>
                  <p className="text-xl sm:text-2xl font-bold" style={{color: '#000000'}}>{stat.value}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center" style={{backgroundColor: stat.color}}>
                  <stat.icon className="text-lg sm:text-xl text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="form-card p-4 sm:p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl sm:text-2xl font-bold" style={{color: '#000000'}}>Recent Books</h2>
                <button className="text-sm font-medium hover:underline" style={{color: '#4A70A9'}}>
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentBooks.map((book, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg hover-lift space-y-3 sm:space-y-0" style={{backgroundColor: '#EFECE3'}}>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-16 rounded-lg flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#8FABD4'}}>
                        <FaBook className="text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold truncate" style={{color: '#000000'}}>{book.title}</h3>
                        <p className="text-sm truncate" style={{color: '#4A70A9'}}>by {book.author}</p>
                        <span className={`inline-block text-xs px-2 py-1 rounded-full mt-1 ${
                          book.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          book.status === 'Reading' ? 'text-white' :
                          'bg-gray-100 text-gray-800'
                        }`} style={book.status === 'Reading' ? {backgroundColor: '#8FABD4'} : {}}>
                          {book.status}
                        </span>
                      </div>
                    </div>
                    {book.progress > 0 && (
                      <div className="text-center sm:text-right">
                        <p className="text-sm font-medium" style={{color: '#000000'}}>{book.progress}%</p>
                        <div className="w-full sm:w-20 h-2 bg-gray-200 rounded-full mt-1">
                          <div 
                            className="h-2 rounded-full transition-all duration-300" 
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

          {/* Sidebar */}
          <div className="space-y-6 sm:space-y-8">
            {/* Quick Actions */}
            <div className="form-card p-4 sm:p-6 animate-fade-in">
              <h2 className="font-display text-lg sm:text-xl font-bold mb-4" style={{color: '#000000'}}>Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full py-3 px-4 rounded-lg font-semibold text-white flex items-center justify-center space-x-2 hover-lift transition-all duration-200" style={{backgroundColor: '#4A70A9'}}>
                  <FaPlus />
                  <span>Add New Book</span>
                </button>
                <button className="w-full py-3 px-4 rounded-lg font-semibold text-white flex items-center justify-center space-x-2 hover-lift transition-all duration-200" style={{backgroundColor: '#8FABD4'}}>
                  <FaSearch />
                  <span>Browse Library</span>
                </button>
                <button className="w-full py-3 px-4 rounded-lg font-semibold text-white flex items-center justify-center space-x-2 hover-lift transition-all duration-200" style={{backgroundColor: '#4A70A9'}}>
                  <FaLightbulb />
                  <span>Get Recommendations</span>
                </button>
              </div>
            </div>

            {/* Reading Goals */}
            <div className="form-card p-4 sm:p-6 animate-fade-in">
              <h2 className="font-display text-lg sm:text-xl font-bold mb-4" style={{color: '#000000'}}>2024 Reading Goal</h2>
              <div className="text-center">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4">
                  <svg className="w-20 h-20 sm:w-24 sm:h-24 transform -rotate-90">
                    <circle cx="40" cy="40" r="32" stroke="#E5E7EB" strokeWidth="6" fill="transparent" className="sm:hidden" />
                    <circle cx="48" cy="48" r="40" stroke="#E5E7EB" strokeWidth="8" fill="transparent" className="hidden sm:block" />
                    <circle 
                      cx="40" 
                      cy="40" 
                      r="32" 
                      stroke="#4A70A9" 
                      strokeWidth="6" 
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 32}`}
                      strokeDashoffset={`${2 * Math.PI * 32 * (1 - 50/60)}`}
                      className="transition-all duration-300 sm:hidden"
                    />
                    <circle 
                      cx="48" 
                      cy="48" 
                      r="40" 
                      stroke="#4A70A9" 
                      strokeWidth="8" 
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - 50/60)}`}
                      className="transition-all duration-300 hidden sm:block"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-base sm:text-lg font-bold" style={{color: '#000000'}}>83%</span>
                  </div>
                </div>
                <p className="text-sm" style={{color: '#4A70A9'}}>50 of 60 books completed</p>
                <p className="text-xs mt-2" style={{color: '#4A70A9'}}>You're ahead of schedule! 🎉</p>
              </div>
            </div>

            {/* Community */}
            <div className="form-card p-4 sm:p-6 animate-fade-in">
              <h2 className="font-display text-lg sm:text-xl font-bold mb-4" style={{color: '#000000'}}>Community</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FaUsers className="text-lg flex-shrink-0" style={{color: '#4A70A9'}} />
                  <span className="text-sm" style={{color: '#000000'}}>Join reading groups</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaBookmark className="text-lg flex-shrink-0" style={{color: '#4A70A9'}} />
                  <span className="text-sm" style={{color: '#000000'}}>Share book reviews</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaStar className="text-lg flex-shrink-0" style={{color: '#4A70A9'}} />
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