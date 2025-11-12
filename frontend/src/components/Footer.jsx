import { Link } from 'react-router-dom';
import { FaBook, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8" style={{backgroundColor: '#000000'}}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{backgroundColor: '#4A70A9'}}>
              <FaBook className="text-white text-lg" />
            </div>
            <h1 className="font-display text-xl font-bold text-white">
              BookBuddy
            </h1>
          </div>
          
          <div className="flex space-x-8 text-white">
            <Link to="/" className="hover:opacity-80 transition-opacity">Home</Link>
            <Link to="/login" className="hover:opacity-80 transition-opacity">Login</Link>
            <Link to="/signup" className="hover:opacity-80 transition-opacity">Sign Up</Link>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 BookBuddy. All rights reserved. Made with <FaHeart className="inline text-red-500" /> for book lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;