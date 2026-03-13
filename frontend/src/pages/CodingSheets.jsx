import { useState, useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CodingSheets = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useContext(AuthContext);
  const [selectedSheet, setSelectedSheet] = useState('dsa');
  const [redirectingSheetId, setRedirectingSheetId] = useState(null);

  const sheetCategories = {
    dsa: {
      name: '💻 DSA Sheets',
      sheets: [
        {
          id: 'striver-sde',
          name: 'Striver\'s SDE Sheet',
          description: '191 handpicked top coding interview problems for product-based companies',
          problems: 191,
          difficulty: 'mixed',
          icon: '🎯',
          color: 'from-primary to-coral',
          source: 'https://takeuforward.org/dsa/strivers-sde-sheet-top-coding-interview-problems',
          categories: ['Arrays', 'Linked List', 'Greedy', 'Recursion', 'Binary Search', 'Heaps', 'Binary Trees', 'BST', 'Graphs', 'Dynamic Programming', 'Stacks & Queues', 'Strings', 'Tries', 'Bit Manipulation'],
        },
        {
          id: 'striver-a2z',
          name: 'Striver A2Z DSA Course',
          description: 'Complete A to Z DSA course from basics to advanced',
          problems: 456,
          difficulty: 'mixed',
          icon: '📚',
          color: 'from-orange-500 to-red-500',
          source: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2',
          categories: ['Learn the Basics', 'Sorting', 'Arrays', 'Binary Search', 'Strings', 'Linked List', 'Recursion', 'Bit Manipulation', 'Stack & Queues', 'Graphs', 'Dynamic Programming', 'Tries', 'Greedy'],
        },
        {
          id: 'neetcode-150',
          name: 'Neetcode 150',
          description: 'Curated 150 LeetCode problems for interview preparation',
          problems: 150,
          difficulty: 'mixed',
          icon: '🎓',
          color: 'from-green-500 to-emerald-500',
          source: 'https://codolio.com/question-tracker/sheet/neetcode-150',
          categories: ['Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Stack', 'Binary Search', 'Linked List', 'Trees', 'Heap', 'Backtracking', 'Tries', 'Graphs', 'DP', 'Greedy', 'Intervals', 'Math & Geometry', 'Bit Manipulation'],
        },
        {
          id: 'blind-75',
          name: 'Blind 75',
          description: 'Top 75 must-do problems for tech interviews',
          problems: 75,
          difficulty: 'mixed',
          icon: '👁️',
          color: 'from-pink-500 to-rose-500',
          source: 'https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions',
          categories: ['Array', 'Binary', 'Dynamic Programming', 'Graph', 'Interval', 'Linked List', 'Matrix', 'String', 'Tree', 'Heap'],
        },
        {
          id: 'grind-75',
          name: 'Grind 75',
          description: 'Structured 75 problems to grind for weeks',
          problems: 75,
          difficulty: 'mixed',
          icon: '⚙️',
          color: 'from-blue-500 to-purple-500',
          source: 'https://www.techinterviewhandbook.org/grind75',
          categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
        },
        {
          id: 'leetcode-top-100',
          name: 'LeetCode Top 100',
          description: 'Most liked 100 problems on LeetCode',
          problems: 100,
          difficulty: 'mixed',
          icon: '🔝',
          color: 'from-yellow-500 to-orange-500',
          source: 'https://leetcode.com/studyplan/top-100-liked/',
          categories: ['Hash Table', 'String', 'Tree', 'Graph', 'Dynamic Programming', 'Array', 'Math', 'Sorting'],
        },
        {
          id: 'love-babbar',
          name: 'Love Babbar DSA Sheet',
          description: '450 most important DSA questions curated by Love Babbar',
          problems: 450,
          difficulty: 'mixed',
          icon: '❤️',
          color: 'from-red-500 to-pink-500',
          source: 'https://www.geeksforgeeks.org/dsa-sheet-by-love-babbar/',
          categories: ['Array', 'Matrix', 'String', 'Searching & Sorting', 'Linked List', 'Binary Trees', 'BST', 'Greedy', 'Backtracking', 'Stacks & Queues', 'Heap', 'Graph', 'Trie', 'Dynamic Programming', 'Bit Manipulation'],
        },
        {
          id: 'raising-minds',
          name: 'Rising Brain DSA Sheet',
          description: 'Pattern-wise DSA problems for mastering coding interviews',
          problems: 300,
          difficulty: 'mixed',
          icon: '🧠',
          color: 'from-teal-500 to-cyan-500',
          source: 'https://www.risingbrain.org/sheet',
          categories: ['Array (Two-Pointer, Sliding Window)', 'Binary Search', 'Stack', 'Linked List', 'HashMap', 'Heap', 'Recursion', 'Tree & BST', 'Graph', 'Backtracking', 'Greedy', 'Dynamic Programming'],
        },
        {
          id: 'tuf-cp-sheet',
          name: 'TUF CP Sheet',
          description: 'Competitive programming roadmap with 250+ problems',
          problems: 250,
          difficulty: 'mixed',
          icon: '⚡',
          color: 'from-violet-500 to-purple-500',
          source: 'https://takeuforward.org/competitive-programming/strivers-cp-sheet',
          categories: ['Mathematics', 'Sorting', 'Advanced Arrays', 'Stacks & Queues', 'Heaps', 'Tries', 'Graphs', 'Advanced DP', 'Segment Trees'],
        },
        {
          id: 'striver-79',
          name: 'Striver 79 Sheet',
          description: 'Last-minute quick revision sheet with 79 important topics',
          problems: 79,
          difficulty: 'mixed',
          icon: '🚀',
          color: 'from-indigo-500 to-blue-500',
          source: 'https://takeuforward.org/interview-experience/strivers-79-last-moment-dsa-sheet-ace-interviews/',
          categories: ['Quick Revision Arrays', 'Important Trees Problems', 'Graph Essentials', 'DP Must-Dos', 'Binary Search', 'Greedy Patterns'],
        },
        {
          id: 'top-interview-150',
          name: 'Top Interview 150',
          description: 'LeetCode\'s curated 150 questions for top companies',
          problems: 150,
          difficulty: 'mixed',
          icon: '🏆',
          color: 'from-amber-500 to-yellow-500',
          source: 'https://leetcode.com/studyplan/top-interview-150/',
          categories: ['Array/String', 'Two Pointers', 'Sliding Window', 'Matrix', 'Hash Map', 'Intervals', 'Stack', 'Binary Tree General', 'Binary Tree BFS', 'Binary Search Tree', 'Graph General', 'Graph BFS', 'Trie', 'Backtracking', 'Divide & Conquer', 'Kadane\'s Algorithm', 'Binary Search', 'Heap', 'Bit Manipulation', 'Math', 'Dynamic Programming'],
        },
        {
          id: 'algoexpert',
          name: 'AlgoExpert',
          description: '160 hand-picked coding interview questions',
          problems: 160,
          difficulty: 'mixed',
          icon: '🎖️',
          color: 'from-emerald-500 to-green-500',
          source: 'https://www.algoexpert.io/questions',
          categories: ['Arrays', 'Binary Search Trees', 'Binary Trees', 'Dynamic Programming', 'Famous Algorithms', 'Graphs', 'Greedy Algorithms', 'Heaps', 'Linked Lists', 'Recursion', 'Searching', 'Sorting', 'Stacks', 'Strings', 'Tries'],
        },
      ]
    },
    webdev: {
      name: '🌐 Web Development',
      sheets: [
        {
          id: 'frontend-mastery',
          name: 'Frontend Mastery',
          description: 'Complete HTML, CSS, JavaScript, and React challenges',
          problems: 100,
          difficulty: 'mixed',
          icon: '🎨',
          color: 'from-blue-400 to-cyan-400',
          source: 'https://www.frontendmentor.io/challenges',
          categories: ['HTML5 Semantics', 'CSS3 & Flexbox', 'Grid Layout', 'JavaScript ES6+', 'React Components', 'Responsive Design'],
        },
        {
          id: 'backend-excellence',
          name: 'Backend Excellence',
          description: 'Master Node.js, Express, MongoDB, and REST API design',
          problems: 80,
          difficulty: 'mixed',
          icon: '⚙️',
          color: 'from-green-600 to-emerald-600',
          source: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/',
          categories: ['Node.js Basics', 'Express.js', 'MongoDB & Mongoose', 'REST API Design', 'Authentication', 'WebSockets', 'Microservices'],
        },
        {
          id: 'full-stack-projects',
          name: 'Full Stack Projects',
          description: 'Build complete MERN stack applications from scratch',
          problems: 50,
          difficulty: 'hard',
          icon: '🚀',
          color: 'from-purple-600 to-indigo-600',
          source: 'https://www.theodinproject.com/paths/full-stack-javascript',
          categories: ['MERN Stack', 'Authentication Systems', 'Real-time Features', 'Payment Integration', 'Deployment', 'CI/CD'],
        },
        {
          id: 'web-step-by-step',
          name: 'Web Dev Step-by-Step Practice',
          description: 'Guided bite-sized development practice with incremental coding tasks, not full project builds',
          problems: 120,
          difficulty: 'easy',
          icon: '🪜',
          color: 'from-sky-500 to-blue-600',
          source: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
          categories: ['HTML Basics', 'CSS Fundamentals', 'Responsive Layouts', 'Accessibility', 'Forms', 'Semantics', 'Daily Coding Drills'],
        },
        {
          id: 'html-practice-sheet',
          name: 'HTML Practice Sheet',
          description: 'Topic-wise HTML exercises for tags, forms, semantic structure, and accessibility',
          problems: 75,
          difficulty: 'easy',
          icon: '🧱',
          color: 'from-orange-500 to-amber-500',
          source: 'https://www.w3schools.com/html/html_exercises.asp',
          categories: ['HTML Elements', 'Forms', 'Tables', 'Media', 'Semantic HTML', 'Accessibility Basics'],
        },
        {
          id: 'css-practice-sheet',
          name: 'CSS Practice Sheet',
          description: 'Hands-on CSS practice for layout, responsiveness, and styling fundamentals',
          problems: 90,
          difficulty: 'easy',
          icon: '🎯',
          color: 'from-blue-500 to-cyan-500',
          source: 'https://www.w3schools.com/css/css_exercises.asp',
          categories: ['Selectors', 'Box Model', 'Flexbox', 'Grid', 'Responsive Design', 'Animations'],
        },
        {
          id: 'javascript-practice-sheet',
          name: 'JavaScript Practice Sheet',
          description: 'Progressive JavaScript problems and coding drills for web development',
          problems: 100,
          difficulty: 'medium',
          icon: '🟨',
          color: 'from-yellow-500 to-orange-500',
          source: 'https://www.hackerrank.com/domains/tutorials/10-days-of-javascript',
          categories: ['Variables & Scope', 'Arrays', 'Functions', 'Objects', 'DOM', 'Events', 'Async Basics'],
        },
        {
          id: 'react-practice-sheet',
          name: 'React Practice Sheet',
          description: 'React-focused guided exercises for components, state, hooks, and UI patterns',
          problems: 85,
          difficulty: 'medium',
          icon: '⚛️',
          color: 'from-cyan-500 to-sky-500',
          source: 'https://www.freecodecamp.org/learn/front-end-development-libraries/',
          categories: ['Components', 'Props', 'State', 'Hooks', 'Forms', 'Routing', 'State Management Basics'],
        },
        {
          id: 'node-practice-sheet',
          name: 'Node.js Practice Sheet',
          description: 'Node.js backend practice path with incremental coding tasks and server-side fundamentals',
          problems: 80,
          difficulty: 'medium',
          icon: '🟢',
          color: 'from-green-600 to-lime-600',
          source: 'https://nodeschool.io/#workshoppers',
          categories: ['Node Basics', 'Modules', 'File System', 'NPM', 'Streams', 'CLI Tools', 'Server Basics'],
        },
        {
          id: 'express-practice-sheet',
          name: 'Express Practice Sheet',
          description: 'Practice routes, middleware, and APIs using guided Express exercises',
          problems: 70,
          difficulty: 'medium',
          icon: '🚏',
          color: 'from-emerald-600 to-green-700',
          source: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/',
          categories: ['Routing', 'Middleware', 'Request/Response', 'Error Handling', 'Validation', 'REST Basics'],
        },
        {
          id: 'mongodb-practice-sheet',
          name: 'MongoDB Practice Sheet',
          description: 'MongoDB query and schema practice for web application development',
          problems: 65,
          difficulty: 'medium',
          icon: '🍃',
          color: 'from-green-700 to-emerald-700',
          source: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/',
          categories: ['CRUD Operations', 'Schemas', 'Indexes', 'Aggregation', 'Mongoose Models', 'Data Validation'],
        },
        {
          id: 'rest-api-practice-sheet',
          name: 'REST API Practice Sheet',
          description: 'API-focused practice problems for request handling, status codes, auth, and integration',
          problems: 75,
          difficulty: 'medium',
          icon: '🔌',
          color: 'from-violet-600 to-indigo-600',
          source: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/',
          categories: ['HTTP Methods', 'Status Codes', 'JSON APIs', 'Authentication', 'Pagination', 'API Testing'],
        },
      ]
    },
    mlai: {
      name: '🤖 Artificial Intelligence',
      sheets: [
        {
          id: 'ml-basics',
          name: 'Machine Learning Step-by-Step',
          description: 'Guided machine learning practice from model basics to evaluation using hands-on notebooks',
          problems: 80,
          difficulty: 'medium',
          icon: '🧠',
          color: 'from-purple-500 to-indigo-500',
          source: 'https://www.kaggle.com/learn/intro-to-machine-learning',
          categories: ['Model Basics', 'Validation', 'Underfitting vs Overfitting', 'Random Forests', 'Pipelines', 'Hands-on Exercises'],
        },
        {
          id: 'deep-learning',
          name: 'Deep Learning Step-by-Step',
          description: 'Incremental deep learning exercises covering neural nets and practical model training',
          problems: 85,
          difficulty: 'hard',
          icon: '🔥',
          color: 'from-red-600 to-orange-600',
          source: 'https://www.kaggle.com/learn/intro-to-deep-learning',
          categories: ['Neural Networks', 'TensorFlow/Keras', 'Overfitting Control', 'Dropout', 'Training Workflow', 'Practice Labs'],
        },
        {
          id: 'nlp-llms',
          name: 'NLP Step-by-Step Practice',
          description: 'Practice text preprocessing, embeddings, and NLP modeling through guided exercises',
          problems: 75,
          difficulty: 'hard',
          icon: '💬',
          color: 'from-blue-600 to-purple-600',
          source: 'https://www.kaggle.com/learn/natural-language-processing',
          categories: ['Text Cleaning', 'Tokenization', 'Sentiment Models', 'Embeddings', 'Transformer Basics', 'Notebook Exercises'],
        },
        {
          id: 'computer-vision',
          name: 'Computer Vision Step-by-Step',
          description: 'Guided image-based model practice from CNN basics to real-world vision tasks',
          problems: 75,
          difficulty: 'hard',
          icon: '👁️',
          color: 'from-cyan-600 to-blue-600',
          source: 'https://www.kaggle.com/learn/computer-vision',
          categories: ['Image Tensors', 'CNN Basics', 'Data Augmentation', 'Transfer Learning', 'Prediction Pipelines', 'Lab Practice'],
        },
        {
          id: 'intermediate-ml',
          name: 'Intermediate ML Practice',
          description: 'Step-by-step machine learning practice for missing data, categorical values, and robust pipelines',
          problems: 70,
          difficulty: 'medium',
          icon: '📈',
          color: 'from-indigo-600 to-violet-600',
          source: 'https://www.kaggle.com/learn/intermediate-machine-learning',
          categories: ['Missing Values', 'Categorical Encoding', 'XGBoost', 'Data Leakage', 'Cross Validation', 'Applied Exercises'],
        },
        {
          id: 'feature-engineering',
          name: 'Feature Engineering Practice',
          description: 'Guided feature engineering drills for better model performance in AI workflows',
          problems: 65,
          difficulty: 'medium',
          icon: '🧩',
          color: 'from-fuchsia-600 to-pink-600',
          source: 'https://www.kaggle.com/learn/feature-engineering',
          categories: ['Mutual Information', 'Feature Creation', 'Clustering Features', 'Target Encoding', 'Pipelines', 'Practical Tasks'],
        },
        {
          id: 'time-series-ai',
          name: 'Time Series AI Practice',
          description: 'Step-by-step forecasting practice for AI and ML time series problems',
          problems: 60,
          difficulty: 'medium',
          icon: '⏱️',
          color: 'from-slate-600 to-gray-700',
          source: 'https://www.kaggle.com/learn/time-series',
          categories: ['Trend & Seasonality', 'Lag Features', 'Forecasting Models', 'Validation Strategy', 'Error Metrics', 'Notebook Drills'],
        },
      ]
    },
    cs: {
      name: '📖 CS Fundamentals',
      sheets: [
        {
          id: 'os-sheet',
          name: 'Operating Systems',
          description: 'Most asked OS interview questions with detailed explanations',
          problems: 90,
          difficulty: 'medium',
          icon: '💻',
          color: 'from-gray-600 to-gray-800',
          source: 'https://takeuforward.org/operating-system/most-asked-operating-system-interview-questions',
          categories: ['Process Management', 'Threads', 'CPU Scheduling', 'Deadlocks', 'Memory Management', 'Virtual Memory', 'File Systems'],
        },
        {
          id: 'cn-sheet',
          name: 'Computer Networks',
          description: 'Essential networking concepts and interview questions',
          problems: 85,
          difficulty: 'medium',
          icon: '🌐',
          color: 'from-blue-600 to-indigo-600',
          source: 'https://takeuforward.org/computer-network/most-asked-computer-networks-interview-questions',
          categories: ['OSI & TCP/IP Model', 'HTTP/HTTPS', 'TCP vs UDP', 'Routing Protocols', 'DNS', 'Network Security'],
        },
        {
          id: 'dbms-sheet',
          name: 'DBMS',
          description: 'Database management system concepts and SQL queries',
          problems: 75,
          difficulty: 'medium',
          icon: '🗄️',
          color: 'from-teal-600 to-green-600',
          source: 'https://takeuforward.org/dbms/most-asked-dbms-interview-questions/',
          categories: ['SQL Queries', 'Normalization', 'Transactions & ACID', 'Indexing', 'Query Optimization', 'NoSQL'],
        },
        {
          id: 'oop-concepts',
          name: 'OOP Concepts',
          description: 'Object-oriented programming principles and design patterns',
          problems: 60,
          difficulty: 'easy',
          icon: '🎯',
          color: 'from-violet-600 to-purple-600',
          source: 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/',
          categories: ['Classes & Objects', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction', 'Design Patterns'],
        },
        {
          id: 'system-design',
          name: 'System Design',
          description: 'Design scalable systems and learn architecture patterns',
          problems: 50,
          difficulty: 'hard',
          icon: '🏗️',
          color: 'from-gray-700 to-slate-700',
          source: 'https://github.com/donnemartin/system-design-primer',
          categories: ['Low Level Design', 'Object Oriented Design', 'High Level Design', 'Scalability', 'Load Balancing', 'Caching', 'Database Design', 'Microservices'],
        },
        {
          id: 'striver-system-design',
          name: 'Striver System Design Sheet',
          description: 'Interview-focused system design roadmap and curated topics from Striver',
          problems: 40,
          difficulty: 'hard',
          icon: '🏛️',
          color: 'from-slate-700 to-blue-700',
          source: 'https://takeuforward.org/system-design/complete-system-design-roadmap-with-videos-for-sdes/',
          categories: ['System Design Fundamentals', 'Scalability', 'Caching', 'Databases', 'Load Balancing', 'Message Queues', 'Distributed Systems'],
        },
      ]
    }
  };

  const sheetAuthorDetails = {
    'striver-sde': {
      name: 'Raj Vikramaditya',
      description: 'This sheet is originally published by Raj Vikramaditya through Take U Forward and is widely used for structured interview preparation.'
    },
    'striver-a2z': {
      name: 'Raj Vikramaditya',
      description: 'The A2Z DSA course sheet is created by Raj Vikramaditya on Take U Forward as a step-by-step roadmap from fundamentals to advanced topics.'
    },
    'neetcode-150': {
      name: 'NeetCode',
      description: 'NeetCode 150 is curated by the NeetCode platform as a focused interview-prep list built around the most common coding patterns.'
    },
    'blind-75': {
      name: 'Blind Community',
      description: 'Blind 75 is a community-popularized interview list that became well known among engineers preparing for technical interviews.'
    },
    'grind-75': {
      name: 'Yangshun Tay',
      description: 'Grind 75 is created by Yangshun Tay through Tech Interview Handbook as a practical schedule for consistent interview prep.'
    },
    'leetcode-top-100': {
      name: 'LeetCode',
      description: 'This study plan is published by the LeetCode team based on some of the most liked problems on the platform.'
    },
    'love-babbar': {
      name: 'Love Babbar',
      description: 'The Love Babbar DSA Sheet is curated by Love Babbar as a broad list of important interview problems across major data structure topics.'
    },
    'raising-minds': {
      name: 'Rising Brain',
      description: 'This sheet comes from Rising Brain and organizes DSA practice around interview-friendly patterns and topic groups.'
    },
    'tuf-cp-sheet': {
      name: 'Raj Vikramaditya',
      description: 'The TUF CP Sheet is published by Raj Vikramaditya on Take U Forward for competitive programming progression.'
    },
    'striver-79': {
      name: 'Raj Vikramaditya',
      description: 'Striver 79 is another Take U Forward resource by Raj Vikramaditya focused on high-value last-minute revision topics.'
    },
    'top-interview-150': {
      name: 'LeetCode',
      description: 'Top Interview 150 is maintained by the LeetCode team as a structured interview study plan for high-frequency question types.'
    },
    algoexpert: {
      name: 'AlgoExpert',
      description: 'AlgoExpert publishes this question set as a curated interview-preparation resource covering the most common algorithm topics.'
    },
    'frontend-mastery': {
      name: 'Frontend Mentor',
      description: 'Frontend Mentor publishes a large set of hands-on front-end challenges to practice HTML, CSS, JavaScript, and real UI building.'
    },
    'backend-excellence': {
      name: 'freeCodeCamp',
      description: 'freeCodeCamp provides this backend curriculum with free, hands-on Node/Express and API exercises that can be practiced step by step.'
    },
    'full-stack-projects': {
      name: 'The Odin Project',
      description: 'The Odin Project full-stack JavaScript path includes project-heavy modules to practice building complete web applications.'
    },
    'web-step-by-step': {
      name: 'freeCodeCamp',
      description: 'This freeCodeCamp path is a free step-by-step web development practice track focused on gradual skill building instead of full project-first learning.'
    },
    'html-practice-sheet': {
      name: 'W3Schools',
      description: 'This sheet points to free HTML exercise sets by W3Schools for topic-wise beginner-to-intermediate web markup practice.'
    },
    'css-practice-sheet': {
      name: 'W3Schools',
      description: 'This sheet points to free CSS exercises by W3Schools for structured styling and layout practice.'
    },
    'javascript-practice-sheet': {
      name: 'HackerRank',
      description: 'This JavaScript sheet uses HackerRank practice tracks to build web-focused coding skills through progressive challenge sets.'
    },
    'react-practice-sheet': {
      name: 'freeCodeCamp',
      description: 'This React sheet uses freeCodeCamp front-end libraries content for practical React-focused exercises and drills.'
    },
    'node-practice-sheet': {
      name: 'NodeSchool',
      description: 'NodeSchool provides workshop-style Node.js practice challenges designed for step-by-step backend skill development.'
    },
    'express-practice-sheet': {
      name: 'freeCodeCamp',
      description: 'This Express sheet uses freeCodeCamp backend modules with guided exercises around routing, middleware, and API building.'
    },
    'mongodb-practice-sheet': {
      name: 'freeCodeCamp',
      description: 'This MongoDB sheet uses freeCodeCamp backend modules that include practical data modeling and database tasks.'
    },
    'rest-api-practice-sheet': {
      name: 'freeCodeCamp',
      description: 'This REST API sheet is based on freeCodeCamp backend practice covering API design, request handling, and integration basics.'
    },
    'ml-basics': {
      name: 'Kaggle Learn',
      description: 'This sheet uses Kaggle Learn for step-by-step machine learning practice with guided notebook-based exercises.'
    },
    'deep-learning': {
      name: 'Kaggle Learn',
      description: 'This deep learning sheet is based on Kaggle Learn and focuses on incremental practice through structured exercises.'
    },
    'nlp-llms': {
      name: 'Kaggle Learn',
      description: 'This NLP sheet uses Kaggle Learn for practical, step-based text and language modeling exercises.'
    },
    'computer-vision': {
      name: 'Kaggle Learn',
      description: 'This computer vision sheet uses Kaggle Learn with guided practice notebooks for image modeling skills.'
    },
    'intermediate-ml': {
      name: 'Kaggle Learn',
      description: 'This sheet provides intermediate machine learning practice in a guided, step-by-step Kaggle format.'
    },
    'feature-engineering': {
      name: 'Kaggle Learn',
      description: 'This sheet provides step-by-step feature engineering exercises from Kaggle Learn for practical model improvement.'
    },
    'time-series-ai': {
      name: 'Kaggle Learn',
      description: 'This sheet provides structured time series forecasting practice through guided Kaggle Learn exercises.'
    },
    'os-sheet': {
      name: 'Raj Vikramaditya',
      description: 'This operating systems sheet is published on Take U Forward by Raj Vikramaditya for interview-focused systems revision.'
    },
    'cn-sheet': {
      name: 'Raj Vikramaditya',
      description: 'This networking resource is another Take U Forward interview-prep sheet by Raj Vikramaditya.'
    },
    'dbms-sheet': {
      name: 'Raj Vikramaditya',
      description: 'This DBMS sheet is sourced from Take U Forward by Raj Vikramaditya and focuses on interview-oriented database concepts.'
    },
    'oop-concepts': {
      name: 'GeeksforGeeks',
      description: 'The original material is maintained by GeeksforGeeks and explains the core principles of object-oriented programming.'
    },
    'system-design': {
      name: 'Donne Martin',
      description: 'System Design Primer is an open-source resource created by Donne Martin and maintained with community contributions.'
    },
    'striver-system-design': {
      name: 'Raj Vikramaditya',
      description: 'This system design roadmap is published by Raj Vikramaditya on Take U Forward as an original interview-focused guide for SDEs.'
    }
  };

  const allSheets = Object.values(sheetCategories).flatMap((category) => category.sheets);
  const requestedSheetId = searchParams.get('sheet');
  const viewingSheet = user ? requestedSheetId : null;
  const activeSheet = allSheets.find((sheet) => sheet.id === viewingSheet) || null;

  useEffect(() => {
    if (!requestedSheetId) {
      return;
    }
    const matchedCategory = Object.entries(sheetCategories).find(([, category]) =>
      category.sheets.some((sheet) => sheet.id === requestedSheetId)
    );
    if (matchedCategory) {
      setSelectedSheet(matchedCategory[0]);
    }
  }, [requestedSheetId]);

  const handleOpenSheet = (sheetId) => {
    if (user) {
      setSearchParams({ sheet: sheetId });
      return;
    }

    navigate('/login', {
      state: {
        redirectTo: `/sheets?sheet=${sheetId}`
      }
    });
  };

  const handleBackToSheets = () => {
    setRedirectingSheetId(null);
    setSearchParams({});
  };

  const handleGetOriginalSheet = (sheet) => {
    if (!sheet?.source) {
      return;
    }

    setRedirectingSheetId(sheet.id);
    window.setTimeout(() => {
      window.location.href = sheet.source;
    }, 900);
  };

  const currentSheets = sheetCategories[selectedSheet]?.sheets || [];
  const activeAuthor = activeSheet ? sheetAuthorDetails[activeSheet.id] : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-coral to-secondary py-8 sm:py-10 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3">📋 Coding Sheets</h1>
          <p className="text-white/90 text-sm sm:text-base md:text-lg">Curated problem sets to ace your interviews and master concepts</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Category Tabs */}
        <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2">
          {Object.keys(sheetCategories).map((key) => (
            <button
              key={key}
              onClick={() => {
                setSelectedSheet(key);
                setRedirectingSheetId(null);
                setSearchParams({});
              }}
              className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg font-medium transition whitespace-nowrap text-sm sm:text-base ${
                selectedSheet === key
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {sheetCategories[key].name}
            </button>
          ))}
        </div>

        {/* Back Button */}
        {viewingSheet && (
          <button
            onClick={handleBackToSheets}
            className="mb-4 sm:mb-6 px-3 sm:px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center gap-2 text-sm sm:text-base"
          >
            ← Back to Sheets
          </button>
        )}

        {/* Sheets Grid */}
        {!viewingSheet && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {currentSheets.map((sheet) => {
              return (
                <div
                  key={sheet.id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${sheet.color} flex items-center justify-center text-2xl sm:text-3xl shadow-md flex-shrink-0`}>
                      {sheet.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {sheet.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                        {sheet.description}
                      </p>
                      {/* Categories */}
                      {sheet.categories && (
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1.5">
                            {sheet.categories.slice(0, 3).map((category, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs"
                              >
                                {category}
                              </span>
                            ))}
                            {sheet.categories.length > 3 && (
                              <span className="px-2 py-0.5 text-xs text-gray-600 dark:text-gray-400">
                                +{sheet.categories.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs sm:text-sm mb-2">
                        <span className="text-gray-600 dark:text-gray-400">
                          {sheet.problems} Problems
                        </span>
                        <span className="text-gray-400 dark:text-gray-600">•</span>
                        <span className="font-medium text-gray-500 dark:text-gray-400">
                          {sheetAuthorDetails[sheet.id]?.name || 'Original author available inside'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {user ? 'Open the sheet details to view the original author and source link.' : 'Login to open this sheet.'}
                      </div>
                    </div>
                  </div>
                  <button
                    className={`mt-3 sm:mt-4 w-full px-4 py-2 sm:py-2.5 rounded-lg font-medium transition shadow-md text-sm sm:text-base ${
                      user
                        ? 'bg-primary hover:bg-primary-dark text-white'
                        : 'bg-gray-600 hover:bg-gray-700 text-white'
                    }`}
                    onClick={() => handleOpenSheet(sheet.id)}
                  >
                    {user ? 'Click to View' : 'Login to View'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Sheet Details View */}
        {viewingSheet && activeSheet && (
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${activeSheet.color} flex items-center justify-center text-3xl sm:text-4xl shadow-md mb-5`}>
                {activeSheet.icon}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {activeSheet.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-6">
                {activeSheet.description}
              </p>

              <div className="grid gap-4 sm:gap-5 md:grid-cols-2 mb-6">
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">
                    Original Author
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {activeAuthor?.name || 'Source Author'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-6">
                    {activeAuthor?.description || 'This sheet links out to the original source so learners can use the authentic material directly.'}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-primary/10 via-coral/10 to-secondary/10 p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">
                    Source Access
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-6 mb-4">
                    This page does not add any extra in-app problems. Use the original sheet directly from its published source.
                  </p>
                  <button
                    onClick={() => handleGetOriginalSheet(activeSheet)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition text-sm font-semibold shadow-md"
                  >
                    {redirectingSheetId === activeSheet.id ? 'Redirecting to original sheet...' : 'Get Original Sheet'}
                  </button>
                </div>
              </div>

              {activeSheet.categories && activeSheet.categories.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
                    Covered Areas
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeSheet.categories.map((category) => (
                      <span
                        key={category}
                        className="px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs sm:text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Invalid sheet message */}
        {requestedSheetId && user && !activeSheet && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              This coding sheet could not be found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodingSheets;
