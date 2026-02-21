import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import CourseDetails from "./pages/CourseDetails";
import LessonView from "./pages/LessonView";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import MyProgress from "./pages/MyProgress";
import Certificates from "./pages/Certificates";
import CodePractice from "./pages/CodePractice";
import CodingSheets from "./pages/CodingSheets";

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/lesson/:id" element={<LessonView />} />
            <Route path="/progress" element={<MyProgress />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/practice" element={<CodePractice />} />
            <Route path="/sheets" element={<CodingSheets />} />
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
