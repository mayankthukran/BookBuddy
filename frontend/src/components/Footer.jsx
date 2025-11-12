import { Link } from 'react-router-dom';
import { FaBook, FaHeart, FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#000000'}}>
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{backgroundColor: '#4A70A9'}}>
                <FaBook className="text-white text-xl" />
              </div>
              <h1 className="font-display text-2xl font-bold text-white">
                BookBuddy
              </h1>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your personal reading companion. Track progress, discover new books, and connect with fellow readers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" style={{backgroundColor: '#4A70A9'}}>
                <FaTwitter className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" style={{backgroundColor: '#4A70A9'}}>
                <FaFacebook className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" style={{backgroundColor: '#4A70A9'}}>
                <FaInstagram className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" style={{backgroundColor: '#4A70A9'}}>
                <FaLinkedin className="text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/my-books" className="text-gray-400 hover:text-white transition-colors">My Books</Link></li>
              <li><Link to="/recommendations" className="text-gray-400 hover:text-white transition-colors">Recommendations</Link></li>
              <li><Link to="/profile" className="text-gray-400 hover:text-white transition-colors">Profile</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Account</h3>
            <ul className="space-y-3">
              <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Sign In</Link></li>
              <li><Link to="/signup" className="text-gray-400 hover:text-white transition-colors">Create Account</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400">
                <FaEnvelope className="text-sm" />
                <span>hello@bookbuddy.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <FaPhone className="text-sm" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400">
                <FaMapMarkerAlt className="text-sm mt-1" />
                <span>123 Reading Street<br />Book City, BC 12345</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; 2024 BookBuddy. All rights reserved. Made with <FaHeart className="inline text-red-500 mx-1" /> for book lovers worldwide.
            </p>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;