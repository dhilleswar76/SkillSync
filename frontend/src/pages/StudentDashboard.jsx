import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import CourseCard from "../components/CourseCard";
import { AuthContext } from "../context/AuthContext";

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // All available courses (matching CourseView data)
  const allAvailableCourses = [
    {
      id: 'dsa-fundamentals',
      title: 'Data Structures & Algorithms Fundamentals',
      description: 'Master the fundamentals of DSA from scratch',
      level: 'Beginner',
      duration: '8 weeks',
      icon: '🎯',
      modules: 6,
      enrolled: 2500,
      rating: 4.8,
      quickLinks: [
        { name: 'Arrays', theory: 'https://www.geeksforgeeks.org/array-data-structure/', video: 'https://www.youtube.com/watch?v=rZ41y93P2Qo' },
        { name: 'Linked Lists', theory: 'https://www.geeksforgeeks.org/data-structures/linked-list/', video: 'https://www.youtube.com/watch?v=92S4zgXN17o' },
        { name: 'Stacks & Queues', theory: 'https://www.geeksforgeeks.org/stack-data-structure/', video: 'https://www.youtube.com/watch?v=F1F2imiOJfk' },
      ]
    },
    {
      id: 'react-mastery',
      title: 'React.js Complete Guide',
      description: 'Master React from basics to advanced hooks',
      level: 'Intermediate',
      duration: '8 weeks',
      icon: '⚛️',
      modules: 6,
      enrolled: 2100,
      rating: 4.9,
      quickLinks: [
        { name: 'React Basics', theory: 'https://react.dev/learn', video: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8' },
        { name: 'State & Hooks', theory: 'https://react.dev/learn/state-a-components-memory', video: 'https://www.youtube.com/watch?v=O6P86uwfdR0' },
        { name: 'React Router', theory: 'https://reactrouter.com/en/main', video: 'https://www.youtube.com/watch?v=Ul3y1LXxzdU' },
      ]
    },
  ];

  useEffect(() => {
    const fetchEnrolledCourses = () => {
      try {
        // Get user's enrolled courses
        const enrolledCourseIds = user?.enrolledCourses || [];
        
        // Filter courses to show only enrolled ones
        const enrolledCourses = allAvailableCourses.filter(course => 
          enrolledCourseIds.includes(course.id) || enrolledCourseIds.includes(course.title)
        );
        
        setCourses(enrolledCourses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          My Courses
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Continue your learning journey
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-12 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No Enrolled Courses
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You haven't enrolled in any courses yet. Browse our course catalog and start learning!
          </p>
          <Link
            to="/all-courses"
            className="inline-block px-6 py-3 bg-gradient-to-r from-primary to-coral text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition"
          >
            Browse All Courses →
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              {/* Course Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{course.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {course.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      course.level === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                      course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {course.description}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <span>⏱️ {course.duration}</span>
                <span>📝 {course.modules} modules</span>
                <span>⭐ {course.rating}</span>
              </div>

              {/* Quick Access Links */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Access:</h4>
                <div className="space-y-2">
                  {course.quickLinks.map((link, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <span className="text-sm font-medium text-gray-900 dark:text-white flex-1">{link.name}</span>
                      <a
                        href={link.theory}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
                      >
                        📚 Theory
                      </a>
                      <a
                        href={link.video}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded text-xs font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition"
                      >
                        🎥 Video
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Course Button */}
              <Link
                to={`/course/${course.id}`}
                className="block w-full px-4 py-3 bg-gradient-to-r from-primary to-coral text-white rounded-lg text-center font-bold shadow-md hover:shadow-xl transition"
              >
                View Full Course →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
