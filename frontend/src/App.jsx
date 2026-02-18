import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import CourseDetails from "./pages/CourseDetails";
import LessonView from "./pages/LessonView";
import AdminDashboard from "./pages/AdminDashboard";

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
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
