import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CodeEditor from '../components/CodeEditor';

const CodingSheets = () => {
  const { user } = useContext(AuthContext);
  const [selectedSheet, setSelectedSheet] = useState('dsa');
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showCodeEditor, setShowCodeEditor] = useState(false);

  const openCodeEditor = (problem) => {
    setSelectedProblem(problem);
    setShowCodeEditor(true);
  };

  const closeCodeEditor = () => {
    setShowCodeEditor(false);
    setSelectedProblem(null);
  };

  const sheetCategories = {
    dsa: {
      name: '💻 DSA Sheets',
      sheets: [
        {
          id: 'striver-sde',
          name: 'Striver\'s SDE Sheet',
          description: '191 handpicked top coding interview problems for product-based companies',
          problems: 191,
          completed: 45,
          difficulty: 'mixed',
          icon: '🎯',
          color: 'from-primary to-coral',
          source: 'https://takeuforward.org/dsa/strivers-sde-sheet-top-coding-interview-problems',
          categories: ['Arrays', 'Linked List', 'Greedy', 'Recursion', 'Binary Search', 'Heaps', 'Binary Trees', 'BST', 'Graphs', 'Dynamic Programming', 'Stacks & Queues', 'Strings', 'Tries', 'Bit Manipulation'],
        },
        {
          id: 'striver-a2z',
          name: 'Striver\'s A2Z DSA Course',
          description: 'Learn DSA from A to Z with 455 problems - Complete free course',
          problems: 455,
          completed: 89,
          difficulty: 'mixed',
          icon: '📚',
          color: 'from-blue-500 to-indigo-500',
          source: 'https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z',
          categories: ['Learn the Basics', 'Sorting', 'Arrays', 'Binary Search', 'Strings', 'Linked List', 'Recursion', 'Bit Manipulation', 'Stack & Queues', 'Heaps', 'Greedy', 'Binary Trees', 'BST', 'Graphs', 'Dynamic Programming', 'Tries'],
        },
        {
          id: 'neetcode-150',
          name: 'Neetcode 150',
          description: 'Curated 150 LeetCode problems for interview preparation',
          problems: 150,
          completed: 62,
          difficulty: 'mixed',
          icon: '🎓',
          color: 'from-green-500 to-emerald-500',
          source: 'https://codolio.com/question-tracker/sheet/neetcode-150',
          categories: ['Arrays & Hashing (9)', 'Two Pointers (5)', 'Sliding Window (6)', 'Stack (7)', 'Binary Search (7)', 'Linked List (11)', 'Trees (15)', 'Heap/Priority Queue (7)', 'Backtracking (9)', 'Tries (3)', 'Graphs (13)', 'Advanced Graphs (6)', '1-D DP (12)', '2-D DP (11)', 'Greedy (8)', 'Intervals (6)', 'Math & Geometry (8)', 'Bit Manipulation (7)'],
        },
        {
          id: 'blind-75',
          name: 'Blind 75',
          description: '75 frequently asked LeetCode problems - Must solve for interviews',
          problems: 75,
          completed: 52,
          difficulty: 'mixed',
          icon: '🚀',
          color: 'from-purple-500 to-pink-500',
          source: 'https://takeuforward.org/dsa/blind-75-leetcode-problems-detailed-video-solutions',
          categories: ['Array', 'Binary', 'Dynamic Programming', 'Graph', 'Interval', 'Linked List', 'Matrix', 'String', 'Tree', 'Heap'],
        },
        {
          id: 'love-babbar',
          name: 'Love Babbar DSA Sheet',
          description: '430 coding questions covering almost every DSA concept',
          problems: 430,
          completed: 87,
          difficulty: 'mixed',
          icon: '💪',
          color: 'from-orange-500 to-red-500',
          source: 'https://codolio.com/question-tracker/sheet/love-babbar-sheet',
          categories: ['Array (35)', 'Matrix (10)', 'String (41)', 'Searching & Sorting (31)', 'LinkedList (34)', 'Binary Search Trees (22)', 'BackTracking (19)', 'Heap (18)', 'Graph (42)', 'Dynamic Programming (59)', 'Binary Trees (32)', 'Greedy (35)', 'Stacks & Queues (36)', 'Trie (6)', 'Bit Manipulation (10)'],
        },
        {
          id: 'raising-minds',
          name: 'Rising Brain DSA Sheet',
          description: 'Pattern-wise DSA problems for mastering coding interviews',
          problems: 300,
          completed: 42,
          difficulty: 'mixed',
          icon: '🧠',
          color: 'from-teal-500 to-cyan-500',
          source: 'https://www.risingbrain.org/sheet',
          categories: ['Array (Two-Pointer, Sliding Window, Prefix Sum)', 'Binary Search', 'Stack (Monotonic, Expression)', 'Linked List', 'HashMap', 'Heap', 'Recursion', 'Tree & BST', 'Graph (BFS, DFS, Topological Sort)', 'Backtracking', 'Greedy', 'Dynamic Programming', 'Trie', 'Bit Manipulation'],
        },
        {
          id: 'tuf-cp-sheet',
          name: 'TUF CP Sheet',
          description: 'Competitive programming roadmap with 250+ problems',
          problems: 250,
          completed: 58,
          difficulty: 'mixed',
          icon: '⚡',
          color: 'from-violet-500 to-purple-500',
          source: 'https://takeuforward.org/competitive-programming/strivers-cp-sheet',
          categories: ['Mathematics', 'Sorting', 'Advanced Arrays', 'Stacks & Queues', 'Heaps', 'Tries', 'Graphs', 'Advanced DP', 'Segment Trees', 'Fenwick Trees'],
        },
        {
          id: 'striver-79',
          name: 'Striver 79 Sheet',
          description: '79 last moment revision problems to ace DSA interviews',
          problems: 79,
          completed: 25,
          difficulty: 'mixed',
          icon: '⏰',
          color: 'from-red-500 to-orange-500',
          source: 'https://takeuforward.org/dsa/strivers-79-last-moment-dsa-sheet-ace-interviews',
          categories: ['Quick Revision Arrays', 'Important Trees Problems', 'Graph Essentials', 'DP Must-Dos', 'String Patterns', 'Binary Search Critical'],
        },
        {
          id: 'top-interview-150',
          name: 'Top Interview 150',
          description: 'LeetCode\'s most frequently asked interview questions',
          problems: 150,
          completed: 48,
          difficulty: 'mixed',
          icon: '💼',
          color: 'from-indigo-500 to-blue-500',
          source: 'https://codolio.com/question-tracker/sheet/top-interview-150-leetcode',
          categories: ['Array / String', 'Two Pointers', 'Sliding Window', 'Matrix', 'Hashmap', 'Intervals', 'Stack', 'Linked List', 'Binary Tree', 'Graph', 'Backtracking', 'DP', 'Binary Search'],
        },
      ]
    },
    web: {
      name: '🌐 Web Development',
      sheets: [
        {
          id: 'frontend-mastery',
          name: 'Frontend Mastery',
          description: 'Complete HTML, CSS, JavaScript, and React challenges',
          problems: 100,
          completed: 35,
          difficulty: 'mixed',
          icon: '🎨',
          color: 'from-blue-400 to-cyan-400',
          source: 'https://www.w3schools.com/html/',
          categories: ['HTML5 Semantics', 'CSS3 & Flexbox', 'Grid Layout', 'JavaScript ES6+', 'React Components', 'Responsive Design', 'Web APIs', 'Performance Optimization'],
        },
        {
          id: 'backend-excellence',
          name: 'Backend Excellence',
          description: 'Master Node.js, Express, MongoDB, and REST APIs',
          problems: 80,
          completed: 22,
          difficulty: 'mixed',
          icon: '⚙️',
          color: 'from-green-600 to-teal-600',
          source: 'https://www.w3schools.com/nodejs/',
          categories: ['Node.js Basics', 'Express.js', 'MongoDB & Mongoose', 'REST API Design', 'Authentication & JWT', 'Middleware', 'Error Handling', 'Testing'],
        },
        {
          id: 'fullstack-projects',
          name: 'Full Stack Projects',
          description: 'Build production-ready MERN & MEAN applications',
          problems: 50,
          completed: 12,
          difficulty: 'hard',
          icon: '🔥',
          color: 'from-red-500 to-orange-500',
          source: 'https://www.geeksforgeeks.org/mern-stack/',
          categories: ['MERN Stack', 'Authentication Systems', 'Real-time Features', 'Payment Integration', 'Cloud Deployment', 'CI/CD Pipeline'],
        },
      ]
    },
    ml: {
      name: '🤖 Machine Learning',
      sheets: [
        {
          id: 'ml-basics',
          name: 'ML Fundamentals',
          description: 'Core machine learning algorithms and implementations',
          problems: 60,
          completed: 18,
          difficulty: 'medium',
          icon: '🧠',
          color: 'from-purple-500 to-indigo-500',
          source: 'https://www.geeksforgeeks.org/machine-learning/',
          categories: ['Linear Regression', 'Logistic Regression', 'Decision Trees', 'Random Forest', 'SVM', 'K-Means Clustering', 'PCA', 'Model Evaluation'],
        },
        {
          id: 'deep-learning',
          name: 'Deep Learning',
          description: 'Neural networks, CNN, RNN, and Transformers',
          problems: 75,
          completed: 15,
          difficulty: 'hard',
          icon: '🔬',
          color: 'from-indigo-600 to-purple-600',
          source: 'https://www.geeksforgeeks.org/deep-learning-tutorial/',
          categories: ['Neural Networks', 'CNN Architectures', 'RNN & LSTM', 'GANs', 'Transfer Learning', 'Attention Mechanisms', 'Transformers', 'Model Optimization'],
        },
        {
          id: 'nlp-sheet',
          name: 'NLP & LLMs',
          description: 'Natural language processing and large language models',
          problems: 50,
          completed: 10,
          difficulty: 'hard',
          icon: '💬',
          color: 'from-pink-500 to-rose-500',
          source: 'https://www.geeksforgeeks.org/natural-language-processing-nlp-tutorial/',
          categories: ['Text Preprocessing', 'Word Embeddings', 'Sequence Models', 'BERT & GPT', 'Sentiment Analysis', 'NER', 'Machine Translation', 'Question Answering'],
        },
        {
          id: 'cv-sheet',
          name: 'Computer Vision',
          description: 'Image processing and computer vision tasks',
          problems: 55,
          completed: 8,
          difficulty: 'hard',
          icon: '👁️',
          color: 'from-cyan-500 to-blue-500',
          source: 'https://www.geeksforgeeks.org/computer-vision/',
          categories: ['Image Processing', 'Object Detection', 'Image Segmentation', 'Face Recognition', 'OCR', 'Image Classification', 'Video Analysis', 'OpenCV'],
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
          completed: 42,
          difficulty: 'medium',
          icon: '💻',
          color: 'from-gray-600 to-gray-800',
          source: 'https://takeuforward.org/operating-system/most-asked-operating-system-interview-questions',
          categories: ['Process Management', 'Threads & Concurrency', 'CPU Scheduling', 'Deadlocks', 'Memory Management', 'Virtual Memory', 'File Systems', 'I/O Systems', 'System Calls'],
        },
        {
          id: 'cn-sheet',
          name: 'Computer Networks',
          description: 'Essential networking concepts and interview questions',
          problems: 85,
          completed: 38,
          difficulty: 'medium',
          icon: '🌐',
          color: 'from-blue-600 to-indigo-600',
          source: 'https://takeuforward.org/computer-network/most-asked-computer-networks-interview-questions',
          categories: ['OSI & TCP/IP Model', 'HTTP/HTTPS', 'TCP vs UDP', 'Routing Protocols', 'DNS', 'Network Security', 'Subnetting', 'Socket Programming', 'VPN & Firewall'],
        },
        {
          id: 'dbms-sheet',
          name: 'Database Management',
          description: 'Complete DBMS interview preparation with SQL queries',
          problems: 100,
          completed: 55,
          difficulty: 'medium',
          icon: '🗄️',
          color: 'from-green-600 to-emerald-600',
          source: 'https://takeuforward.org/dbms/most-asked-dbms-interview-questions',
          categories: ['SQL Queries', 'Normalization', 'Transactions & ACID', 'Indexing', 'Keys & Constraints', 'Joins', 'Query Optimization', 'NoSQL vs SQL', 'Database Design'],
        },
        {
          id: 'oops-sheet',
          name: 'OOP Concepts',
          description: 'Object-oriented programming principles and design patterns',
          problems: 70,
          completed: 48,
          difficulty: 'easy',
          icon: '🎯',
          color: 'from-yellow-600 to-orange-600',
          source: 'https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/',
          categories: ['Classes & Objects', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction', 'Interfaces', 'Design Patterns', 'SOLID Principles'],
        },
        {
          id: 'system-design',
          name: 'System Design',
          description: 'Complete system design roadmap for SDEs with videos',
          problems: 60,
          completed: 15,
          difficulty: 'hard',
          icon: '🏗️',
          color: 'from-red-600 to-pink-600',
          source: 'https://takeuforward.org/system-design/complete-system-design-roadmap-with-videos-for-sdes',
          categories: ['Low Level Design', 'Object Oriented Design', 'High Level Design', 'Scalability', 'Load Balancing', 'Caching', 'Database Sharding', 'Microservices', 'Message Queues', 'CDN', 'API Design'],
        },
      ]
    }
  };

  // Comprehensive problem sets for each category
  const problemSets = {
    'striver-sde': [
      { name: 'Arrays', problems: [
        { id: 1, title: 'Set Matrix Zeroes', difficulty: 'medium', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/set-matrix-zeroes/' },
        { id: 2, title: 'Pascal\'s Triangle', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/pascals-triangle/' },
        { id: 3, title: 'Next Permutation', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/next-permutation/' },
        { id: 4, title: 'Kadane\'s Algorithm', difficulty: 'medium', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/maximum-subarray/' },
        { id: 5, title: 'Sort Colors', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/sort-colors/' },
        { id: 6, title: 'Stock Buy and Sell', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
        { id: 7, title: 'Rotate Image', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/rotate-image/' },
        { id: 8, title: 'Merge Intervals', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/merge-intervals/' },
        { id: 9, title: 'Merge Sorted Arrays', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/merge-sorted-array/' },
        { id: 10, title: 'Find Duplicate Number', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/find-the-duplicate-number/' },
      ]},
      { name: 'Linked List', problems: [
        { id: 11, title: 'Reverse Linked List', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/reverse-linked-list/' },
        { id: 12, title: 'Middle of Linked List', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/middle-of-the-linked-list/' },
        { id: 13, title: 'Merge Two Sorted Lists', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
        { id: 14, title: 'Remove Nth Node From End', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' },
        { id: 15, title: 'Add Two Numbers', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/add-two-numbers/' },
        { id: 16, title: 'Delete Node in Linked List', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/delete-node-in-a-linked-list/' },
        { id: 17, title: 'Detect Cycle', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/linked-list-cycle/' },
        { id: 18, title: 'Reverse Nodes in K-Group', difficulty: 'hard', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/reverse-nodes-in-k-group/' },
      ]},
      { name: 'Greedy', problems: [
        { id: 19, title: 'N Meetings in One Room', difficulty: 'easy', completed: false, platform: 'gfg', link: 'https://practice.geeksforgeeks.org/problems/n-meetings-in-one-room/' },
        { id: 20, title: 'Job Sequencing Problem', difficulty: 'medium', completed: false, platform: 'gfg', link: 'https://practice.geeksforgeeks.org/problems/job-sequencing-problem/' },
        { id: 21, title: 'Fractional Knapsack', difficulty: 'medium', completed: false, platform: 'gfg', link: 'https://practice.geeksforgeeks.org/problems/fractional-knapsack/' },
      ]},
      { name: 'Recursion', problems: [
        { id: 22, title: 'Subset Sums', difficulty: 'easy', completed: true, platform: 'gfg', link: 'https://practice.geeksforgeeks.org/problems/subset-sums/' },
        { id: 23, title: 'Subsets II', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/subsets-ii/' },
        { id: 24, title: 'Combination Sum', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/combination-sum/' },
        { id: 25, title: 'Palindrome Partitioning', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/palindrome-partitioning/' },
      ]},
      { name: 'Binary Search', problems: [
        { id: 26, title: 'Binary Search', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/binary-search/' },
        { id: 27, title: 'Search in Rotated Sorted Array', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
        { id: 28, title: 'Find Peak Element', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/find-peak-element/' },
        { id: 29, title: 'Median of Two Sorted Arrays', difficulty: 'hard', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/' },
      ]},
      { name: 'Binary Trees', problems: [
        { id: 30, title: 'Inorder Traversal', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/binary-tree-inorder-traversal/' },
        { id: 31, title: 'Level Order Traversal', difficulty: 'medium', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
        { id: 32, title: 'Maximum Depth', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
        { id: 33, title: 'Diameter of Binary Tree', difficulty: 'easy', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/diameter-of-binary-tree/' },
        { id: 34, title: 'Serialize and Deserialize', difficulty: 'hard', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/' },
      ]},
      { name: 'Dynamic Programming', problems: [
        { id: 35, title: 'Climbing Stairs', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/climbing-stairs/' },
        { id: 36, title: 'Longest Increasing Subsequence', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
        { id: 37, title: 'Edit Distance', difficulty: 'hard', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/edit-distance/' },
        { id: 38, title: 'Maximum Product Subarray', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/maximum-product-subarray/' },
        { id: 39, title: '0/1 Knapsack', difficulty: 'medium', completed: false, platform: 'gfg', link: 'https://practice.geeksforgeeks.org/problems/0-1-knapsack-problem/' },
      ]},
      { name: 'Graphs', problems: [
        { id: 40, title: 'Number of Islands', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/number-of-islands/' },
        { id: 41, title: 'BFS of Graph', difficulty: 'easy', completed: true, platform: 'gfg', link: 'https://practice.geeksforgeeks.org/problems/bfs-traversal-of-graph/' },
        { id: 42, title: 'DFS of Graph', difficulty: 'easy', completed: true, platform: 'gfg', link: 'https://practice.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/' },
        { id: 43, title: 'Detect Cycle in Graph', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/course-schedule/' },
        { id: 44, title: 'Topological Sort', difficulty: 'medium', completed: false, platform: 'gfg', link: 'https://practice.geeksforgeeks.org/problems/topological-sort/' },
      ]},
    ],
    'neetcode-150': [
      { name: 'Arrays & Hashing', problems: [
        { id: 101, title: 'Contains Duplicate', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/contains-duplicate/' },
        { id: 102, title: 'Valid Anagram', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/valid-anagram/' },
        { id: 103, title: 'Two Sum', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/two-sum/' },
        { id: 104, title: 'Group Anagrams', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/group-anagrams/' },
        { id: 105, title: 'Top K Frequent Elements', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/top-k-frequent-elements/' },
      ]},
      { name: 'Two Pointers', problems: [
        { id: 106, title: 'Valid Palindrome', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/valid-palindrome/' },
        { id: 107, title: '3Sum', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/3sum/' },
        { id: 108, title: 'Container With Most Water', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/container-with-most-water/' },
      ]},
      { name: 'Sliding Window', problems: [
        { id: 109, title: 'Best Time to Buy and Sell Stock', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
        { id: 110, title: 'Longest Substring Without Repeating', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
        { id: 111, title: 'Minimum Window Substring', difficulty: 'hard', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/minimum-window-substring/' },
      ]},
    ],
    'os-sheet': [
      { name: 'Process Management', problems: [
        { id: 200, title: 'CPU Scheduling - FCFS', difficulty: 'easy', completed: true, platform: 'theory' },
        { id: 201, title: 'CPU Scheduling - SJF', difficulty: 'medium', completed: true, platform: 'theory' },
        { id: 202, title: 'CPU Scheduling - Round Robin', difficulty: 'medium', completed: false, platform: 'theory' },
        { id: 203, title: 'Process Synchronization', difficulty: 'hard', completed: false, platform: 'theory' },
        { id: 204, title: 'Deadlock Detection', difficulty: 'hard', completed: false, platform: 'theory' },
      ]},
      { name: 'Memory Management', problems: [
        { id: 205, title: 'Paging Implementation', difficulty: 'medium', completed: false, platform: 'theory' },
        { id: 206, title: 'Segmentation', difficulty: 'medium', completed: false, platform: 'theory' },
        { id: 207, title: 'Virtual Memory', difficulty: 'hard', completed: false, platform: 'theory' },
        { id: 208, title: 'Page Replacement - LRU', difficulty: 'medium', completed: true, platform: 'theory' },
      ]},
    ],
    'cn-sheet': [
      { name: 'Network Layers', problems: [
        { id: 300, title: 'OSI Model Layers', difficulty: 'easy', completed: true, platform: 'theory' },
        { id: 301, title: 'TCP vs UDP', difficulty: 'easy', completed: true, platform: 'theory' },
        { id: 302, title: 'HTTP/HTTPS Protocol', difficulty: 'medium', completed: false, platform: 'theory' },
        { id: 303, title: 'Subnetting Problems', difficulty: 'medium', completed: false, platform: 'theory' },
      ]},
      { name: 'Routing & Protocols', problems: [
        { id: 304, title: 'Distance Vector Routing', difficulty: 'medium', completed: false, platform: 'theory' },
        { id: 305, title: 'Link State Routing', difficulty: 'hard', completed: false, platform: 'theory' },
        { id: 306, title: 'ARP & RARP', difficulty: 'easy', completed: true, platform: 'theory' },
      ]},
    ],
    'ml-basics': [
      { name: 'Supervised Learning', problems: [
        { id: 400, title: 'Linear Regression Implementation', difficulty: 'easy', completed: true, platform: 'kaggle' },
        { id: 401, title: 'Logistic Regression', difficulty: 'easy', completed: true, platform: 'kaggle' },
        { id: 402, title: 'Decision Trees', difficulty: 'medium', completed: false, platform: 'kaggle' },
        { id: 403, title: 'Random Forest Classifier', difficulty: 'medium', completed: false, platform: 'kaggle' },
        { id: 404, title: 'SVM Classification', difficulty: 'medium', completed: false, platform: 'kaggle' },
      ]},
      { name: 'Unsupervised Learning', problems: [
        { id: 405, title: 'K-Means Clustering', difficulty: 'medium', completed: false, platform: 'kaggle' },
        { id: 406, title: 'PCA Implementation', difficulty: 'medium', completed: false, platform: 'kaggle' },
        { id: 407, title: 'Hierarchical Clustering', difficulty: 'hard', completed: false, platform: 'kaggle' },
      ]},
    ],
    'frontend-mastery': [
      { name: 'HTML & CSS', problems: [
        { id: 500, title: 'Responsive Navigation Bar', difficulty: 'easy', completed: true, platform: 'codepen' },
        { id: 501, title: 'Flexbox Layout Challenge', difficulty: 'medium', completed: false, platform: 'codepen' },
        { id: 502, title: 'CSS Grid Dashboard', difficulty: 'medium', completed: false, platform: 'codepen' },
        { id: 503, title: 'Animated Landing Page', difficulty: 'hard', completed: false, platform: 'codepen' },
      ]},
      { name: 'JavaScript', problems: [
        { id: 504, title: 'Todo App with LocalStorage', difficulty: 'easy', completed: true, platform: 'codepen' },
        { id: 505, title: 'API Fetch and Display', difficulty: 'medium', completed: false, platform: 'codepen' },
        { id: 506, title: 'Infinite Scroll Implementation', difficulty: 'medium', completed: false, platform: 'codepen' },
        { id: 507, title: 'Custom Promise Implementation', difficulty: 'hard', completed: false, platform: 'codepen' },
      ]},
      { name: 'React', problems: [
        { id: 508, title: 'Counter App with Hooks', difficulty: 'easy', completed: true, platform: 'codesandbox' },
        { id: 509, title: 'Context API State Management', difficulty: 'medium', completed: false, platform: 'codesandbox' },
        { id: 510, title: 'Custom Hooks Creation', difficulty: 'medium', completed: false, platform: 'codesandbox' },
        { id: 511, title: 'E-commerce Cart System', difficulty: 'hard', completed: false, platform: 'codesandbox' },
      ]},
    ],
    'raising-minds': [
      { name: 'Arrays & Strings', problems: [
        { id: 601, title: 'Two Sum', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/two-sum/' },
        { id: 602, title: 'Longest Substring Without Repeating', difficulty: 'medium', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
        { id: 603, title: 'Trapping Rain Water', difficulty: 'hard', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/trapping-rain-water/' },
        { id: 604, title: 'Product of Array Except Self', difficulty: 'medium', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/product-of-array-except-self/' },
        { id: 605, title: 'Container With Most Water', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/container-with-most-water/' },
        { id: 606, title: 'Minimum Window Substring', difficulty: 'hard', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/minimum-window-substring/' },
        { id: 607, title: 'String to Integer (atoi)', difficulty: 'medium', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/string-to-integer-atoi/' },
        { id: 608, title: 'Valid Parentheses', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/valid-parentheses/' },
      ]},
      { name: 'Linked Lists & Stacks', problems: [
        { id: 609, title: 'Reverse Linked List', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/reverse-linked-list/' },
        { id: 610, title: 'Detect Cycle in Linked List', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/linked-list-cycle/' },
        { id: 611, title: 'Merge K Sorted Lists', difficulty: 'hard', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
        { id: 612, title: 'LRU Cache', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/lru-cache/' },
        { id: 613, title: 'Copy List with Random Pointer', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/copy-list-with-random-pointer/' },
        { id: 614, title: 'Min Stack', difficulty: 'medium', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/min-stack/' },
        { id: 615, title: 'Implement Queue using Stacks', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/implement-queue-using-stacks/' },
      ]},
      { name: 'Trees & Graphs', problems: [
        { id: 616, title: 'Binary Tree Inorder Traversal', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/binary-tree-inorder-traversal/' },
        { id: 617, title: 'Validate Binary Search Tree', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/validate-binary-search-tree/' },
        { id: 618, title: 'Lowest Common Ancestor', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/' },
        { id: 619, title: 'Binary Tree Maximum Path Sum', difficulty: 'hard', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/' },
        { id: 620, title: 'Clone Graph', difficulty: 'medium', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/clone-graph/' },
        { id: 621, title: 'Course Schedule', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/course-schedule/' },
        { id: 622, title: 'Word Ladder', difficulty: 'hard', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/word-ladder/' },
        { id: 623, title: 'Network Delay Time', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/network-delay-time/' },
      ]},
      { name: 'Dynamic Programming', problems: [
        { id: 624, title: 'Climbing Stairs', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/climbing-stairs/' },
        { id: 625, title: 'House Robber', difficulty: 'medium', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/house-robber/' },
        { id: 626, title: 'Coin Change', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/coin-change/' },
        { id: 627, title: 'Longest Palindromic Substring', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/longest-palindromic-substring/' },
        { id: 628, title: 'Word Break', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/word-break/' },
        { id: 629, title: 'Unique Paths', difficulty: 'medium', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/unique-paths/' },
        { id: 630, title: 'Jump Game', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/jump-game/' },
        { id: 631, title: 'Decode Ways', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/decode-ways/' },
      ]},
      { name: 'Backtracking & Bit Manipulation', problems: [
        { id: 632, title: 'Subsets', difficulty: 'medium', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/subsets/' },
        { id: 633, title: 'Permutations', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/permutations/' },
        { id: 634, title: 'N-Queens', difficulty: 'hard', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/n-queens/' },
        { id: 635, title: 'Sudoku Solver', difficulty: 'hard', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/sudoku-solver/' },
        { id: 636, title: 'Single Number', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/single-number/' },
        { id: 637, title: 'Number of 1 Bits', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/number-of-1-bits/' },
        { id: 638, title: 'Counting Bits', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/counting-bits/' },
      ]},
    ],
    'tuf-cp-sheet': [
      { name: 'Mathematics & Number Theory', problems: [
        { id: 701, title: 'Count Primes', difficulty: 'medium', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/count-primes/' },
        { id: 702, title: 'Power of Two', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/power-of-two/' },
        { id: 703, title: 'Happy Number', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/happy-number/' },
        { id: 704, title: 'Factorial Trailing Zeroes', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/factorial-trailing-zeroes/' },
        { id: 705, title: 'Excel Sheet Column Number', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/excel-sheet-column-number/' },
        { id: 706, title: 'Pow(x, n)', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/powx-n/' },
        { id: 707, title: 'Sqrt(x)', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/sqrtx/' },
        { id: 708, title: 'Divide Two Integers', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/divide-two-integers/' },
      ]},
      { name: 'Sorting & Searching', problems: [
        { id: 709, title: 'Binary Search', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/binary-search/' },
        { id: 710, title: 'Search Insert Position', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/search-insert-position/' },
        { id: 711, title: 'First Bad Version', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/first-bad-version/' },
        { id: 712, title: 'Find Minimum in Rotated Array', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/' },
        { id: 713, title: 'Search in Rotated Sorted Array', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
        { id: 714, title: 'Find Peak Element', difficulty: 'medium', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/find-peak-element/' },
        { id: 715, title: 'Kth Largest Element', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
        { id: 716, title: 'Merge Intervals', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/merge-intervals/' },
      ]},
      { name: 'Advanced Arrays', problems: [
        { id: 717, title: 'Majority Element', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/majority-element/' },
        { id: 718, title: 'Move Zeroes', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/move-zeroes/' },
        { id: 719, title: 'Remove Duplicates from Sorted Array', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/' },
        { id: 720, title: 'Rotate Array', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/rotate-array/' },
        { id: 721, title: 'Maximum Subarray', difficulty: 'medium', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/maximum-subarray/' },
        { id: 722, title: 'Plus One', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/plus-one/' },
        { id: 723, title: 'Pascal\'s Triangle', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/pascals-triangle/' },
      ]},
      { name: 'Stacks & Queues', problems: [
        { id: 724, title: 'Valid Parentheses', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/valid-parentheses/' },
        { id: 725, title: 'Min Stack', difficulty: 'medium', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/min-stack/' },
        { id: 726, title: 'Evaluate Reverse Polish Notation', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/' },
        { id: 727, title: 'Daily Temperatures', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/daily-temperatures/' },
        { id: 728, title: 'Largest Rectangle in Histogram', difficulty: 'hard', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/' },
        { id: 729, title: 'Sliding Window Maximum', difficulty: 'hard', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/sliding-window-maximum/' },
      ]},
      { name: 'Heaps & Priority Queues', problems: [
        { id: 730, title: 'Kth Largest Element in Stream', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/' },
        { id: 731, title: 'Last Stone Weight', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/last-stone-weight/' },
        { id: 732, title: 'K Closest Points to Origin', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/k-closest-points-to-origin/' },
        { id: 733, title: 'Top K Frequent Elements', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/top-k-frequent-elements/' },
        { id: 734, title: 'Find Median from Data Stream', difficulty: 'hard', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/find-median-from-data-stream/' },
      ]},
      { name: 'Tries & Advanced Strings', problems: [
        { id: 735, title: 'Implement Trie', difficulty: 'medium', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/implement-trie-prefix-tree/' },
        { id: 736, title: 'Add and Search Word', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/' },
        { id: 737, title: 'Word Search II', difficulty: 'hard', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/word-search-ii/' },
        { id: 738, title: 'Longest Common Prefix', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/longest-common-prefix/' },
        { id: 739, title: 'Implement strStr()', difficulty: 'easy', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/implement-strstr/' },
      ]},
      { name: 'Graph Algorithms', problems: [
        { id: 740, title: 'Number of Islands', difficulty: 'medium', completed: true, platform: 'leetcode', link: 'https://leetcode.com/problems/number-of-islands/' },
        { id: 741, title: 'Max Area of Island', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/max-area-of-island/' },
        { id: 742, title: 'Pacific Atlantic Water Flow', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/pacific-atlantic-water-flow/' },
        { id: 743, title: 'Number of Connected Components', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/' },
        { id: 744, title: 'Graph Valid Tree', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/graph-valid-tree/' },
        { id: 745, title: 'Cheapest Flights Within K Stops', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/' },
      ]},
      { name: 'Advanced DP', problems: [
        { id: 746, title: 'House Robber II', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/house-robber-ii/' },
        { id: 747, title: 'Longest Increasing Subsequence', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
        { id: 748, title: 'Partition Equal Subset Sum', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/partition-equal-subset-sum/' },
        { id: 749, title: 'Target Sum', difficulty: 'medium', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/target-sum/' },
        { id: 750, title: 'Regular Expression Matching', difficulty: 'hard', completed: false, platform: 'leetcode', link: 'https://leetcode.com/problems/regular-expression-matching/' },
      ]},
    ],
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-600 dark:text-green-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'hard':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'leetcode':
        return '🟧';
      case 'gfg':
        return '🟩';
      case 'kaggle':
        return '🔵';
      case 'codepen':
        return '🖊️';
      case 'codesandbox':
        return '📦';
      case 'theory':
        return '📚';
      default:
        return '🔗';
    }
  };

  const currentSheets = sheetCategories[selectedSheet]?.sheets || [];
  const [viewingSheet, setViewingSheet] = useState(null);
  const currentProblems = problemSets[viewingSheet] || [];

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
        <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
          {Object.keys(sheetCategories).map((key) => (
            <button
              key={key}
              onClick={() => {
                setSelectedSheet(key);
                setViewingSheet(null);
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

        {/* Back Button when viewing sheet details */}
        {viewingSheet && (
          <button
            onClick={() => setViewingSheet(null)}
            className="mb-4 sm:mb-6 px-3 sm:px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center gap-2 text-sm sm:text-base"
          >
            ← Back to Sheets
          </button>
        )}

        {/* Sheets Grid */}
        {!viewingSheet && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {currentSheets.map((sheet) => {
              const progress = Math.round((sheet.completed / sheet.problems) * 100);
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
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">📂 Topics Covered:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {sheet.categories.slice(0, 4).map((category, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs"
                              >
                                {category}
                              </span>
                            ))}
                            {sheet.categories.length > 4 && (
                              <span className="px-2 py-0.5 text-xs text-gray-600 dark:text-gray-400">
                                +{sheet.categories.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      {/* External Source Link */}
                      {sheet.source && (
                        <a
                          href={sheet.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary-dark transition mb-2"
                        >
                          🔗 View Original Sheet →
                        </a>
                      )}
                      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm mb-2 sm:mb-3 flex-wrap">
                        <span className="text-gray-600 dark:text-gray-400">
                          📝 {sheet.problems} Problems
                        </span>
                        <span className="text-green-600 dark:text-green-400">
                          ✓ {sheet.completed} Solved
                        </span>
                      </div>
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                        <div
                          className="bg-gradient-to-r from-primary to-coral h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {progress}% Complete
                      </div>
                    </div>
                  </div>
                  {user ? (
                    <button
                      className="mt-3 sm:mt-4 w-full px-4 py-2 sm:py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition shadow-md text-sm sm:text-base"
                      onClick={() => setViewingSheet(sheet.id)}
                    >
                      View Problems
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="mt-3 sm:mt-4 w-full px-4 py-2 sm:py-2.5 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition shadow-md text-center block text-sm sm:text-base"
                    >
                      🔒 Login to View
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Problem Details View */}
        {viewingSheet && currentProblems.length > 0 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              {currentSheets.find(s => s.id === viewingSheet)?.name}
            </h2>
            <div className="space-y-4">
              {currentProblems.map((category) => {
                const totalProblems = category.problems.length;
                const solvedProblems = category.problems.filter(p => p.completed).length;
                const progress = Math.round((solvedProblems / totalProblems) * 100);

                return (
                  <div
                    key={category.name}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    {/* Category Header */}
                    <div className="p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-2 sm:mb-3 gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                          {category.name}
                        </h3>
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                          {solvedProblems}/{totalProblems} Solved
                        </span>
                      </div>
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary to-coral h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Problems List */}
                    <div className="p-3 sm:p-4">
                      <div className="space-y-2">
                        {category.problems.map((problem) => (
                          <div
                            key={problem.id}
                            className="flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition gap-2"
                          >
                            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                              <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                                problem.completed
                                  ? 'bg-green-500 border-green-500'
                                  : 'border-gray-300 dark:border-gray-600'
                              }`}>
                                {problem.completed && (
                                  <span className="text-white text-xs font-bold">✓</span>
                                )}
                              </div>
                              <span className="text-gray-900 dark:text-white font-medium truncate text-sm sm:text-base">
                                {problem.title}
                              </span>
                              {problem.platform && (
                                <span className="text-xs sm:text-sm flex-shrink-0" title={problem.platform}>
                                  {getPlatformIcon(problem.platform)}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className={`text-xs sm:text-sm font-medium hidden sm:inline ${getDifficultyColor(problem.difficulty)}`}>
                                {problem.difficulty}
                              </span>
                              {user ? (
                                <>
                                  <button
                                    onClick={() => openCodeEditor(problem)}
                                    className="px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-medium transition"
                                    title="Open Code Editor"
                                  >
                                    💻 <span className="hidden sm:inline">Code</span>
                                  </button>
                                  {problem.link ? (
                                    <a
                                      href={problem.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-2 sm:px-3 py-1 sm:py-1.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs sm:text-sm font-medium transition"
                                    >
                                      <span className="hidden sm:inline">Solve</span> →
                                    </a>
                                  ) : (
                                    <button className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-400 text-white rounded-lg text-xs sm:text-sm font-medium cursor-not-allowed">
                                      <span className="hidden sm:inline">Practice</span>
                                      <span className="sm:hidden">–</span>
                                    </button>
                                  )}
                                </>
                              ) : (
                                <Link
                                  to="/login"
                                  className="px-2 sm:px-4 py-1 sm:py-1.5 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-xs sm:text-sm font-medium transition"
                                >
                                  🔒<span className="hidden sm:inline ml-1">Login</span>
                                </Link>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* No problems message */}
        {viewingSheet && currentProblems.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Problems will be available soon for this sheet.
            </p>
          </div>
        )}
      </div>

      {/* Code Editor Modal */}
      {showCodeEditor && selectedProblem && (
        <CodeEditor problem={selectedProblem} onClose={closeCodeEditor} />
      )}
    </div>
  );
};

export default CodingSheets;
