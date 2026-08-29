import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import LessonView from "./pages/LessonView";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import MyProgress from "./pages/MyProgress";
import Certificates from "./pages/Certificates";
import CodePractice from "./pages/CodePractice";
import CodingSheets from "./pages/CodingSheets";
import SuggestedSheets from "./pages/SuggestedSheets";
import Roadmaps from "./pages/Roadmaps";
import AllCourses from "./pages/AllCourses";
import CourseView from "./pages/CourseView";

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/all-courses" element={<AllCourses />} />
          <Route path="/course/:courseId" element={<CourseView />} />
          <Route path="/sheets" element={<CodingSheets />} />
          <Route path="/suggested-sheets" element={<SuggestedSheets />} />
          <Route path="/all-sheets" element={<SuggestedSheets />} />
          <Route path="/roadmaps" element={<Roadmaps />} />
          <Route path="/practice" element={<CodePractice />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/lesson/:id" element={<LessonView />} />
            <Route path="/progress" element={<MyProgress />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/profile" element={<Profile />} />
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
