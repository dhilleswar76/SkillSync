import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AllCourses = () => {
  const { user } = useContext(AuthContext);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const courses = [
    // DSA Courses
    {
      id: 'dsa-fundamentals',
      title: 'Data Structures & Algorithms Fundamentals',
      category: 'dsa',
      level: 'Beginner',
      duration: '8 weeks',
      modules: 6,
      enrolled: 2500,
      rating: 4.8,
      icon: '🎯',
      description: 'Master the fundamentals of DSA from scratch',
      topics: ['Arrays', 'Linked Lists', 'Stacks & Queues', 'Sorting', 'Searching', 'Recursion'],
    },
    {
      id: 'advanced-dsa',
      title: 'Advanced Data Structures',
      category: 'dsa',
      level: 'Advanced',
      duration: '10 weeks',
      modules: 8,
      enrolled: 1800,
      rating: 4.9,
      icon: '🚀',
      description: 'Deep dive into trees, graphs, and advanced algorithms',
      topics: ['Trees & BST', 'Graphs', 'Dynamic Programming', 'Greedy', 'Heaps', 'Tries'],
    },
    // Web Development Courses
    {
      id: 'html-css-js',
      title: 'HTML, CSS & JavaScript Essentials',
      category: 'webdev',
      level: 'Beginner',
      duration: '6 weeks',
      modules: 5,
      enrolled: 3200,
      rating: 4.7,
      icon: '🌐',
      description: 'Build responsive websites from scratch',
      topics: ['HTML5', 'CSS3 & Flexbox', 'JavaScript Basics', 'DOM', 'Responsive Design'],
    },
    {
      id: 'react-mastery',
      title: 'React.js Complete Guide',
      category: 'webdev',
      level: 'Intermediate',
      duration: '8 weeks',
      modules: 7,
      enrolled: 2900,
      rating: 4.9,
      icon: '⚛️',
      description: 'Master React from hooks to advanced patterns',
      topics: ['Components', 'Hooks', 'State Management', 'React Router', 'Redux', 'Performance'],
    },
    {
      id: 'mern-fullstack',
      title: 'MERN Stack Development',
      category: 'webdev',
      level: 'Advanced',
      duration: '12 weeks',
      modules: 10,
      enrolled: 2100,
      rating: 4.8,
      icon: '🔥',
      description: 'Build full-stack applications with MERN',
      topics: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs', 'Authentication'],
    },
    // Machine Learning Courses
    {
      id: 'ml-basics',
      title: 'Machine Learning Fundamentals',
      category: 'ml',
      level: 'Intermediate',
      duration: '10 weeks',
      modules: 8,
      enrolled: 1900,
      rating: 4.7,
      icon: '🤖',
      description: 'Learn ML algorithms and implementations',
      topics: ['Supervised Learning', 'Regression', 'Classification', 'Clustering', 'Model Evaluation'],
    },
    {
      id: 'deep-learning',
      title: 'Deep Learning with TensorFlow',
      category: 'ml',
      level: 'Advanced',
      duration: '12 weeks',
      modules: 10,
      enrolled: 1500,
      rating: 4.9,
      icon: '🧠',
      description: 'Master neural networks and deep learning',
      topics: ['Neural Networks', 'CNNs', 'RNNs', 'Transfer Learning', 'TensorFlow', 'Keras'],
    },
    {
      id: 'nlp-course',
      title: 'Natural Language Processing',
      category: 'ml',
      level: 'Advanced',
      duration: '10 weeks',
      modules: 8,
      enrolled: 1200,
      rating: 4.8,
      icon: '💬',
      description: 'Process and understand human language with AI',
      topics: ['Text Processing', 'Word Embeddings', 'Transformers', 'BERT', 'GPT', 'Sentiment Analysis'],
    },
    // CS Fundamentals
    {
      id: 'operating-systems',
      title: 'Operating Systems Complete Course',
      category: 'cs-fundamentals',
      level: 'Intermediate',
      duration: '8 weeks',
      modules: 7,
      enrolled: 2200,
      rating: 4.6,
      icon: '💻',
      description: 'Understand OS internals and concepts',
      topics: ['Process Management', 'Memory Management', 'File Systems', 'CPU Scheduling', 'Deadlocks'],
    },
    {
      id: 'computer-networks',
      title: 'Computer Networks Fundamentals',
      category: 'cs-fundamentals',
      level: 'Intermediate',
      duration: '8 weeks',
      modules: 7,
      enrolled: 2400,
      rating: 4.7,
      icon: '🌐',
      description: 'Master networking concepts and protocols',
      topics: ['OSI Model', 'TCP/IP', 'HTTP/HTTPS', 'Routing', 'Network Security', 'DNS'],
    },
    {
      id: 'dbms-course',
      title: 'Database Management Systems',
      category: 'cs-fundamentals',
      level: 'Intermediate',
      duration: '9 weeks',
      modules: 8,
      enrolled: 2600,
      rating: 4.8,
      icon: '🗄️',
      description: 'Learn SQL, NoSQL, and database design',
      topics: ['SQL Queries', 'Normalization', 'Transactions', 'Indexing', 'MongoDB', 'Database Design'],
    },
    {
      id: 'system-design',
      title: 'System Design & Architecture',
      category: 'cs-fundamentals',
      level: 'Advanced',
      duration: '10 weeks',
      modules: 8,
      enrolled: 1700,
      rating: 4.9,
      icon: '🏗️',
      description: 'Design scalable distributed systems',
      topics: ['Scalability', 'Load Balancing', 'Caching', 'Microservices', 'Message Queues', 'CAP Theorem'],
    },
    // Mobile Development
    {
      id: 'react-native',
      title: 'React Native Mobile Development',
      category: 'mobile',
      level: 'Intermediate',
      duration: '8 weeks',
      modules: 7,
      enrolled: 1600,
      rating: 4.7,
      icon: '📱',
      description: 'Build cross-platform mobile apps',
      topics: ['React Native Basics', 'Navigation', 'State Management', 'APIs', 'Native Modules', 'Publishing'],
    },
    {
      id: 'android-kotlin',
      title: 'Android Development with Kotlin',
      category: 'mobile',
      level: 'Intermediate',
      duration: '10 weeks',
      modules: 9,
      enrolled: 1400,
      rating: 4.8,
      icon: '🤖',
      description: 'Create native Android applications',
      topics: ['Kotlin Basics', 'Activities', 'Fragments', 'Room Database', 'Jetpack Compose', 'Material Design'],
    },
    // DevOps
    {
      id: 'devops-basics',
      title: 'DevOps Essentials',
      category: 'devops',
      level: 'Intermediate',
      duration: '8 weeks',
      modules: 7,
      enrolled: 1900,
      rating: 4.7,
      icon: '⚙️',
      description: 'Learn CI/CD, Docker, and Kubernetes',
      topics: ['Git', 'CI/CD', 'Docker', 'Kubernetes', 'Jenkins', 'Monitoring'],
    },
    {
      id: 'aws-cloud',
      title: 'AWS Cloud Computing',
      category: 'devops',
      level: 'Advanced',
      duration: '10 weeks',
      modules: 9,
      enrolled: 1500,
      rating: 4.8,
      icon: '☁️',
      description: 'Master AWS services and cloud architecture',
      topics: ['EC2', 'S3', 'Lambda', 'RDS', 'CloudFormation', 'Security', 'Cost Optimization'],
    },
  ];

  const categories = [
    { id: 'all', label: 'All Courses', icon: '📚' },
    { id: 'dsa', label: 'DSA', icon: '🎯' },
    { id: 'webdev', label: 'Web Dev', icon: '🌐' },
    { id: 'ml', label: 'Machine Learning', icon: '🤖' },
    { id: 'cs-fundamentals', label: 'CS Fundamentals', icon: '📖' },
    { id: 'mobile', label: 'Mobile Dev', icon: '📱' },
    { id: 'devops', label: 'DevOps', icon: '⚙️' },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = filter === 'all' || course.category === filter;
    const matchesSearch = search === '' || 
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'Intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'Advanced':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-coral to-secondary py-8 sm:py-10 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3">📚 All Courses</h1>
          <p className="text-white/90 text-sm sm:text-base md:text-lg">Comprehensive courses to master every domain</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Search Bar */}
        <div className="mb-4 sm:mb-6">
          <input
            type="text"
            placeholder="🔍 Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm text-sm sm:text-base"
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg font-medium transition whitespace-nowrap text-sm sm:text-base ${
                filter === cat.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <span className="mr-1">{cat.icon}</span>
              <span className="hidden sm:inline">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="text-3xl sm:text-4xl">{course.icon}</div>
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                {course.description}
              </p>

              {/* Course Stats */}
              <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 flex-wrap">
                <span>⏱️ {course.duration}</span>
                <span>📝 {course.modules} modules</span>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm mb-3 sm:mb-4 flex-wrap">
                <span className="text-gray-600 dark:text-gray-400">👥 {course.enrolled.toLocaleString()} enrolled</span>
                <span className="text-yellow-600 dark:text-yellow-400">⭐ {course.rating}</span>
              </div>

              {/* Topics Preview */}
              <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                {course.topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                  >
                    {topic}
                  </span>
                ))}
                {course.topics.length > 3 && (
                  <span className="px-2 py-1 text-gray-600 dark:text-gray-400 text-xs">
                    +{course.topics.length - 3} more
                  </span>
                )}
              </div>

              {/* CTA Button */}
              {user ? (
                <Link
                  to={`/course/${course.id}`}
                  className="block w-full px-4 py-2 sm:py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition text-center shadow-md text-sm sm:text-base"
                >
                  View Course →
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="block w-full px-4 py-2 sm:py-2.5 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition text-center shadow-md text-sm sm:text-base"
                >
                  🔒 Login to View
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No courses found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourses;
