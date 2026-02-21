import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import ProgressBar from "../components/ProgressBar";
import { AuthContext } from "../context/AuthContext";

const MyProgress = () => {
  const { user } = useContext(AuthContext);
  const [progressData, setProgressData] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    inProgressCourses: 0,
    averageProgress: 0,
  });
  const [loading, setLoading] = useState(true);

  // Course data matching CourseView
  const courseData = {
    'dsa-fundamentals': {
      title: 'Data Structures & Algorithms Fundamentals',
      totalTopics: 9, // 3+3+3
      totalModules: 3,
      icon: '🎯',
    },
    'react-mastery': {
      title: 'React.js Complete Guide',
      totalTopics: 4, // 2+2
      totalModules: 2,
      icon: '⚛️',
    },
  };

  useEffect(() => {
    const calculateProgress = () => {
      try {
        // Get enrolled courses
        const enrolledCourseIds = user?.enrolledCourses || [];
        
        // Calculate progress for each enrolled course
        const progressArray = enrolledCourseIds.map(courseId => {
          const course = courseData[courseId];
          if (!course) return null;

          // Get completed topics from localStorage (would be from backend in production)
          const completedTopicsKey = `completedTopics_${courseId}`;
          const completedTopics = JSON.parse(localStorage.getItem(completedTopicsKey) || '[]');
          
          // Get quiz scores from localStorage
          const quizScoresKey = `quizScores_${courseId}`;
          const quizScores = JSON.parse(localStorage.getItem(quizScoresKey) || '{}');
          const completedQuizzes = Object.keys(quizScores).length;
          
          // Calculate progress percentage
          const topicProgress = course.totalTopics > 0 
            ? (completedTopics.length / course.totalTopics) * 100 
            : 0;
          
          return {
            _id: courseId,
            courseId: courseId,
            courseName: course.title,
            icon: course.icon,
            totalTopics: course.totalTopics,
            completedTopics: completedTopics.length,
            totalModules: course.totalModules,
            completedQuizzes: completedQuizzes,
            progress: Math.round(topicProgress),
          };
        }).filter(Boolean);
        
        setProgressData(progressArray);
        
        // Calculate stats
        const total = progressArray.length;
        const completed = progressArray.filter(p => p.progress >= 100).length;
        const inProgress = progressArray.filter(p => p.progress > 0 && p.progress < 100).length;
        const avgProgress = total > 0 
          ? progressArray.reduce((sum, p) => sum + (p.progress || 0), 0) / total 
          : 0;
        
        setStats({
          totalCourses: total,
          completedCourses: completed,
          inProgressCourses: inProgress,
          averageProgress: Math.round(avgProgress),
        });
      } catch (error) {
        console.error("Error calculating progress:", error);
      } finally {
        setLoading(false);
      }
    };

    calculateProgress();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          📊 My Learning Progress
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your learning journey and achievements
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg text-white">
          <div className="text-3xl font-bold mb-1">{stats.totalCourses}</div>
          <div className="text-blue-100 text-sm">Total Courses</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-lg text-white">
          <div className="text-3xl font-bold mb-1">{stats.completedCourses}</div>
          <div className="text-green-100 text-sm">Completed</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl shadow-lg text-white">
          <div className="text-3xl font-bold mb-1">{stats.inProgressCourses}</div>
          <div className="text-orange-100 text-sm">In Progress</div>
        </div>

        <div className="bg-gradient-to-br from-primary to-accent-coral p-6 rounded-2xl shadow-lg text-white">
          <div className="text-3xl font-bold mb-1">{stats.averageProgress}%</div>
          <div className="text-red-100 text-sm">Average Progress</div>
        </div>
      </div>

      {/* Progress List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Course Progress Details
          </h2>
        </div>

        {progressData.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
              No courses enrolled yet
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mb-6">
              Start learning by enrolling in courses from our catalog
            </p>
            <Link
              to="/all-courses"
              className="inline-block px-6 py-3 bg-gradient-to-r from-primary to-coral text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition"
            >
              Browse All Courses →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {progressData.map((item) => (
              <Link
                key={item._id}
                to={`/course/${item.courseId}`}
                className="block p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        {item.courseName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.completedTopics} of {item.totalTopics} topics completed • {item.completedQuizzes}/{item.totalModules} quizzes done
                      </p>
                    </div>
                  </div>
                  {item.progress >= 100 ? (
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-semibold rounded-full">
                      ✓ Completed
                    </span>
                  ) : item.progress > 0 ? (
                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-semibold rounded-full">
                      In Progress
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full">
                      Not Started
                    </span>
                  )}
                </div>
                <ProgressBar value={item.progress || 0} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProgress;
