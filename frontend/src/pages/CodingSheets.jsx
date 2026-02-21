import { useState } from 'react';

const CodingSheets = () => {
  const [selectedSheet, setSelectedSheet] = useState('dsa');
  const [activeCategory, setActiveCategory] = useState(null);

  const sheetCategories = {
    dsa: {
      name: '💻 DSA Sheets',
      sheets: [
        {
          id: 'striver-sde',
          name: 'Striver\'s SDE Sheet',
          description: '180 most important DSA problems for placements',
          problems: 180,
          completed: 45,
          difficulty: 'mixed',
          icon: '🎯',
          color: 'from-primary to-coral',
        },
        {
          id: 'striver-a2z',
          name: 'Striver\'s A2Z DSA Course',
          description: 'Complete DSA roadmap from basics to advanced',
          problems: 456,
          completed: 89,
          difficulty: 'mixed',
          icon: '📚',
          color: 'from-blue-500 to-indigo-500',
        },
        {
          id: 'neetcode-150',
          name: 'Neetcode 150',
          description: 'Curated list of 150 LeetCode problems',
          problems: 150,
          completed: 62,
          difficulty: 'mixed',
          icon: '🎓',
          color: 'from-green-500 to-emerald-500',
        },
        {
          id: 'blind-75',
          name: 'Blind 75',
          description: 'Must-do problems for coding interviews',
          problems: 75,
          completed: 52,
          difficulty: 'mixed',
          icon: '🚀',
          color: 'from-purple-500 to-pink-500',
        },
        {
          id: 'love-babbar',
          name: 'Love Babbar DSA Sheet',
          description: '450 coding questions for complete preparation',
          problems: 450,
          completed: 87,
          difficulty: 'mixed',
          icon: '💪',
          color: 'from-orange-500 to-red-500',
        },
      ]
    },
    web: {
      name: '🌐 Web Development',
      sheets: [
        {
          id: 'frontend-mastery',
          name: 'Frontend Mastery',
          description: 'HTML, CSS, JavaScript, React challenges',
          problems: 100,
          completed: 35,
          difficulty: 'mixed',
          icon: '🎨',
          color: 'from-blue-400 to-cyan-400',
        },
        {
          id: 'backend-excellence',
          name: 'Backend Excellence',
          description: 'Node.js, Express, MongoDB, APIs',
          problems: 80,
          completed: 22,
          difficulty: 'mixed',
          icon: '⚙️',
          color: 'from-green-600 to-teal-600',
        },
        {
          id: 'fullstack-projects',
          name: 'Full Stack Projects',
          description: 'End-to-end project implementations',
          problems: 50,
          completed: 12,
          difficulty: 'hard',
          icon: '🔥',
          color: 'from-red-500 to-orange-500',
        },
      ]
    },
    ml: {
      name: '🤖 Machine Learning',
      sheets: [
        {
          id: 'ml-basics',
          name: 'ML Fundamentals',
          description: 'Core ML algorithms and concepts',
          problems: 60,
          completed: 18,
          difficulty: 'medium',
          icon: '🧠',
          color: 'from-purple-500 to-indigo-500',
        },
        {
          id: 'deep-learning',
          name: 'Deep Learning',
          description: 'Neural Networks, CNN, RNN, Transformers',
          problems: 75,
          completed: 15,
          difficulty: 'hard',
          icon: '🔬',
          color: 'from-indigo-600 to-purple-600',
        },
        {
          id: 'nlp-sheet',
          name: 'NLP & LLMs',
          description: 'Natural Language Processing projects',
          problems: 50,
          completed: 10,
          difficulty: 'hard',
          icon: '💬',
          color: 'from-pink-500 to-rose-500',
        },
        {
          id: 'cv-sheet',
          name: 'Computer Vision',
          description: 'Image processing and vision tasks',
          problems: 55,
          completed: 8,
          difficulty: 'hard',
          icon: '👁️',
          color: 'from-cyan-500 to-blue-500',
        },
      ]
    },
    cs: {
      name: '📖 CS Fundamentals',
      sheets: [
        {
          id: 'os-sheet',
          name: 'Operating Systems',
          description: 'Process, threads, memory, scheduling',
          problems: 90,
          completed: 42,
          difficulty: 'medium',
          icon: '💻',
          color: 'from-gray-600 to-gray-800',
        },
        {
          id: 'cn-sheet',
          name: 'Computer Networks',
          description: 'OSI, TCP/IP, protocols, security',
          problems: 85,
          completed: 38,
          difficulty: 'medium',
          icon: '🌐',
          color: 'from-blue-600 to-indigo-600',
        },
        {
          id: 'dbms-sheet',
          name: 'Database Management',
          description: 'SQL, normalization, transactions',
          problems: 100,
          completed: 55,
          difficulty: 'medium',
          icon: '🗄️',
          color: 'from-green-600 to-emerald-600',
        },
        {
          id: 'oops-sheet',
          name: 'OOP Concepts',
          description: 'Object-oriented programming principles',
          problems: 70,
          completed: 48,
          difficulty: 'easy',
          icon: '🎯',
          color: 'from-yellow-600 to-orange-600',
        },
        {
          id: 'system-design',
          name: 'System Design',
          description: 'Scalability, design patterns, architecture',
          problems: 60,
          completed: 15,
          difficulty: 'hard',
          icon: '🏗️',
          color: 'from-red-600 to-pink-600',
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
      <div className="bg-gradient-to-r from-primary via-coral to-secondary py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-white mb-3">📋 Coding Sheets</h1>
          <p className="text-white/90 text-lg">Curated problem sets to ace your interviews and master concepts</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Category Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {Object.keys(sheetCategories).map((key) => (
            <button
              key={key}
              onClick={() => {
                setSelectedSheet(key);
                setViewingSheet(null);
              }}
              className={`px-6 py-3 rounded-lg font-medium transition whitespace-nowrap ${
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
            className="mb-6 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center gap-2"
          >
            ← Back to Sheets
          </button>
        )}

        {/* Sheets Grid */}
        {!viewingSheet && (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {currentSheets.map((sheet) => {
              const progress = Math.round((sheet.completed / sheet.problems) * 100);
              return (
                <div
                  key={sheet.id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${sheet.color} flex items-center justify-center text-3xl shadow-md flex-shrink-0`}>
                      {sheet.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {sheet.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {sheet.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm mb-3 flex-wrap">
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
                  <button
                    className="mt-4 w-full px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition shadow-md"
                    onClick={() => setViewingSheet(sheet.id)}
                  >
                    View Problems
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Problem Details View */}
        {viewingSheet && currentProblems.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
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
                    <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {category.name}
                        </h3>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
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
                    <div className="p-4">
                      <div className="space-y-2">
                        {category.problems.map((problem) => (
                          <div
                            key={problem.id}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition"
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                                problem.completed
                                  ? 'bg-green-500 border-green-500'
                                  : 'border-gray-300 dark:border-gray-600'
                              }`}>
                                {problem.completed && (
                                  <span className="text-white text-xs font-bold">✓</span>
                                )}
                              </div>
                              <span className="text-gray-900 dark:text-white font-medium truncate">
                                {problem.title}
                              </span>
                              {problem.platform && (
                                <span className="text-sm" title={problem.platform}>
                                  {getPlatformIcon(problem.platform)}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-4 flex-shrink-0">
                              <span className={`text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                                {problem.difficulty}
                              </span>
                              {problem.link ? (
                                <a
                                  href={problem.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-4 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition"
                                >
                                  Solve →
                                </a>
                              ) : (
                                <button className="px-4 py-1.5 bg-gray-400 text-white rounded-lg text-sm font-medium cursor-not-allowed">
                                  Practice
                                </button>
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
    </div>
  );
};

export default CodingSheets;
