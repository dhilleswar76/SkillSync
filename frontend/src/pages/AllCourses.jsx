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
      reviews: 847,
      icon: '🎯',
      instructor: 'Dr. Sarah Chen',
      instructorTitle: 'Senior Software Engineer at Google',
      language: 'English',
      subtitles: ['English', 'Hindi', 'Spanish'],
      lastUpdated: 'January 2026',
      certificate: true,
      description: 'Master the fundamentals of data structures and algorithms with this comprehensive beginner-friendly course. Learn to solve complex problems efficiently and ace your coding interviews.',
      longDescription: 'This comprehensive course covers all essential data structures and algorithms needed for technical interviews at top tech companies. You\'ll learn not just the concepts, but also when and how to apply them in real-world scenarios. Through hands-on coding exercises and interview-style problems, you\'ll build a strong foundation in computational thinking.',
      learningOutcomes: [
        'Implement and analyze fundamental data structures from scratch',
        'Master essential algorithms for searching, sorting, and recursion',
        'Solve 100+ coding problems on LeetCode and other platforms',
        'Understand time and space complexity analysis (Big O notation)',
        'Build problem-solving skills needed for technical interviews',
        'Learn to optimize solutions for better performance'
      ],
      prerequisites: [
        'Basic programming knowledge in any language (Python, Java, C++)',
        'Understanding of basic mathematics and logical thinking',
        'Familiarity with loops, functions, and conditionals'
      ],
      topics: ['Arrays & Strings', 'Linked Lists', 'Stacks & Queues', 'Sorting Algorithms', 'Binary Search', 'Recursion & Backtracking', 'Hash Tables', 'Two Pointers', 'Sliding Window'],
      curriculum: [
        { week: 1, title: 'Introduction to DSA & Arrays', lessons: 12, duration: '3h 45m' },
        { week: 2, title: 'Linked Lists Deep Dive', lessons: 10, duration: '3h 20m' },
        { week: 3, title: 'Stacks, Queues & Hash Tables', lessons: 14, duration: '4h 15m' },
        { week: 4, title: 'Sorting & Searching Algorithms', lessons: 11, duration: '3h 50m' },
        { week: 5, title: 'Recursion & Backtracking', lessons: 13, duration: '4h 30m' },
        { week: 6, title: 'Problem-Solving Patterns', lessons: 15, duration: '5h 0m' }
      ],
      features: ['Lifetime access', '100+ coding problems', 'Interview preparation guide', 'Certificate of completion', 'Mobile & TV access', 'Peer discussion forum'],
      externalResources: [
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/data-structures/', description: 'Complete DSA tutorials and examples' },
        { platform: 'TakeUforward', url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2', description: "Striver's A2Z DSA Sheet" },
        { platform: 'CodeChef', url: 'https://www.codechef.com/roadmap/beginner', description: 'Practice problems for beginners' }
      ],
      practiceProblems: '150+ problems curated from CodeChef, LeetCode, and Striver\'s DSA Sheet',
      targetAudience: ['Students preparing for coding interviews', 'Software engineers looking to strengthen DSA fundamentals', 'Computer science students', 'Self-taught developers transitioning to tech roles'],
    },
    {
      id: 'advanced-dsa',
      title: 'Advanced Data Structures & Algorithms',
      category: 'dsa',
      level: 'Advanced',
      duration: '10 weeks',
      modules: 8,
      enrolled: 1800,
      rating: 4.9,
      reviews: 623,
      icon: '🚀',
      instructor: 'Prof. Michael Zhang',
      instructorTitle: 'Ex-Facebook Tech Lead, Stanford CS Alumnus',
      language: 'English',
      subtitles: ['English', 'Hindi', 'Chinese'],
      lastUpdated: 'December 2025',
      certificate: true,
      description: 'Master advanced data structures including trees, graphs, and complex algorithms. Perfect for experienced programmers targeting senior roles at FAANG companies.',
      longDescription: 'Take your algorithmic skills to the next level with this advanced course covering trees, graphs, dynamic programming, and system design patterns. Learn the advanced techniques used by senior engineers at top tech companies. This course includes real interview problems from Google, Amazon, Facebook, and Microsoft.',
      learningOutcomes: [
        'Master complex tree and graph algorithms',
        'Implement dynamic programming solutions efficiently',
        'Design optimal algorithms for NP-hard problems',
        'Understand and apply greedy algorithms',
        'Solve advanced LeetCode hard problems',
        'Prepare for senior-level technical interviews'
      ],
      prerequisites: [
        'Strong understanding of basic data structures',
        'Proficiency in at least one programming language',
        'Completed DSA fundamentals or equivalent knowledge',
        'Experience solving medium-level coding problems'
      ],
      topics: ['Binary Trees & BST', 'Graph Algorithms', 'Dynamic Programming', 'Greedy Algorithms', 'Heaps & Priority Queues', 'Tries & Suffix Trees', 'Advanced Recursion', 'Bit Manipulation'],
      curriculum: [
        { week: 1, title: 'Binary Trees & Binary Search Trees', lessons: 15, duration: '5h 30m' },
        { week: 2, title: 'Advanced Tree Algorithms', lessons: 13, duration: '4h 45m' },
        { week: 3, title: 'Graph Theory & BFS/DFS', lessons: 16, duration: '5h 50m' },
        { week: 4, title: 'Advanced Graph Algorithms', lessons: 14, duration: '5h 15m' },
        { week: 5, title: 'Dynamic Programming Foundations', lessons: 17, duration: '6h 20m' },
        { week: 6, title: 'Advanced DP Patterns', lessons: 15, duration: '5h 45m' },
        { week: 7, title: 'Greedy Algorithms & Heaps', lessons: 12, duration: '4h 30m' },
        { week: 8, title: 'Tries, Segment Trees & Advanced Topics', lessons: 14, duration: '5h 0m' }
      ],
      features: ['200+ advanced problems', 'FAANG interview patterns', 'Live coding sessions', 'System design integration', 'Resume review session', 'Mock interview practice'],
      externalResources: [
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/top-algorithms-and-data-structures-for-competitive-programming/', description: 'Advanced algorithms for competitive programming' },
        { platform: 'TakeUforward', url: 'https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/', description: "Striver's SDE Sheet - Top interview problems" },
        { platform: 'CodeChef', url: 'https://www.codechef.com/roadmap/advanced', description: 'Advanced competitive programming problems' }
      ],
      practiceProblems: '250+ hard problems from LeetCode, CodeChef Division 1, and Striver\'s SDE Sheet',
      targetAudience: ['Experienced developers aiming for FAANG companies', 'Software engineers preparing for senior roles', 'Competitive programmers', 'Computer science graduates'],
    },
    // Web Development Courses
    {
      id: 'html-css-js',
      title: 'Modern Web Development: HTML, CSS & JavaScript',
      category: 'webdev',
      level: 'Beginner',
      duration: '6 weeks',
      modules: 5,
      enrolled: 3200,
      rating: 4.7,
      reviews: 1245,
      icon: '🌐',
      instructor: 'Emma Rodriguez',
      instructorTitle: 'Frontend Developer at Shopify, Web Design Expert',
      language: 'English',
      subtitles: ['English', 'Hindi', 'Spanish', 'French'],
      lastUpdated: 'February 2026',
      certificate: true,
      description: 'Build beautiful, responsive websites from scratch. Master HTML5, CSS3, modern JavaScript, and create stunning web projects that work on all devices.',
      longDescription: 'Start your web development journey with this comprehensive course covering HTML5, CSS3, and modern JavaScript. You\'ll learn by building real projects including a portfolio website, a restaurant landing page, and an interactive quiz app. This course focuses on modern best practices and responsive design principles used by professional web developers.',
      learningOutcomes: [
        'Build responsive websites using HTML5 and CSS3',
        'Master modern JavaScript ES6+ features',
        'Create interactive user interfaces with DOM manipulation',
        'Implement mobile-first responsive design',
        'Use Flexbox and CSS Grid for layouts',
        'Deploy websites to production using GitHub Pages'
      ],
      prerequisites: [
        'No programming experience required',
        'A computer with internet connection',
        'Passion for learning web development'
      ],
      topics: ['HTML5 Semantics', 'CSS3 Styling', 'Flexbox & Grid', 'JavaScript ES6+', 'DOM Manipulation', 'Responsive Design', 'Web Accessibility', 'Git & Version Control'],
      curriculum: [
        { week: 1, title: 'HTML Fundamentals & Structure', lessons: 10, duration: '2h 45m' },
        { week: 2, title: 'CSS Styling & Layouts', lessons: 12, duration: '3h 30m' },
        { week: 3, title: 'Advanced CSS & Responsive Design', lessons: 11, duration: '3h 15m' },
        { week: 4, title: 'JavaScript Basics & ES6', lessons: 14, duration: '4h 20m' },
        { week: 5, title: 'DOM Manipulation & Events', lessons: 13, duration: '3h 50m' },
        { week: 6, title: 'Final Projects & Deployment', lessons: 8, duration: '2h 30m' }
      ],
      features: ['5 real-world projects', 'Code along videos', 'Downloadable resources', 'Responsive design templates', 'Career guidance', 'Portfolio building tips'],
      externalResources: [
        { platform: 'W3Schools', url: 'https://www.w3schools.com/html/', description: 'HTML5 complete reference and interactive examples' },
        { platform: 'W3Schools', url: 'https://www.w3schools.com/css/', description: 'CSS3 tutorials and properties guide' },
        { platform: 'W3Schools', url: 'https://www.w3schools.com/js/', description: 'JavaScript ES6+ comprehensive tutorials' },
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/web-development/', description: 'Web development concepts and best practices' }
      ],
      practiceProblems: '50+ UI challenges and web projects from W3Schools exercises',
      targetAudience: ['Complete beginners to web development', 'Designers wanting to code their designs', 'Students learning web development', 'Career changers entering tech'],
    },
    {
      id: 'react-mastery',
      title: 'React.js - Complete Guide (Hooks, Context, Redux)',
      category: 'webdev',
      level: 'Intermediate',
      duration: '8 weeks',
      modules: 7,
      enrolled: 2900,
      rating: 4.9,
      reviews: 1567,
      icon: '⚛️',
      instructor: 'James Wilson',
      instructorTitle: 'Senior React Developer at Netflix, Open Source Contributor',
      language: 'English',
      subtitles: ['English', 'Hindi', 'Spanish', 'Portuguese'],
      lastUpdated: 'January 2026',
      certificate: true,
      description: 'Master React.js from fundamentals to advanced patterns. Learn Hooks, Context API, Redux, React Router, performance optimization, and modern best practices.',
      longDescription: 'Become a React expert with this comprehensive course covering everything from basic components to advanced state management with Redux. You\'ll build multiple production-ready applications including a social media dashboard, e-commerce store, and real-time chat application. Learn the patterns and practices used by industry-leading companies.',
      learningOutcomes: [
        'Build complex React applications with confidence',
        'Master React Hooks (useState, useEffect, useContext, custom hooks)',
        'Implement global state management with Redux and Context API',
        'Create dynamic routes with React Router v6',
        'Optimize React app performance and bundle size',
        'Test React components with Jest and React Testing Library'
      ],
      prerequisites: [
        'Strong knowledge of JavaScript ES6+',
        'Understanding of HTML and CSS',
        'Basic understanding of async programming',
        'Familiarity with npm and package managers'
      ],
      topics: ['Components & JSX', 'React Hooks', 'State Management', 'React Router v6', 'Redux Toolkit', 'Performance Optimization', 'Testing', 'TypeScript with React', 'Next.js Introduction'],
      curriculum: [
        { week: 1, title: 'React Fundamentals & Components', lessons: 15, duration: '4h 30m' },
        { week: 2, title: 'React Hooks Deep Dive', lessons: 13, duration: '4h 15m' },
        { week: 3, title: 'Advanced State Management', lessons: 12, duration: '3h 50m' },
        { week: 4, title: 'React Router & Navigation', lessons: 10, duration: '3h 20m' },
        { week: 5, title: 'Redux & Redux Toolkit', lessons: 14, duration: '4h 45m' },
        { week: 6, title: 'Performance & Optimization', lessons: 11, duration: '3h 40m' },
        { week: 7, title: 'Testing & Production Deployment', lessons: 12, duration: '4h 0m' }
      ],
      features: ['3 full-stack projects', 'Real API integration', 'Authentication patterns', 'Deployment guides', 'Code review sessions', 'React best practices guide'],
      externalResources: [
        { platform: 'W3Schools', url: 'https://www.w3schools.com/react/', description: 'React.js tutorial with interactive examples' },
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/reactjs-tutorials/', description: 'React hooks and advanced patterns' },
        { platform: 'W3Schools', url: 'https://www.w3schools.com/react/react_router.asp', description: 'React Router complete guide' }
      ],
      practiceProblems: '40+ React component challenges and mini-projects',
      targetAudience: ['JavaScript developers learning React', 'Frontend developers upgrading skills', 'Web developers building SPAs', 'Full-stack developers'],
    },
    {
      id: 'mern-fullstack',
      title: 'Complete MERN Stack Development Bootcamp',
      category: 'webdev',
      level: 'Advanced',
      duration: '12 weeks',
      modules: 10,
      enrolled: 2100,
      rating: 4.8,
      reviews: 892,
      icon: '🔥',
      instructor: 'Aisha Patel',
      instructorTitle: 'Full-Stack Engineer at Airbnb, Tech Educator',
      language: 'English',
      subtitles: ['English', 'Hindi', 'Spanish'],
      lastUpdated: 'December 2025',
      certificate: true,
      description: 'Build production-ready full-stack applications with MongoDB, Express.js, React, and Node.js. Learn authentication, APIs, deployment, and real-world development practices.',
      longDescription: 'Master the complete MERN stack and become a full-stack developer. This intensive bootcamp covers everything from database design to deployment. You\'ll build 3 major projects including a social network, e-commerce platform, and project management tool. Learn industry best practices for authentication, security, testing, and DevOps.',
      learningOutcomes: [
        'Build complete full-stack applications independently',
        'Design RESTful APIs with Express.js and Node.js',
        'Implement secure authentication with JWT and OAuth',
        'Work with MongoDB and Mongoose for data persistence',
        'Deploy applications to AWS, Heroku, and Vercel',
        'Implement real-time features with Socket.io'
      ],
      prerequisites: [
        'Proficiency in JavaScript and React',
        'Basic understanding of databases',
        'Familiarity with REST APIs',
        'Knowledge of Git and command line'
      ],
      topics: ['MongoDB & Mongoose', 'Express.js APIs', 'React.js Frontend', 'Node.js Backend', 'REST API Design', 'JWT Authentication', 'Payment Integration', 'AWS Deployment', 'Socket.io', 'Testing & CI/CD'],
      curriculum: [
        { week: 1, title: 'Node.js & Express Fundamentals', lessons: 14, duration: '5h 0m' },
        { week: 2, title: 'MongoDB & Database Design', lessons: 12, duration: '4h 30m' },
        { week: 3, title: 'RESTful API Development', lessons: 15, duration: '5h 20m' },
        { week: 4, title: 'Authentication & Authorization', lessons: 13, duration: '4h 45m' },
        { week: 5, title: 'React Frontend Integration', lessons: 14, duration: '5h 10m' },
        { week: 6, title: 'Advanced CRUD Operations', lessons: 11, duration: '4h 15m' },
        { week: 7, title: 'File Uploads & Cloud Storage', lessons: 10, duration: '3h 50m' },
        { week: 8, title: 'Payment Integration & Webhooks', lessons: 12, duration: '4h 30m' },
        { week: 9, title: 'Real-time Features with Socket.io', lessons: 13, duration: '4h 40m' },
        { week: 10, title: 'Testing, Security & Deployment', lessons: 15, duration: '5h 30m' }
      ],
      features: ['3 production-ready projects', 'GitHub repository access', 'Interview preparation', 'Resume building workshop', 'Job search strategies', 'Alumni network access'],
      externalResources: [
        { platform: 'W3Schools', url: 'https://www.w3schools.com/nodejs/', description: 'Node.js and Express.js complete guide' },
        { platform: 'W3Schools', url: 'https://www.w3schools.com/mongodb/', description: 'MongoDB tutorial and queries' },
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/mern-stack/', description: 'MERN stack development best practices' },
        { platform: 'W3Schools', url: 'https://www.w3schools.com/react/', description: 'React.js frontend integration' }
      ],
      practiceProblems: '25+ full-stack project ideas and API challenges',
      targetAudience: ['Developers wanting full-stack skills', 'React developers learning backend', 'Career changers entering web development', 'Freelancers expanding capabilities'],
    },
    // Machine Learning Courses
    {
      id: 'ml-basics',
      title: 'Machine Learning A-Z: From Fundamentals to Production',
      category: 'ml',
      level: 'Intermediate',
      duration: '10 weeks',
      modules: 8,
      enrolled: 1900,
      rating: 4.7,
      reviews: 734,
      icon: '🤖',
      instructor: 'Dr. Rajesh Kumar',
      instructorTitle: 'ML Research Scientist at OpenAI, PhD in AI',
      language: 'English',
      subtitles: ['English', 'Hindi', 'Chinese', 'Spanish'],
      lastUpdated: 'January 2026',
      certificate: true,
      description: 'Master machine learning algorithms from scratch. Learn supervised and unsupervised learning, model evaluation, and deploy ML models to production.',
      longDescription: 'This comprehensive machine learning course takes you from basics to building production-ready ML systems. Learn theory and practical implementation using Python, scikit-learn, and pandas. Work on real-world datasets and understand when to use which algorithm. Perfect for data scientists and developers entering the AI field.',
      learningOutcomes: [
        'Implement ML algorithms from scratch in Python',
        'Master supervised learning (regression, classification)',
        'Apply unsupervised learning techniques (clustering, dimensionality reduction)',
        'Evaluate and improve model performance',
        'Handle real-world messy datasets',
        'Deploy ML models using Flask and Docker'
      ],
      prerequisites: [
        'Strong Python programming skills',
        'Basic statistics and linear algebra',
        'Understanding of calculus concepts',
        'Familiarity with NumPy and Pandas'
      ],
      topics: ['Supervised Learning', 'Linear & Logistic Regression', 'Decision Trees & Random Forests', 'SVM', 'Clustering (K-Means, DBSCAN)', 'Dimensionality Reduction (PCA)', 'Model Evaluation', 'Feature Engineering', 'Hyperparameter Tuning'],
      curriculum: [
        { week: 1, title: 'ML Fundamentals & Python Setup', lessons: 12, duration: '4h 15m' },
        { week: 2, title: 'Regression Algorithms', lessons: 14, duration: '4h 50m' },
        { week: 3, title: 'Classification Algorithms', lessons: 15, duration: '5h 20m' },
        { week: 4, title: 'Tree-Based Methods', lessons: 13, duration: '4h 40m' },
        { week: 5, title: 'Support Vector Machines', lessons: 11, duration: '4h 0m' },
        { week: 6, title: 'Unsupervised Learning', lessons: 14, duration: '5h 10m' },
        { week: 7, title: 'Model Selection & Tuning', lessons: 12, duration: '4h 25m' },
        { week: 8, title: 'ML Pipeline & Deployment', lessons: 13, duration: '4h 45m' }
      ],
      features: ['10+ real datasets', 'Kaggle competition walkthrough', 'ML interview prep', 'Model deployment guide', 'Python notebooks included', 'Career roadmap'],
      externalResources: [
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/machine-learning/', description: 'ML algorithms explained with code examples' },
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/python-numpy/', description: 'NumPy and Pandas for data manipulation' },
        { platform: 'W3Schools', url: 'https://www.w3schools.com/python/python_ml_getting_started.asp', description: 'Python machine learning tutorials' }
      ],
      practiceProblems: '30+ real-world ML projects and Kaggle dataset challenges',
      targetAudience: ['Software developers entering ML', 'Data analysts transitioning to ML', 'Students pursuing data science', 'Professionals upskilling in AI'],
    },
    {
      id: 'deep-learning',
      title: 'Deep Learning Specialization - Neural Networks & TensorFlow',
      category: 'ml',
      level: 'Advanced',
      duration: '12 weeks',
      modules: 10,
      enrolled: 1500,
      rating: 4.9,
      reviews: 612,
      icon: '🧠',
      instructor: 'Dr. Maria Chen',
      instructorTitle: 'Deep Learning Researcher at DeepMind, Author',
      language: 'English',
      subtitles: ['English', 'Hindi', 'Chinese'],
      lastUpdated: 'February 2026',
      certificate: true,
      description: 'Master deep learning with neural networks, CNNs, RNNs, and Transformers. Build advanced AI models using TensorFlow and Keras for computer vision and NLP.',
      longDescription: 'Dive deep into neural networks and modern deep learning architectures. This advanced course covers CNNs for computer vision, RNNs and LSTMs for sequence modeling, and Transformer architectures. Build cutting-edge models for image recognition, object detection, and natural language processing. Includes transfer learning and model optimization techniques.',
      learningOutcomes: [
        'Build neural networks from scratch and with TensorFlow',
        'Implement CNNs for image classification and object detection',
        'Create RNNs and LSTMs for sequence modeling',
        'Understand and apply Transformer architecture',
        'Use transfer learning with pre-trained models',
        'Optimize and deploy deep learning models at scale'
      ],
      prerequisites: [
        'Strong machine learning fundamentals',
        'Proficiency in Python and NumPy',
        'Linear algebra and calculus knowledge',
        'Experience with TensorFlow or PyTorch basics'
      ],
      topics: ['Neural Networks', 'Backpropagation', 'CNNs', 'Object Detection (YOLO, R-CNN)', 'RNNs & LSTMs', 'Attention Mechanisms', 'Transformers', 'Transfer Learning', 'GANs', 'Model Optimization'],
      curriculum: [
        { week: 1, title: 'Neural Network Fundamentals', lessons: 14, duration: '5h 30m' },
        { week: 2, title: 'Deep Neural Networks & Optimization', lessons: 13, duration: '5h 0m' },
        { week: 3, title: 'Convolutional Neural Networks', lessons: 15, duration: '5h 45m' },
        { week: 4, title: 'Advanced CNN Architectures', lessons: 14, duration: '5h 20m' },
        { week: 5, title: 'Object Detection & Segmentation', lessons: 12, duration: '4h 50m' },
        { week: 6, title: 'Recurrent Neural Networks', lessons: 13, duration: '5h 10m' },
        { week: 7, title: 'LSTMs & Sequence Modeling', lessons: 14, duration: '5h 30m' },
        { week: 8, title: 'Attention & Transformers', lessons: 15, duration: '6h 0m' },
        { week: 9, title: 'Transfer Learning & Fine-tuning', lessons: 11, duration: '4h 30m' },
        { week: 10, title: 'GANs & Advanced Topics', lessons: 13, duration: '5h 15m' }
      ],
      features: ['GPU training access', 'Research paper reviews', 'Kaggle competition project', 'Model zoo access', 'Community forums', 'Research mentorship'],
      externalResources: [
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/deep-learning-tutorial/', description: 'Deep learning fundamentals and neural networks' },
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/convolutional-neural-network-cnn-in-machine-learning/', description: 'CNN architectures and applications' },
        { platform: 'W3Schools', url: 'https://www.w3schools.com/ai/', description: 'AI and deep learning with Python' }
      ],
      practiceProblems: '20+ deep learning projects including image classification and object detection',
      targetAudience: ['ML engineers going deep into AI', 'Researchers in computer vision/NLP', 'Data scientists advancing skills', 'PhD students in AI'],
    },
    {
      id: 'nlp-course',
      title: 'Natural Language Processing - From BERT to GPT',
      category: 'ml',
      level: 'Advanced',
      duration: '10 weeks',
      modules: 8,
      enrolled: 1200,
      rating: 4.8,
      reviews: 487,
      icon: '💬',
      instructor: 'Prof. David Lee',
      instructorTitle: 'NLP Expert at Hugging Face, Stanford Lecturer',
      language: 'English',
      subtitles: ['English', 'Hindi', 'Spanish'],
      lastUpdated: 'January 2026',
      certificate: true,
      description: 'Master modern NLP techniques with Transformers, BERT, GPT, and more. Build chatbots, sentiment analysis systems, and language models using state-of-the-art architectures.',
      longDescription: 'Explore the cutting-edge world of Natural Language Processing with this comprehensive course. Learn to work with modern transformer-based models, fine-tune pre-trained language models, and build production NLP systems. Covers everything from text preprocessing to deploying large language models.',
      learningOutcomes: [
        'Master NLP fundamentals and text preprocessing',
        'Implement word embeddings (Word2Vec, GloVe, FastText)',
        'Work with Transformer architectures (BERT, GPT, T5)',
        'Fine-tune pre-trained models for specific tasks',
        'Build chatbots and question-answering systems',
        'Deploy NLP models with Hugging Face and FastAPI'
      ],
      prerequisites: [
        'Strong Python programming',
        'Machine learning fundamentals',
        'Basic deep learning knowledge',
        'Understanding of neural networks'
      ],
      topics: ['Text Processing', 'Word Embeddings', 'Sequence Models', 'Transformers', 'BERT & Variants', 'GPT Models', 'Sentiment Analysis', 'Named Entity Recognition', 'Question Answering', 'Text Generation'],
      curriculum: [
        { week: 1, title: 'NLP Foundations & Text Processing', lessons: 12, duration: '4h 20m' },
        { week: 2, title: 'Word Embeddings & Representations', lessons: 13, duration: '4h 50m' },
        { week: 3, title: 'Sequence Models for NLP', lessons: 14, duration: '5h 15m' },
        { week: 4, title: 'Transformer Architecture Deep Dive', lessons: 15, duration: '5h 40m' },
        { week: 5, title: 'BERT and Transfer Learning', lessons: 14, duration: '5h 20m' },
        { week: 6, title: 'GPT Models & Text Generation', lessons: 13, duration: '5h 0m' },
        { week: 7, title: 'Advanced NLP Applications', lessons: 12, duration: '4h 45m' },
        { week: 8, title: 'Production NLP Systems', lessons: 11, duration: '4h 30m' }
      ],
      features: ['Hugging Face integration', 'LLM fine-tuning projects', 'Production deployment guides', 'Research paper discussions', 'API development workshop', 'Industry case studies'],
      externalResources: [
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/natural-language-processing-nlp-tutorial/', description: 'NLP concepts and text processing techniques' },
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/transformer-neural-network/', description: 'Transformer architecture explained' },
        { platform: 'W3Schools', url: 'https://www.w3schools.com/python/python_ml_nlp.asp', description: 'Python NLP libraries and tools' }
      ],
      practiceProblems: '15+ NLP projects: chatbots, sentiment analysis, and text generation',
      targetAudience: ['ML engineers specializing in NLP', 'Data scientists working with text', 'Researchers in computational linguistics', 'AI product developers'],
    },
    // CS Fundamentals
    {
      id: 'operating-systems',
      title: 'Operating Systems: Concepts & Implementation',
      category: 'cs-fundamentals',
      level: 'Intermediate',
      duration: '8 weeks',
      modules: 7,
      enrolled: 2200,
      rating: 4.6,
      reviews: 678,
      icon: '💻',
      instructor: 'Prof. Thomas Anderson',
      instructorTitle: 'CS Professor at MIT, Systems Research Expert',
      language: 'English',
      subtitles: ['English', 'Hindi', 'Spanish'],
      lastUpdated: 'December 2025',
      certificate: true,
      description: 'Deep dive into operating system internals. Learn process management, memory management, file systems, and implement key OS concepts in C.',
      longDescription: 'Understanding operating systems is crucial for systems programming and performance optimization. This course covers OS fundamentals with practical C programming exercises. Learn how processes, threads, memory, and file systems work under the hood. Perfect for preparing for systems engineering interviews.',
      learningOutcomes: [
        'Understand OS architecture and design principles',
        'Implement process scheduling algorithms',
        'Master memory management techniques',
        'Work with threads and synchronization',
        'Design file systems and I/O strategies',
        'Solve deadlock and race condition problems'
      ],
      prerequisites: [
        'Strong programming skills in C/C++',
        'Understanding of data structures',
        'Basic computer architecture knowledge',
        'Linux/Unix command line familiarity'
      ],
      topics: ['Process Management', 'Memory Management', 'File Systems', 'CPU Scheduling', 'Deadlocks', 'Virtual Memory', 'I/O Systems', 'System Calls', 'Concurrency'],
      curriculum: [
        { week: 1, title: 'OS Introduction & Processes', lessons: 12, duration: '4h 0m' },
        { week: 2, title: 'Threads & Concurrency', lessons: 11, duration: '3h 45m' },
        { week: 3, title: 'CPU Scheduling Algorithms', lessons: 13, duration: '4h 20m' },
        { week: 4, title: 'Synchronization & Deadlocks', lessons: 14, duration: '4h 50m' },
        { week: 5, title: 'Memory Management', lessons: 12, duration: '4h 15m' },
        { week: 6, title: 'Virtual Memory', lessons: 11, duration: '3h 55m' },
        { week: 7, title: 'File Systems & I/O', lessons: 13, duration: '4h 30m' }
      ],
      features: ['C programming exercises', 'Linux kernel exploration', 'System calls lab', 'Performance analysis', 'Interview prep questions', 'Virtual machine access'],
      externalResources: [
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/operating-systems/', description: 'Complete OS concepts and tutorials' },
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/process-synchronization-in-os/', description: 'Process synchronization and deadlock handling' },
        { platform: 'W3Schools', url: 'https://www.w3schools.com/c/', description: 'C programming for system implementation' }
      ],
      practiceProblems: '35+ OS implementation exercises and system programming challenges',
      targetAudience: ['CS students', 'Systems programmers', 'Backend engineers', 'Software engineers preparing for interviews'],
    },
    {
      id: 'computer-networks',
      title: 'Computer Networks: Protocol Design & Implementation',
      category: 'cs-fundamentals',
      level: 'Intermediate',
      duration: '8 weeks',
      modules: 7,
      enrolled: 2400,
      rating: 4.7,
      reviews: 823,
      icon: '🌐',
      instructor: 'Dr. Lisa Wang',
      instructorTitle: 'Network Architect at Cisco, Protocol Designer',
      language: 'English',
      subtitles: ['English', 'Hindi', 'Chinese', 'Spanish'],
      lastUpdated: 'January 2026',
      certificate: true,
      description: 'Master computer networking from protocols to security. Learn TCP/IP, HTTP/HTTPS, DNS, and build network applications with socket programming.',
      longDescription: 'Comprehensive networking course covering OSI model, TCP/IP stack, routing protocols, and network security. Build real network applications using sockets, understand how the internet works, and learn to troubleshoot network issues. Essential for backend developers and infrastructure engineers.',
      learningOutcomes: [
        'Understand network architecture and protocols',
        'Implement socket programming in Python/C',
        'Master TCP/IP protocol suite',
        'Design and analyze routing algorithms',
        'Implement network security measures',
        'Troubleshoot network problems effectively'
      ],
      prerequisites: [
        'Basic programming skills (Python or C)',
        'Understanding of data structures',
        'Basic mathematics and algorithms',
        'Computer architecture basics'
      ],
      topics: ['OSI Model', 'TCP/IP', 'HTTP/HTTPS', 'Routing Protocols', 'Network Security', 'DNS', 'Socket Programming', 'Network Performance', 'VPN & Firewalls'],
      curriculum: [
        { week: 1, title: 'Network Fundamentals & OSI Model', lessons: 11, duration: '3h 50m' },
        { week: 2, title: 'Transport Layer (TCP/UDP)', lessons: 13, duration: '4h 20m' },
        { week: 3, title: 'Network Layer & Routing', lessons: 14, duration: '4h 45m' },
        { week: 4, title: 'Application Layer Protocols', lessons: 12, duration: '4h 10m' },
        { week: 5, title: 'Socket Programming', lessons: 10, duration: '3h 40m' },
        { week: 6, title: 'Network Security & Cryptography', lessons: 13, duration: '4h 30m' },
        { week: 7, title: 'Advanced Topics & Projects', lessons: 11, duration: '4h 0m' }
      ],
      features: ['Wireshark labs', 'Network simulation', 'Socket programming projects', 'Security exercises', 'Cloud networking intro', 'Interview questions'],
      externalResources: [
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/computer-network-tutorials/', description: 'Computer networks complete guide' },
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/tcp-ip-model/', description: 'TCP/IP protocol suite explained' },
        { platform: 'W3Schools', url: 'https://www.w3schools.com/python/python_network.asp', description: 'Socket programming with Python' }
      ],
      practiceProblems: '25+ network programming projects and protocol implementation',
      targetAudience: ['Software engineers', 'Backend developers', 'DevOps engineers', 'Security professionals'],
    },
    {
      id: 'dbms-course',
      title: 'Database Management Systems - SQL & NoSQL Mastery',
      category: 'cs-fundamentals',
      level: 'Intermediate',
      duration: '9 weeks',
      modules: 8,
      enrolled: 2600,
      rating: 4.8,
      reviews: 1034,
      icon: '🗄️',
      instructor: 'Mark Stevens',
      instructorTitle: 'Database Architect at Oracle, Performance Expert',
      language: 'English',
      subtitles: ['English', 'Hindi', 'Spanish', 'Mandarin'],
      lastUpdated: 'February 2026',
      certificate: true,
      description: 'Master database design, SQL queries, normalization, transactions, and NoSQL databases. Learn PostgreSQL, MongoDB, and database optimization techniques.',
      longDescription: 'Comprehensive database course covering relational and NoSQL databases. Learn database design, complex SQL queries, indexing, transactions, and when to use SQL vs NoSQL. Build real applications with PostgreSQL and MongoDB. Essential for backend developers and data engineers.',
      learningOutcomes: [
        'Design normalized database schemas',
        'Write complex SQL queries with joins and subqueries',
        'Optimize database performance with indexing',
        'Understand ACID properties and transactions',
        'Work with MongoDB and document databases',
        'Implement database security and backup strategies'
      ],
      prerequisites: [
        'Basic programming knowledge',
        'Understanding of data structures',
        'Logical thinking and problem-solving',
        'Familiarity with command line'
      ],
      topics: ['SQL Queries', 'Database Design', 'Normalization', 'Transactions', 'Indexing', 'MongoDB', 'Redis', 'Query Optimization', 'Replication', 'Sharding'],
      curriculum: [
        { week: 1, title: 'Database Fundamentals & SQL Basics', lessons: 12, duration: '4h 10m' },
        { week: 2, title: 'Advanced SQL Queries', lessons: 14, duration: '4h 50m' },
        { week: 3, title: 'Database Design & Normalization', lessons: 13, duration: '4h 30m' },
        { week: 4, title: 'Transactions & Concurrency', lessons: 11, duration: '4h 0m' },
        { week: 5, title: 'Indexing & Performance Tuning', lessons: 12, duration: '4h 20m' },
        { week: 6, title: 'MongoDB & Document Databases', lessons: 13, duration: '4h 40m' },
        { week: 7, title: 'Advanced NoSQL Concepts', lessons: 10, duration: '3h 50m' },
        { week: 8, title: 'Database Administration & Security', lessons: 11, duration: '4h 15m' }
      ],
      features: ['PostgreSQL & MongoDB labs', 'Real database projects', 'Query optimization workshop', 'Database interview prep', 'Cloud database intro', 'Best practices guide'],
      externalResources: [
        { platform: 'W3Schools', url: 'https://www.w3schools.com/sql/', description: 'SQL complete reference and interactive tutorials' },
        { platform: 'W3Schools', url: 'https://www.w3schools.com/mongodb/', description: 'MongoDB queries and operations' },
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/dbms/', description: 'DBMS concepts, normalization, and transactions' },
        { platform: 'W3Schools', url: 'https://www.w3schools.com/postgresql/', description: 'PostgreSQL advanced features' }
      ],
      practiceProblems: '40+ SQL challenges and database design projects',
      targetAudience: ['Backend developers', 'Data engineers', 'Full-stack developers', 'Database administrators'],
    },
    {
      id: 'system-design',
      title: 'System Design & Scalable Architecture',
      category: 'cs-fundamentals',
      level: 'Advanced',
      duration: '10 weeks',
      modules: 8,
      enrolled: 1700,
      rating: 4.9,
      reviews: 756,
      icon: '🏗️',
      instructor: 'Alex Morrison',
      instructorTitle: 'Principal Engineer at Twitter, System Design Expert',
      language: 'English',
      subtitles: ['English', 'Hindi'],
      lastUpdated: 'January 2026',
      certificate: true,
      description: 'Learn to design large-scale distributed systems. Master scalability patterns, microservices, caching, load balancing, and ace system design interviews at FAANG companies.',
      longDescription: 'Master the art of designing scalable distributed systems. This course covers everything from basic concepts to designing systems like Twitter, Netflix, and Uber. Learn real-world trade-offs, scalability patterns, and best practices used by tech giants. Perfect for senior engineers and those preparing for system design interviews.',
      learningOutcomes: [
        'Design scalable distributed systems',
        'Master load balancing and caching strategies',
        'Implement microservices architecture',
        'Understand CAP theorem and consistency models',
        'Design for high availability and fault tolerance',
        'Ace system design interviews at FAANG'
      ],
      prerequisites: [
        'Strong software engineering background',
        'Experience with databases and APIs',
        'Understanding of networking basics',
        'Knowledge of data structures and algorithms'
      ],
      topics: ['Scalability', 'Load Balancing', 'Caching Strategies', 'Microservices', 'Message Queues', 'CAP Theorem', 'Database Sharding', 'API Design', 'CDN', 'Monitoring'],
      curriculum: [
        { week: 1, title: 'System Design Fundamentals', lessons: 10, duration: '4h 0m' },
        { week: 2, title: 'Scalability & Load Balancing', lessons: 12, duration: '4h 40m' },
        { week: 3, title: 'Caching & CDN Strategies', lessons: 11, duration: '4h 15m' },
        { week: 4, title: 'Database Scaling & Sharding', lessons: 13, duration: '4h 50m' },
        { week: 5, title: 'Microservices Architecture', lessons: 14, duration: '5h 20m' },
        { week: 6, title: 'Message Queues & Event-Driven Design', lessons: 12, duration: '4h 30m' },
        { week: 7, title: 'Designing Real Systems (Twitter, Netflix)', lessons: 15, duration: '5h 45m' },
        { week: 8, title: 'Interview Preparation & Mock Interviews', lessons: 11, duration: '4h 25m' }
      ],
      features: ['15+ system design case studies', 'Mock interview sessions', 'Architecture diagrams', 'Trade-off discussions', 'FAANG interview patterns', 'Mentorship sessions'],
      externalResources: [
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/system-design-tutorial/', description: 'System design concepts and patterns' },
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/design-patterns/', description: 'Software design patterns and microservices' },
        { platform: 'TakeUforward', url: 'https://takeuforward.org/system-design/complete-system-design-roadmap-with-videos-for-sdes/', description: 'Complete system design roadmap' }
      ],
      practiceProblems: '20+ real-world system design problems from FAANG interviews',
      targetAudience: ['Senior software engineers', 'Engineering managers', 'Technical architects', 'FAANG interview aspirants'],
    },
    // Mobile Development
    {
      id: 'react-native',
      title: 'React Native - Build iOS & Android Apps',
      category: 'mobile',
      level: 'Intermediate',
      duration: '8 weeks',
      modules: 7,
      enrolled: 1600,
      rating: 4.7,
      reviews: 567,
      icon: '📱',
      instructor: 'Sophie Martinez',
      instructorTitle: 'Mobile Lead at Instagram, React Native Core Contributor',
      language: 'English',
      subtitles: ['English', 'Hindi', 'Spanish', 'Portuguese'],
      lastUpdated: 'February 2026',
      certificate: true,
      description: 'Build cross-platform mobile apps with React Native. Learn navigation, state management, native modules, and publish apps to App Store and Play Store.',
      longDescription: 'Master React Native and build production-ready mobile applications for iOS and Android from a single codebase. Learn modern mobile development patterns, integrate native features, work with APIs, and publish your apps to the stores. Build 3 complete apps including a social media app and e-commerce platform.',
      learningOutcomes: [
        'Build cross-platform mobile apps with React Native',
        'Implement navigation with React Navigation',
        'Integrate device features (camera, GPS, notifications)',
        'Manage state with Redux and Context API',
        'Work with REST APIs and real-time data',
        'Publish apps to App Store and Google Play'
      ],
      prerequisites: [
        'Strong JavaScript and React knowledge',
        'Understanding of mobile app concepts',
        'Familiarity with npm and package managers',
        'Basic understanding of iOS/Android platforms'
      ],
      topics: ['React Native Basics', 'React Navigation', 'State Management', 'Native Modules', 'APIs & Networking', 'Push Notifications', 'Maps & Location', 'App Publishing', 'Performance Optimization'],
      curriculum: [
        { week: 1, title: 'React Native Fundamentals', lessons: 14, duration: '4h 30m' },
        { week: 2, title: 'Navigation & Routing', lessons: 12, duration: '4h 0m' },
        { week: 3, title: 'State Management & Redux', lessons: 13, duration: '4h 20m' },
        { week: 4, title: 'APIs & Data Fetching', lessons: 11, duration: '3h 50m' },
        { week: 5, title: 'Native Features Integration', lessons: 14, duration: '4h 45m' },
        { week: 6, title: 'Authentication & Security', lessons: 10, duration: '3h 40m' },
        { week: 7, title: 'Publishing & Deployment', lessons: 12, duration: '4h 15m' }
      ],
      features: ['3 complete app projects', 'iOS & Android testing', 'App Store submission guide', 'Push notifications setup', 'Performance optimization tips', 'Debugging workshop'],
      externalResources: [
        { platform: 'W3Schools', url: 'https://www.w3schools.com/react/', description: 'React fundamentals for React Native' },
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/react-native/', description: 'React Native components and APIs' },
        { platform: 'W3Schools', url: 'https://www.w3schools.com/react/react_native.asp', description: 'React Native complete tutorial' }
      ],
      practiceProblems: '15+ mobile app UI challenges and feature implementations',
      targetAudience: ['React developers entering mobile', 'Web developers learning mobile', 'Freelancers expanding services', 'Startups building MVPs'],
    },
    {
      id: 'android-kotlin',
      title: 'Android Development Masterclass with Kotlin',
      category: 'mobile',
      level: 'Intermediate',
      duration: '10 weeks',
      modules: 9,
      enrolled: 1400,
      rating: 4.8,
      reviews: 521,
      icon: '🤖',
      instructor: 'Kevin Park',
      instructorTitle: 'Senior Android Engineer at Google, Jetpack Compose Expert',
      language: 'English',
      subtitles: ['English', 'Hindi', 'Korean'],
      lastUpdated: 'January 2026',
      certificate: true,
      description: 'Master native Android development with Kotlin and Jetpack Compose. Build modern Android apps with Material Design, Room database, and MVVM architecture.',
      longDescription: 'Comprehensive Android development course using Kotlin and the latest Jetpack libraries. Learn to build beautiful, performant Android apps with Jetpack Compose, implement MVVM architecture, work with Room database, and follow Google\'s best practices. Build real-world apps including a task manager and social network.',
      learningOutcomes: [
        'Build native Android apps with Kotlin',
        'Master Jetpack Compose for modern UI',
        'Implement MVVM architecture pattern',
        'Work with Room database and LiveData',
        'Integrate REST APIs with Retrofit',
        'Publish apps to Google Play Store'
      ],
      prerequisites: [
        'Basic programming knowledge (any language)',
        'Understanding of OOP concepts',
        'Willingness to learn Kotlin',
        'Computer with Android Studio installed'
      ],
      topics: ['Kotlin Basics', 'Android Architecture', 'Jetpack Compose', 'Activities & Fragments', 'Room Database', 'MVVM Pattern', 'Material Design', 'Retrofit & APIs', 'Testing', 'Play Store Publishing'],
      curriculum: [
        { week: 1, title: 'Kotlin Programming Fundamentals', lessons: 15, duration: '5h 0m' },
        { week: 2, title: 'Android Basics & Layouts', lessons: 13, duration: '4h 30m' },
        { week: 3, title: 'Activities & Navigation', lessons: 12, duration: '4h 15m' },
        { week: 4, title: 'Jetpack Compose UI', lessons: 16, duration: '5h 40m' },
        { week: 5, title: 'Room Database & Data Persistence', lessons: 14, duration: '4h 50m' },
        { week: 6, title: 'MVVM Architecture', lessons: 13, duration: '4h 35m' },
        { week: 7, title: 'Networking with Retrofit', lessons: 11, duration: '4h 10m' },
        { week: 8, title: 'Material Design & Theming', lessons: 10, duration: '3h 50m' },
        { week: 9, title: 'Testing & Play Store Deployment', lessons: 12, duration: '4h 25m' }
      ],
      features: ['4 complete app projects', 'Kotlin coroutines guide', 'Material Design templates', 'Testing best practices', 'Play Store optimization', 'Firebase integration'],
      externalResources: [
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/android-tutorial/', description: 'Android development complete guide' },
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/kotlin-programming-language/', description: 'Kotlin programming tutorials' },
        { platform: 'W3Schools', url: 'https://www.w3schools.com/kotlin/', description: 'Kotlin syntax and examples' }
      ],
      practiceProblems: '20+ Android app features and UI component exercises',
      targetAudience: ['Aspiring Android developers', 'iOS developers learning Android', 'Java developers transitioning to Kotlin', 'Students building portfolios'],
    },
    // DevOps
    {
      id: 'devops-basics',
      title: 'DevOps Engineering Bootcamp - CI/CD to Kubernetes',
      category: 'devops',
      level: 'Intermediate',
      duration: '8 weeks',
      modules: 7,
      enrolled: 1900,
      rating: 4.7,
      reviews: 694,
      icon: '⚙️',
      instructor: 'Robert Chen',
      instructorTitle: 'DevOps Architect at Netflix, Infrastructure Expert',
      language: 'English',
      subtitles: ['English', 'Hindi', 'Spanish'],
      lastUpdated: 'February 2026',
      certificate: true,
      description: 'Master DevOps practices with Git, CI/CD pipelines, Docker, Kubernetes, Jenkins, and cloud deployment. Learn infrastructure as code and automation.',
      longDescription: 'Complete DevOps engineering course covering the entire deployment pipeline. Learn Git workflows, CI/CD with Jenkins and GitHub Actions, containerization with Docker, orchestration with Kubernetes, and infrastructure as code with Terraform. Build automated deployment pipelines and manage production infrastructure.',
      learningOutcomes: [
        'Master Git workflows and branching strategies',
        'Build CI/CD pipelines with Jenkins and GitHub Actions',
        'Containerize applications with Docker',
        'Orchestrate containers with Kubernetes',
        'Implement infrastructure as code with Terraform',
        'Set up monitoring and logging systems'
      ],
      prerequisites: [
        'Basic Linux/Unix command line knowledge',
        'Understanding of web applications',
        'Familiarity with cloud concepts',
        'Basic scripting knowledge (Bash or Python)'
      ],
      topics: ['Git & Version Control', 'CI/CD Pipelines', 'Docker & Containers', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Terraform', 'Ansible', 'Monitoring (Prometheus, Grafana)'],
      curriculum: [
        { week: 1, title: 'Git & Version Control Mastery', lessons: 11, duration: '3h 45m' },
        { week: 2, title: 'CI/CD Fundamentals', lessons: 13, duration: '4h 20m' },
        { week: 3, title: 'Docker & Containerization', lessons: 14, duration: '4h 50m' },
        { week: 4, title: 'Kubernetes Basics', lessons: 15, duration: '5h 15m' },
        { week: 5, title: 'Advanced Kubernetes', lessons: 13, duration: '4h 40m' },
        { week: 6, title: 'Infrastructure as Code (Terraform)', lessons: 12, duration: '4h 25m' },
        { week: 7, title: 'Monitoring & Production Best Practices', lessons: 11, duration: '4h 10m' }
      ],
      features: ['Hands-on labs', 'Cloud environment access', 'Real deployment projects', 'Troubleshooting guides', 'Interview prep', 'Certification exam prep'],
      externalResources: [
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/devops-tutorial/', description: 'DevOps practices and tools' },
        { platform: 'W3Schools', url: 'https://www.w3schools.com/git/', description: 'Git version control complete guide' },
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/docker-tutorial/', description: 'Docker containerization tutorial' }
      ],
      practiceProblems: '30+ DevOps scenarios and CI/CD pipeline implementations',
      targetAudience: ['Developers transitioning to DevOps', 'System administrators', 'Operations engineers', 'Full-stack developers'],
    },
    {
      id: 'aws-cloud',
      title: 'AWS Solutions Architect - Complete Certification Course',
      category: 'devops',
      level: 'Advanced',
      duration: '10 weeks',
      modules: 9,
      enrolled: 1500,
      rating: 4.8,
      reviews: 612,
      icon: '☁️',
      instructor: 'Rachel Brown',
      instructorTitle: 'AWS Solutions Architect, Cloud Security Specialist',
      language: 'English',
      subtitles: ['English', 'Hindi', 'Spanish', 'Mandarin'],
      lastUpdated: 'January 2026',
      certificate: true,
      description: 'Master AWS cloud services and architecture. Learn EC2, S3, Lambda, VPC, RDS, and prepare for AWS Solutions Architect certification exam.',
      longDescription: 'Comprehensive AWS course covering all major services and architectural best practices. Learn to design highly available, scalable, and cost-effective cloud solutions. Includes hands-on labs, real-world projects, and complete preparation for AWS Solutions Architect Associate certification. Build production-grade cloud architectures.',
      learningOutcomes: [
        'Master core AWS services (EC2, S3, RDS, Lambda)',
        'Design scalable and resilient cloud architectures',
        'Implement security and compliance best practices',
        'Optimize costs and performance',
        'Pass AWS Solutions Architect Associate exam',
        'Deploy production applications on AWS'
      ],
      prerequisites: [
        'Basic understanding of cloud computing',
        'Networking fundamentals knowledge',
        'Linux/Unix command line basics',
        'Understanding of web applications'
      ],
      topics: ['EC2 & Auto Scaling', 'S3 & Storage', 'VPC & Networking', 'RDS & Databases', 'Lambda & Serverless', 'CloudFormation', 'Security & IAM', 'Monitoring & CloudWatch', 'Cost Optimization'],
      curriculum: [
        { week: 1, title: 'AWS Fundamentals & IAM', lessons: 12, duration: '4h 15m' },
        { week: 2, title: 'EC2 & Compute Services', lessons: 15, duration: '5h 20m' },
        { week: 3, title: 'Storage Services (S3, EBS, EFS)', lessons: 13, duration: '4h 45m' },
        { week: 4, title: 'VPC & Networking', lessons: 14, duration: '5h 0m' },
        { week: 5, title: 'Databases (RDS, DynamoDB)', lessons: 13, duration: '4h 40m' },
        { week: 6, title: 'Lambda & Serverless', lessons: 11, duration: '4h 10m' },
        { week: 7, title: 'High Availability & Scalability', lessons: 14, duration: '5h 15m' },
        { week: 8, title: 'Security & Compliance', lessons: 12, duration: '4h 30m' },
        { week: 9, title: 'Exam Preparation & Practice', lessons: 16, duration: '5h 45m' }
      ],
      features: ['AWS free tier access', 'Practice exam questions', 'Architecture diagrams', 'Cost calculator workshop', 'Certification voucher included', 'Real-world case studies'],
      externalResources: [
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/aws-tutorial/', description: 'AWS services and cloud concepts' },
        { platform: 'W3Schools', url: 'https://www.w3schools.com/aws/', description: 'AWS cloud computing tutorials' },
        { platform: 'GeeksforGeeks', url: 'https://www.geeksforgeeks.org/amazon-web-services-aws/', description: 'AWS architecture and best practices' }
      ],
      practiceProblems: '25+ AWS hands-on labs and real-world scenarios',
      targetAudience: ['Cloud engineers', 'DevOps professionals', 'Solutions architects', 'Certification seekers'],
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
                <div className="flex flex-col items-end gap-1">
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                  {course.certificate && (
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                      🎓 Certificate
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {course.title}
              </h3>

              {/* Instructor Info */}
              {course.instructor && (
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-1">
                  <span className="font-medium text-primary">{course.instructor}</span>
                  {course.instructorTitle && (
                    <span className="hidden md:inline"> • {course.instructorTitle.split(',')[0]}</span>
                  )}
                </p>
              )}

              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                {course.description}
              </p>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mb-3 text-xs sm:text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-bold text-gray-900 dark:text-white">{course.rating}</span>
                </div>
                {course.reviews && (
                  <span className="text-gray-500 dark:text-gray-400">
                    ({course.reviews.toLocaleString()} reviews)
                  </span>
                )}
              </div>

              {/* Course Stats */}
              <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-600 dark:text-gray-400 mb-3 flex-wrap">
                <span className="flex items-center gap-1">
                  ⏱️ {course.duration}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  📝 {course.modules} modules
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  👥 {course.enrolled.toLocaleString()}
                </span>
              </div>

              {/* Language & Update */}
              <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3 flex-wrap">
                {course.language && (
                  <span>🌐 {course.language}</span>
                )}
                {course.subtitles && course.subtitles.length > 0 && (
                  <span className="hidden sm:inline">
                    📝 CC: {course.subtitles.length}
                  </span>
                )}
                {course.lastUpdated && (
                  <span className="hidden md:inline">
                    🔄 {course.lastUpdated}
                  </span>
                )}
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

              {/* Features Preview */}
              {course.features && course.features.length > 0 && (
                <div className="mb-3 sm:mb-4">
                  <div className="flex flex-wrap gap-1 text-xs text-gray-600 dark:text-gray-400">
                    {course.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="flex items-center gap-1">
                        ✓ {feature}
                        {idx < Math.min(course.features.length, 3) - 1 && <span className="mx-1">•</span>}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* External Resources */}
              {course.externalResources && course.externalResources.length > 0 && (
                <div className="mb-3 sm:mb-4 border-t border-gray-200 dark:border-gray-700 pt-3">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">📚 Learning Resources:</p>
                  <div className="flex flex-wrap gap-1">
                    {course.externalResources.map((resource, idx) => (
                      <a
                        key={idx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs hover:bg-blue-100 dark:hover:bg-blue-900/50 transition flex items-center gap-1"
                        title={resource.description}
                      >
                        🔗 {resource.platform}
                      </a>
                    ))}
                  </div>
                  {course.practiceProblems && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                      💡 {course.practiceProblems}
                    </p>
                  )}
                </div>
              )}

              {/* CTA Button */}
              {user ? (
                <Link
                  to={`/course/${course.id}`}
                  className="block w-full px-4 py-2 sm:py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition text-center shadow-md text-sm sm:text-base"
                >
                  Enroll Now →
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
