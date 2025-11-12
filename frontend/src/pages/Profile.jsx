import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaBook, FaStar, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Passionate reader who loves exploring different genres and discovering new authors.',
    favoriteGenres: ['Fiction', 'Mystery', 'Biography'],
    readingGoal: 50
  });

  const stats = [
    { label: 'Books Read', value: '24', icon: FaBook },
    { label: 'Reviews Written', value: '18', icon: FaStar },
    { label: 'Reading Streak', value: '12 days', icon: FaBook },
    { label: 'Favorite Genre', value: 'Fiction', icon: FaStar },
  ];

  const handleSave = () => {
    // Save profile changes
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: 'Passionate reader who loves exploring different genres and discovering new authors.',
      favoriteGenres: ['Fiction', 'Mystery', 'Biography'],
      readingGoal: 50
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen light-bg py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="form-card p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{backgroundColor: '#4A70A9'}}>
                <FaUser className="text-3xl text-white" />
              </div>
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold" style={{color: '#000000'}}>
                  {formData.name}
                </h1>
                <p style={{color: '#4A70A9'}}>Member since 2024</p>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4 sm:mt-0">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-white transition-all duration-200"
                    style={{backgroundColor: '#4A70A9'}}
                  >
                    <FaSave />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium border-2 hover:bg-gray-50 transition-all duration-200"
                    style={{borderColor: '#8FABD4', color: '#4A70A9'}}
                  >
                    <FaTimes />
                    <span>Cancel</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium border-2 hover:bg-gray-50 transition-all duration-200"
                  style={{borderColor: '#8FABD4', color: '#4A70A9'}}
                >
                  <FaEdit />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>

          {/* Profile Form */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{color: '#000000'}}>
                Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 rounded-lg border-2 outline-none transition-all duration-200"
                  style={{borderColor: '#8FABD4', backgroundColor: '#EFECE3'}}
                />
              ) : (
                <p className="p-3 rounded-lg" style={{backgroundColor: '#EFECE3', color: '#4A70A9'}}>
                  {formData.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{color: '#000000'}}>
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 rounded-lg border-2 outline-none transition-all duration-200"
                  style={{borderColor: '#8FABD4', backgroundColor: '#EFECE3'}}
                />
              ) : (
                <p className="p-3 rounded-lg" style={{backgroundColor: '#EFECE3', color: '#4A70A9'}}>
                  {formData.email}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2" style={{color: '#000000'}}>
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  rows={3}
                  className="w-full p-3 rounded-lg border-2 outline-none transition-all duration-200"
                  style={{borderColor: '#8FABD4', backgroundColor: '#EFECE3'}}
                />
              ) : (
                <p className="p-3 rounded-lg" style={{backgroundColor: '#EFECE3', color: '#4A70A9'}}>
                  {formData.bio}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{color: '#000000'}}>
                Reading Goal (books/year)
              </label>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.readingGoal}
                  onChange={(e) => setFormData({...formData, readingGoal: parseInt(e.target.value)})}
                  className="w-full p-3 rounded-lg border-2 outline-none transition-all duration-200"
                  style={{borderColor: '#8FABD4', backgroundColor: '#EFECE3'}}
                />
              ) : (
                <p className="p-3 rounded-lg" style={{backgroundColor: '#EFECE3', color: '#4A70A9'}}>
                  {formData.readingGoal} books
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Reading Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="form-card p-4 text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{backgroundColor: '#8FABD4'}}>
                <stat.icon className="text-xl text-white" />
              </div>
              <p className="text-2xl font-bold mb-1" style={{color: '#000000'}}>
                {stat.value}
              </p>
              <p className="text-sm" style={{color: '#4A70A9'}}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Favorite Genres */}
        <div className="form-card p-6">
          <h3 className="font-display text-xl font-bold mb-4" style={{color: '#000000'}}>
            Favorite Genres
          </h3>
          <div className="flex flex-wrap gap-2">
            {formData.favoriteGenres.map((genre, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm font-medium text-white"
                style={{backgroundColor: '#4A70A9'}}
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;