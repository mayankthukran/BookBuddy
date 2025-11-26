const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Book {
  static async create(bookData) {
    return await prisma.book.create({
      data: bookData
    });
  }

  static async findByUserId(userId, filters = {}) {
    const where = { userId };
    
    // Add filters
    if (filters.status && filters.status !== 'all') {
      where.status = filters.status;
    }
    
    if (filters.genre && filters.genre !== 'all') {
      where.genre = filters.genre;
    }
    
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { author: { contains: filters.search, mode: 'insensitive' } }
      ];
    }

    const orderBy = {};
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'title':
          orderBy.title = 'asc';
          break;
        case 'author':
          orderBy.author = 'asc';
          break;
        case 'rating':
          orderBy.rating = 'desc';
          break;
        case 'dateAdded':
          orderBy.createdAt = 'desc';
          break;
        default:
          orderBy.title = 'asc';
      }
    }

    return await prisma.book.findMany({
      where,
      orderBy,
      skip: filters.skip || 0,
      take: filters.limit || 10
    });
  }

  static async findById(id, userId) {
    return await prisma.book.findFirst({
      where: { id, userId }
    });
  }

  static async update(id, userId, updateData) {
    return await prisma.book.updateMany({
      where: { id, userId },
      data: updateData
    });
  }

  static async delete(id, userId) {
    return await prisma.book.deleteMany({
      where: { id, userId }
    });
  }

  static async count(userId, filters = {}) {
    const where = { userId };
    
    if (filters.status && filters.status !== 'all') {
      where.status = filters.status;
    }
    
    if (filters.genre && filters.genre !== 'all') {
      where.genre = filters.genre;
    }
    
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { author: { contains: filters.search, mode: 'insensitive' } }
      ];
    }

    return await prisma.book.count({ where });
  }
}

module.exports = Book;