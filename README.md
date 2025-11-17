# BookBuddy – A Personal Book Tracking & Recommendation System

## Problem Statement
Many readers struggle to keep track of what they've read, what they plan to read, and their personal notes or ratings for each book.

BookBuddy helps users manage their personal library, track reading progress, and get AI-powered book recommendations based on their reading habits.

## System Architecture
**Architecture Flow:**
Frontend (React) → Backend API (Express) → Database (MongoDB)

**Stack:**
- Frontend: React.js + React Router for navigation
- Backend: Node.js + Express.js
- Database: MongoDB (via MongoDB Atlas)
- Authentication: JWT (JSON Web Token)
- Hosting:
  - Frontend → Vercel
  - Backend → Render
  - Database → MongoDB Atlas

## Key Features

| Category | Features |
|----------|----------|
| Authentication & Authorization | Secure login/signup using JWT, role-based access (admin/user) |
| CRUD Operations | Add, update, delete, and view books |
| Frontend Routing | Pages: Home, Login, Register, Dashboard, My Books, Recommendations, Profile |
| Filtering, Searching & Sorting | Filter by genre/status, search by title/author, sort by rating/date |
| Pagination | Display books in pages (e.g., 10 books per page) to improve performance (e.g., /api/books?page=2&limit=10) |
| AI Integration | Use OpenAI API to suggest similar or trending books based on user's history |
| Hosting | Deployed frontend and backend with online database access |

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React.js, React Router, Axios, TailwindCSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT |
| AI Integration | OpenAI API |
| Hosting | Frontend → Vercel, Backend → Render |

## API Overview

| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| /api/auth/signup | POST | Register new user | Public |
| /api/auth/login | POST | Authenticate user | Public |
| /api/books | GET | Get all books for logged-in user | Authenticated |
| /api/books/:id | GET | Get single book details | Authenticated |
| /api/books | POST | Add a new book | Authenticated |
| /api/books/:id | PUT | Update book details | Authenticated |
| /api/books/:id | DELETE | Delete a book | Authenticated |
| /api/recommend | POST | Get AI-based book recommendations | Authenticated |

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Update `.env` file with your MongoDB connection string:
```
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-secret-key
OPENAI_API_KEY=your-openai-api-key
```

4. Start the backend server:
```bash
npm run dev
```

Backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on http://localhost:3000

## Features Implemented

- ✅ User registration with validation
- ✅ User login with JWT authentication
- ✅ Protected routes
- ✅ Responsive design with Tailwind CSS
- ✅ Context-based state management
- ✅ Error handling and loading states

## Next Steps

1. Set up MongoDB Atlas database
2. Update environment variables
3. Install dependencies and run both servers
4. Test the authentication flow
5. Implement book CRUD operations
6. Add AI-powered recommendations
7. Deploy to production