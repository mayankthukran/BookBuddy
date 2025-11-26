const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        favoriteGenres: true,
        readingGoal: true,
        profilePhoto: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure default values for new fields
    const userProfile = {
      ...user,
      bio: user.bio || null,
      favoriteGenres: user.favoriteGenres || [],
      readingGoal: user.readingGoal || 50,
      profilePhoto: user.profilePhoto || null
    };

    res.json(userProfile);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, email, bio, favoriteGenres, readingGoal, profilePhoto } = req.body;

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
          NOT: { id: req.userId }
        }
      });

      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(bio !== undefined && { bio }),
        ...(favoriteGenres && { favoriteGenres }),
        ...(readingGoal !== undefined && { readingGoal }),
        ...(profilePhoto !== undefined && { profilePhoto })
      },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        favoriteGenres: true,
        readingGoal: true,
        profilePhoto: true
      }
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update password
const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: req.userId }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    await prisma.user.update({
      where: { id: req.userId },
      data: { password: hashedPassword }
    });

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user statistics
const getUserStats = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      where: { userId: req.userId }
    });

    const stats = {
      totalBooks: books.length,
      completed: books.filter(book => book.status === 'Completed').length,
      reading: books.filter(book => book.status === 'Reading').length,
      wantToRead: books.filter(book => book.status === 'Want to Read').length,
      averageRating: books.length > 0 
        ? (books.filter(book => book.rating > 0).reduce((sum, book) => sum + book.rating, 0) / books.filter(book => book.rating > 0).length || 0).toFixed(1)
        : 0,
      favoriteGenre: getMostFrequentGenre(books),
      readingStreak: calculateReadingStreak(books)
    };

    res.json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper functions
function getMostFrequentGenre(books) {
  if (books.length === 0) return 'None';
  
  const genreCounts = {};
  books.forEach(book => {
    if (book.genre) {
      genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1;
    }
  });
  
  return Object.keys(genreCounts).reduce((a, b) => genreCounts[a] > genreCounts[b] ? a : b, 'Fiction');
}

function calculateReadingStreak(books) {
  const completedBooks = books.filter(book => book.status === 'Completed');
  return Math.min(completedBooks.length * 2, 30);
}

module.exports = {
  getProfile,
  updateProfile,
  updatePassword,
  getUserStats
};