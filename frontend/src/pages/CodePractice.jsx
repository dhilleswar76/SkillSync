import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CodePractice = () => {
  const [problems, setProblems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Sample problems data with external links
  const allProblems = [
    {
      id: 1,
      title: 'Two Sum',
      difficulty: 'easy',
      category: 'Arrays',
      tags: ['array', 'hash-table'],
      solved: true,
      acceptance: '47.2%',
      description: 'Given an array of integers, return indices of two numbers that add up to a target.',
      platform: 'leetcode',
      link: 'https://leetcode.com/problems/two-sum/',
    },
    {
      id: 2,
      title: 'Reverse Linked List',
      difficulty: 'easy',
      category: 'Linked List',
      tags: ['linked-list', 'recursion'],
      solved: false,
      acceptance: '71.5%',
      description: 'Reverse a singly linked list.',
      platform: 'leetcode',
      link: 'https://leetcode.com/problems/reverse-linked-list/',
    },
    {
      id: 3,
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'medium',
      category: 'Strings',
      tags: ['string', 'sliding-window', 'hash-table'],
      solved: true,
      acceptance: '33.8%',
      description: 'Find the length of the longest substring without repeating characters.',
      platform: 'leetcode',
      link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    },
    {
      id: 4,
      title: 'Merge K Sorted Lists',
      difficulty: 'hard',
      category: 'Linked List',
      tags: ['linked-list', 'heap', 'divide-and-conquer'],
      solved: false,
      acceptance: '47.7%',
      description: 'Merge k sorted linked lists and return it as one sorted list.',
      platform: 'leetcode',
      link: 'https://leetcode.com/problems/merge-k-sorted-lists/',
    },
    {
      id: 5,
      title: 'Binary Tree Level Order Traversal',
      difficulty: 'medium',
      category: 'Trees',
      tags: ['tree', 'breadth-first-search'],
      solved: false,
      acceptance: '61.0%',
      description: 'Return the level order traversal of nodes values.',
      platform: 'leetcode',
      link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
    },
    {
      id: 6,
      title: 'Word Ladder',
      difficulty: 'hard',
      category: 'Graphs',
      tags: ['graph', 'bfs', 'hash-table'],
      solved: false,
      acceptance: '36.3%',
      description: 'Transform one word into another with minimum transformations.',
      platform: 'leetcode',
      link: 'https://leetcode.com/problems/word-ladder/',
    },
    {
      id: 7,
      title: 'Climbing Stairs',
      difficulty: 'easy',
      category: 'Dynamic Programming',
      tags: ['dp', 'math'],
      solved: true,
      acceptance: '51.2%',
      description: 'Count distinct ways to climb n stairs taking 1 or 2 steps at a time.',
      platform: 'leetcode',
      link: 'https://leetcode.com/problems/climbing-stairs/',
    },
    {
      id: 8,
      title: 'Coin Change',
      difficulty: 'medium',
      category: 'Dynamic Programming',
      tags: ['dp', 'array'],
      solved: false,
      acceptance: '40.8%',
      description: 'Find minimum number of coins needed to make up an amount.',
      platform: 'leetcode',
      link: 'https://leetcode.com/problems/coin-change/',
    },
    {
      id: 9,
      title: 'Kadane\'s Algorithm',
      difficulty: 'medium',
      category: 'Arrays',
      tags: ['array', 'dp'],
      solved: true,
      acceptance: '49.5%',
      description: 'Find the maximum sum of a contiguous subarray.',
      platform: 'gfg',
      link: 'https://practice.geeksforgeeks.org/problems/kadanes-algorithm/',
    },
    {
      id: 10,
      title: 'Detect Cycle in Undirected Graph',
      difficulty: 'medium',
      category: 'Graphs',
      tags: ['graph', 'dfs', 'union-find'],
      solved: false,
      acceptance: '45.2%',
      description: 'Detect if there is a cycle in an undirected graph.',
      platform: 'gfg',
      link: 'https://practice.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/',
    },
    {
      id: 11,
      title: 'Next Permutation',
      difficulty: 'medium',
      category: 'Arrays',
      tags: ['array', 'two-pointers'],
      solved: false,
      acceptance: '37.1%',
      description: 'Find the next lexicographically greater permutation.',
      platform: 'leetcode',
      link: 'https://leetcode.com/problems/next-permutation/',
    },
    {
      id: 12,
      title: 'Rotate Image',
      difficulty: 'medium',
      category: 'Arrays',
      tags: ['array', 'matrix'],
      solved: false,
      acceptance: '68.9%',
      description: 'Rotate the matrix by 90 degrees clockwise.',
      platform: 'leetcode',
      link: 'https://leetcode.com/problems/rotate-image/',
    },
    {
      id: 13,
      title: 'Valid Parentheses',
      difficulty: 'easy',
      category: 'Strings',
      tags: ['string', 'stack'],
      solved: true,
      acceptance: '40.3%',
      description: 'Determine if the input string has valid parentheses.',
      platform: 'leetcode',
      link: 'https://leetcode.com/problems/valid-parentheses/',
    },
    {
      id: 14,
      title: 'Implement Trie',
      difficulty: 'medium',
      category: 'Strings',
      tags: ['trie', 'design'],
      solved: false,
      acceptance: '61.7%',
      description: 'Implement a trie with insert, search, and startsWith methods.',
      platform: 'leetcode',
      link: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
    },
    {
      id: 15,
      title: 'LRU Cache',
      difficulty: 'medium',
      category: 'Design',
      tags: ['linked-list', 'hash-table', 'design'],
      solved: false,
      acceptance: '40.1%',
      description: 'Design a data structure that follows LRU cache constraints.',
      platform: 'leetcode',
      link: 'https://leetcode.com/problems/lru-cache/',
    },
    {
      id: 16,
      title: 'Trapping Rain Water',
      difficulty: 'hard',
      category: 'Arrays',
      tags: ['array', 'two-pointers', 'dp'],
      solved: false,
      acceptance: '56.9%',
      description: 'Calculate how much water can be trapped after raining.',
      platform: 'leetcode',
      link: 'https://leetcode.com/problems/trapping-rain-water/',
    },
    {
      id: 17,
      title: 'Lowest Common Ancestor',
      difficulty: 'medium',
      category: 'Trees',
      tags: ['tree', 'dfs'],
      solved: false,
      acceptance: '54.3%',
      description: 'Find the lowest common ancestor of two nodes in a BST.',
      platform: 'leetcode',
      link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
    },
    {
      id: 18,
      title: 'Serialize and Deserialize Binary Tree',
      difficulty: 'hard',
      category: 'Trees',
      tags: ['tree', 'design', 'dfs'],
      solved: false,
      acceptance: '52.7%',
      description: 'Design an algorithm to serialize and deserialize a binary tree.',
      platform: 'leetcode',
      link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
    },
    {
      id: 19,
      title: 'Course Schedule',
      difficulty: 'medium',
      category: 'Graphs',
      tags: ['graph', 'topological-sort', 'dfs'],
      solved: false,
      acceptance: '46.2%',
      description: 'Determine if you can finish all courses given prerequisites.',
      platform: 'leetcode',
      link: 'https://leetcode.com/problems/course-schedule/',
    },
    {
      id: 20,
      title: 'Edit Distance',
      difficulty: 'hard',
      category: 'Dynamic Programming',
      tags: ['dp', 'string'],
      solved: false,
      acceptance: '52.1%',
      description: 'Find minimum operations to convert one string to another.',
      platform: 'leetcode',
      link: 'https://leetcode.com/problems/edit-distance/',
    },
  ];

  useEffect(() => {
    let filtered = allProblems;

    // Filter by difficulty
    if (filter !== 'all') {
      filtered = filtered.filter(p => p.difficulty === filter);
    }

    // Filter by search
    if (search) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    setProblems(filtered);
  }, [filter, search]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'hard':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400';
    }
  };

  const getPlatformColor = (platform) => {
    return platform === 'leetcode' 
      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
      : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
  };

  const stats = {
    total: allProblems.length,
    solved: allProblems.filter(p => p.solved).length,
    easy: allProblems.filter(p => p.difficulty === 'easy').length,
    medium: allProblems.filter(p => p.difficulty === 'medium').length,
    hard: allProblems.filter(p => p.difficulty === 'hard').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-coral to-secondary py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-white mb-3">💻 Code Practice</h1>
          <p className="text-white/90 text-lg">Sharpen your coding skills with curated problems</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.solved}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Solved</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.easy}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Easy</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.medium}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Medium</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.hard}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Hard</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="🔍 Search problems or tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  filter === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('easy')}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  filter === 'easy'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Easy
              </button>
              <button
                onClick={() => setFilter('medium')}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  filter === 'medium'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setFilter('hard')}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  filter === 'hard'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Hard
              </button>
            </div>
          </div>
        </div>

        {/* Problems List */}
        <div className="space-y-4">
          {problems.map((problem) => (
            <div
              key={problem.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    {problem.solved && (
                      <span className="text-green-500 text-xl">✓</span>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {problem.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty.toUpperCase()}
                    </span>
                    {problem.platform && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPlatformColor(problem.platform)}`}>
                        {problem.platform === 'leetcode' ? '🟧 LeetCode' : '🟩 GeeksforGeeks'}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {problem.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {problem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>📂 {problem.category}</span>
                    <span>✅ {problem.acceptance}</span>
                  </div>
                </div>
                {problem.link ? (
                  <a
                    href={problem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition shadow-md whitespace-nowrap"
                  >
                    Solve Problem →
                  </a>
                ) : (
                  <button className="px-6 py-2 bg-gray-400 text-white rounded-lg font-medium shadow-md whitespace-nowrap cursor-not-allowed">
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {problems.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No problems found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodePractice;
