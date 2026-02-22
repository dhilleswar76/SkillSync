# Student Portal Backend

A RESTful API built with Node.js, Express, and MongoDB for managing a student learning portal.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control (Admin/Student)
- **Course Management**: Create, update, and manage courses and lessons
- **Progress Tracking**: Track student progress through courses
- **Quiz System**: Create and manage quizzes with automated grading
- **Certificate Generation**: Automatic PDF certificate generation upon course completion
- **Comments**: Interactive discussion system for lessons
- **File Upload**: Cloudinary integration for media uploads
- **API Documentation**: Swagger/OpenAPI documentation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Joi
- **File Upload**: Multer + Cloudinary
- **PDF Generation**: PDFKit
- **Testing**: Jest + Supertest

## Prerequisites

Before running this application, make sure you have:

- Node.js (v18 or higher)
- MongoDB installed locally or a MongoDB Atlas account
- npm or yarn package manager

## Installation

1. Navigate to the backend directory:
```bash
cd student-portal-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/student-portal
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:3000
```

## Database Setup

### Option 1: Local MongoDB

1. Install MongoDB Community Edition from [official website](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - **Windows**: MongoDB should start automatically as a service
   - **Mac**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

3. Verify MongoDB is running:
```bash
mongosh
```

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string and update `MONGO_URI` in `.env`
4. Whitelist your IP address in Atlas

## Seeding the Database

To populate the database with sample data:

```bash
npm run seed
```

This will create:
- Admin user
- Sample students
- Sample courses with lessons
- Sample quizzes

## Running the Application

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000` (or the PORT specified in .env)

## API Documentation

Once the server is running, access the Swagger documentation at:
```
http://localhost:5000/api-docs
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (Admin only)
- `PUT /api/courses/:id` - Update course (Admin only)
- `DELETE /api/courses/:id` - Delete course (Admin only)

### Lessons
- `GET /api/lessons/course/:courseId` - Get lessons for a course
- `GET /api/lessons/:id` - Get lesson by ID
- `POST /api/lessons` - Create lesson (Admin only)
- `PUT /api/lessons/:id` - Update lesson (Admin only)
- `DELETE /api/lessons/:id` - Delete lesson (Admin only)

### Progress
- `GET /api/progress` - Get user's progress
- `POST /api/progress/:lessonId/complete` - Mark lesson as complete

### Quizzes
- `GET /api/quizzes/lesson/:lessonId` - Get quiz for a lesson
- `POST /api/quizzes/:id/submit` - Submit quiz answers
- `POST /api/quizzes` - Create quiz (Admin only)

### Comments
- `GET /api/comments/lesson/:lessonId` - Get comments for a lesson
- `POST /api/comments` - Create a comment
- `DELETE /api/comments/:id` - Delete comment

### Certificates
- `GET /api/certificates` - Get user's certificates
- `GET /api/certificates/:id` - Download certificate PDF

### Admin
- `GET /api/admin/stats` - Get platform statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role

## Testing

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Project Structure

```
src/
├── app.js                 # Express app configuration
├── server.js             # Server entry point
├── config/               # Configuration files
│   ├── db.js            # MongoDB connection
│   ├── cloudinary.js    # Cloudinary setup
│   └── swagger.js       # Swagger configuration
├── controllers/          # Route controllers
├── middlewares/          # Custom middlewares
├── models/              # Mongoose models
├── routes/              # API routes
└── utils/               # Utility functions
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| PORT | Server port | Yes |
| NODE_ENV | Environment (development/production) | Yes |
| MONGO_URI | MongoDB connection string | Yes |
| JWT_SECRET | Secret key for JWT | Yes |
| JWT_EXPIRE | JWT expiration time | Yes |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name | No |
| CLOUDINARY_API_KEY | Cloudinary API key | No |
| CLOUDINARY_API_SECRET | Cloudinary API secret | No |
| FRONTEND_URL | Frontend URL for CORS | Yes |

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongosh` should connect successfully
- Check your `MONGO_URI` in `.env`
- For Atlas, verify IP whitelist and credentials

### Port Already in Use
- Change the PORT in `.env` file
- Or kill the process using the port:
  - **Windows**: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
  - **Mac/Linux**: `lsof -ti:5000 | xargs kill -9`

### Authentication Errors
- Ensure JWT_SECRET is set in `.env`
- Check token expiration settings

## Security Notes

- Change `JWT_SECRET` to a secure random string in production
- Use environment variables for all sensitive data
- Enable CORS only for trusted domains in production
- Use HTTPS in production
- Regularly update dependencies

## License

This project is part of a learning management system.