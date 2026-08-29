const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const User = require("../models/User");
const Progress = require("../models/Progress");

// Default initial courses to seed if database has 0 courses
const SEED_COURSES = [
  {
    title: "DSA Fundamentals & Algorithms Mastery",
    category: "DSA",
    level: "Beginner",
    duration: 40,
    thumbnail: "https://images.unsplash.com/photo-1516116211227-bbc0656a811c?w=800",
    description: "Master essential data structures (Arrays, Linked Lists, Stacks, Trees) and algorithms from scratch.",
    isPublished: true,
    modules: [
      {
        title: "Module 1: Linear Data Structures & Arrays",
        duration: "2.5 Hours",
        topics: [
          {
            title: "Array Data Structure & Memory Layout",
            theoryUrl: "https://www.geeksforgeeks.org/array-data-structure/",
            videoUrl: "https://www.youtube.com/watch?v=7zgqK3rSg7I",
            videoChannel: "freeCodeCamp",
          },
          {
            title: "Two Pointer & Sliding Window Patterns",
            theoryUrl: "https://takeuforward.org/data-structure/sliding-window-and-two-pointer-combined-problems/",
            videoUrl: "https://www.youtube.com/watch?v=jM2dhDPYMQM",
            videoChannel: "Abdul Bari",
          },
        ],
      },
      {
        title: "Module 2: Linked Lists & Pointers",
        duration: "3 Hours",
        topics: [
          {
            title: "Singly & Doubly Linked List Fundamentals",
            theoryUrl: "https://www.geeksforgeeks.org/data-structures/linked-list/",
            videoUrl: "https://www.youtube.com/watch?v=nobWGgA19qI",
            videoChannel: "mycodeschool",
          },
          {
            title: "Cycle Detection & Fast/Slow Pointer Algorithm",
            theoryUrl: "https://takeuforward.org/data-structure/detect-a-cycle-in-a-linked-list/",
            videoUrl: "https://www.youtube.com/watch?v=wiOo4DC5GGA",
            videoChannel: "take U forward",
          },
        ],
      },
      {
        title: "Module 3: Binary Trees, BST & Traversals",
        duration: "4 Hours",
        topics: [
          {
            title: "Binary Tree Representation & Inorder/Preorder Traversals",
            theoryUrl: "https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/",
            videoUrl: "https://www.youtube.com/watch?v=jmy0LaGET1I",
            videoChannel: "take U forward",
          },
          {
            title: "Binary Search Tree (BST) Properties & Operations",
            theoryUrl: "https://www.geeksforgeeks.org/binary-search-tree-data-structure/",
            videoUrl: "https://www.youtube.com/watch?v=pYT9F8_LFTM",
            videoChannel: "mycodeschool",
          },
        ],
      },
    ],
  },
  {
    title: "Full Stack MERN Web Development Masterclass",
    category: "Web Dev",
    level: "Intermediate",
    duration: 60,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    description: "Build robust, scalable full-stack web applications with React, Node.js, Express, and MongoDB.",
    isPublished: true,
    modules: [
      {
        title: "Module 1: React 18 Core & Component Lifecycle",
        duration: "4 Hours",
        topics: [
          {
            title: "JSX, Props, State, and Custom Hooks Architecture",
            theoryUrl: "https://react.dev/learn",
            videoUrl: "https://www.youtube.com/watch?v=bMknfKXIFA8",
            videoChannel: "freeCodeCamp",
          },
          {
            title: "State Management with Context API & Zustand",
            theoryUrl: "https://react.dev/learn/passing-data-deeply-with-context",
            videoUrl: "https://www.youtube.com/watch?v=35lXWvCuM8o",
            videoChannel: "Web Dev Simplified",
          },
        ],
      },
      {
        title: "Module 2: Node.js & Express RESTful APIs",
        duration: "4.5 Hours",
        topics: [
          {
            title: "Express Routing, Middlewares & Error Handling",
            theoryUrl: "https://expressjs.com/en/guide/routing.html",
            videoUrl: "https://www.youtube.com/watch?v=Oe421EPjeBE",
            videoChannel: "freeCodeCamp",
          },
          {
            title: "MongoDB Modeling, Mongoose Schemas & Transactions",
            theoryUrl: "https://mongoosejs.com/docs/guide.html",
            videoUrl: "https://www.youtube.com/watch?v=DZBGEExL2LU",
            videoChannel: "Traversy Media",
          },
        ],
      },
    ],
  },
  {
    title: "Machine Learning & AI Foundations",
    category: "ML / AI",
    level: "Beginner",
    duration: 45,
    thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
    description: "Introduction to Supervised & Unsupervised Learning, Neural Networks, PyTorch, and NLP models.",
    isPublished: true,
    modules: [
      {
        title: "Module 1: Python Data Science Foundations",
        duration: "3.5 Hours",
        topics: [
          {
            title: "NumPy Vectorized Computing & Pandas DataFrames",
            theoryUrl: "https://pandas.pydata.org/docs/user_guide/index.html",
            videoUrl: "https://www.youtube.com/watch?v=r-uOLxNrNk8",
            videoChannel: "freeCodeCamp",
          },
        ],
      },
      {
        title: "Module 2: Supervised Learning Algorithms",
        duration: "4 Hours",
        topics: [
          {
            title: "Linear & Logistic Regression with Scikit-Learn",
            theoryUrl: "https://scikit-learn.org/stable/supervised_learning.html",
            videoUrl: "https://www.youtube.com/watch?v=7eh4d6sabA0",
            videoChannel: "StatQuest",
          },
        ],
      },
    ],
  },
  {
    title: "System Design for SDE-2 & Product Roles",
    category: "System Design",
    level: "Advanced",
    duration: 50,
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    description: "Learn how to architect high-availability systems: Load balancing, caching, sharding, and microservices.",
    isPublished: true,
    modules: [
      {
        title: "Module 1: Scalability & Load Balancing Principles",
        duration: "3 Hours",
        topics: [
          {
            title: "Horizontal vs Vertical Scaling & Layer 4/7 Load Balancers",
            theoryUrl: "https://github.com/donnemartin/system-design-primer",
            videoUrl: "https://www.youtube.com/watch?v=K0Ta65OqQkY",
            videoChannel: "Gaurav Sen",
          },
        ],
      },
    ],
  },
];

// @desc Get all courses (auto-seeds if database is empty)
// @route GET /api/courses
const getCourses = async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = { isPublished: true };

    if (category && category !== "All") {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    let courses = await Course.find(filter).populate("instructor", "name avatar");

    // Auto-seed default courses if collection is empty
    if (courses.length === 0 && !search && (!category || category === "All")) {
      const count = await Course.countDocuments();
      if (count === 0) {
        await Course.insertMany(SEED_COURSES);
        courses = await Course.find(filter).populate("instructor", "name avatar");
      }
    }

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get course by ID
// @route GET /api/courses/:id
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("instructor", "name avatar bio");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const lessons = await Lesson.find({ course: course._id }).sort("order");
    res.json({ ...course.toObject(), lessons });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get current user's enrolled courses with live progress tracking
// @route GET /api/courses/enrolled
const getEnrolledCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "enrolledCourses",
      populate: { path: "instructor", select: "name avatar" },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const enrolledList = user.enrolledCourses || [];
    if (enrolledList.length === 0) {
      return res.json([]);
    }

    const enrolledCourseIds = enrolledList.map((c) => c._id);
    const progressList = await Progress.find({
      user: req.user._id,
      course: { $in: enrolledCourseIds },
    });

    const progressMap = {};
    progressList.forEach((p) => {
      progressMap[p.course.toString()] = p;
    });

    const result = enrolledList.map((course) => {
      const courseObj = course.toObject ? course.toObject() : course;
      const progress = progressMap[course._id.toString()] || {
        completedTopics: [],
        completedLessons: [],
        percentage: 0,
        isCompleted: false,
      };

      let totalTopics = 0;
      if (courseObj.modules && Array.isArray(courseObj.modules)) {
        courseObj.modules.forEach((m) => {
          totalTopics += m.topics ? m.topics.length : 0;
        });
      }

      return {
        ...courseObj,
        progress: {
          percentage: progress.percentage || 0,
          completedTopicsCount: progress.completedTopics ? progress.completedTopics.length : 0,
          totalTopics: totalTopics,
          isCompleted: progress.isCompleted || false,
          updatedAt: progress.updatedAt || null,
        },
      };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Enroll logged-in user in a course
// @route POST /api/courses/:id/enroll
const enrollCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.enrolledCourses) {
      user.enrolledCourses = [];
    }

    const alreadyEnrolled = user.enrolledCourses.some(
      (cId) => cId && cId.toString() === id.toString()
    );

    if (!alreadyEnrolled) {
      user.enrolledCourses.push(course._id);
      await user.save();
    }

    // Ensure an initial progress record exists
    let progress = await Progress.findOne({ user: user._id, course: course._id });
    if (!progress) {
      progress = await Progress.create({
        user: user._id,
        course: course._id,
        completedTopics: [],
        completedLessons: [],
        quizScores: [],
        percentage: 0,
      });
    }

    res.json({
      message: "Successfully enrolled in course",
      courseId: course._id,
      isEnrolled: true,
      enrolledCount: user.enrolledCourses.length,
      progress,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Unenroll logged-in user from a course
// @route POST /api/courses/:id/unenroll
const unenrollCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.enrolledCourses = (user.enrolledCourses || []).filter(
      (cId) => cId && cId.toString() !== id.toString()
    );
    await user.save();

    res.json({
      message: "Successfully unenrolled from course",
      courseId: id,
      isEnrolled: false,
      enrolledCount: user.enrolledCourses.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create course (Admin)
// @route POST /api/courses
const createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      instructor: req.user._id,
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update course (Admin)
// @route PUT /api/courses/:id
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete course (Admin)
// @route DELETE /api/courses/:id
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    await Lesson.deleteMany({ course: req.params.id });
    res.json({ message: "Course and associated lessons removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  getEnrolledCourses,
  enrollCourse,
  unenrollCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
