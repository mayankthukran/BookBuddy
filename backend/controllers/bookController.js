const Book = require('../models/Book');

// Get all books for a user
const getBooks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      page = 1, 
      limit = 8, 
      status, 
      genre, 
      search, 
      sortBy 
    } = req.query;

    const skip = (page - 1) * limit;
    const filters = {
      status,
      genre,
      search,
      sortBy,
      skip: parseInt(skip),
      limit: parseInt(limit)
    };

    const books = await Book.findByUserId(userId, filters);
    const total = await Book.count(userId, filters);

    res.json({
      books,
      pagination: {
        current: parseInt(page),
        pageSize: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single book
const getBook = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const book = await Book.findById(id, userId);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Get book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new book
const createBook = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      title,
      author,
      genre,
      status = 'Want to Read',
      pages,
      progress = 0,
      rating = 0,
      cover,
      notes = ''
    } = req.body;

    // Validation
    if (!title || !author || !genre) {
      return res.status(400).json({ 
        message: 'Title, author, and genre are required' 
      });
    }

    const bookData = {
      userId,
      title,
      author,
      genre,
      status,
      pages: pages ? parseInt(pages) : null,
      progress: parseInt(progress),
      rating: parseInt(rating),
      cover,
      notes
    };

    const book = await Book.create(bookData);
    res.status(201).json(book);
  } catch (error) {
    console.error('Create book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update book
const updateBook = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const updateData = req.body;

    // Remove userId from update data if present
    delete updateData.userId;
    delete updateData.id;

    // Convert numeric fields
    if (updateData.pages) updateData.pages = parseInt(updateData.pages);
    if (updateData.progress) updateData.progress = parseInt(updateData.progress);
    if (updateData.rating) updateData.rating = parseInt(updateData.rating);

    const result = await Book.update(id, userId, updateData);
    
    if (result.count === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Get updated book
    const updatedBook = await Book.findById(id, userId);
    res.json(updatedBook);
  } catch (error) {
    console.error('Update book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete book
const deleteBook = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const result = await Book.delete(id, userId);
    
    if (result.count === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
};