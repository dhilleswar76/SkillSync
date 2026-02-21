import { useState, useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from '../api/axios';

const CourseView = () => {
  const { courseId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(null);
  const [completedTopics, setCompletedTopics] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizModule, setQuizModule] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizScores, setQuizScores] = useState({});

  // Course data with modules, topics, and resources
  const courseData = {
    'dsa-fundamentals': {
      title: 'Data Structures & Algorithms Fundamentals',
      description: 'Master the fundamentals of DSA from scratch with comprehensive theory, videos, and practice',
      level: 'Beginner',
      duration: '8 weeks',
      totalScore: 600,
      passingScore: 400,
      instructor: 'Dr. Sarah Johnson',
      rating: 4.8,
      enrolled: 2500,
      image: '🎯',
      syllabus: [
        { week: 1, title: 'Introduction to Arrays', topics: ['Array Basics', 'Array Operations', 'Multi-dimensional Arrays'] },
        { week: 2, title: 'Linked Lists', topics: ['Singly Linked List', 'Doubly Linked List', 'Circular Linked List'] },
        { week: 3, title: 'Stacks and Queues', topics: ['Stack Implementation', 'Queue Implementation', 'Applications'] },
        { week: 4, title: 'Sorting Algorithms', topics: ['Bubble Sort', 'Merge Sort', 'Quick Sort'] },
        { week: 5, title: 'Searching Algorithms', topics: ['Linear Search', 'Binary Search', 'Search Optimization'] },
        { week: 6, title: 'Recursion', topics: ['Recursion Basics', 'Backtracking', 'Divide and Conquer'] },
      ],
      modules: [
        {
          id: 1,
          title: 'Introduction to Arrays',
          duration: '1 week',
          topics: [
            {
              id: 'arrays-1',
              name: 'Array Basics & Declaration',
              theory: {
                title: 'Array Fundamentals - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/array-data-structure/',
              },
              video: {
                title: 'Arrays Introduction - freeCodeCamp',
                url: 'https://www.youtube.com/watch?v=rZ41y93P2Qo',
                channel: 'freeCodeCamp',
              },
            },
            {
              id: 'arrays-2',
              name: 'Array Operations & Traversal',
              theory: {
                title: 'Array Operations - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/array-operations/',
              },
              video: {
                title: 'Array Manipulation - CS Dojo',
                url: 'https://www.youtube.com/watch?v=QJqt3M8fMWs',
                channel: 'CS Dojo',
              },
            },
            {
              id: 'arrays-3',
              name: 'Multi-dimensional Arrays',
              theory: {
                title: 'Multi-dimensional Arrays - Programiz',
                url: 'https://www.programiz.com/c-programming/c-multi-dimensional-arrays',
              },
              video: {
                title: '2D Arrays Explained - Abdul Bari',
                url: 'https://www.youtube.com/watch?v=6c4rcvSPPTY',
                channel: 'Abdul Bari',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What is the time complexity of accessing an element in an array?',
                options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
                correct: 0,
              },
              {
                question: 'Which of the following is true about arrays?',
                options: [
                  'Arrays can grow dynamically',
                  'Arrays store elements of different data types',
                  'Arrays store elements in contiguous memory',
                  'Arrays have O(1) insertion at any position',
                ],
                correct: 2,
              },
            ],
          },
        },
        {
          id: 2,
          title: 'Linked Lists',
          duration: '1.5 weeks',
          topics: [
            {
              id: 'll-1',
              name: 'Introduction to Linked Lists',
              theory: {
                title: 'Linked List Data Structure - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/data-structures/linked-list/',
              },
              video: {
                title: 'Linked List Complete Tutorial - mycodeschool',
                url: 'https://www.youtube.com/watch?v=92S4zgXN17o',
                channel: 'mycodeschool',
              },
            },
            {
              id: 'll-2',
              name: 'Singly Linked List Operations',
              theory: {
                title: 'Linked List Insertion & Deletion - GFG',
                url: 'https://www.geeksforgeeks.org/linked-list-set-2-inserting-a-node/',
              },
              video: {
                title: 'Linked List Operations - Jenny\'s Lectures',
                url: 'https://www.youtube.com/watch?v=NobHlGUjV3g',
                channel: 'Jenny\'s Lectures',
              },
            },
            {
              id: 'll-3',
              name: 'Doubly & Circular Linked Lists',
              theory: {
                title: 'Doubly Linked List - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/doubly-linked-list/',
              },
              video: {
                title: 'Doubly Linked List Tutorial - Abdul Bari',
                url: 'https://www.youtube.com/watch?v=2OvFOPcC_J8',
                channel: 'Abdul Bari',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What is the time complexity of insertion at the beginning of a linked list?',
                options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
                correct: 0,
              },
              {
                question: 'Which pointer is NULL in a singly linked list?',
                options: ['First node\'s previous', 'Last node\'s next', 'Middle node\'s next', 'All nodes\' previous'],
                correct: 1,
              },
            ],
          },
        },
        {
          id: 3,
          title: 'Stacks and Queues',
          duration: '1 week',
          topics: [
            {
              id: 'sq-1',
              name: 'Stack Data Structure',
              theory: {
                title: 'Stack Data Structure - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/stack-data-structure/',
              },
              video: {
                title: 'Stack Implementation - mycodeschool',
                url: 'https://www.youtube.com/watch?v=F1F2imiOJfk',
                channel: 'mycodeschool',
              },
            },
            {
              id: 'sq-2',
              name: 'Queue Data Structure',
              theory: {
                title: 'Queue Data Structure - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/queue-data-structure/',
              },
              video: {
                title: 'Queue Complete Tutorial - Abdul Bari',
                url: 'https://www.youtube.com/watch?v=XuCbpw6Bj1U',
                channel: 'Abdul Bari',
              },
            },
            {
              id: 'sq-3',
              name: 'Applications of Stacks & Queues',
              theory: {
                title: 'Stack Applications - Programiz',
                url: 'https://www.programiz.com/dsa/stack',
              },
              video: {
                title: 'Real-world Applications - Jenny\'s Lectures',
                url: 'https://www.youtube.com/watch?v=sFVxsglODoo',
                channel: 'Jenny\'s Lectures',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What principle does a stack follow?',
                options: ['FIFO', 'LIFO', 'Random Access', 'Priority-based'],
                correct: 1,
              },
              {
                question: 'Which data structure is used in BFS?',
                options: ['Stack', 'Queue', 'Heap', 'Tree'],
                correct: 1,
              },
            ],
          },
        },
      ],
    },
    'react-mastery': {
      title: 'React.js Complete Guide',
      description: 'Master React from basics to advanced hooks and state management',
      level: 'Intermediate',
      duration: '8 weeks',
      totalScore: 700,
      passingScore: 450,
      instructor: 'John Smith',
      rating: 4.9,
      enrolled: 2100,
      image: '⚛️',
      syllabus: [
        { week: 1, title: 'React Fundamentals', topics: ['JSX', 'Components', 'Props'] },
        { week: 2, title: 'State Management', topics: ['useState', 'Component State', 'State Lifting'] },
        { week: 3, title: 'React Hooks', topics: ['useEffect', 'useContext', 'useRef'] },
        { week: 4, title: 'Advanced Hooks', topics: ['useReducer', 'useMemo', 'useCallback'] },
        { week: 5, title: 'Routing', topics: ['React Router', 'Navigation', 'Protected Routes'] },
        { week: 6, title: 'API Integration', topics: ['Fetch API', 'Axios', 'Error Handling'] },
      ],
      modules: [
        {
          id: 1,
          title: 'React Fundamentals',
          duration: '1 week',
          topics: [
            {
              id: 'react-1',
              name: 'React Introduction & JSX',
              theory: {
                title: 'React Official Documentation',
                url: 'https://react.dev/learn',
              },
              video: {
                title: 'React Tutorial for Beginners - Traversy Media',
                url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
                channel: 'Traversy Media',
              },
            },
            {
              id: 'react-2',
              name: 'Components & Props',
              theory: {
                title: 'Components and Props - React Docs',
                url: 'https://react.dev/learn/your-first-component',
              },
              video: {
                title: 'React Components - Codevolution',
                url: 'https://www.youtube.com/watch?v=Y2hgEGPzTZY',
                channel: 'Codevolution',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What is JSX?',
                options: [
                  'JavaScript XML',
                  'Java Syntax Extension',
                  'JSON XML',
                  'JavaScript Export',
                ],
                correct: 0,
              },
            ],
          },
        },
        {
          id: 2,
          title: 'State and Lifecycle',
          duration: '1.5 weeks',
          topics: [
            {
              id: 'react-3',
              name: 'State Management',
              theory: {
                title: 'State: A Component\'s Memory - React',
                url: 'https://react.dev/learn/state-a-components-memory',
              },
              video: {
                title: 'React State Tutorial - Web Dev Simplified',
                url: 'https://www.youtube.com/watch?v=O6P86uwfdR0',
                channel: 'Web Dev Simplified',
              },
            },
            {
              id: 'react-4',
              name: 'React Hooks (useState, useEffect)',
              theory: {
                title: 'Hooks at a Glance - React Docs',
                url: 'https://react.dev/reference/react',
              },
              video: {
                title: 'React Hooks Course - freeCodeCamp',
                url: 'https://www.youtube.com/watch?v=TNhaISOUy6Q',
                channel: 'freeCodeCamp',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'Which hook is used for side effects?',
                options: ['useState', 'useEffect', 'useContext', 'useReducer'],
                correct: 1,
              },
            ],
          },
        },
      ],
    },
  };

  const course = courseData[courseId];

  // Check enrollment status and load progress
  useEffect(() => {
    const checkEnrollment = async () => {
      try {
        if (user && user.enrolledCourses) {
          // Check if course is in user's enrolled courses
          const enrolled = user.enrolledCourses.some(c => {
            // Handle both string IDs and object references
            const courseIdToCheck = typeof c === 'string' ? c : c._id;
            return courseIdToCheck === courseId || courseIdToCheck === course?.title;
          });
          setIsEnrolled(enrolled);
          
          // Load saved progress from localStorage
          if (enrolled) {
            const savedTopics = localStorage.getItem(`completedTopics_${courseId}`);
            const savedScores = localStorage.getItem(`quizScores_${courseId}`);
            
            if (savedTopics) {
              setCompletedTopics(JSON.parse(savedTopics));
            }
            if (savedScores) {
              setQuizScores(JSON.parse(savedScores));
            }
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error checking enrollment:', error);
        setLoading(false);
      }
    };

    if (course) {
      checkEnrollment();
    } else {
      setLoading(false);
    }
  }, [user, courseId, course]);

  // Handle enrollment
  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setEnrolling(true);
    try {
      // In a real app, this would call the backend API
      // await axios.post(`/courses/enroll/${courseId}`);
      
      // For now, update locally
      const updatedUser = {
        ...user,
        enrolledCourses: [...(user.enrolledCourses || []), courseId]
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsEnrolled(true);
      
      // Show success message
      alert('Successfully enrolled in the course!');
    } catch (error) {
      console.error('Error enrolling:', error);
      alert('Failed to enroll. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  const handleTopicComplete = (topicId) => {
    let updatedTopics;
    if (!completedTopics.includes(topicId)) {
      updatedTopics = [...completedTopics, topicId];
      setCompletedTopics(updatedTopics);
    } else {
      updatedTopics = completedTopics.filter(id => id !== topicId);
      setCompletedTopics(updatedTopics);
    }
    // Save to localStorage
    localStorage.setItem(`completedTopics_${courseId}`, JSON.stringify(updatedTopics));
  };

  const startQuiz = (moduleId) => {
    setQuizModule(moduleId);
    setShowQuiz(true);
  };

  const handleQuizComplete = (moduleId, score) => {
    const updatedScores = { ...quizScores, [moduleId]: score };
    setQuizScores(updatedScores);
    // Save to localStorage
    localStorage.setItem(`quizScores_${courseId}`, JSON.stringify(updatedScores));
    setShowQuiz(false);
  };

  const calculateProgress = () => {
    if (!course) return 0;
    const totalTopics = course.modules.reduce((acc, module) => acc + module.topics.length, 0);
    return totalTopics > 0 ? Math.round((completedTopics.length / totalTopics) * 100) : 0;
  };

  const getTotalScore = () => {
    const scores = Object.values(quizScores);
    return scores.reduce((acc, score) => acc + score, 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <span className="text-6xl mb-4 block">📚</span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Course Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The course you're looking for doesn't exist.</p>
          <Link to="/all-courses" className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition">
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-coral to-secondary py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <Link to="/all-courses" className="text-white/90 hover:text-white mb-4 inline-flex items-center gap-2">
            <span>←</span> Back to All Courses
          </Link>
          
          <div className="flex items-start justify-between gap-8 mt-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-5xl">{course.image}</span>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{course.title}</h1>
                  <p className="text-white/90 text-lg">{course.description}</p>
                </div>
              </div>
              
              <div className="flex gap-4 flex-wrap mb-6">
                <span className="px-4 py-2 bg-white/20 text-white rounded-lg font-semibold">⏱️ {course.duration}</span>
                <span className="px-4 py-2 bg-white/20 text-white rounded-lg font-semibold">📊 {course.level}</span>
                <span className="px-4 py-2 bg-white/20 text-white rounded-lg font-semibold">⭐ {course.rating}/5.0</span>
                <span className="px-4 py-2 bg-white/20 text-white rounded-lg font-semibold">👥 {course.enrolled.toLocaleString()} enrolled</span>
              </div>

              <div className="flex items-center gap-3 text-white/90">
                <span className="text-sm">👨‍🏫 Instructor: {course.instructor}</span>
              </div>
            </div>

            {!isEnrolled && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl min-w-[280px]">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Enroll Now</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Get lifetime access to this course</p>
                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="w-full px-6 py-4 bg-gradient-to-r from-primary to-coral text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {enrolling ? 'Enrolling...' : 'Enroll for Free'}
                  </button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">✓ Lifetime access • ✓ Certificate • ✓ Free updates</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl py-12">
        {/* Course Overview & Syllabus */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Week-wise Syllabus */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📋 Course Syllabus</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
              {course.syllabus.map((week, index) => (
                <div key={index} className="p-6 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-coral rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      W{week.week}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{week.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {week.topics.map((topic, idx) => (
                          <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Stats */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📊 Course Stats</h2>
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{course.modules.length}</div>
                  <div className="text-gray-600 dark:text-gray-400">Total Modules</div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {course.modules.reduce((acc, m) => acc + m.topics.length, 0)}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Total Topics</div>
                </div>
              </div>

              {isEnrolled && (
                <>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">{calculateProgress()}%</div>
                      <div className="text-gray-600 dark:text-gray-400">Completed</div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-coral mb-2">{getTotalScore()}</div>
                      <div className="text-gray-600 dark:text-gray-400">Quiz Score</div>
                    </div>
                  </div>
                </>
              )}

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                <div className="text-center">
                  <span className="text-3xl mb-2 block">🎓</span>
                  <div className="text-sm text-gray-700 dark:text-gray-300 font-semibold">
                    Get certified after scoring {course.passingScore}/{course.totalScore}+
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content - Only show if enrolled */}
        {!isEnrolled ? (
          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-12 text-center border border-orange-200 dark:border-orange-800">
            <span className="text-6xl mb-4 block">🔒</span>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Enroll to Access Course Content</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Get instant access to all modules, video lessons, theory resources, quizzes, and certificate upon completion.
            </p>
            <button
              onClick={handleEnroll}
              disabled={enrolling}
              className="px-8 py-4 bg-gradient-to-r from-primary to-coral text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {enrolling ? 'Enrolling...' : 'Enroll Now - It\'s Free!'}
            </button>
          </div>
        ) : (
          <>
            {/* Progress Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Your Progress</h3>
                <span className="text-2xl font-bold text-primary">{calculateProgress()}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-coral transition-all duration-500"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {completedTopics.length} of {course.modules.reduce((acc, m) => acc + m.topics.length, 0)} topics completed
              </p>
            </div>

            {/* Modules */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📚 Course Modules</h2>
            <div className="space-y-6">
              {course.modules.map((module) => (
                <div
                  key={module.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
                >
                  {/* Module Header */}
                  <button
                    onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-coral rounded-lg flex items-center justify-center text-white font-bold">
                        {module.id}
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{module.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">⏱️ {module.duration} • {module.topics.length} topics</p>
                      </div>
                    </div>
                    <span className="text-2xl text-gray-400">
                      {activeModule === module.id ? '▲' : '▼'}
                    </span>
                  </button>

                  {/* Module Content */}
                  {activeModule === module.id && (
                    <div className="px-6 pb-6">
                      <div className="space-y-6 pt-4">
                        {module.topics.map((topic, topicIndex) => (
                          <div
                            key={topic.id}
                            className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                {topicIndex + 1}. {topic.name}
                              </h4>
                              <input
                                type="checkbox"
                                checked={completedTopics.includes(topic.id)}
                                onChange={() => handleTopicComplete(topic.id)}
                                className="w-5 h-5 text-primary rounded cursor-pointer"
                              />
                            </div>

                            {/* Theory Resource */}
                            <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl">📚</span>
                                <h5 className="font-semibold text-gray-900 dark:text-white">Theory Resource</h5>
                              </div>
                              <a
                                href={topic.theory.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary-dark font-medium flex items-center gap-2 hover:underline"
                              >
                                {topic.theory.title} <span>→</span>
                              </a>
                            </div>

                            {/* Video Resource */}
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl">🎥</span>
                                <h5 className="font-semibold text-gray-900 dark:text-white">Video Resource</h5>
                              </div>
                              <a
                                href={topic.video.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary-dark font-medium hover:underline"
                              >
                                <div className="flex items-center gap-2">
                                  {topic.video.title}
                                  <span className="text-sm text-gray-600 dark:text-gray-400">by {topic.video.channel}</span>
                                  <span>→</span>
                                </div>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Quiz Button */}
                      <div className="pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                        <button
                          onClick={() => startQuiz(module.id)}
                          className="w-full px-6 py-4 bg-gradient-to-r from-primary to-coral text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
                        >
                          🎯 Take Module Quiz ({module.quiz.questions.length} questions)
                          {quizScores[module.id] !== undefined && (
                            <span className="ml-2 px-3 py-1 bg-white/20 rounded-full text-sm">
                              Score: {quizScores[module.id]}/{module.quiz.questions.length}
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Certificate Section */}
            {calculateProgress() === 100 && getTotalScore() >= course.passingScore && (
              <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-8 border border-green-200 dark:border-green-800">
                <div className="text-center">
                  <span className="text-6xl mb-4 block">🎓</span>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    Congratulations! Course Completed!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    You've completed all topics and passed with a score of {getTotalScore()}/{course.totalScore}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
                    Passing score: {course.passingScore}/{course.totalScore}
                  </p>
                  <Link
                    to="/certificates"
                    className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-coral text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition"
                  >
                    View Your Certificate →
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <QuizModal
          module={course.modules.find(m => m.id === quizModule)}
          onClose={() => setShowQuiz(false)}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
};

// Quiz Modal Component
const QuizModal = ({ module, onClose, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = () => {
    const isCorrect = selectedAnswer === module.quiz.questions[currentQuestion].correct;
    setAnswers([...answers, { question: currentQuestion, correct: isCorrect }]);
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < module.quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleClose = () => {
    if (showResult) {
      onComplete(module.id, score);
    }
    onClose();
  };

  const percentage = Math.round((score / module.quiz.questions.length) * 100);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
        {!showResult ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {module.title} - Quiz
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Question {currentQuestion + 1} of {module.quiz.questions.length}
              </p>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {module.quiz.questions[currentQuestion].question}
              </h4>

              <div className="space-y-3">
                {module.quiz.questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAnswer(index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition ${
                      selectedAnswer === index
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                    }`}
                  >
                    <span className="text-gray-900 dark:text-white font-medium">{option}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAnswer}
              disabled={selectedAnswer === null}
              className="w-full px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {currentQuestion + 1 === module.quiz.questions.length ? 'Finish Quiz' : 'Next Question'}
            </button>
          </>
        ) : (
          <div className="text-center">
            <span className="text-6xl mb-4 block">
              {percentage >= 70 ? '🎉' : percentage >= 50 ? '👍' : '📚'}
            </span>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Quiz Completed!
            </h3>
            <p className="text-4xl font-bold text-primary mb-4">
              {score}/{module.quiz.questions.length}
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              {percentage}% Score
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {percentage >= 70
                ? '🎓 Excellent! You\'ve mastered this module!'
                : percentage >= 50
                ? '✨ Good job! Review the topics and try again!'
                : '📖 Keep learning! Review the resources and retake the quiz.'}
            </p>
            <button
              onClick={handleClose}
              className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold transition"
            >
              Continue Learning
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseView;
