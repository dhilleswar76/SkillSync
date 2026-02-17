import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const [courseRes, lessonsRes] = await Promise.all([
        API.get(`/courses/${id}`),
        API.get(`/lessons/course/${id}`),
      ]);
      
      setCourse(courseRes.data);
      setLessons(lessonsRes.data);
      
      // Check if user is enrolled
      const enrolledRes = await API.get('/progress/enrolled-courses');
      setEnrolled(enrolledRes.data.some(c => c._id === id));
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching course details:', error);
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    try {
      await API.post(`/progress/enroll/${id}`);
      setEnrolled(true);
      alert('Successfully enrolled in the course!');
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert(error.response?.data?.message || 'Failed to enroll in course');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Course not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Course Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-lg mb-4">{course.description}</p>
          <div className="flex items-center space-x-4">
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded">
              {lessons.length} Lessons
            </span>
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded">
              {course.level || 'All Levels'}
            </span>
          </div>
        </div>

        {/* Course Content */}
        <div className="p-8">
          {!enrolled && (
            <div className="mb-6">
              <button
                onClick={handleEnroll}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
              >
                Enroll in this Course
              </button>
            </div>
          )}

          {/* Lessons List */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Course Content</h2>
            <div className="space-y-3">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson._id}
                  className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                  onClick={() => enrolled && navigate(`/lessons/${lesson._id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold">{lesson.title}</h3>
                        {lesson.description && (
                          <p className="text-sm text-gray-600">{lesson.description}</p>
                        )}
                      </div>
                    </div>
                    {!enrolled && (
                      <span className="text-gray-400 text-sm">🔒 Locked</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
