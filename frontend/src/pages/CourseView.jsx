import { useState, useContext, useEffect, useMemo } from 'react';
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
              {
                question: 'What is the time complexity of inserting an element at the end of an array (assuming space is available)?',
                options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
                correct: 0,
              },
              {
                question: 'Which operation on arrays requires shifting elements?',
                options: ['Accessing an element', 'Inserting at beginning', 'Reading last element', 'Finding array length'],
                correct: 1,
              },
              {
                question: 'In a 2D array arr[3][4], how many elements can it store?',
                options: ['7', '12', '3', '4'],
                correct: 1,
              },
              {
                question: 'What is array traversal?',
                options: ['Deleting all elements', 'Visiting each element once', 'Sorting elements', 'Finding maximum'],
                correct: 1,
              },
              {
                question: 'Arrays are best suited for which type of access pattern?',
                options: ['Sequential only', 'Random access', 'Stack operations', 'Queue operations'],
                correct: 1,
              },
              {
                question: 'What happens when you access an array element out of bounds in most languages?',
                options: ['Returns null', 'Runtime error', 'Returns 0', 'Automatically extends array'],
                correct: 1,
              },
              {
                question: 'Which is NOT an advantage of arrays?',
                options: ['Random access', 'Cache friendly', 'Dynamic size', 'Simple to use'],
                correct: 2,
              },
              {
                question: 'In memory, array elements are stored:',
                options: ['Randomly', 'In a linked manner', 'Contiguously', 'In a tree structure'],
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
              {
                question: 'What is the main advantage of linked lists over arrays?',
                options: ['Faster access', 'Dynamic size', 'Less memory', 'Better cache performance'],
                correct: 1,
              },
              {
                question: 'In a doubly linked list, each node has:',
                options: ['One pointer', 'Two pointers', 'Three pointers', 'No pointers'],
                correct: 1,
              },
              {
                question: 'What is the time complexity of searching in a linked list?',
                options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
                correct: 1,
              },
              {
                question: 'In a circular linked list, the last node points to:',
                options: ['NULL', 'First node', 'Previous node', 'Itself'],
                correct: 1,
              },
              {
                question: 'Which operation is more efficient in a linked list compared to an array?',
                options: ['Random access', 'Insertion at beginning', 'Finding size', 'Memory efficiency'],
                correct: 1,
              },
              {
                question: 'What does the head pointer in a linked list point to?',
                options: ['Last node', 'Middle node', 'First node', 'NULL'],
                correct: 2,
              },
              {
                question: 'Which is NOT a type of linked list?',
                options: ['Singly', 'Doubly', 'Circular', 'Binary'],
                correct: 3,
              },
              {
                question: 'Reversing a linked list takes:',
                options: ['O(1) time', 'O(n) time', 'O(n²) time', 'O(log n) time'],
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
              {
                question: 'What is the time complexity of push operation in a stack?',
                options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
                correct: 0,
              },
              {
                question: 'Which principle does a queue follow?',
                options: ['LIFO', 'FIFO', 'Random', 'Priority'],
                correct: 1,
              },
              {
                question: 'Which data structure is used for function call management?',
                options: ['Queue', 'Stack', 'Tree', 'Graph'],
                correct: 1,
              },
              {
                question: 'In a circular queue, when is it considered full?',
                options: ['rear == front', '(rear + 1) % size == front', 'rear == size', 'front == 0'],
                correct: 1,
              },
              {
                question: 'Which operation retrieves but does not remove an element from a queue?',
                options: ['dequeue', 'enqueue', 'peek', 'pop'],
                correct: 2,
              },
              {
                question: 'Stack overflow occurs when:',
                options: ['Stack is empty', 'Stack is full and we try to push', 'We pop from empty stack', 'Stack size is zero'],
                correct: 1,
              },
              {
                question: 'Which application uses a queue?',
                options: ['Undo operation', 'Expression evaluation', 'Print spooling', 'Recursion'],
                correct: 2,
              },
              {
                question: 'A deque (double-ended queue) allows:',
                options: ['Insertion at both ends', 'Deletion only at front', 'Insertion only at rear', 'Random access'],
                correct: 0,
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
              {
                question: 'Which method is used to create a React component?',
                options: ['React.createComponent()', 'function or class', 'React.component()', 'createElement()'],
                correct: 1,
              },
              {
                question: 'Props in React are:',
                options: ['Mutable', 'Immutable', 'Sometimes mutable', 'Always undefined'],
                correct: 1,
              },
              {
                question: 'What is the virtual DOM?',
                options: ['Real DOM copy', 'JavaScript object representation', 'Browser API', 'CSS framework'],
                correct: 1,
              },
              {
                question: 'Which hook is used for side effects?',
                options: ['useState', 'useEffect', 'useContext', 'useMemo'],
                correct: 1,
              },
              {
                question: 'React components must return:',
                options: ['Multiple elements', 'Single root element', 'Array only', 'String only'],
                correct: 1,
              },
              {
                question: 'What does the key prop help React with?',
                options: ['Styling', 'Identify elements', 'Add events', 'State management'],
                correct: 1,
              },
              {
                question: 'Functional components can use state via:',
                options: ['this.state', 'useState hook', 'getState()', 'state()'],
                correct: 1,
              },
              {
                question: 'What is the purpose of React.Fragment?',
                options: ['Add styling', 'Group elements without extra DOM node', 'Create animations', 'Manage state'],
                correct: 1,
              },
              {
                question: 'Which is NOT a lifecycle method?',
                options: ['componentDidMount', 'componentWillUpdate', 'useEffect', 'componentDidLoad'],
                correct: 3,
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
              {
                question: 'useState returns:',
                options: ['State only', 'Updater only', 'Array with state and updater', 'Object with state'],
                correct: 2,
              },
              {
                question: 'When does useEffect run by default?',
                options: ['Before render', 'After every render', 'Only once', 'On unmount'],
                correct: 1,
              },
              {
                question: 'How do you prevent useEffect from running on every render?',
                options: ['Use useState', 'Provide dependency array', 'Use useCallback', 'Cannot prevent'],
                correct: 1,
              },
              {
                question: 'What does useContext do?',
                options: ['Creates context', 'Consumes context', 'Updates context', 'Deletes context'],
                correct: 1,
              },
              {
                question: 'useReducer is useful for:',
                options: ['Simple state', 'Complex state logic', 'API calls', 'Routing'],
                correct: 1,
              },
              {
                question: 'useMemo is used to:',
                options: ['Memoize values', 'Memoize functions', 'Create state', 'Handle events'],
                correct: 0,
              },
              {
                question: 'useCallback returns:',
                options: ['Memoized value', 'Memoized callback', 'State', 'Props'],
                correct: 1,
              },
              {
                question: 'Custom hooks must:',
                options: ['Return JSX', 'Start with "use"', 'Be class components', 'Have state'],
                correct: 1,
              },
              {
                question: 'useRef can be used to:',
                options: ['Create state', 'Access DOM elements', 'Make API calls', 'Style components'],
                correct: 1,
              },
            ],
          },
        },
      ],
    },
    'ml-basics': {
      title: 'Machine Learning A-Z: From Fundamentals to Production',
      description: 'Master machine learning algorithms from scratch. Learn supervised and unsupervised learning, model evaluation, and deploy ML models to production.',
      level: 'Intermediate',
      duration: '10 weeks',
      totalScore: 800,
      passingScore: 550,
      instructor: 'Dr. Rajesh Kumar',
      rating: 4.7,
      enrolled: 1900,
      image: '🤖',
      syllabus: [
        { week: 1, title: 'ML Fundamentals', topics: ['Introduction to ML', 'Python Setup', 'NumPy & Pandas'] },
        { week: 2, title: 'Regression Algorithms', topics: ['Linear Regression', 'Polynomial Regression', 'Regularization'] },
        { week: 3, title: 'Classification', topics: ['Logistic Regression', 'Decision Trees', 'Model Evaluation'] },
        { week: 4, title: 'Tree-Based Methods', topics: ['Random Forest', 'Gradient Boosting', 'XGBoost'] },
        { week: 5, title: 'SVM', topics: ['Support Vector Machines', 'Kernel Tricks', 'Hyperparameter Tuning'] },
        { week: 6, title: 'Unsupervised Learning', topics: ['K-Means', 'DBSCAN', 'PCA'] },
      ],
      modules: [
        {
          id: 1,
          title: 'ML Fundamentals & Python Setup',
          duration: '1 week',
          topics: [
            {
              id: 'ml-1',
              name: 'Introduction to Machine Learning',
              theory: {
                title: 'Machine Learning Tutorial - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/machine-learning/',
              },
              video: {
                title: 'Machine Learning Complete Course - freeCodeCamp',
                url: 'https://www.youtube.com/watch?v=NWONeJKn6kc',
                channel: 'freeCodeCamp',
              },
            },
            {
              id: 'ml-2',
              name: 'Python for ML - NumPy & Pandas',
              theory: {
                title: 'NumPy Tutorial - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/python-numpy/',
              },
              video: {
                title: 'Pandas & NumPy for ML - Corey Schafer',
                url: 'https://www.youtube.com/watch?v=ZyhVh-qRZPA',
                channel: 'Corey Schafer',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What is supervised learning?',
                options: ['Learning with labeled data', 'Learning without labels', 'Learning with rewards', 'Learning from errors'],
                correct: 0,
              },
              {
                question: 'Which library is primarily used for ML in Python?',
                options: ['NumPy', 'Pandas', 'scikit-learn', 'Matplotlib'],
                correct: 2,
              },
              {
                question: 'What is overfitting?',
                options: ['Model too simple', 'Model too complex', 'Perfect model', 'No training'],
                correct: 1,
              },
              {
                question: 'Which is a classification algorithm?',
                options: ['Linear Regression', 'Logistic Regression', 'Mean Squared Error', 'R-squared'],
                correct: 1,
              },
              {
                question: 'What does train-test split do?',
                options: ['Splits data for evaluation', 'Splits model', 'Splits features', 'Splits labels'],
                correct: 0,
              },
              {
                question: 'What is a feature in machine learning?',
                options: ['Output variable', 'Input variable', 'Model parameter', 'Loss function'],
                correct: 1,
              },
              {
                question: 'Cross-validation is used for:',
                options: ['Training faster', 'Model evaluation', 'Data cleaning', 'Feature selection'],
                correct: 1,
              },
              {
                question: 'What is underfitting?',
                options: ['Model too complex', 'Model too simple', 'Perfect fit', 'Overfitted model'],
                correct: 1,
              },
              {
                question: 'Which metric is used for regression?',
                options: ['Accuracy', 'Precision', 'MSE', 'F1-score'],
                correct: 2,
              },
              {
                question: 'What does NumPy provide?',
                options: ['Data visualization', 'Array operations', 'Web framework', 'Database'],
                correct: 1,
              },
            ],
          },
        },
        {
          id: 2,
          title: 'Regression Algorithms',
          duration: '1.5 weeks',
          topics: [
            {
              id: 'ml-3',
              name: 'Linear & Polynomial Regression',
              theory: {
                title: 'ML Linear Regression - W3Schools',
                url: 'https://www.w3schools.com/python/python_ml_linear_regression.asp',
              },
              video: {
                title: 'Linear Regression - StatQuest',
                url: 'https://www.youtube.com/watch?v=nk2CQITm_eo',
                channel: 'StatQuest',
              },
            },
            {
              id: 'ml-4',
              name: 'Model Evaluation & Feature Engineering',
              theory: {
                title: 'ML Getting Started - W3Schools',
                url: 'https://www.w3schools.com/python/python_ml_getting_started.asp',
              },
              video: {
                title: 'Feature Engineering - Krish Naik',
                url: 'https://www.youtube.com/watch?v=6WDFfaYtN6s',
                channel: 'Krish Naik',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What does R-squared measure?',
                options: ['Model complexity', 'Goodness of fit', 'Training speed', 'Number of features'],
                correct: 1,
              },
              {
                question: 'Linear regression predicts:',
                options: ['Classes', 'Continuous values', 'Categories', 'Clusters'],
                correct: 1,
              },
              {
                question: 'What is the cost function in linear regression?',
                options: ['Accuracy', 'MSE', 'Precision', 'Recall'],
                correct: 1,
              },
              {
                question: 'Polynomial regression is used for:',
                options: ['Linear relationships', 'Non-linear relationships', 'Classification', 'Clustering'],
                correct: 1,
              },
              {
                question: 'What does regularization prevent?',
                options: ['Underfitting', 'Overfitting', 'Fast training', 'Data loss'],
                correct: 1,
              },
              {
                question: 'L1 regularization is also called:',
                options: ['Ridge', 'Lasso', 'Elastic Net', 'Dropout'],
                correct: 1,
              },
              {
                question: 'Feature scaling is important for:',
                options: ['All algorithms', 'Distance-based algorithms', 'Tree algorithms', 'No algorithms'],
                correct: 1,
              },
              {
                question: 'What is gradient descent?',
                options: ['Classification method', 'Optimization algorithm', 'Evaluation metric', 'Preprocessing technique'],
                correct: 1,
              },
              {
                question: 'Learning rate controls:',
                options: ['Step size in optimization', 'Model complexity', 'Number of features', 'Data size'],
                correct: 0,
              },
              {
                question: 'Which assumption does linear regression make?',
                options: ['Non-linear relationship', 'Linear relationship', 'No relationship', 'Random relationship'],
                correct: 1,
              },
            ],
          },
        },
        {
          id: 3,
          title: 'Classification Algorithms',
          duration: '1.5 weeks',
          topics: [
            {
              id: 'ml-5',
              name: 'Logistic Regression & Decision Trees',
              theory: {
                title: 'Classification Algorithms - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/machine-learning/',
              },
              video: {
                title: 'Classification ML - Simplilearn',
                url: 'https://www.youtube.com/watch?v=7O4dpR9QMIM',
                channel: 'Simplilearn',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'Which metric is best for imbalanced datasets?',
                options: ['Accuracy', 'F1-score', 'R-squared', 'MSE'],
                correct: 1,
              },
              {
                question: 'Logistic regression is used for:',
                options: ['Regression', 'Classification', 'Clustering', 'Dimensionality reduction'],
                correct: 1,
              },
              {
                question: 'What does a confusion matrix show?',
                options: ['Training loss', 'Prediction accuracy breakdown', 'Feature importance', 'Learning rate'],
                correct: 1,
              },
              {
                question: 'Precision measures:',
                options: ['True positives / All positives predicted', 'True positives / All actual positives', 'Accuracy', 'Loss'],
                correct: 0,
              },
              {
                question: 'Recall measures:',
                options: ['True positives / All positives predicted', 'True positives / All actual positives', 'False positives', 'Specificity'],
                correct: 1,
              },
              {
                question: 'ROC curve plots:',
                options: ['Precision vs Recall', 'TPR vs FPR', 'Accuracy vs Loss', 'Train vs Test'],
                correct: 1,
              },
              {
                question: 'AUC stands for:',
                options: ['Area Under Curve', 'Accuracy Under Classification', 'Average Unit Cost', 'Algorithm Under Control'],
                correct: 0,
              },
              {
                question: 'Decision trees can handle:',
                options: ['Only numerical data', 'Only categorical data', 'Both numerical and categorical', 'Neither type'],
                correct: 2,
              },
              {
                question: 'What is entropy in decision trees?',
                options: ['Measure of impurity', 'Accuracy metric', 'Loss function', 'Optimization method'],
                correct: 0,
              },
              {
                question: 'Random Forest is:',
                options: ['Single tree', 'Ensemble of trees', 'Linear model', 'Neural network'],
                correct: 1,
              },
            ],
          },
        },
      ],
    },
    'deep-learning': {
      title: 'Deep Learning Specialization - Neural Networks & TensorFlow',
      description: 'Master deep learning with neural networks, CNNs, RNNs, and Transformers. Build advanced AI models using TensorFlow and Keras.',
      level: 'Advanced',
      duration: '12 weeks',
      totalScore: 1000,
      passingScore: 700,
      instructor: 'Dr. Maria Chen',
      rating: 4.9,
      enrolled: 1500,
      image: '🧠',
      syllabus: [
        { week: 1, title: 'Neural Networks', topics: ['Perceptron', 'Backpropagation', 'Activation Functions'] },
        { week: 2, title: 'Deep Networks', topics: ['Deep NNs', 'Optimization', 'Regularization'] },
        { week: 3, title: 'CNNs', topics: ['Convolution', 'Pooling', 'CNN Architectures'] },
        { week: 4, title: 'Object Detection', topics: ['YOLO', 'R-CNN', 'Image Segmentation'] },
        { week: 5, title: 'RNNs & LSTMs', topics: ['Sequence Models', 'LSTM', 'GRU'] },
        { week: 6, title: 'Transformers', topics: ['Attention', 'BERT', 'GPT'] },
      ],
      modules: [
        {
          id: 1,
          title: 'Neural Network Fundamentals',
          duration: '2 weeks',
          topics: [
            {
              id: 'dl-1',
              name: 'Introduction to Neural Networks',
              theory: {
                title: 'Deep Learning Tutorial - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/deep-learning-tutorial/',
              },
              video: {
                title: 'Neural Networks Explained - 3Blue1Brown',
                url: 'https://www.youtube.com/watch?v=aircAruvnKk',
                channel: '3Blue1Brown',
              },
            },
            {
              id: 'dl-2',
              name: 'Backpropagation & Training',
              theory: {
                title: 'AI Tutorial - W3Schools',
                url: 'https://www.w3schools.com/ai/',
              },
              video: {
                title: 'Backpropagation Calculus - 3Blue1Brown',
                url: 'https://www.youtube.com/watch?v=tIeHLnjs5U8',
                channel: '3Blue1Brown',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What is the purpose of activation functions?',
                options: ['Add linearity', 'Add non-linearity', 'Reduce computation', 'Normalize data'],
                correct: 1,
              },
              {
                question: 'What does backpropagation compute?',
                options: ['Forward pass', 'Gradients', 'Predictions', 'Accuracy'],
                correct: 1,
              },
              {
                question: 'Which activation function can cause vanishing gradient?',
                options: ['ReLU', 'Sigmoid', 'LeakyReLU', 'ELU'],
                correct: 1,
              },
              {
                question: 'What is a perceptron?',
                options: ['Neural network layer', 'Single neuron', 'Activation function', 'Loss function'],
                correct: 1,
              },
              {
                question: 'Deep learning requires:',
                options: ['Small data', 'Large data', 'No data', 'Only labeled data'],
                correct: 1,
              },
              {
                question: 'What is the vanishing gradient problem?',
                options: ['Gradients become too large', 'Gradients become too small', 'No gradients', 'Constant gradients'],
                correct: 1,
              },
              {
                question: 'Dropout is used for:',
                options: ['Faster training', 'Preventing overfitting', 'Data augmentation', 'Feature extraction'],
                correct: 1,
              },
              {
                question: 'Batch normalization helps with:',
                options: ['Faster convergence', 'Slower training', 'Less accuracy', 'More parameters'],
                correct: 0,
              },
              {
                question: 'Which optimizer is commonly used?',
                options: ['SGD', 'Adam', 'RMSprop', 'All of these'],
                correct: 3,
              },
              {
                question: 'What is an epoch?',
                options: ['One batch', 'One iteration', 'One full pass through data', 'One layer'],
                correct: 2,
              },
            ],
          },
        },
        {
          id: 2,
          title: 'Convolutional Neural Networks',
          duration: '2 weeks',
          topics: [
            {
              id: 'dl-3',
              name: 'CNN Architecture & Applications',
              theory: {
                title: 'CNN in Machine Learning - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/convolutional-neural-network-cnn-in-machine-learning/',
              },
              video: {
                title: 'CNNs Explained - Computerphile',
                url: 'https://www.youtube.com/watch?v=K4ZZmqRCCPo',
                channel: 'Computerphile',
              },
            },
            {
              id: 'dl-4',
              name: 'Image Classification with TensorFlow',
              theory: {
                title: 'Deep Learning - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/deep-learning-tutorial/',
              },
              video: {
                title: 'TensorFlow CNN Tutorial - Sentdex',
                url: 'https://www.youtube.com/watch?v=WvoLTXIjBYU',
                channel: 'Sentdex',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What does a convolutional layer do?',
                options: ['Flatten data', 'Extract features', 'Classify', 'Normalize'],
                correct: 1,
              },
              {
                question: 'What is pooling used for?',
                options: ['Increase size', 'Reduce spatial dimensions', 'Add layers', 'Training speed'],
                correct: 1,
              },
              {
                question: 'Max pooling selects:',
                options: ['Average value', 'Maximum value', 'Minimum value', 'Sum of values'],
                correct: 1,
              },
              {
                question: 'What is a filter in CNN?',
                options: ['Activation function', 'Kernel for convolution', 'Pooling layer', 'Dense layer'],
                correct: 1,
              },
              {
                question: 'Stride in convolution refers to:',
                options: ['Filter size', 'Step size of filter movement', 'Number of filters', 'Padding size'],
                correct: 1,
              },
              {
                question: 'Padding is used to:',
                options: ['Reduce size', 'Maintain size', 'Remove boundaries', 'Add layers'],
                correct: 1,
              },
              {
                question: 'CNNs are primarily used for:',
                options: ['Text data', 'Image data', 'Audio data', 'Tabular data'],
                correct: 1,
              },
              {
                question: 'Transfer learning involves:',
                options: ['Training from scratch', 'Using pre-trained models', 'No training', 'Data transfer'],
                correct: 1,
              },
              {
                question: 'ImageNet is:',
                options: ['Neural network', 'Large image dataset', 'Architecture', 'Framework'],
                correct: 1,
              },
              {
                question: 'ResNet introduced:',
                options: ['Pooling', 'Skip connections', 'Dropout', 'Batch norm'],
                correct: 1,
              },
            ],
          },
        },
        {
          id: 3,
          title: 'Recurrent Neural Networks & Transformers',
          duration: '2 weeks',
          topics: [
            {
              id: 'dl-5',
              name: 'RNNs and Sequence Modeling',
              theory: {
                title: 'Deep Learning Tutorial - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/deep-learning-tutorial/',
              },
              video: {
                title: 'RNN & LSTM - The AI Hacker',
                url: 'https://www.youtube.com/watch?v=WCUNPb-5EYI',
                channel: 'The AI Hacker',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What problem do LSTMs solve?',
                options: ['Overfitting', 'Vanishing gradients', 'Underfitting', 'Bias'],
                correct: 1,
              },
              {
                question: 'RNNs are used for:',
                options: ['Images', 'Sequential data', 'Tabular data', 'Static data'],
                correct: 1,
              },
              {
                question: 'LSTM stands for:',
                options: ['Long Short-Term Memory', 'Linear State Transfer Model', 'Large Scale Training Method', 'Layer Stacking Temporal Model'],
                correct: 0,
              },
              {
                question: 'GRU has how many gates?',
                options: ['1', '2', '3', '4'],
                correct: 1,
              },
              {
                question: 'Attention mechanism helps with:',
                options: ['Focusing on relevant parts', 'Faster training', 'Less memory', 'More layers'],
                correct: 0,
              },
              {
                question: 'Transformers use:',
                options: ['Convolution', 'Recurrence', 'Attention', 'Pooling'],
                correct: 2,
              },
              {
                question: 'BERT is:',
                options: ['CNN model', 'RNN model', 'Transformer model', 'Linear model'],
                correct: 2,
              },
              {
                question: 'Seq2Seq models are used for:',
                options: ['Classification', 'Translation', 'Regression', 'Clustering'],
                correct: 1,
              },
              {
                question: 'Teacher forcing is used in:',
                options: ['Training RNNs', 'Testing CNNs', 'Deploying models', 'Data preprocessing'],
                correct: 0,
              },
              {
                question: 'Encoder-decoder architecture is used in:',
                options: ['Image classification', 'Sequence-to-sequence tasks', 'Object detection', 'Segmentation'],
                correct: 1,
              },
            ],
          },
        },
      ],
    },
    'advanced-dsa': {
      title: 'Advanced Data Structures & Algorithms',
      description: 'Master advanced data structures including trees, graphs, and complex algorithms. Perfect for experienced programmers targeting senior roles.',
      level: 'Advanced',
      duration: '10 weeks',
      totalScore: 900,
      passingScore: 650,
      instructor: 'Prof. Michael Zhang',
      rating: 4.9,
      enrolled: 1800,
      image: '🚀',
      syllabus: [
        { week: 1, title: 'Binary Trees & BST', topics: ['Tree Traversals', 'BST Operations', 'Tree Problems'] },
        { week: 2, title: 'Advanced Trees', topics: ['AVL Trees', 'Red-Black Trees', 'B-Trees'] },
        { week: 3, title: 'Graph Algorithms', topics: ['BFS', 'DFS', 'Shortest Paths'] },
        { week: 4, title: 'Dynamic Programming', topics: ['DP Patterns', 'Optimization', 'DP Problems'] },
      ],
      modules: [
        {
          id: 1,
          title: 'Binary Trees & BST',
          duration: '2 weeks',
          topics: [
            {
              id: 'adsa-1',
              name: 'Binary Trees Fundamentals',
              theory: {
                title: 'Binary Tree - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/binary-tree-data-structure/',
              },
              video: {
                title: 'Binary Trees - mycodeschool',
                url: 'https://www.youtube.com/watch?v=H5JubkIy_p8',
                channel: 'mycodeschool',
              },
            },
            {
              id: 'adsa-2',
              name: 'Binary Search Trees',
              theory: {
                title: 'BST Operations - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/binary-search-tree-data-structure/',
              },
              video: {
                title: 'BST Complete Tutorial - Abdul Bari',
                url: 'https://www.youtube.com/watch?v=pYT9F8_LFTM',
                channel: 'Abdul Bari',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What is the time complexity of BST search in average case?',
                options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
                correct: 1,
              },
              {
                question: 'Binary tree traversal types include:',
                options: ['Inorder only', 'Preorder only', 'Postorder only', 'All of these'],
                correct: 3,
              },
              {
                question: 'In BST, left child is:',
                options: ['Greater than parent', 'Less than parent', 'Equal to parent', 'No relation'],
                correct: 1,
              },
              {
                question: 'Height of a balanced binary tree with n nodes:',
                options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
                correct: 1,
              },
              {
                question: 'AVL tree is:',
                options: ['Unbalanced tree', 'Self-balancing BST', 'Binary heap', 'Graph'],
                correct: 1,
              },
              {
                question: 'Red-Black tree ensures:',
                options: ['Always balanced', 'Approximately balanced', 'Never balanced', 'Random balance'],
                correct: 1,
              },
              {
                question: 'Complete binary tree has:',
                options: ['All levels full except possibly last', 'No structure', 'Only one node', 'Unbalanced'],
                correct: 0,
              },
              {
                question: 'Inorder traversal of BST gives:',
                options: ['Random order', 'Sorted order', 'Reverse order', 'Level order'],
                correct: 1,
              },
              {
                question: 'What is a leaf node?',
                options: ['Root node', 'Node with no children', 'Node with one child', 'Internal node'],
                correct: 1,
              },
              {
                question: 'Binary heap is used to implement:',
                options: ['Queue', 'Priority Queue', 'Stack', 'Deque'],
                correct: 1,
              },
            ],
          },
        },
        {
          id: 2,
          title: 'Graph Algorithms',
          duration: '2 weeks',
          topics: [
            {
              id: 'adsa-3',
              name: 'Graph Representations & BFS/DFS',
              theory: {
                title: 'Graph Data Structure - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/',
              },
              video: {
                title: 'Graph Algorithms - William Fiset',
                url: 'https://www.youtube.com/watch?v=tWVWeAqZ0WU',
                channel: 'William Fiset',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'Which data structure is used for BFS?',
                options: ['Stack', 'Queue', 'Heap', 'Tree'],
                correct: 1,
              },
              {
                question: 'DFS uses which data structure?',
                options: ['Queue', 'Stack', 'Heap', 'Array'],
                correct: 1,
              },
              {
                question: 'Dijkstra algorithm finds:',
                options: ['Minimum spanning tree', 'Shortest path', 'Maximum flow', 'Cycles'],
                correct: 1,
              },
              {
                question: 'Graph with no cycles is called:',
                options: ['Cyclic', 'Acyclic', 'Complete', 'Bipartite'],
                correct: 1,
              },
              {
                question: 'Topological sort works on:',
                options: ['Undirected graphs', 'Directed acyclic graphs', 'Cyclic graphs', 'Complete graphs'],
                correct: 1,
              },
              {
                question: 'Bellman-Ford algorithm can handle:',
                options: ['Only positive weights', 'Negative weights', 'No weights', 'Zero weights only'],
                correct: 1,
              },
              {
                question: 'Kruskal\'s algorithm is for:',
                options: ['Shortest path', 'Minimum spanning tree', 'Maximum flow', 'Cycle detection'],
                correct: 1,
              },
              {
                question: 'BFS finds shortest path in:',
                options: ['Weighted graphs', 'Unweighted graphs', 'Directed graphs only', 'Trees only'],
                correct: 1,
              },
              {
                question: 'Graph coloring is used in:',
                options: ['Sorting', 'Register allocation', 'Searching', 'Hashing'],
                correct: 1,
              },
              {
                question: 'Floyd-Warshall finds:',
                options: ['Single source shortest path', 'All pairs shortest path', 'MST', 'Maximum flow'],
                correct: 1,
              },
            ],
          },
        },
      ],
    },
    'mern-fullstack': {
      title: 'Complete MERN Stack Development Bootcamp',
      description: 'Build production-ready full-stack applications with MongoDB, Express.js, React, and Node.js.',
      level: 'Advanced',
      duration: '12 weeks',
      totalScore: 1000,
      passingScore: 700,
      instructor: 'Aisha Patel',
      rating: 4.8,
      enrolled: 2100,
      image: '🔥',
      syllabus: [
        { week: 1, title: 'Node.js & Express', topics: ['Node Basics', 'Express Setup', 'REST APIs'] },
        { week: 2, title: 'MongoDB', topics: ['Database Design', 'Mongoose', 'CRUD Operations'] },
        { week: 3, title: 'Authentication', topics: ['JWT', 'OAuth', 'Security'] },
        { week: 4, title: 'React Integration', topics: ['Frontend-Backend', 'State Management', 'Deployment'] },
      ],
      modules: [
        {
          id: 1,
          title: 'Node.js & Express Fundamentals',
          duration: '2 weeks',
          topics: [
            {
              id: 'mern-1',
              name: 'Node.js Basics & NPM',
              theory: {
                title: 'Node.js Tutorial - W3Schools',
                url: 'https://www.w3schools.com/nodejs/',
              },
              video: {
                title: 'Node.js Complete Course - freeCodeCamp',
                url: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
                channel: 'freeCodeCamp',
              },
            },
            {
              id: 'mern-2',
              name: 'Express.js & REST APIs',
              theory: {
                title: 'MERN Stack - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/mern-stack/',
              },
              video: {
                title: 'Express.js Tutorial - Traversy Media',
                url: 'https://www.youtube.com/watch?v=L72fhGm1tfE',
                channel: 'Traversy Media',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What is Express.js?',
                options: ['A database', 'A web framework', 'A frontend library', 'A CSS framework'],
                correct: 1,
              },
            ],
          },
        },
        {
          id: 2,
          title: 'MongoDB & Database Design',
          duration: '2 weeks',
          topics: [
            {
              id: 'mern-3',
              name: 'MongoDB Basics & Mongoose',
              theory: {
                title: 'MongoDB Tutorial - W3Schools',
                url: 'https://www.w3schools.com/mongodb/',
              },
              video: {
                title: 'MongoDB Complete Guide - Academind',
                url: 'https://www.youtube.com/watch?v=-56x56UppqQ',
                channel: 'Academind',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What type of database is MongoDB?',
                options: ['SQL', 'NoSQL', 'Graph', 'Time-series'],
                correct: 1,
              },
            ],
          },
        },
        {
          id: 3,
          title: 'React Frontend Integration',
          duration: '2 weeks',
          topics: [
            {
              id: 'mern-4',
              name: 'React with Backend APIs',
              theory: {
                title: 'React Tutorial - W3Schools',
                url: 'https://www.w3schools.com/react/',
              },
              video: {
                title: 'MERN Stack Tutorial - Traversy Media',
                url: 'https://www.youtube.com/watch?v=7CqJlxBYj-M',
                channel: 'Traversy Media',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'Which HTTP method is used to create a resource?',
                options: ['GET', 'POST', 'PUT', 'DELETE'],
                correct: 1,
              },
            ],
          },
        },
      ],
    },
    'operating-systems': {
      title: 'Operating Systems: Concepts & Implementation',
      description: 'Deep dive into operating system internals. Learn process management, memory management, file systems, and implement key OS concepts.',
      level: 'Intermediate',
      duration: '8 weeks',
      totalScore: 700,
      passingScore: 480,
      instructor: 'Prof. Thomas Anderson',
      rating: 4.6,
      enrolled: 2200,
      image: '💻',
      syllabus: [
        { week: 1, title: 'OS Introduction', topics: ['OS Architecture', 'Processes', 'System Calls'] },
        { week: 2, title: 'Threads & Concurrency', topics: ['Threading', 'Synchronization', 'Deadlocks'] },
        { week: 3, title: 'Memory Management', topics: ['Virtual Memory', 'Paging', 'Segmentation'] },
        { week: 4, title: 'File Systems', topics: ['File Operations', 'Directory Structure', 'I/O Systems'] },
      ],
      modules: [
        {
          id: 1,
          title: 'OS Introduction & Processes',
          duration: '1.5 weeks',
          topics: [
            {
              id: 'os-1',
              name: 'Operating Systems Fundamentals',
              theory: {
                title: 'Operating Systems - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/operating-systems/',
              },
              video: {
                title: 'OS Complete Course - Neso Academy',
                url: 'https://www.youtube.com/watch?v=vBURTt97EkA',
                channel: 'Neso Academy',
              },
            },
            {
              id: 'os-2',
              name: 'Process Management',
              theory: {
                title: 'Process Synchronization - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/process-synchronization-in-os/',
              },
              video: {
                title: 'Process Management - Jenny\'s Lectures',
                url: 'https://www.youtube.com/watch?v=OrM7nZcxXZU',
                channel: 'Jenny\'s Lectures',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What is a process?',
                options: ['A program in execution', 'A file on disk', 'A user interface', 'A network connection'],
                correct: 0,
              },
            ],
          },
        },
        {
          id: 2,
          title: 'Memory Management & Virtual Memory',
          duration: '2 weeks',
          topics: [
            {
              id: 'os-3',
              name: 'Memory Management Techniques',
              theory: {
                title: 'Operating Systems Tutorial - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/operating-systems/',
              },
              video: {
                title: 'Memory Management - Gate Smashers',
                url: 'https://www.youtube.com/watch?v=qdkxXygc3rE',
                channel: 'Gate Smashers',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What is paging?',
                options: ['Memory allocation technique', 'CPU scheduling', 'File system', 'Network protocol'],
                correct: 0,
              },
            ],
          },
        },
      ],
    },
    'computer-networks': {
      title: 'Computer Networks: Protocol Design & Implementation',
      description: 'Master computer networking from protocols to security. Learn TCP/IP, HTTP/HTTPS, DNS, and build network applications.',
      level: 'Intermediate',
      duration: '8 weeks',
      totalScore: 700,
      passingScore: 490,
      instructor: 'Dr. Lisa Wang',
      rating: 4.7,
      enrolled: 2400,
      image: '🌐',
      syllabus: [
        { week: 1, title: 'Network Fundamentals', topics: ['OSI Model', 'TCP/IP', 'Network Layers'] },
        { week: 2, title: 'Transport Layer', topics: ['TCP', 'UDP', 'Sockets'] },
        { week: 3, title: 'Application Layer', topics: ['HTTP', 'DNS', 'FTP'] },
        { week: 4, title: 'Network Security', topics: ['Encryption', 'Firewalls', 'VPN'] },
      ],
      modules: [
        {
          id: 1,
          title: 'Network Fundamentals & OSI Model',
          duration: '1.5 weeks',
          topics: [
            {
              id: 'net-1',
              name: 'Introduction to Computer Networks',
              theory: {
                title: 'Computer Networks - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/computer-network-tutorials/',
              },
              video: {
                title: 'Computer Networks Course - Neso Academy',
                url: 'https://www.youtube.com/watch?v=VwN91x5i25g',
                channel: 'Neso Academy',
              },
            },
            {
              id: 'net-2',
              name: 'TCP/IP Protocol Suite',
              theory: {
                title: 'TCP/IP Model - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/tcp-ip-model/',
              },
              video: {
                title: 'TCP/IP Explained - PowerCert',
                url: 'https://www.youtube.com/watch?v=PpsEaqJV_A0',
                channel: 'PowerCert',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'How many layers are in the OSI model?',
                options: ['5', '6', '7', '8'],
                correct: 2,
              },
            ],
          },
        },
        {
          id: 2,
          title: 'Socket Programming',
          duration: '2 weeks',
          topics: [
            {
              id: 'net-3',
              name: 'Socket Programming with Python',
              theory: {
                title: 'Python Network Programming - W3Schools',
                url: 'https://www.w3schools.com/python/python_network.asp',
              },
              video: {
                title: 'Socket Programming - Tech With Tim',
                url: 'https://www.youtube.com/watch?v=3QiPPX-KeSc',
                channel: 'Tech With Tim',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'Which protocol is connection-oriented?',
                options: ['UDP', 'TCP', 'ICMP', 'ARP'],
                correct: 1,
              },
            ],
          },
        },
      ],
    },
    'dbms-course': {
      title: 'Database Management Systems - SQL & NoSQL Mastery',
      description: 'Master database design, SQL queries, normalization, transactions, and NoSQL databases. Learn PostgreSQL, MongoDB, and optimization.',
      level: 'Intermediate',
      duration: '9 weeks',
      totalScore: 750,
      passingScore: 520,
      instructor: 'Mark Stevens',
      rating: 4.8,
      enrolled: 2600,
      image: '🗄️',
      syllabus: [
        { week: 1, title: 'SQL Basics', topics: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'] },
        { week: 2, title: 'Advanced SQL', topics: ['Joins', 'Subqueries', 'Aggregations'] },
        { week: 3, title: 'Database Design', topics: ['Normalization', 'ER Diagrams', 'Schema Design'] },
        { week: 4, title: 'MongoDB', topics: ['Document DB', 'CRUD', 'Aggregation Pipeline'] },
      ],
      modules: [
        {
          id: 1,
          title: 'SQL Basics & Queries',
          duration: '2 weeks',
          topics: [
            {
              id: 'db-1',
              name: 'SQL Fundamentals',
              theory: {
                title: 'SQL Tutorial - W3Schools',
                url: 'https://www.w3schools.com/sql/',
              },
              video: {
                title: 'SQL Complete Course - freeCodeCamp',
                url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
                channel: 'freeCodeCamp',
              },
            },
            {
              id: 'db-2',
              name: 'Advanced SQL Queries',
              theory: {
                title: 'PostgreSQL Tutorial - W3Schools',
                url: 'https://www.w3schools.com/postgresql/',
              },
              video: {
                title: 'SQL Joins Explained - Programming with Mosh',
                url: 'https://www.youtube.com/watch?v=9yeOJ0ZMUYw',
                channel: 'Programming with Mosh',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What does SQL stand for?',
                options: ['Structured Query Language', 'Simple Question Language', 'Standard Query List', 'System Query Logic'],
                correct: 0,
              },
            ],
          },
        },
        {
          id: 2,
          title: 'Database Design & Normalization',
          duration: '1.5 weeks',
          topics: [
            {
              id: 'db-3',
              name: 'Database Normalization',
              theory: {
                title: 'DBMS Concepts - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/dbms/',
              },
              video: {
                title: 'Database Design - Caleb Curry',
                url: 'https://www.youtube.com/watch?v=ztHopE5Wnpc',
                channel: 'Caleb Curry',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What is the goal of normalization?',
                options: ['Increase redundancy', 'Reduce redundancy', 'Add more tables', 'Remove all tables'],
                correct: 1,
              },
            ],
          },
        },
        {
          id: 3,
          title: 'MongoDB & NoSQL',
          duration: '2 weeks',
          topics: [
            {
              id: 'db-4',
              name: 'MongoDB Basics',
              theory: {
                title: 'MongoDB Tutorial - W3Schools',
                url: 'https://www.w3schools.com/mongodb/',
              },
              video: {
                title: 'MongoDB Complete Course - Academind',
                url: 'https://www.youtube.com/watch?v=-56x56UppqQ',
                channel: 'Academind',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What type of database is MongoDB?',
                options: ['Relational', 'Document', 'Graph', 'Key-Value'],
                correct: 1,
              },
            ],
          },
        },
      ],
    },
    'system-design': {
      title: 'System Design & Scalable Architecture',
      description: 'Learn to design large-scale distributed systems. Master scalability patterns, microservices, caching, load balancing.',
      level: 'Advanced',
      duration: '10 weeks',
      totalScore: 900,
      passingScore: 630,
      instructor: 'Alex Morrison',
      rating: 4.9,
      enrolled: 1700,
      image: '🏗️',
      syllabus: [
        { week: 1, title: 'System Design Basics', topics: ['Scalability', 'Reliability', 'Availability'] },
        { week: 2, title: 'Load Balancing', topics: ['Load Balancers', 'Caching', 'CDN'] },
        { week: 3, title: 'Databases', topics: ['SQL vs NoSQL', 'Sharding', 'Replication'] },
        { week: 4, title: 'Microservices', topics: ['Service Architecture', 'API Gateway', 'Message Queues'] },
      ],
      modules: [
        {
          id: 1,
          title: 'System Design Fundamentals',
          duration: '2 weeks',
          topics: [
            {
              id: 'sd-1',
              name: 'Introduction to System Design',
              theory: {
                title: 'System Design Tutorial - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/system-design-tutorial/',
              },
              video: {
                title: 'System Design Primer - Gaurav Sen',
                url: 'https://www.youtube.com/watch?v=FSR1s2b-l_I',
                channel: 'Gaurav Sen',
              },
            },
            {
              id: 'sd-2',
              name: 'Scalability & Load Balancing',
              theory: {
                title: 'System Design Roadmap - TakeUforward',
                url: 'https://takeuforward.org/system-design/complete-system-design-roadmap-with-videos-for-sdes/',
              },
              video: {
                title: 'Scalability - Tech Dummies',
                url: 'https://www.youtube.com/watch?v=xpDnVSmNFX0',
                channel: 'Tech Dummies',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What is horizontal scaling?',
                options: ['Adding more power to servers', 'Adding more servers', 'Adding more storage', 'Adding more networks'],
                correct: 1,
              },
            ],
          },
        },
        {
          id: 2,
          title: 'Microservices Architecture',
          duration: '2 weeks',
          topics: [
            {
              id: 'sd-3',
              name: 'Microservices Design Patterns',
              theory: {
                title: 'Design Patterns - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/design-patterns/',
              },
              video: {
                title: 'Microservices Tutorial - freeCodeCamp',
                url: 'https://www.youtube.com/watch?v=CdBtNQZH8a4',
                channel: 'freeCodeCamp',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What is the main benefit of microservices?',
                options: ['Simplicity', 'Monolithic structure', 'Independent deployment', 'Single database'],
                correct: 2,
              },
            ],
          },
        },
      ],
    },
    'react-native': {
      title: 'React Native - Build iOS & Android Apps',
      description: 'Build cross-platform mobile apps with React Native. Learn navigation, state management, native modules, and app publishing.',
      level: 'Intermediate',
      duration: '8 weeks',
      totalScore: 700,
      passingScore: 490,
      instructor: 'Sophie Martinez',
      rating: 4.7,
      enrolled: 1600,
      image: '📱',
      syllabus: [
        { week: 1, title: 'React Native Basics', topics: ['Setup', 'Components', 'Styling'] },
        { week: 2, title: 'Navigation', topics: ['React Navigation', 'Stack', 'Tabs'] },
        { week: 3, title: 'State Management', topics: ['Context API', 'Redux', 'Async Storage'] },
        { week: 4, title: 'Native Features', topics: ['Camera', 'GPS', 'Notifications'] },
      ],
      modules: [
        {
          id: 1,
          title: 'React Native Fundamentals',
          duration: '2 weeks',
          topics: [
            {
              id: 'rn-1',
              name: 'Getting Started with React Native',
              theory: {
                title: 'React Native Tutorial - W3Schools',
                url: 'https://www.w3schools.com/react/react_native.asp',
              },
              video: {
                title: 'React Native Course - freeCodeCamp',
                url: 'https://www.youtube.com/watch?v=0-S5a0eXPoc',
                channel: 'freeCodeCamp',
              },
            },
            {
              id: 'rn-2',
              name: 'React Native Components',
              theory: {
                title: 'React Native - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/react-native/',
              },
              video: {
                title: 'React Native Components - Programming with Mosh',
                url: 'https://www.youtube.com/watch?v=0-S5a0eXPoc',
                channel: 'Programming with Mosh',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What library is used for navigation in React Native?',
                options: ['React Router', 'React Navigation', 'Native Navigation', 'RN Router'],
                correct: 1,
              },
            ],
          },
        },
        {
          id: 2,
          title: 'State Management & APIs',
          duration: '2 weeks',
          topics: [
            {
              id: 'rn-3',
              name: 'React Context & Redux',
              theory: {
                title: 'React Tutorial - W3Schools',
                url: 'https://www.w3schools.com/react/',
              },
              video: {
                title: 'React Native State Management - Academind',
                url: 'https://www.youtube.com/watch?v=MJzmZ9qmdaE',
                channel: 'Academind',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What is used for persistent storage in React Native?',
                options: ['localStorage', 'AsyncStorage', 'SessionStorage', 'Cookies'],
                correct: 1,
              },
            ],
          },
        },
      ],
    },
    'android-kotlin': {
      title: 'Android Development Masterclass with Kotlin',
      description: 'Master native Android development with Kotlin and Jetpack Compose. Build modern Android apps with Material Design.',
      level: 'Intermediate',
      duration: '10 weeks',
      totalScore: 800,
      passingScore: 560,
      instructor: 'Kevin Park',
      rating: 4.8,
      enrolled: 1400,
      image: '🤖',
      syllabus: [
        { week: 1, title: 'Kotlin Basics', topics: ['Syntax', 'OOP', 'Functions'] },
        { week: 2, title: 'Android Fundamentals', topics: ['Activities', 'Intents', 'Layouts'] },
        { week: 3, title: 'Jetpack Compose', topics: ['Composables', 'State', 'UI'] },
        { week: 4, title: 'Data Persistence', topics: ['Room DB', 'SharedPreferences', 'DataStore'] },
      ],
      modules: [
        {
          id: 1,
          title: 'Kotlin Programming Fundamentals',
          duration: '2 weeks',
          topics: [
            {
              id: 'android-1',
              name: 'Kotlin Basics',
              theory: {
                title: 'Kotlin Tutorial - W3Schools',
                url: 'https://www.w3schools.com/kotlin/',
              },
              video: {
                title: 'Kotlin Course - freeCodeCamp',
                url: 'https://www.youtube.com/watch?v=F9UC9DY-vIU',
                channel: 'freeCodeCamp',
              },
            },
            {
              id: 'android-2',
              name: 'Kotlin for Android',
              theory: {
                title: 'Kotlin Programming - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/kotlin-programming-language/',
              },
              video: {
                title: 'Kotlin Android Tutorial - Philipp Lackner',
                url: 'https://www.youtube.com/watch?v=BBWyXo-3JGQ',
                channel: 'Philipp Lackner',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What is the null-safe operator in Kotlin?',
                options: ['?', '!', '!!', '?.'],
                correct: 3,
              },
            ],
          },
        },
        {
          id: 2,
          title: 'Android Basics & Layouts',
          duration: '2 weeks',
          topics: [
            {
              id: 'android-3',
              name: 'Android Activities & Intents',
              theory: {
                title: 'Android Tutorial - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/android-tutorial/',
              },
              video: {
                title: 'Android Development - Traversy Media',
                url: 'https://www.youtube.com/watch?v=fis26HvvDII',
                channel: 'Traversy Media',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What is an Activity in Android?',
                options: ['A database', 'A screen', 'A service', 'A file'],
                correct: 1,
              },
            ],
          },
        },
      ],
    },
    'devops-basics': {
      title: 'DevOps Engineering Bootcamp - CI/CD to Kubernetes',
      description: 'Master DevOps practices with Git, CI/CD pipelines, Docker, Kubernetes, Jenkins, and cloud deployment.',
      level: 'Intermediate',
      duration: '8 weeks',
      totalScore: 700,
      passingScore: 490,
      instructor: 'Robert Chen',
      rating: 4.7,
      enrolled: 1900,
      image: '⚙️',
      syllabus: [
        { week: 1, title: 'Git & Version Control', topics: ['Git Basics', 'Branching', 'Merging'] },
        { week: 2, title: 'CI/CD Pipelines', topics: ['Jenkins', 'GitHub Actions', 'Automation'] },
        { week: 3, title: 'Docker', topics: ['Containers', 'Images', 'Docker Compose'] },
        { week: 4, title: 'Kubernetes', topics: ['Pods', 'Deployments', 'Services'] },
      ],
      modules: [
        {
          id: 1,
          title: 'Git & Version Control Mastery',
          duration: '1.5 weeks',
          topics: [
            {
              id: 'devops-1',
              name: 'Git Fundamentals',
              theory: {
                title: 'Git Tutorial - W3Schools',
                url: 'https://www.w3schools.com/git/',
              },
              video: {
                title: 'Git & GitHub Complete Course - freeCodeCamp',
                url: 'https://www.youtube.com/watch?v=RGOj5yH7evk',
                channel: 'freeCodeCamp',
              },
            },
            {
              id: 'devops-2',
              name: 'Git Branching Strategies',
              theory: {
                title: 'DevOps Tutorial - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/devops-tutorial/',
              },
              video: {
                title: 'Git Branching - The Net Ninja',
                url: 'https://www.youtube.com/watch?v=QV0kVNvkMxc',
                channel: 'The Net Ninja',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What command is used to create a new branch?',
                options: ['git new branch', 'git branch', 'git checkout -b', 'git create branch'],
                correct: 2,
              },
            ],
          },
        },
        {
          id: 2,
          title: 'Docker & Containerization',
          duration: '2 weeks',
          topics: [
            {
              id: 'devops-3',
              name: 'Docker Basics & Images',
              theory: {
                title: 'Docker Tutorial - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/docker-tutorial/',
              },
              video: {
                title: 'Docker Complete Course - TechWorld with Nana',
                url: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
                channel: 'TechWorld with Nana',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What is a Docker container?',
                options: ['A virtual machine', 'A lightweight executable package', 'A database', 'A web server'],
                correct: 1,
              },
            ],
          },
        },
      ],
    },
    'aws-cloud': {
      title: 'AWS Solutions Architect - Complete Certification Course',
      description: 'Master AWS cloud services and architecture. Learn EC2, S3, Lambda, VPC, RDS, and prepare for AWS certification.',
      level: 'Advanced',
      duration: '10 weeks',
      totalScore: 900,
      passingScore: 630,
      instructor: 'Rachel Brown',
      rating: 4.8,
      enrolled: 1500,
      image: '☁️',
      syllabus: [
        { week: 1, title: 'AWS Fundamentals', topics: ['IAM', 'Regions', 'AWS Console'] },
        { week: 2, title: 'EC2 & Compute', topics: ['EC2 Instances', 'Auto Scaling', 'Load Balancers'] },
        { week: 3, title: 'Storage Services', topics: ['S3', 'EBS', 'EFS'] },
        { week: 4, title: 'Databases', topics: ['RDS', 'DynamoDB', 'Aurora'] },
      ],
      modules: [
        {
          id: 1,
          title: 'AWS Fundamentals & IAM',
          duration: '1.5 weeks',
          topics: [
            {
              id: 'aws-1',
              name: 'Introduction to AWS',
              theory: {
                title: 'AWS Tutorial - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/aws-tutorial/',
              },
              video: {
                title: 'AWS Certified Solutions Architect - freeCodeCamp',
                url: 'https://www.youtube.com/watch?v=Ia-UEYYR44s',
                channel: 'freeCodeCamp',
              },
            },
            {
              id: 'aws-2',
              name: 'IAM & Security',
              theory: {
                title: 'AWS Cloud Computing - W3Schools',
                url: 'https://www.w3schools.com/aws/',
              },
              video: {
                title: 'AWS IAM Tutorial - Simplilearn',
                url: 'https://www.youtube.com/watch?v=ExjW3HCFVLA',
                channel: 'Simplilearn',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What does IAM stand for?',
                options: ['Internet Access Management', 'Identity and Access Management', 'Infrastructure Application Manager', 'Instance Authentication Method'],
                correct: 1,
              },
            ],
          },
        },
        {
          id: 2,
          title: 'EC2 & Compute Services',
          duration: '2 weeks',
          topics: [
            {
              id: 'aws-3',
              name: 'EC2 Instances & Auto Scaling',
              theory: {
                title: 'Amazon Web Services - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/amazon-web-services-aws/',
              },
              video: {
                title: 'AWS EC2 Complete Course - Edureka',
                url: 'https://www.youtube.com/watch?v=_xPBNjvnHTo',
                channel: 'Edureka',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What is EC2?',
                options: ['A database service', 'A virtual server in the cloud', 'A storage service', 'A networking tool'],
                correct: 1,
              },
            ],
          },
        },
        {
          id: 3,
          title: 'Storage Services (S3, EBS, EFS)',
          duration: '2 weeks',
          topics: [
            {
              id: 'aws-4',
              name: 'Amazon S3 & Storage Options',
              theory: {
                title: 'AWS Tutorial - W3Schools',
                url: 'https://www.w3schools.com/aws/',
              },
              video: {
                title: 'AWS S3 Tutorial - Simplilearn',
                url: 'https://www.youtube.com/watch?v=77lMCiiMilo',
                channel: 'Simplilearn',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What does S3 stand for?',
                options: ['Simple Storage Service', 'Secure Server Storage', 'System Storage Solution', 'Standard Storage Service'],
                correct: 0,
              },
            ],
          },
        },
      ],
    },
    'nlp-course': {
      title: 'Natural Language Processing - From BERT to GPT',
      description: 'Master modern NLP techniques with Transformers, BERT, GPT. Build chatbots, sentiment analysis systems, and language models.',
      level: 'Advanced',
      duration: '10 weeks',
      totalScore: 850,
      passingScore: 595,
      instructor: 'Prof. David Lee',
      rating: 4.8,
      enrolled: 1200,
      image: '💬',
      syllabus: [
        { week: 1, title: 'NLP Foundations', topics: ['Text Processing', 'Tokenization', 'Word Embeddings'] },
        { week: 2, title: 'Transformers', topics: ['Attention', 'BERT', 'GPT'] },
        { week: 3, title: 'Applications', topics: ['Sentiment Analysis', 'NER', 'Question Answering'] },
      ],
      modules: [
        {
          id: 1,
          title: 'NLP Foundations & Text Processing',
          duration: '2 weeks',
          topics: [
            {
              id: 'nlp-1',
              name: 'Introduction to NLP',
              theory: {
                title: 'NLP Tutorial - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/natural-language-processing-nlp-tutorial/',
              },
              video: {
                title: 'NLP Complete Course - freeCodeCamp',
                url: 'https://www.youtube.com/watch?v=fLvJ8VdHLA0',
                channel: 'freeCodeCamp',
              },
            },
            {
              id: 'nlp-2',
              name: 'Word Embeddings & Representations',
              theory: {
                title: 'Python NLP - W3Schools',
                url: 'https://www.w3schools.com/python/python_ml_nlp.asp',
              },
              video: {
                title: 'Word2Vec Explained - Computerphile',
                url: 'https://www.youtube.com/watch?v=nk2CQITm_eo',
                channel: 'Computerphile',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What is tokenization?',
                options: ['Splitting text into tokens', 'Encrypting text', 'Translating text', 'Compressing text'],
                correct: 0,
              },
            ],
          },
        },
        {
          id: 2,
          title: 'Transformer Architecture',
          duration: '2 weeks',
          topics: [
            {
              id: 'nlp-3',
              name: 'Transformers & Attention Mechanisms',
              theory: {
                title: 'Transformer Neural Network - GeeksforGeeks',
                url: 'https://www.geeksforgeeks.org/transformer-neural-network/',
              },
              video: {
                title: 'Transformers Explained - Yannic Kilcher',
                url: 'https://www.youtube.com/watch?v=4Bdc55j80l8',
                channel: 'Yannic Kilcher',
              },
            },
          ],
          quiz: {
            questions: [
              {
                question: 'What is the key innovation in Transformers?',
                options: ['Convolution', 'Attention mechanism', 'Pooling', 'Dropout'],
                correct: 1,
              },
            ],
          },
        },
      ],
    },
  };

  const course = courseData[courseId];

  const createTopicFallbackResources = (topicName) => {
    const topic = (topicName || '').toLowerCase();

    const curatedResources = [
      {
        keys: ['array'],
        theory: { title: 'Array Data Structure - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/array-data-structure/' },
        video: { title: 'Arrays Introduction - freeCodeCamp', url: 'https://www.youtube.com/watch?v=rZ41y93P2Qo', channel: 'freeCodeCamp' },
      },
      {
        keys: ['linked list'],
        theory: { title: 'Linked List Data Structure - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/data-structures/linked-list/' },
        video: { title: 'Linked List Tutorial - mycodeschool', url: 'https://www.youtube.com/watch?v=92S4zgXN17o', channel: 'mycodeschool' },
      },
      {
        keys: ['stack'],
        theory: { title: 'Stack Data Structure - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/stack-data-structure/' },
        video: { title: 'Stack Data Structure Tutorial - mycodeschool', url: 'https://www.youtube.com/watch?v=F1F2imiOJfk', channel: 'mycodeschool' },
      },
      {
        keys: ['queue'],
        theory: { title: 'Queue Data Structure - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/queue-data-structure/' },
        video: { title: 'Queue Data Structure Tutorial - Abdul Bari', url: 'https://www.youtube.com/watch?v=XuCbpw6Bj1U', channel: 'Abdul Bari' },
      },
      {
        keys: ['sorting', 'sort'],
        theory: { title: 'Sorting Algorithms - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/sorting-algorithms/' },
        video: { title: 'Sorting Algorithms Explained - freeCodeCamp', url: 'https://www.youtube.com/watch?v=kgBjXUE_Nwc', channel: 'freeCodeCamp' },
      },
      {
        keys: ['search'],
        theory: { title: 'Searching Algorithms - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/searching-algorithms/' },
        video: { title: 'Binary Search - Abdul Bari', url: 'https://www.youtube.com/watch?v=uEUXGcc2VXM', channel: 'Abdul Bari' },
      },
      {
        keys: ['recursion', 'backtracking', 'divide and conquer'],
        theory: { title: 'Recursion - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/recursion/' },
        video: { title: 'Recursion Explained - freeCodeCamp', url: 'https://www.youtube.com/watch?v=IJDJ0kBx2LM', channel: 'freeCodeCamp' },
      },
      {
        keys: ['tree', 'bst', 'binary tree', 'avl', 'red-black'],
        theory: { title: 'Tree Data Structure - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/tree-data-structure/' },
        video: { title: 'Binary Trees - mycodeschool', url: 'https://www.youtube.com/watch?v=H5JubkIy_p8', channel: 'mycodeschool' },
      },
      {
        keys: ['graph', 'bfs', 'dfs', 'shortest path'],
        theory: { title: 'Graph Data Structure and Algorithms - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/' },
        video: { title: 'Graph Theory Basics - freeCodeCamp', url: 'https://www.youtube.com/watch?v=09_LlHjoEiY', channel: 'freeCodeCamp' },
      },
      {
        keys: ['dynamic programming', 'dp'],
        theory: { title: 'Dynamic Programming - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/dynamic-programming/' },
        video: { title: 'Dynamic Programming - Aditya Verma', url: 'https://www.youtube.com/watch?v=oBt53YbR9Kk', channel: 'Aditya Verma' },
      },
      {
        keys: ['react', 'jsx', 'component', 'hook', 'router', 'redux'],
        theory: { title: 'React Documentation - Learn React', url: 'https://react.dev/learn' },
        video: { title: 'React Course for Beginners - freeCodeCamp', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8', channel: 'freeCodeCamp' },
      },
      {
        keys: ['html'],
        theory: { title: 'HTML Tutorial - MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content' },
        video: { title: 'HTML Full Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=pQN-pnXPaVg', channel: 'freeCodeCamp' },
      },
      {
        keys: ['css', 'flexbox', 'grid', 'responsive'],
        theory: { title: 'CSS - MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
        video: { title: 'CSS Full Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=OXGznpKZ_sA', channel: 'freeCodeCamp' },
      },
      {
        keys: ['javascript', 'dom', 'es6'],
        theory: { title: 'JavaScript Guide - MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
        video: { title: 'JavaScript Full Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg', channel: 'freeCodeCamp' },
      },
      {
        keys: ['node', 'npm', 'module', 'file system', 'stream', 'cli'],
        theory: { title: 'Node.js Documentation - Learn', url: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs' },
        video: { title: 'Node.js Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=Oe421EPjeBE', channel: 'freeCodeCamp' },
      },
      {
        keys: ['express', 'rest api', 'middleware', 'api'],
        theory: { title: 'Express.js Guide', url: 'https://expressjs.com/en/guide/routing.html' },
        video: { title: 'Express JS Crash Course - Traversy Media', url: 'https://www.youtube.com/watch?v=L72fhGm1tfE', channel: 'Traversy Media' },
      },
      {
        keys: ['mongo', 'mongoose', 'database', 'dbms', 'sql', 'normalization'],
        theory: { title: 'MongoDB Manual - CRUD Operations', url: 'https://www.mongodb.com/docs/manual/crud/' },
        video: { title: 'MongoDB Full Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=ofme2o29ngU', channel: 'freeCodeCamp' },
      },
      {
        keys: ['auth', 'jwt', 'oauth', 'security', 'encryption'],
        theory: { title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
        video: { title: 'JWT Authentication Tutorial - Web Dev Simplified', url: 'https://www.youtube.com/watch?v=mbsmsi7l3r4', channel: 'Web Dev Simplified' },
      },
      {
        keys: ['machine learning', 'ml', 'regression', 'classification', 'svm', 'k-means', 'pca', 'feature'],
        theory: { title: 'Machine Learning Crash Course - Google', url: 'https://developers.google.com/machine-learning/crash-course' },
        video: { title: 'Machine Learning Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=NWONeJKn6kc', channel: 'freeCodeCamp' },
      },
      {
        keys: ['deep learning', 'neural', 'cnn', 'rnn', 'lstm', 'transformer', 'bert', 'gpt'],
        theory: { title: 'Deep Learning Specialization Notes - DeepLearning.AI', url: 'https://www.deeplearning.ai/courses/deep-learning-specialization/' },
        video: { title: 'Neural Networks - 3Blue1Brown', url: 'https://www.youtube.com/watch?v=aircAruvnKk', channel: '3Blue1Brown' },
      },
      {
        keys: ['operating system', 'os', 'process', 'thread', 'cpu scheduling', 'memory management', 'deadlock'],
        theory: { title: 'Operating Systems Notes - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/operating-systems/' },
        video: { title: 'Operating System Full Course - Neso Academy', url: 'https://www.youtube.com/watch?v=26QPDBe-NB8', channel: 'Neso Academy' },
      },
      {
        keys: ['network', 'tcp', 'udp', 'http', 'dns', 'osi'],
        theory: { title: 'Computer Networking - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/computer-network-tutorials/' },
        video: { title: 'Computer Networking Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=qiQR5rTSshw', channel: 'freeCodeCamp' },
      },
      {
        keys: ['system design', 'scalability', 'load balancer', 'caching', 'distributed'],
        theory: { title: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer' },
        video: { title: 'System Design Basics - Gaurav Sen', url: 'https://www.youtube.com/watch?v=UzLMhqg3_Wc', channel: 'Gaurav Sen' },
      },
      {
        keys: ['android', 'kotlin', 'jetpack', 'room', 'sharedpreferences', 'datastore'],
        theory: { title: 'Android Developer Guides', url: 'https://developer.android.com/guide' },
        video: { title: 'Android Development Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=fis26HvvDII', channel: 'freeCodeCamp' },
      },
      {
        keys: ['react native', 'mobile app'],
        theory: { title: 'React Native Documentation', url: 'https://reactnative.dev/docs/getting-started' },
        video: { title: 'React Native Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=0-S5a0eXPoc', channel: 'freeCodeCamp' },
      },
      {
        keys: ['devops', 'docker', 'kubernetes', 'ci/cd', 'jenkins', 'terraform', 'aws', 'cloud'],
        theory: { title: 'DevOps Roadmap', url: 'https://roadmap.sh/devops' },
        video: { title: 'DevOps Full Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=9pZ2xmsSDdo', channel: 'freeCodeCamp' },
      },
      {
        keys: ['cybersecurity', 'pentest', 'xss', 'sql injection', 'vulnerability'],
        theory: { title: 'Cybersecurity Roadmap', url: 'https://roadmap.sh/cyber-security' },
        video: { title: 'Cybersecurity Full Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=U_P23SqJaDc', channel: 'freeCodeCamp' },
      },
    ];

    const match = curatedResources.find((resource) =>
      resource.keys.some((key) => topic.includes(key))
    );

    if (match) {
      return {
        theory: match.theory,
        video: match.video,
      };
    }

    return {
      theory: {
        title: `${topicName} - GeeksforGeeks`,
        url: `https://www.geeksforgeeks.org/?s=${encodeURIComponent(topicName)}`,
      },
      video: {
        title: `${topicName} - freeCodeCamp`,
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(topicName + ' freeCodeCamp')}`,
        channel: 'freeCodeCamp',
      },
    };
  };

  const buildAutoQuiz = (module, week) => {
    const primaryTopic = week?.topics?.[0] || module?.topics?.[0]?.name || 'Core concepts';
    return {
      questions: [
        {
          question: `Which topic is part of ${module.title}?`,
          options: [primaryTopic, 'Unrelated topic', 'Optional appendix only', 'Not covered in this module'],
          correct: 0,
        },
      ],
    };
  };

  const learningModules = useMemo(() => {
    if (!course) return [];

    const syllabus = Array.isArray(course.syllabus) ? course.syllabus : [];
    const baseModules = Array.isArray(course.modules) ? course.modules : [];

    if (syllabus.length === 0) {
      return baseModules.map((module, index) => ({
        ...module,
        id: index + 1,
        quiz: module.quiz || buildAutoQuiz(module),
      }));
    }

    const usedModuleIndexes = new Set();

    const normalizeTitle = (value = '') =>
      value
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    const expandedFromSyllabus = syllabus.map((week, index) => {
      const normalizedWeekTitle = normalizeTitle(week.title);
      let existingModuleIndex = baseModules.findIndex(
        (module, moduleIndex) =>
          !usedModuleIndexes.has(moduleIndex) &&
          normalizeTitle(module.title) === normalizedWeekTitle
      );

      if (existingModuleIndex === -1) {
        existingModuleIndex = baseModules.findIndex(
          (module, moduleIndex) =>
            !usedModuleIndexes.has(moduleIndex) &&
            (normalizeTitle(module.title).includes(normalizedWeekTitle) ||
              normalizedWeekTitle.includes(normalizeTitle(module.title)))
        );
      }

      if (existingModuleIndex === -1 && baseModules[index] && !usedModuleIndexes.has(index)) {
        existingModuleIndex = index;
      }

      const existingModule = existingModuleIndex >= 0 ? baseModules[existingModuleIndex] : null;

      if (existingModule) {
        usedModuleIndexes.add(existingModuleIndex);

        const existingTopics = Array.isArray(existingModule.topics) ? existingModule.topics : [];
        const orderedTopics = (week.topics || []).map((topicName, topicIndex) => {
          const normalizedSyllabusTopic = normalizeTitle(topicName);

          const matchedExistingTopic = existingTopics.find((topic) => {
            const normalizedExistingTopic = normalizeTitle(topic.name);
            return (
              normalizedExistingTopic === normalizedSyllabusTopic ||
              normalizedExistingTopic.includes(normalizedSyllabusTopic) ||
              normalizedSyllabusTopic.includes(normalizedExistingTopic)
            );
          });

          const fallback = createTopicFallbackResources(topicName);
          return {
            id: matchedExistingTopic?.id || `${courseId}-week-${week.week}-topic-${topicIndex + 1}`,
            name: topicName,
            theory: matchedExistingTopic?.theory || fallback.theory,
            video: matchedExistingTopic?.video || fallback.video,
          };
        });

        return {
          ...existingModule,
          id: index + 1,
          title: week.title || existingModule.title,
          duration: existingModule.duration || '1 week',
          topics: orderedTopics,
          quiz: existingModule.quiz || buildAutoQuiz(existingModule, week),
        };
      }

      const generatedTopics = (week.topics || []).map((topicName, topicIndex) => {
        const fallback = createTopicFallbackResources(topicName);
        return {
          id: `${courseId}-week-${week.week}-topic-${topicIndex + 1}`,
          name: topicName,
          theory: fallback.theory,
          video: fallback.video,
        };
      });

      const generatedModule = {
        id: index + 1,
        title: week.title || `Week ${week.week}`,
        duration: '1 week',
        topics: generatedTopics,
      };

      return {
        ...generatedModule,
        quiz: buildAutoQuiz(generatedModule, week),
      };
    });

    return expandedFromSyllabus;
  }, [course, courseId]);

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
    const totalTopics = learningModules.reduce((acc, module) => acc + module.topics.length, 0);
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
                  <div className="text-4xl font-bold text-primary mb-2">{learningModules.length}</div>
                  <div className="text-gray-600 dark:text-gray-400">Total Modules</div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {learningModules.reduce((acc, m) => acc + m.topics.length, 0)}
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
                {completedTopics.length} of {learningModules.reduce((acc, m) => acc + m.topics.length, 0)} topics completed
              </p>
            </div>

            {/* Modules */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📚 Course Modules</h2>
            <div className="space-y-6">
              {learningModules.map((module) => (
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
          module={learningModules.find(m => m.id === quizModule)}
          onClose={() => setShowQuiz(false)}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
};

// Utility function to shuffle array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Quiz Modal Component
const QuizModal = ({ module, onClose, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Shuffle questions and options when component mounts
  useEffect(() => {
    const shuffled = shuffleArray(module.quiz.questions).map(question => {
      // Shuffle options and track correct answer position
      const optionsWithIndex = question.options.map((option, idx) => ({
        text: option,
        isCorrect: idx === question.correct
      }));
      const shuffledOptions = shuffleArray(optionsWithIndex);
      const newCorrectIndex = shuffledOptions.findIndex(opt => opt.isCorrect);
      
      return {
        ...question,
        options: shuffledOptions.map(opt => opt.text),
        correct: newCorrectIndex
      };
    });
    setShuffledQuestions(shuffled);
  }, [module]);

  const handleAnswer = () => {
    if (shuffledQuestions.length === 0) return;
    
    const isCorrect = selectedAnswer === shuffledQuestions[currentQuestion].correct;
    setAnswers([...answers, { question: currentQuestion, correct: isCorrect }]);
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < shuffledQuestions.length) {
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

  // Don't render until questions are shuffled
  if (shuffledQuestions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  const percentage = Math.round((score / shuffledQuestions.length) * 100);

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
                Question {currentQuestion + 1} of {shuffledQuestions.length}
              </p>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {shuffledQuestions[currentQuestion].question}
              </h4>

              <div className="space-y-3">
                {shuffledQuestions[currentQuestion].options.map((option, index) => (
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
              {currentQuestion + 1 === shuffledQuestions.length ? 'Finish Quiz' : 'Next Question'}
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
              {score}/{shuffledQuestions.length}
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
