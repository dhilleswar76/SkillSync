import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import CourseCard from '../components/CourseCard';
import { useAuth } from '../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const [coursesRes, enrolledRes] = await Promise.all([
        API.get('/courses'),
        API.get('/progress/enrolled-courses'),
      ]);
      
      setCourses(coursesRes.data);
      setEnrolledCourses(enrolledRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name}!</h1>
      
      {/* Enrolled Courses Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">My Courses</h2>
        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <CourseCard key={course._id} course={course} enrolled={true} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">You haven't enrolled in any courses yet.</p>
        )}
      </section>

      {/* Available Courses Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Available Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses
            .filter((course) => !enrolledCourses.find((ec) => ec._id === course._id))
            .map((course) => (
              <CourseCard key={course._id} course={course} enrolled={false} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
