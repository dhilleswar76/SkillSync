# SkillSync — Student Portal & Coding Interview Master

A full-stack modern MERN (MongoDB, Express.js, React 18, Node.js) learning platform and coding interview preparation suite. SkillSync features an interactive **Admin Sheet** with pattern-wise DSA roadmaps, a **Suggested Coding Sheets Directory** with authentic official resources, an in-browser **Monaco Code Editor**, **Guest Exploration with Action Auth Guards**, **Course Management with Quizzes & Certificates**, and **Career Roadmaps**.

---

## 🌟 Core Features

### 👑 1. Official Admin Sheet (`/sheets`)
- **382 Curated DSA Problems** organized across **17 Core Topics** and **69 Algorithmic Sub-modules / Patterns** (Two-Pointer, Sliding Window, Prefix Sum, Kadane, Binary Search, Monotonic Stack, Trees, Graphs, DP, etc.).
- **2-Level Interactive Accordions**: Main Topic ➔ Pattern Sub-Modules ➔ Problem rows with solved checkmarks and difficulty ratings.
- **Dual External Solving**: Direct buttons to open each problem on **LeetCode** and **GeeksforGeeks**.
- **Real-Time Progress Tracking**: Live percentage and completion counters (`X / 382 solved`).

### 📚 2. Suggested Coding Sheets Directory (`/suggested-sheets`)
- Dedicated directory page showcasing industry-standard sheets:
  - **Striver's SDE Sheet** (191 Qs) — [TakeUForward Official](https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/)
  - **Striver's A2Z DSA Sheet** (455 Qs) — [TakeUForward A2Z](https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/)
  - **NeetCode 150** (150 Qs) — [NeetCode.io](https://neetcode.io/practice)
  - **Blind 75 Must-Do** (75 Qs) — [Blind 75 Discussion](https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions)
  - **Love Babbar 450 DSA Sheet** (450 Qs) — [450dsa.com](https://450dsa.com/)
  - **LeetCode Top Interview 150** (150 Qs) — [LeetCode Study Plan](https://leetcode.com/studyplan/top-interview-150/)
  - **Rising Brain DSA Patterns** (300 Qs) — [Rising Brain](https://risingbrain.org/)
  - **Striver 79 Revision Sheet** (79 Qs) — [TakeUForward 79](https://takeuforward.org/interview-sheets/strivers-79-last-moment-dsa-sheet-ace-interviews/)
  - **TUF CP Sheet** (250 Qs) — [TUF CP](https://takeuforward.org/competitive-programming/strivers-cp-sheet/)
  - **Core CS Fundamentals**: Operating Systems (90 Qs), Computer Networks (85 Qs), DBMS & SQL (100 Qs), System Design Primer (60 Qs).
- Direct buttons to open official sources in a new tab (`target="_blank"`) or solve directly in our portal IDE.

### 💻 3. In-Browser Monaco Code Editor & Sandbox
- Multi-language IDE supporting JavaScript, Python, Java, C++, and C#.
- Live JavaScript sandbox execution with custom output console, execution time, and memory metrics.
- Built-in personal revision notes editor per problem with backend synchronization.

### 🌐 4. Guest Exploration & Action-Guarded Authentication
- Visitors can freely browse courses, syllabus outlines, roadmaps, and coding sheets without forced redirects.
- An elegant **Auth Modal** prompts for sign-in/registration only when attempting stateful actions (marking problems as solved, saving notes, taking quizzes, saving custom IDE solutions).

### 🎓 5. Courses, Quizzes & PDF Certificates
- Video lessons, interactive curriculum syllabus, and theory resources.
- Module-end assessment quizzes with instant scoring.
- Automated PDF certificate generation upon course completion.

### 🗺️ 6. Career Roadmaps & Practice Workspace
- Interactive roadmaps for Full Stack MERN, DSA, AI/ML, and DevOps.
- Dedicated standalone Code Practice Workspace (`/practice`).

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, React Router v6, Tailwind CSS, Monaco Editor (`@monaco-editor/react`), Axios |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose ODM, JWT, PDFKit, Multer, Cloudinary, Swagger UI |
| **Tooling** | Concurrently, Nodemon, ESLint, Python data parsers |

---

## 📁 Project Structure

```
student-portal/
├── frontend/                        # React 18 + Vite Frontend
│   ├── src/
│   │   ├── api/                    # Axios API client
│   │   ├── components/             # Reusable UI components (Navbar, AuthModal, ProtectedRoute)
│   │   ├── context/                # AuthContext, ThemeContext
│   │   ├── data/                   # Sheet datasets (patternWiseCustom.js, striverSde.js, etc.)
│   │   ├── layouts/                # PublicLayout, DashboardLayout
│   │   ├── pages/                  # CodingSheets, SuggestedSheets, AllCourses, CourseView, etc.
│   │   ├── App.jsx                 # Client-side router configuration
│   │   └── main.jsx                # Application entry point
│   ├── package.json
│   └── vite.config.js
│
├── backend/                         # Node.js + Express REST API
│   ├── src/
│   │   ├── config/                 # MongoDB connection, Cloudinary, Swagger
│   │   ├── controllers/            # CodingSheet, Course, Auth, Quiz, Progress controllers
│   │   ├── middlewares/            # JWT auth, error handlers, role validators
│   │   ├── models/                 # User, Course, Lesson, CodingSheetProgress, Certificate
│   │   ├── routes/                 # Express API routes
│   │   ├── app.js                  # Express application setup
│   │   └── server.js               # Server listener (Port 5000)
│   ├── package.json
│   └── seed.js                     # Sample database seeder
│
├── package.json                     # Root orchestrator scripts
└── README.md                        # Master Project Documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (Local instance on `mongodb://127.0.0.1:27017` or MongoDB Atlas cloud URI)

---

### Step 1: Install Dependencies
From the project root:
```bash
npm run install-all
```
*(Or install manually: `cd backend && npm install` and `cd ../frontend && npm install`)*

---

### Step 2: Configure Environment Variables

**Backend (`backend/.env`):**
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/student-portal
JWT_SECRET=skillsync_jwt_super_secret_key_2026
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:3000
```

**Frontend (`frontend/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
```

---

### Step 3: Run Both Servers Concurrently
From the root directory:
```bash
npm run dev
```
- **Frontend App**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **API Documentation**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## 🔑 Default Test Accounts

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@example.com` | `admin123` |
| **Student** | `student@example.com` | `student123` |
| **Student 2** | `john@student.com` | `student123` |

---

## 🌐 API Reference Overview

### Coding Sheets API
- `GET /api/coding-sheets` — Get list of all coding sheets & metadata
- `GET /api/coding-sheets/:sheetId/progress` — Get user's solved problems, stars, and notes
- `POST /api/coding-sheets/:sheetId/progress` — Save user's solved problems, bookmarks, and notes

### Courses & Learning API
- `GET /api/courses` — List all courses
- `GET /api/courses/:id` — Get single course details with module syllabus
- `POST /api/progress/:lessonId/complete` — Mark lesson as completed
- `POST /api/quizzes/:id/submit` — Submit quiz assessment
- `GET /api/certificates` — Fetch user's earned certificates

### Authentication API
- `POST /api/auth/register` — Register a new student/admin account
- `POST /api/auth/login` — Sign in and receive JWT token
- `GET /api/auth/profile` — Get authenticated user profile

---

## 📜 Available NPM Scripts

### Root Directory
- `npm run dev` — Starts frontend and backend concurrently
- `npm run install-all` — Installs dependencies for both frontend and backend
- `npm run backend` — Starts only the backend dev server
- `npm run frontend` — Starts only the frontend dev server
- `npm run build-frontend` — Builds production bundle of frontend

### Backend Directory (`cd backend`)
- `npm run dev` — Starts backend with nodemon hot-reload
- `npm start` — Starts backend in production mode
- `npm run seed` — Seeds sample courses, quizzes, and users

### Frontend Directory (`cd frontend`)
- `npm run dev` — Starts Vite dev server on port 3000
- `npm run build` — Generates production bundle in `dist/`
- `npm run preview` — Previews production build locally

---

## 📄 License
This project is licensed under the MIT License.
