import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBook, FaStar, FaUsers, FaUser, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    const result = await signup(formData.name, formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen light-bg flex flex-col lg:flex-row">
      {/* Left Side - Text Content (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12">
        <div className="max-w-lg text-section animate-slide-in">
          <div className="mb-10">
            <div className="flex items-center mb-8 animate-bounce-in">
              <div className="h-16 w-16 rounded-2xl flex items-center justify-center mr-4 hover-lift" style={{backgroundColor: '#4A70A9'}}>
                <FaBook className="text-2xl text-white animate-float" />
              </div>
              <div>
                <h1 className="font-display text-5xl font-bold" style={{color: '#000000'}}>BookBuddy</h1>
                <p className="text-sm font-medium" style={{color: '#4A70A9'}}>Your Reading Companion</p>
              </div>
            </div>
            <h2 className="font-display text-4xl font-semibold mb-6 animate-fade-in" style={{color: '#000000'}}>
              Join Our Community!
            </h2>
            <p className="text-lg leading-relaxed mb-8 animate-fade-in" style={{color: '#4A70A9'}}>
              Start your personalized reading journey today. Connect with fellow book lovers, 
              track your progress, and discover amazing new stories.
            </p>
          </div>
          
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center hover-lift p-4 rounded-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{backgroundColor: '#8FABD4'}}>
                <FaBook className="text-xl text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-lg" style={{color: '#000000'}}>Personal Library</h4>
                <p className="text-sm" style={{color: '#4A70A9'}}>Build and organize your digital book collection</p>
              </div>
            </div>
            
            <div className="flex items-center hover-lift p-4 rounded-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{backgroundColor: '#8FABD4'}}>
                <FaStar className="text-xl text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-lg" style={{color: '#000000'}}>Smart Discoveries</h4>
                <p className="text-sm" style={{color: '#4A70A9'}}>Find books tailored to your unique taste</p>
              </div>
            </div>
            
            <div className="flex items-center hover-lift p-4 rounded-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{backgroundColor: '#8FABD4'}}>
                <FaUsers className="text-xl text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-lg" style={{color: '#000000'}}>Reading Community</h4>
                <p className="text-sm" style={{color: '#4A70A9'}}>Connect with thousands of book enthusiasts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Card */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-lg">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="h-12 w-12 rounded-xl flex items-center justify-center mr-3" style={{backgroundColor: '#4A70A9'}}>
                <FaBook className="text-xl text-white" />
              </div>
              <h1 className="font-display text-3xl font-bold" style={{color: '#000000'}}>BookBuddy</h1>
            </div>
          </div>

          <div className="form-card animate-fade-in">
            <div className="text-center mb-8 animate-bounce-in">
              <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3" style={{color: '#000000'}}>
                Create Account
              </h3>
              <p className="text-base sm:text-lg" style={{color: '#4A70A9'}}>Start your reading adventure today</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-4 sm:px-6 py-4 rounded-xl animate-fade-in">
                  <span>{error}</span>
                </div>
              )}
              
              <div className="input-group">
                <FaUser className="input-icon text-lg" />
                <input
                  name="name"
                  type="text"
                  required
                  className="theme-input w-full"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div className="input-group">
                <FaEnvelope className="input-icon text-lg" />
                <input
                  name="email"
                  type="email"
                  required
                  className="theme-input w-full"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="input-group">
                <FaLock className="input-icon text-lg" />
                <input
                  name="password"
                  type="password"
                  required
                  className="theme-input w-full"
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              
              <div className="input-group">
                <FaLock className="input-icon text-lg" />
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  className="theme-input w-full"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="theme-button w-full py-3 sm:py-4 text-base sm:text-lg font-semibold flex items-center justify-center space-x-3 group mt-8"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-white"></div>
                    <span>Creating your account...</span>
                  </>
                ) : (
                  <>
                    <span>Join BookBuddy</span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="text-center pt-6">
                <p className="text-base sm:text-lg" style={{color: '#4A70A9'}}>
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="font-bold hover:underline transition-all duration-300" 
                    style={{color: '#000000'}}
                  >
                    Sign in here →
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;