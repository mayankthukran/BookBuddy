const { PrismaClient } = require('@prisma/client');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const prisma = new PrismaClient();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' });

const getRecommendations = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const userBooks = await prisma.book.findMany({
      where: { userId },
      select: { title: true, author: true, genre: true, rating: true, status: true }
    });

    const [aiRecommendations, trendingBooks, similarBooks, genreBooks] = await Promise.all([
      generateAIRecommendations(userBooks),
      getTrendingBooks(),
      getSimilarBooks(userBooks),
      getGenreExploration(userBooks)
    ]);

    res.json({
      ai: aiRecommendations,
      trending: trendingBooks,
      similar: similarBooks,
      genres: genreBooks
    });
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const generateAIRecommendations = async (userBooks) => {
  if (userBooks.length === 0) {
    return getStaticRecommendations().slice(0, 6).map((book, index) => ({
      id: `ai-${index}`,
      ...book,
      cover: getBookCover(book.genre),
      rating: (Math.random() * 1.5 + 3.5).toFixed(1)
    }));
  }

  try {
    const prompt = `Based on reading history: ${userBooks.map(b => `"${b.title}" by ${b.author} (${b.genre})`).join(', ')}, recommend 6 different books. Format as JSON array with fields: title, author, genre, description, reason. Example: [{"title":"Book Name","author":"Author Name","genre":"Fiction","description":"Book description","reason":"Why recommended"}]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean the response to extract JSON
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const recommendations = JSON.parse(text);
    
    return recommendations.map((book, index) => ({
      id: `ai-${index}`,
      ...book,
      cover: getBookCover(book.genre),
      rating: (Math.random() * 1.5 + 3.5).toFixed(1)
    }));
  } catch (error) {
    console.error('Gemini AI error:', error.message);
    return getStaticRecommendations().slice(0, 6).map((book, index) => ({
      id: `ai-${index}`,
      ...book,
      cover: getBookCover(book.genre),
      rating: (Math.random() * 1.5 + 3.5).toFixed(1)
    }));
  }
};

const getTrendingBooks = async () => {
  try {
    const prompt = `List 6 trending popular books from 2023-2024. Format as JSON array: [{"title":"Book Name","author":"Author Name","genre":"Genre","description":"Short description","rating":"4.5"}]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const trending = JSON.parse(text);
    
    return trending.map((book, index) => ({
      id: `trending-${index}`,
      ...book,
      cover: getBookCover(book.genre),
      reason: "Trending in the BookBuddy community"
    }));
  } catch (error) {
    console.error('Gemini trending error:', error.message);
    return [
      { id: 'trending-0', title: "Fourth Wing", author: "Rebecca Yarros", genre: "Fantasy", description: "Dragons, war college, and forbidden romance.", rating: "4.7", cover: getBookCover("Fantasy"), reason: "Trending in the BookBuddy community" },
      { id: 'trending-1', title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", genre: "Fiction", description: "A novel about friendship and video games.", rating: "4.5", cover: getBookCover("Fiction"), reason: "Trending in the BookBuddy community" },
      { id: 'trending-2', title: "Book Lovers", author: "Emily Henry", genre: "Romance", description: "A literary agent finds unexpected love.", rating: "4.4", cover: getBookCover("Romance"), reason: "Trending in the BookBuddy community" }
    ];
  }
};

const getSimilarBooks = async (userBooks) => {
  const favoriteBooks = userBooks.filter(book => book.rating >= 4);
  if (favoriteBooks.length === 0) return [];

  try {
    const prompt = `Recommend 4 books similar to: ${favoriteBooks.slice(0,2).map(b => `"${b.title}" by ${b.author}`).join(', ')}. Format as JSON: [{"title":"Book Name","author":"Author Name","genre":"Genre","description":"Description","rating":"4.5"}]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const similar = JSON.parse(text);
    
    return similar.map((book, index) => ({
      id: `similar-${index}`,
      ...book,
      cover: getBookCover(book.genre),
      reason: `Similar to "${favoriteBooks[0].title}"`
    }));
  } catch (error) {
    console.error('Gemini similar error:', error.message);
    return [
      { id: 'similar-0', title: "The Invisible Life of Addie LaRue", author: "V.E. Schwab", genre: "Fantasy", description: "A woman cursed to be forgotten by everyone she meets.", rating: "4.4", cover: getBookCover("Fantasy"), reason: `Similar to "${favoriteBooks[0]?.title || 'your favorites'}"` },
      { id: 'similar-1', title: "Circe", author: "Madeline Miller", genre: "Fantasy", description: "The story of the Greek goddess Circe.", rating: "4.6", cover: getBookCover("Fantasy"), reason: `Similar to "${favoriteBooks[0]?.title || 'your favorites'}"` }
    ];
  }
};

const getGenreExploration = async (userBooks) => {
  const userGenres = [...new Set(userBooks.map(book => book.genre))];
  const allGenres = ['Mystery', 'Sci-Fi', 'Biography', 'Self-Help', 'Horror', 'Historical Fiction'];
  const newGenres = allGenres.filter(genre => !userGenres.includes(genre));

  const genrePromises = newGenres.slice(0, 2).map(async (genre) => {
    const books = await getGenreBooks(genre);
    return { genre, books };
  });

  return Promise.all(genrePromises);
};

const getGenreBooks = async (genre) => {
  try {
    const prompt = `Recommend 2 popular ${genre} books. Format as JSON: [{"title":"Book Name","author":"Author Name","description":"Description","rating":"4.5"}]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const books = JSON.parse(text);
    
    return books.map((book, index) => ({
      id: `${genre}-${index}`,
      ...book,
      genre,
      cover: getBookCover(genre)
    }));
  } catch (error) {
    console.error(`Gemini ${genre} error:`, error.message);
    const fallbackBooks = {
      Mystery: [{ title: "The Thursday Murder Club", author: "Richard Osman", description: "Retirees solve cold cases.", rating: "4.4" }],
      'Sci-Fi': [{ title: "Project Hail Mary", author: "Andy Weir", description: "A lone astronaut must save humanity.", rating: "4.7" }],
      Biography: [{ title: "Educated", author: "Tara Westover", description: "A memoir about education and family.", rating: "4.6" }],
      'Self-Help': [{ title: "Atomic Habits", author: "James Clear", description: "Tiny changes, remarkable results.", rating: "4.7" }],
      Horror: [{ title: "The Haunting of Hill House", author: "Shirley Jackson", description: "Classic psychological horror.", rating: "4.2" }],
      'Historical Fiction': [{ title: "The Book Thief", author: "Markus Zusak", description: "A girl's story during WWII Germany.", rating: "4.5" }]
    };
    return (fallbackBooks[genre] || []).map((book, index) => ({
      id: `${genre}-${index}`,
      ...book,
      genre,
      cover: getBookCover(genre)
    }));
  }
};

const getStaticRecommendations = () => [
  { title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid", genre: "Fiction", description: "A reclusive Hollywood icon reveals her secrets.", reason: "Popular choice for fiction lovers" },
  { title: "Where the Crawdads Sing", author: "Delia Owens", genre: "Mystery", description: "A mystery set in the marshlands of North Carolina.", reason: "Bestselling mystery novel" },
  { title: "Atomic Habits", author: "James Clear", genre: "Self-Help", description: "Tiny changes, remarkable results.", reason: "Highly rated self-improvement book" },
  { title: "Project Hail Mary", author: "Andy Weir", genre: "Sci-Fi", description: "A lone astronaut must save humanity.", reason: "Award-winning science fiction" },
  { title: "Educated", author: "Tara Westover", genre: "Biography", description: "A memoir about education and family.", reason: "Critically acclaimed memoir" },
  { title: "The Thursday Murder Club", author: "Richard Osman", genre: "Mystery", description: "Retirees solve cold cases.", reason: "Popular mystery series" }
];

const getBookCover = (genre) => {
  const covers = {
    Fiction: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    Mystery: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    Romance: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    'Sci-Fi': "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    Fantasy: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    Biography: "https://images.unsplash.com/photo-1472173148041-00294f0814a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    'Self-Help': "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  };
  return covers[genre] || covers.Fiction;
};

module.exports = { getRecommendations };