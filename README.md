# BookBuddy - Personal Book Tracking System

A complete authentication system with React frontend and Node.js backend.

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

## API Endpoints

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

## Tech Stack

**Frontend:**
- React 18 with Vite
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Context API for state management

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Next Steps

1. Set up MongoDB Atlas database
2. Update environment variables
3. Install dependencies and run both servers
4. Test the authentication flow