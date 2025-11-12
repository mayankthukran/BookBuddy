import { Link } from 'react-router-dom';
import { FaBook, FaStar, FaChartLine, FaUsers, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen light-bg">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="h-20 w-20 rounded-2xl flex items-center justify-center mr-4 hover-lift" style={{backgroundColor: '#4A70A9'}}>
              <FaBook className="text-3xl text-white animate-float" />
            </div>
            <h1 className="font-display text-6xl font-bold" style={{color: '#000000'}}>BookBuddy</h1>
          </div>
          
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6 animate-fade-in" style={{color: '#000000'}}>
            Your Personal Reading Companion
          </h2>
          
          <p className="text-xl sm:text-2xl mb-12 max-w-3xl mx-auto animate-fade-in" style={{color: '#4A70A9'}}>
            Track your reading progress, discover new books, and connect with fellow book lovers in one beautiful platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in">
            <Link to="/signup" className="theme-button text-lg px-8 py-4 flex items-center justify-center space-x-3 group">
              <span>Get Started Free</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="bg-transparent border-2 text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-white" style={{borderColor: '#4A70A9', color: '#4A70A9'}}>
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-display text-3xl sm:text-4xl font-bold text-center mb-16" style={{color: '#000000'}}>
            Everything You Need to Love Reading
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="form-card p-6 text-center hover-lift">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#8FABD4'}}>
                <FaBook className="text-2xl text-white" />
              </div>
              <h4 className="font-display text-xl font-bold mb-3" style={{color: '#000000'}}>Smart Library</h4>
              <p style={{color: '#4A70A9'}}>Organize and track your entire book collection with ease</p>
            </div>
            
            <div className="form-card p-6 text-center hover-lift">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#4A70A9'}}>
                <FaStar className="text-2xl text-white" />
              </div>
              <h4 className="font-display text-xl font-bold mb-3" style={{color: '#000000'}}>AI Recommendations</h4>
              <p style={{color: '#4A70A9'}}>Discover your next favorite book with personalized suggestions</p>
            </div>
            
            <div className="form-card p-6 text-center hover-lift">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#8FABD4'}}>
                <FaChartLine className="text-2xl text-white" />
              </div>
              <h4 className="font-display text-xl font-bold mb-3" style={{color: '#000000'}}>Progress Tracking</h4>
              <p style={{color: '#4A70A9'}}>Monitor your reading goals and celebrate achievements</p>
            </div>
            
            <div className="form-card p-6 text-center hover-lift">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#4A70A9'}}>
                <FaUsers className="text-2xl text-white" />
              </div>
              <h4 className="font-display text-xl font-bold mb-3" style={{color: '#000000'}}>Community</h4>
              <p style={{color: '#4A70A9'}}>Connect with readers and share your favorite discoveries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#4A70A9'}}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <h4 className="font-display text-4xl font-bold text-white mb-2">10K+</h4>
              <p className="text-lg text-white opacity-90">Active Readers</p>
            </div>
            <div className="animate-fade-in">
              <h4 className="font-display text-4xl font-bold text-white mb-2">50K+</h4>
              <p className="text-lg text-white opacity-90">Books Tracked</p>
            </div>
            <div className="animate-fade-in">
              <h4 className="font-display text-4xl font-bold text-white mb-2">25K+</h4>
              <p className="text-lg text-white opacity-90">Reviews Written</p>
            </div>
            <div className="animate-fade-in">
              <h4 className="font-display text-4xl font-bold text-white mb-2">98%</h4>
              <p className="text-lg text-white opacity-90">User Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-display text-3xl sm:text-4xl font-bold text-center mb-16" style={{color: '#000000'}}>
            What Our Readers Say
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="form-card p-6 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold" style={{backgroundColor: '#8FABD4'}}>
                S
              </div>
              <p className="text-lg mb-4" style={{color: '#4A70A9'}}>"BookBuddy has completely transformed my reading habits. I've read more books this year than ever before!"</p>
              <h5 className="font-semibold" style={{color: '#000000'}}>Sarah Johnson</h5>
              <p className="text-sm" style={{color: '#4A70A9'}}>Avid Reader</p>
            </div>
            
            <div className="form-card p-6 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold" style={{backgroundColor: '#4A70A9'}}>
                M
              </div>
              <p className="text-lg mb-4" style={{color: '#4A70A9'}}>"The AI recommendations are spot on. I've discovered so many amazing books I never would have found otherwise."</p>
              <h5 className="font-semibold" style={{color: '#000000'}}>Michael Chen</h5>
              <p className="text-sm" style={{color: '#4A70A9'}}>Book Enthusiast</p>
            </div>
            
            <div className="form-card p-6 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold" style={{backgroundColor: '#8FABD4'}}>
                E
              </div>
              <p className="text-lg mb-4" style={{color: '#4A70A9'}}>"Love the progress tracking feature. It keeps me motivated to reach my reading goals every month."</p>
              <h5 className="font-semibold" style={{color: '#000000'}}>Emily Rodriguez</h5>
              <p className="text-sm" style={{color: '#4A70A9'}}>Goal-Oriented Reader</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#EFECE3'}}>
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="font-display text-3xl sm:text-4xl font-bold mb-6" style={{color: '#000000'}}>
            Ready to Start Your Reading Journey?
          </h3>
          <p className="text-xl mb-8" style={{color: '#4A70A9'}}>Join thousands of readers who have already transformed their reading experience with BookBuddy.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="theme-button text-lg px-8 py-4 flex items-center justify-center space-x-3 group">
              <span>Start Reading Today</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="bg-transparent border-2 text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-white" style={{borderColor: '#4A70A9', color: '#4A70A9'}}>
              Already a Member?
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;