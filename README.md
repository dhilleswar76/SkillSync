# Student Portal - MERN Stack Application

A full-stack learning management system built with the MERN stack (MongoDB, Express.js, React, Node.js). This platform enables administrators to create courses and manage content, while students can enroll, learn, track progress, and earn certificates.

## Features

### For Students
- 📚 Browse and enroll in courses
- 📖 View lessons with multimedia content
- ✅ Complete quizzes and track progress
- 💬 Comment and discuss on lessons
- 🎓 Earn certificates upon course completion
- 📊 View personal learning dashboard

### For Administrators
- 👥 Manage users and permissions
- 📝 Create and edit courses
- 🎬 Add lessons with various content types
- ❓ Create quizzes and assessments
- 📈 View platform statistics
- 🎯 Monitor student progress

## Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Cloudinary** - Media storage
- **PDFKit** - Certificate generation
- **Swagger** - API documentation

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
  - Or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud database)
- **npm** or **yarn** - Package manager (comes with Node.js)
- **Git** - Version control

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd student-portal
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd student-portal-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# Update MONGO_URI, JWT_SECRET, etc.

# Seed the database with sample data (optional)
npm run seed

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env to point to your backend
# VITE_API_URL=http://localhost:5000/api

# Start the frontend development server
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

### 4. Access the Application

Open your browser and navigate to the frontend URL (typically `http://localhost:5173`)

#### Default Login Credentials (after seeding):

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

**Student Account:**
- Email: `student@example.com`
- Password: `student123`

## Project Structure

```
student-portal/
├── frontend/                    # React frontend application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── api/               # API configuration (axios)
│   │   ├── components/        # Reusable React components
│   │   ├── context/           # React Context providers
│   │   ├── layouts/           # Layout components
│   │   ├── pages/             # Page components
│   │   ├── App.jsx            # Main App component
│   │   └── main.jsx           # Application entry point
│   ├── .env.example           # Environment variables template
│   ├── package.json           # Frontend dependencies
│   └── vite.config.js         # Vite configuration
│
├── student-portal-backend/     # Node.js/Express backend
│   ├── src/
│   │   ├── config/           # Database, Cloudinary, Swagger configs
│   │   ├── controllers/      # Request handlers
│   │   ├── middlewares/      # Custom middlewares
│   │   ├── models/           # Mongoose schemas
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Helper functions
│   │   ├── app.js            # Express app setup
│   │   └── server.js         # Server entry point
│   ├── tests/                # Test files
│   ├── .env.example          # Environment variables template
│   ├── package.json          # Backend dependencies
│   └── seed.js               # Database seeding script
│
├── package.json               # Root package.json for convenience scripts
└── README.md                  # This file
```

## Available Scripts

### Root Directory
```bash
npm run install-all    # Install all dependencies (frontend + backend)
npm run dev            # Run both frontend and backend concurrently
npm run backend        # Run only backend
npm run frontend       # Run only frontend
```

### Backend Directory
```bash
npm start              # Run in production mode
npm run dev            # Run with nodemon (auto-reload)
npm run seed           # Seed database with sample data
npm test               # Run tests
```

### Frontend Directory
```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run preview        # Preview production build
npm run lint           # Run ESLint
```

## Environment Configuration

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/student-portal
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## MongoDB Setup

### Option 1: Local Installation

1. **Install MongoDB**:
   - Windows: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Mac: `brew install mongodb-community`
   - Linux: Follow [official guide](https://docs.mongodb.com/manual/administration/install-on-linux/)

2. **Start MongoDB**:
   - Windows: Runs as a service automatically
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`

3. **Verify installation**:
   ```bash
   mongosh
   ```

### Option 2: MongoDB Atlas (Cloud - Recommended for beginners)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get the connection string and update `MONGO_URI` in backend `.env`

Example Atlas connection string:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/student-portal?retryWrites=true&w=majority
```

## API Documentation

Once the backend is running, access interactive API documentation at:
```
http://localhost:5000/api-docs
```

## Development Workflow

1. **Start MongoDB** (if using local installation)
2. **Start Backend**: `cd student-portal-backend && npm run dev`
3. **Start Frontend**: `cd frontend && npm run dev`
4. **Make Changes**: Both servers will auto-reload on file changes
5. **Test**: Use Swagger docs or frontend UI to test features

## Building for Production

### Backend
```bash
cd student-portal-backend
NODE_ENV=production npm start
```

### Frontend
```bash
cd frontend
npm run build
# Build output will be in 'dist' folder
```

## Deployment

### Backend Deployment Options
- [Heroku](https://www.heroku.com/)
- [Render](https://render.com/)
- [Railway](https://railway.app/)
- [DigitalOcean](https://www.digitalocean.com/)
- AWS EC2 / Azure / Google Cloud

### Frontend Deployment Options
- [Vercel](https://vercel.com/) (Recommended for Vite/React)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

### Database
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Recommended)

## Troubleshooting

### Common Issues

**MongoDB Connection Failed**
- Ensure MongoDB is running: `mongosh` should connect
- Check `MONGO_URI` in `.env`
- For Atlas, verify IP whitelist

**Port Already in Use**
- Backend: Change `PORT` in backend `.env`
- Frontend: Vite will automatically use next available port

**CORS Errors**
- Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check CORS configuration in backend `app.js`

**Module Not Found**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

**Vite Build Errors**
- Clear cache: `rm -rf node_modules/.vite`
- Rebuild: `npm run build`

## Testing

### Backend Tests
```bash
cd student-portal-backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Security Best Practices

- ✅ Change `JWT_SECRET` to a strong random string in production
- ✅ Use environment variables for all sensitive data
- ✅ Enable HTTPS in production
- ✅ Implement rate limiting for API endpoints
- ✅ Validate and sanitize all user inputs
- ✅ Keep dependencies updated
- ✅ Use MongoDB Atlas IP whitelist in production

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Create an issue in the repository
- Check existing documentation
- Review API documentation at `/api-docs`

## Acknowledgments

Built with ❤️ using the MERN stack.
