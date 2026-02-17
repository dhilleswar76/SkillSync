# Student Portal - Frontend

A modern React-based frontend for the Student Portal application.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework

## Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── axios.js          # Axios configuration
│   ├── context/
│   │   └── AuthContext.jsx   # Authentication context
│   ├── layouts/
│   │   ├── MainLayout.jsx    # Main layout wrapper
│   │   └── DashboardLayout.jsx # Dashboard layout with sidebar
│   ├── pages/
│   │   ├── Landing.jsx       # Landing page
│   │   ├── Login.jsx         # Login page
│   │   ├── Register.jsx      # Registration page
│   │   ├── StudentDashboard.jsx # Student dashboard
│   │   ├── AdminDashboard.jsx   # Admin dashboard
│   │   ├── CourseDetails.jsx    # Course details page
│   │   └── LessonView.jsx       # Lesson view with video/quiz
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation bar
│   │   ├── Sidebar.jsx       # Dashboard sidebar
│   │   ├── CourseCard.jsx    # Course card component
│   │   └── ProtectedRoute.jsx # Route protection
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind configuration
└── .env.example              # Environment variables example
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```bash
cp .env.example .env
```

3. Update the `.env` file with your backend API URL:
```
VITE_API_URL=http://localhost:5000/api
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

Create a production build:
```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Features

### For Students
- Browse and enroll in courses
- Watch video lessons
- Take quizzes
- Track learning progress
- Earn certificates

### For Admins
- Manage users
- Create and manage courses
- View analytics and reports
- Monitor student progress

## API Integration

The frontend communicates with the backend API through axios. The base URL is configured in `src/api/axios.js` and uses the `VITE_API_URL` environment variable.

### Authentication

JWT tokens are stored in localStorage and automatically included in API requests via axios interceptors.

## Available Routes

### Public Routes
- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page

### Protected Routes (Students)
- `/dashboard` - Student dashboard
- `/courses/:id` - Course details
- `/lessons/:id` - Lesson view

### Protected Routes (Admin)
- `/admin/dashboard` - Admin dashboard

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT
