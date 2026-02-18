import { useEffect, useState } from "react";
import axios from "../api/axios";
import CourseCard from "../components/CourseCard";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get("/courses");
      setCourses(res.data);
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        My Courses
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
