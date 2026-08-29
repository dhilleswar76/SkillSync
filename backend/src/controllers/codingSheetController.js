const CodingSheetProgress = require("../models/CodingSheetProgress");

const SHEETS_METADATA = [
  {
    id: "admin-sheet",
    name: "Admin Sheet",
    author: "Official Admin Sheet",
    totalProblems: 382,
    difficulty: "All Levels (Beginner to Advanced)",
    category: "DSA Sheet",
    badge: "👑 Featured Admin Sheet",
    icon: "👑",
    description: "The Official Admin Sheet containing 382 comprehensive pattern-wise DSA problems across 17 topics and 69 algorithmic sub-modules (Two-Pointer, Sliding Window, Prefix Sum, Kadane, Binary Search, Stack, Trees, Graphs, DP).",
    tags: ["Admin Sheet", "Pattern-Wise", "Two-Pointer", "Sliding Window", "Binary Search", "Trees", "Graphs", "DP"],
    isFeaturedAdmin: true,
    originalUrl: "https://leetcode.com/problemset/all/",
    sourceLabel: "Admin Curated",
  },
  {
    id: "striver-sde",
    name: "Striver's SDE Sheet",
    author: "Take U Forward (Striver)",
    totalProblems: 191,
    difficulty: "Medium - Hard",
    category: "DSA Sheet",
    badge: "Most Popular",
    icon: "🔥",
    description: "The top 191 coding interview questions asked in top product-based companies like FAANG, Microsoft, and Amazon.",
    tags: ["Arrays", "Linked List", "Greedy", "Binary Search", "Trees", "Graphs", "DP", "Trie"],
    originalUrl: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/",
    sourceLabel: "TakeUForward Official",
  },
  {
    id: "striver-a2z",
    name: "Striver's A2Z DSA Sheet",
    author: "Take U Forward (Striver)",
    totalProblems: 455,
    difficulty: "Beginner to Advanced",
    category: "DSA Sheet",
    badge: "Complete Roadmap",
    icon: "🗺️",
    description: "From step-by-step basics (patterns, sorting, math) all the way to advanced trees, graphs, dynamic programming, and tries.",
    tags: ["Step 1-18", "Complete DSA", "Patterns", "Recursion", "Trees", "DP"],
    originalUrl: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/",
    sourceLabel: "TakeUForward A2Z",
  },
  {
    id: "neetcode-150",
    name: "NeetCode 150",
    author: "NeetCode",
    totalProblems: 150,
    difficulty: "All Levels",
    category: "DSA Sheet",
    badge: "Pattern Based",
    icon: "⚡",
    description: "Carefully curated 150 LeetCode problems covering all essential algorithmic patterns for technical interviews.",
    tags: ["Arrays & Hashing", "Two Pointers", "Sliding Window", "Binary Search", "Trees", "DP"],
    originalUrl: "https://neetcode.io/practice",
    sourceLabel: "NeetCode.io",
  },
  {
    id: "blind-75",
    name: "Blind 75 Must-Do",
    author: "Yangshun Tay",
    totalProblems: 75,
    difficulty: "Intermediate",
    category: "DSA Sheet",
    badge: "Essential",
    icon: "🎯",
    description: "The classic 75 questions that give maximum coverage of core computer science interview problems.",
    tags: ["Arrays", "Binary", "DP", "Graph", "Interval", "Linked List", "Tree"],
    originalUrl: "https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions",
    sourceLabel: "Blind 75 Discussion",
  },
  {
    id: "love-babbar",
    name: "Love Babbar 450 DSA Sheet",
    author: "Love Babbar",
    totalProblems: 450,
    difficulty: "All Levels",
    category: "DSA Sheet",
    badge: "Comprehensive",
    icon: "⭐",
    description: "Comprehensive 450 DSA questions curated by Love Babbar to master interview coding and placement prep.",
    tags: ["Arrays", "Matrix", "Strings", "Search/Sort", "BST", "Greedy", "Backtracking", "DP"],
    originalUrl: "https://450dsa.com/",
    sourceLabel: "450dsa.com",
  },
  {
    id: "top-interview-150",
    name: "LeetCode Top Interview 150",
    author: "LeetCode Official",
    totalProblems: 150,
    difficulty: "Easy to Hard",
    category: "DSA Sheet",
    badge: "Official",
    icon: "🏆",
    description: "LeetCode's official curated collection of 150 must-solve interview questions across top tech companies.",
    tags: ["Array/String", "Hashmap", "Stack", "Binary Tree", "Graph", "DP", "Divide & Conquer"],
    originalUrl: "https://leetcode.com/studyplan/top-interview-150/",
    sourceLabel: "LeetCode Study Plan",
  },
  {
    id: "rising-brain",
    name: "Rising Brain DSA Patterns",
    author: "Rising Brain",
    totalProblems: 300,
    difficulty: "Pattern Mastery",
    category: "DSA Sheet",
    badge: "Pattern Focused",
    icon: "🧠",
    description: "Pattern-oriented problem sets focusing on 14+ core interview algorithms and mental models.",
    tags: ["Sliding Window", "Two Heaps", "Fast/Slow Pointers", "Merge Intervals", "Subsets"],
    originalUrl: "https://risingbrain.org/",
    sourceLabel: "Rising Brain Official",
  },
  {
    id: "striver-79",
    name: "Striver 79 Last Minute Sheet",
    author: "Take U Forward",
    totalProblems: 79,
    difficulty: "High Yield",
    category: "DSA Sheet",
    badge: "Quick Revision",
    icon: "⏱️",
    description: "Last moment high-yield 79 questions to revise core concepts in the final 48 hours before an interview.",
    tags: ["Quick Revision", "Arrays", "Trees", "Graphs", "DP"],
    originalUrl: "https://takeuforward.org/interview-sheets/strivers-79-last-moment-dsa-sheet-ace-interviews/",
    sourceLabel: "TakeUForward 79",
  },
  {
    id: "tuf-cp",
    name: "TUF Competitive Programming Sheet",
    author: "Take U Forward",
    totalProblems: 250,
    difficulty: "Hard / Advanced",
    category: "Competitive Programming",
    badge: "Advanced",
    icon: "🚀",
    description: "Advanced algorithms, Segment Trees, Fenwick Trees, Number Theory, Game Theory, and CP problem solving.",
    tags: ["Segment Tree", "Number Theory", "DSU", "Bitmask DP", "Graphs"],
    originalUrl: "https://takeuforward.org/competitive-programming/strivers-cp-sheet/",
    sourceLabel: "TUF CP Sheet",
  },
  {
    id: "cs-operating-systems",
    name: "Operating Systems Interview Sheet",
    author: "Core CS",
    totalProblems: 90,
    difficulty: "Concepts & Q&A",
    category: "CS Fundamentals",
    badge: "Core Subject",
    icon: "💻",
    description: "Essential OS questions covering Process Scheduling, Deadlocks, Virtual Memory, Paging, and Threading.",
    tags: ["Processes", "Threads", "Scheduling", "Deadlocks", "Memory Management", "Virtual Memory"],
    originalUrl: "https://www.geeksforgeeks.org/operating-systems/",
    sourceLabel: "GeeksforGeeks OS",
  },
  {
    id: "cs-computer-networks",
    name: "Computer Networks Interview Sheet",
    author: "Core CS",
    totalProblems: 85,
    difficulty: "Concepts & Q&A",
    category: "CS Fundamentals",
    badge: "Core Subject",
    icon: "🌐",
    description: "Master TCP/IP, OSI model, HTTP/HTTPS, DNS, Routing, Sockets, and network security protocols.",
    tags: ["OSI Model", "TCP/IP", "HTTP/3", "DNS", "Routing", "TLS/SSL"],
    originalUrl: "https://www.geeksforgeeks.org/computer-network-tutorials/",
    sourceLabel: "GeeksforGeeks CN",
  },
  {
    id: "cs-dbms-sql",
    name: "DBMS & SQL Interview Sheet",
    author: "Core CS",
    totalProblems: 100,
    difficulty: "Concepts & Queries",
    category: "CS Fundamentals",
    badge: "Core Subject",
    icon: "🗄️",
    description: "Relational database concepts, Normalization, ACID transactions, Indexing, B-Trees, and complex SQL queries.",
    tags: ["SQL", "ACID", "Normalization", "Indexing", "Transactions", "NoSQL"],
    originalUrl: "https://www.geeksforgeeks.org/dbms/",
    sourceLabel: "GeeksforGeeks DBMS",
  },
  {
    id: "cs-system-design",
    name: "System Design Primer & Sheet",
    author: "High-Level Architecture",
    totalProblems: 60,
    difficulty: "Intermediate - Advanced",
    category: "CS Fundamentals",
    badge: "Architecture",
    icon: "🏗️",
    description: "Scalability, Load Balancing, Caching, Sharding, Message Queues, Microservices, and real-world system designs.",
    tags: ["Scalability", "Caching", "Sharding", "Microservices", "Rate Limiting", "CAP Theorem"],
    originalUrl: "https://github.com/donnemartin/system-design-primer",
    sourceLabel: "System Design Primer (GitHub)",
  },
];

// @desc Get all coding sheets metadata
// @route GET /api/coding-sheets
const getAllSheets = async (req, res) => {
  try {
    res.json(SHEETS_METADATA);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single sheet metadata
// @route GET /api/coding-sheets/:sheetId
const getSheetById = async (req, res) => {
  try {
    const { sheetId } = req.params;
    const sheet = SHEETS_METADATA.find((s) => s.id === sheetId);
    if (!sheet) {
      return res.status(404).json({ message: "Coding sheet not found" });
    }
    res.json(sheet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get user progress for a sheet
// @route GET /api/coding-sheets/:sheetId/progress
const getSheetProgress = async (req, res) => {
  try {
    const { sheetId } = req.params;
    const userId = req.user ? req.user._id : null;

    if (!userId) {
      return res.json({ completedProblemIds: [], starredProblemIds: [], notes: {}, customCode: {} });
    }

    const progress = await CodingSheetProgress.findOne({ user: userId, sheetId });
    if (!progress) {
      return res.json({ completedProblemIds: [], starredProblemIds: [], notes: {}, customCode: {} });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update user progress for a sheet
// @route POST /api/coding-sheets/:sheetId/progress
const updateSheetProgress = async (req, res) => {
  try {
    const { sheetId } = req.params;
    const userId = req.user._id;
    const { completedProblemIds, starredProblemIds, notes, customCode } = req.body;

    let progress = await CodingSheetProgress.findOne({ user: userId, sheetId });

    if (!progress) {
      progress = new CodingSheetProgress({
        user: userId,
        sheetId,
        completedProblemIds: completedProblemIds || [],
        starredProblemIds: starredProblemIds || [],
        notes: notes || {},
        customCode: customCode || {},
      });
    } else {
      if (completedProblemIds !== undefined) progress.completedProblemIds = completedProblemIds;
      if (starredProblemIds !== undefined) progress.starredProblemIds = starredProblemIds;
      if (notes !== undefined) progress.notes = notes;
      if (customCode !== undefined) progress.customCode = customCode;
    }

    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSheets,
  getSheetById,
  getSheetProgress,
  updateSheetProgress,
};
