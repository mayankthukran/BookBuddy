const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');

// All routes require authentication
router.use(auth);

// GET /api/books - Get all books for user
router.get('/', getBooks);

// GET /api/books/:id - Get single book
router.get('/:id', getBook);

// POST /api/books - Create new book
router.post('/', createBook);

// PUT /api/books/:id - Update book
router.put('/:id', updateBook);

// DELETE /api/books/:id - Delete book
router.delete('/:id', deleteBook);

module.exports = router;