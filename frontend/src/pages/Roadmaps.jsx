import { useState } from 'react';
import { Link } from 'react-router-dom';

const Roadmaps = () => {
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);

  const roadmaps = {
    dsa: {
      title: '🎯 DSA & Competitive Programming',
      description: 'Master Data Structures and Algorithms for coding interviews',
      duration: '6-8 months',
      difficulty: 'Intermediate',
      phases: [
        {
          phase: 'Phase 1: Programming Fundamentals',
          duration: '2-3 weeks',
          topics: [
            { name: 'Basic Syntax & I/O', techniques: ['Input/Output Operations', 'String Formatting', 'File Handling'] },
            { name: 'Control Flow', techniques: ['If-Else Statements', 'Switch Cases', 'Loops (For, While)', 'Break & Continue'] },
            { name: 'Functions & Recursion', techniques: ['Function Parameters', 'Return Values', 'Recursive Functions', 'Base Cases'] },
          ],
        },
        {
          phase: 'Phase 2: Arrays & String Techniques',
          duration: '4-6 weeks',
          topics: [
            { name: 'Arrays', techniques: ['Two Pointers', 'Sliding Window', 'Prefix Sum', 'Kadane\'s Algorithm', 'Dutch National Flag', 'Binary Search'] },
            { name: 'Strings', techniques: ['Pattern Matching', 'KMP Algorithm', 'Rabin-Karp', 'Anagram Checking', 'Palindrome Patterns', 'String Hashing'] },
            { name: 'Hashing', techniques: ['HashMap/HashSet', 'Frequency Counting', 'Two Sum Pattern', 'Subarray Sum Problems'] },
          ],
        },
        {
          phase: 'Phase 3: Linked Lists & Pointers',
          duration: '3-4 weeks',
          topics: [
            { name: 'Linked Lists', techniques: ['Fast & Slow Pointers', 'Reversal', 'Cycle Detection (Floyd\'s)', 'Merge Two Lists', 'Remove Nth Node', 'Dummy Node Technique'] },
            { name: 'Stacks', techniques: ['Monotonic Stack', 'Next Greater Element', 'Valid Parentheses', 'Infix/Postfix Conversion'] },
            { name: 'Queues', techniques: ['Circular Queue', 'Deque', 'Priority Queue', 'Sliding Window Maximum'] },
          ],
        },
        {
          phase: 'Phase 4: Trees & Graph Basics',
          duration: '6-8 weeks',
          topics: [
            { name: 'Binary Trees', techniques: ['DFS (Inorder, Preorder, Postorder)', 'BFS (Level Order)', 'Height Calculation', 'Diameter', 'Lowest Common Ancestor'] },
            { name: 'Binary Search Trees', techniques: ['BST Validation', 'Insertion & Deletion', 'Kth Smallest/Largest', 'Range Sum Queries'] },
            { name: 'Advanced Trees', techniques: ['AVL Trees', 'Segment Trees', 'Fenwick Tree (BIT)', 'Trie', 'Suffix Trees'] },
            { name: 'Graphs', techniques: ['BFS & DFS', 'Topological Sort', 'Cycle Detection', 'Shortest Path (Dijkstra, Bellman-Ford)', 'MST (Kruskal, Prim)', 'Union-Find'] },
          ],
        },
        {
          phase: 'Phase 5: Advanced Algorithms',
          duration: '8-10 weeks',
          topics: [
            { name: 'Dynamic Programming', techniques: ['Memoization', 'Tabulation', 'Knapsack Problems', 'LCS/LIS', 'Matrix Chain Multiplication', 'Coin Change', 'Edit Distance'] },
            { name: 'Greedy', techniques: ['Activity Selection', 'Huffman Coding', 'Fractional Knapsack', 'Job Sequencing', 'Minimum Platforms'] },
            { name: 'Backtracking', techniques: ['N-Queens', 'Sudoku Solver', 'Rat in Maze', 'Subset Sum', 'Permutations & Combinations'] },
            { name: 'Bit Manipulation', techniques: ['XOR Properties', 'Set/Clear/Toggle Bits', 'Count Set Bits', 'Power of Two', 'Single Number Problems'] },
          ],
        },
        {
          phase: 'Phase 6: Problem Solving Mastery',
          duration: 'Ongoing',
          topics: [
            { name: 'Practice Platforms', techniques: ['LeetCode (150+ Problems)', 'Codeforces (Div 2 & 3)', 'CodeChef', 'AtCoder', 'HackerRank'] },
            { name: 'Contest Strategy', techniques: ['Time Management', 'Problem Selection', 'Debugging Tricks', 'Edge Case Handling'] },
            { name: 'Interview Prep', techniques: ['Mock Interviews', 'System Design Basics', 'Behavioral Questions', 'Company-Specific Patterns'] },
          ],
        },
      ],
      careers: ['Software Engineer', 'SDE at FAANG', 'Competitive Programmer', 'Backend Developer'],
    },
    webdev: {
      title: '🌐 Full Stack Web Development',
      description: 'Build modern web applications from frontend to backend',
      duration: '6-9 months',
      difficulty: 'Beginner to Advanced',
      phases: [
        {
          phase: 'Phase 1: Frontend Basics',
          duration: '4-6 weeks',
          topics: [
            { name: 'HTML5', techniques: ['Semantic HTML', 'Forms & Validation', 'Accessibility (ARIA)', 'Meta Tags & SEO'] },
            { name: 'CSS3', techniques: ['Flexbox', 'Grid Layout', 'Animations & Transitions', 'Media Queries', 'CSS Variables', 'Pseudo-classes'] },
            { name: 'JavaScript', techniques: ['ES6+ Features', 'DOM Manipulation', 'Event Handling', 'Async/Await', 'Promises', 'Closures'] },
          ],
        },
        {
          phase: 'Phase 2: React Ecosystem',
          duration: '6-8 weeks',
          topics: [
            { name: 'React Fundamentals', techniques: ['JSX', 'Components', 'Props & State', 'Conditional Rendering', 'Lists & Keys'] },
            { name: 'React Hooks', techniques: ['useState', 'useEffect', 'useContext', 'useReducer', 'useMemo', 'useCallback', 'Custom Hooks'] },
            { name: 'State Management', techniques: ['Context API', 'Redux Toolkit', 'Zustand', 'React Query', 'Local vs Global State'] },
            { name: 'Routing', techniques: ['React Router', 'Dynamic Routes', 'Protected Routes', 'Nested Routes', 'URL Parameters'] },
          ],
        },
        {
          phase: 'Phase 3: Backend with Node.js',
          duration: '6-8 weeks',
          topics: [
            { name: 'Node.js & Express', techniques: ['Middleware', 'Routing', 'Error Handling', 'File Uploads', 'CORS'] },
            { name: 'Databases', techniques: ['MongoDB (Mongoose)', 'PostgreSQL (Sequelize)', 'Database Design', 'Indexing', 'Transactions'] },
            { name: 'Authentication', techniques: ['JWT', 'OAuth 2.0', 'Sessions', 'Password Hashing (bcrypt)', 'Refresh Tokens'] },
            { name: 'REST APIs', techniques: ['RESTful Design', 'Status Codes', 'API Versioning', 'Rate Limiting', 'Pagination'] },
          ],
        },
        {
          phase: 'Phase 4: Advanced Full Stack',
          duration: '4-6 weeks',
          topics: [
            { name: 'TypeScript', techniques: ['Types & Interfaces', 'Generics', 'Type Guards', 'Decorators', 'TSConfig'] },
            { name: 'Next.js', techniques: ['SSR vs SSG', 'API Routes', 'Image Optimization', 'File-based Routing', 'Incremental Static Regeneration'] },
            { name: 'Testing', techniques: ['Jest', 'React Testing Library', 'Integration Tests', 'E2E Testing (Playwright)', 'Test Coverage'] },
            { name: 'Real-time', techniques: ['WebSockets', 'Socket.io', 'Server-Sent Events', 'Real-time Chat', 'Notifications'] },
          ],
        },
        {
          phase: 'Phase 5: DevOps & Deployment',
          duration: '3-4 weeks',
          topics: [
            { name: 'Version Control', techniques: ['Git Workflow', 'Branching Strategies', 'Pull Requests', 'Code Reviews'] },
            { name: 'Cloud Deployment', techniques: ['Vercel', 'Netlify', 'AWS (EC2, S3)', 'Environment Variables', 'SSL/TLS'] },
            { name: 'CI/CD', techniques: ['GitHub Actions', 'Docker', 'Containerization', 'Automated Testing', 'Build Pipelines'] },
            { name: 'Performance', techniques: ['Code Splitting', 'Lazy Loading', 'Caching Strategies', 'CDN', 'Lighthouse Optimization'] },
          ],
        },
      ],
      careers: ['Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'MERN Stack Developer'],
    },
    ml: {
      title: '🤖 Machine Learning & AI',
      description: 'Dive into ML algorithms, deep learning, and AI applications',
      duration: '8-12 months',
      difficulty: 'Advanced',
      phases: [
        {
          phase: 'Phase 1: Mathematics & Python',
          duration: '4-6 weeks',
          topics: [
            { name: 'Linear Algebra', techniques: ['Vectors & Matrices', 'Eigenvalues & Eigenvectors', 'Matrix Decomposition', 'Dot Product'] },
            { name: 'Calculus', techniques: ['Derivatives', 'Gradients', 'Chain Rule', 'Partial Derivatives', 'Optimization'] },
            { name: 'Statistics', techniques: ['Probability Distributions', 'Bayes Theorem', 'Hypothesis Testing', 'Correlation', 'Variance'] },
            { name: 'Python for ML', techniques: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'Data Preprocessing'] },
          ],
        },
        {
          phase: 'Phase 2: Supervised Learning',
          duration: '6-8 weeks',
          topics: [
            { name: 'Regression', techniques: ['Linear Regression', 'Polynomial Regression', 'Ridge & Lasso', 'Gradient Descent', 'Cost Functions'] },
            { name: 'Classification', techniques: ['Logistic Regression', 'Decision Trees', 'Random Forests', 'SVM', 'Naive Bayes', 'KNN'] },
            { name: 'Model Evaluation', techniques: ['Cross-Validation', 'Confusion Matrix', 'ROC-AUC', 'Precision-Recall', 'F1 Score', 'Overfitting/Underfitting'] },
            { name: 'Feature Engineering', techniques: ['Feature Scaling', 'Encoding Categorical Variables', 'Feature Selection', 'PCA', 'Handling Missing Data'] },
          ],
        },
        {
          phase: 'Phase 3: Unsupervised & Ensemble',
          duration: '4-6 weeks',
          topics: [
            { name: 'Clustering', techniques: ['K-Means', 'Hierarchical Clustering', 'DBSCAN', 'Gaussian Mixture Models'] },
            { name: 'Dimensionality Reduction', techniques: ['PCA', 't-SNE', 'UMAP', 'Autoencoders'] },
            { name: 'Ensemble Methods', techniques: ['Bagging', 'Boosting (XGBoost, LightGBM)', 'Stacking', 'Voting Classifiers'] },
          ],
        },
        {
          phase: 'Phase 4: Deep Learning',
          duration: '8-10 weeks',
          topics: [
            { name: 'Neural Networks', techniques: ['Perceptron', 'Backpropagation', 'Activation Functions', 'Loss Functions', 'Optimizers (Adam, SGD)'] },
            { name: 'CNNs', techniques: ['Convolutional Layers', 'Pooling', 'Transfer Learning', 'ResNet', 'VGG', 'Image Classification', 'Object Detection'] },
            { name: 'RNNs & LSTMs', techniques: ['Sequential Data', 'Time Series', 'LSTM', 'GRU', 'Attention Mechanism', 'Seq2Seq Models'] },
            { name: 'Transformers', techniques: ['Self-Attention', 'BERT', 'GPT', 'Vision Transformers', 'Tokenization', 'Fine-tuning'] },
          ],
        },
        {
          phase: 'Phase 5: Advanced Topics & MLOps',
          duration: '6-8 weeks',
          topics: [
            { name: 'NLP', techniques: ['Word Embeddings', 'TF-IDF', 'Named Entity Recognition', 'Sentiment Analysis', 'Text Generation'] },
            { name: 'Computer Vision', techniques: ['Image Segmentation', 'Face Recognition', 'GANs', 'Style Transfer', 'OCR'] },
            { name: 'Reinforcement Learning', techniques: ['Q-Learning', 'Policy Gradients', 'DQN', 'PPO', 'Game AI'] },
            { name: 'MLOps', techniques: ['Model Deployment', 'Flask/FastAPI', 'Docker', 'MLflow', 'Monitoring', 'A/B Testing'] },
          ],
        },
        {
          phase: 'Phase 6: Projects & Research',
          duration: 'Ongoing',
          topics: [
            { name: 'Kaggle', techniques: ['Competition Strategy', 'Feature Engineering', 'Model Ensembling', 'Leaderboard Climbing'] },
            { name: 'Portfolio Projects', techniques: ['End-to-End ML Pipeline', 'Web App Deployment', 'API Development', 'Documentation'] },
            { name: 'Research', techniques: ['Reading Papers', 'Implementing Papers', 'arXiv Exploration', 'Writing Blogs'] },
          ],
        },
      ],
      careers: ['ML Engineer', 'Data Scientist', 'AI Researcher', 'Computer Vision Engineer', 'NLP Engineer'],
    },
    mobile: {
      title: '📱 Mobile App Development',
      description: 'Create native and cross-platform mobile applications',
      duration: '5-7 months',
      difficulty: 'Intermediate',
      phases: [
        {
          phase: 'Phase 1: Mobile Fundamentals',
          duration: '2-3 weeks',
          topics: [
            { name: 'Mobile UI/UX', techniques: ['Material Design', 'iOS Human Interface Guidelines', 'Responsive Layouts', 'Touch Gestures', 'Animation'] },
            { name: 'JavaScript/TypeScript', techniques: ['ES6+ Features', 'Type Safety', 'Async Programming', 'Modules', 'Error Handling'] },
          ],
        },
        {
          phase: 'Phase 2: React Native',
          duration: '6-8 weeks',
          topics: [
            { name: 'React Native Basics', techniques: ['Components', 'StyleSheet', 'Flexbox Layout', 'Platform-Specific Code', 'Hot Reloading'] },
            { name: 'Navigation', techniques: ['React Navigation', 'Stack Navigator', 'Tab Navigator', 'Drawer Navigator', 'Deep Linking'] },
            { name: 'State Management', techniques: ['Context API', 'Redux', 'Zustand', 'React Query', 'Async Storage'] },
            { name: 'Native Modules', techniques: ['Bridging Native Code', 'Third-party Libraries', 'Permissions', 'Linking'] },
          ],
        },
        {
          phase: 'Phase 3: Native Development (Optional)',
          duration: '8-10 weeks',
          topics: [
            { name: 'Android (Kotlin)', techniques: ['Activities & Fragments', 'RecyclerView', 'Room Database', 'Coroutines', 'Material Components'] },
            { name: 'iOS (Swift)', techniques: ['UIKit', 'SwiftUI', 'Core Data', 'Combine', 'Auto Layout', 'Storyboards'] },
          ],
        },
        {
          phase: 'Phase 4: Advanced Features',
          duration: '4-6 weeks',
          topics: [
            { name: 'Push Notifications', techniques: ['Firebase Cloud Messaging', 'OneSignal', 'Local Notifications', 'Badge Management'] },
            { name: 'Storage & Data', techniques: ['AsyncStorage', 'SQLite', 'Realm', 'File System', 'Secure Storage'] },
            { name: 'Media & Sensors', techniques: ['Camera & Gallery', 'Video Recording', 'Image Picker', 'Geolocation', 'Accelerometer'] },
            { name: 'Payments', techniques: ['Stripe', 'Razorpay', 'In-App Purchases', 'Payment Gateways', 'Subscription Management'] },
          ],
        },
        {
          phase: 'Phase 5: Testing & Publishing',
          duration: '2-3 weeks',
          topics: [
            { name: 'Testing', techniques: ['Jest', 'Detox', 'Unit Testing', 'E2E Testing', 'Test Coverage'] },
            { name: 'Publishing', techniques: ['App Store Submission', 'Google Play Console', 'App Signing', 'Release Management'] },
            { name: 'Analytics & Monitoring', techniques: ['Firebase Analytics', 'Crashlytics', 'App Performance', 'User Behavior Tracking'] },
          ],
        },
      ],
      careers: ['Mobile App Developer', 'React Native Developer', 'Android Developer', 'iOS Developer'],
    },
    devops: {
      title: '⚙️ DevOps & Cloud Engineering',
      description: 'Automate, deploy, and manage scalable infrastructure',
      duration: '6-8 months',
      difficulty: 'Advanced',
      phases: [
        {
          phase: 'Phase 1: Linux & Scripting',
          duration: '3-4 weeks',
          topics: [
            { name: 'Linux Administration', techniques: ['Command Line', 'File Permissions', 'Process Management', 'System Logs', 'Package Managers'] },
            { name: 'Shell Scripting', techniques: ['Bash Scripts', 'Variables & Loops', 'Functions', 'Cron Jobs', 'Automation'] },
            { name: 'Networking', techniques: ['TCP/IP', 'DNS', 'HTTP/HTTPS', 'SSH', 'Firewalls', 'Load Balancers'] },
          ],
        },
        {
          phase: 'Phase 2: Version Control & CI/CD',
          duration: '4-5 weeks',
          topics: [
            { name: 'Git Advanced', techniques: ['Branching Strategies', 'Merge vs Rebase', 'Hooks', 'Submodules', 'Cherry-pick'] },
            { name: 'CI/CD Pipelines', techniques: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'CircleCI', 'Build Automation', 'Artifact Management'] },
            { name: 'Testing', techniques: ['Unit Tests', 'Integration Tests', 'Security Scans', 'Code Quality', 'Test Coverage'] },
          ],
        },
        {
          phase: 'Phase 3: Containerization',
          duration: '5-6 weeks',
          topics: [
            { name: 'Docker', techniques: ['Dockerfile', 'Images & Containers', 'Volumes', 'Networks', 'Multi-stage Builds', 'Docker Compose'] },
            { name: 'Kubernetes', techniques: ['Pods & Deployments', 'Services', 'ConfigMaps & Secrets', 'Ingress', 'Helm Charts', 'StatefulSets'] },
            { name: 'Container Security', techniques: ['Image Scanning', 'Runtime Security', 'RBAC', 'Network Policies'] },
          ],
        },
        {
          phase: 'Phase 4: Cloud Platforms',
          duration: '6-8 weeks',
          topics: [
            { name: 'AWS', techniques: ['EC2', 'S3', 'RDS', 'Lambda', 'VPC', 'CloudFormation', 'ECS/EKS', 'Route53'] },
            { name: 'Azure/GCP', techniques: ['Virtual Machines', 'Storage', 'Databases', 'Networking', 'Serverless', 'IAM'] },
            { name: 'Cloud Security', techniques: ['IAM Policies', 'Encryption', 'Security Groups', 'Compliance', 'Cost Optimization'] },
          ],
        },
        {
          phase: 'Phase 5: IaC & Monitoring',
          duration: '4-6 weeks',
          topics: [
            { name: 'Infrastructure as Code', techniques: ['Terraform', 'Ansible', 'CloudFormation', 'Pulumi', 'State Management'] },
            { name: 'Monitoring & Logging', techniques: ['Prometheus', 'Grafana', 'ELK Stack', 'CloudWatch', 'Alerting', 'Dashboards'] },
            { name: 'SRE Practices', techniques: ['SLIs/SLOs/SLAs', 'Incident Management', 'Postmortems', 'On-call Rotation', 'Chaos Engineering'] },
          ],
        },
      ],
      careers: ['DevOps Engineer', 'Cloud Engineer', 'SRE', 'Platform Engineer'],
    },
    cybersecurity: {
      title: '🔒 Cybersecurity',
      description: 'Protect systems and networks from digital attacks',
      duration: '7-10 months',
      difficulty: 'Advanced',
      phases: [
        {
          phase: 'Phase 1: Security Fundamentals',
          duration: '4-5 weeks',
          topics: [
            { name: 'Networking', techniques: ['TCP/IP', 'OSI Model', 'Routing & Switching', 'Wireshark', 'Network Protocols'] },
            { name: 'Operating Systems', techniques: ['Linux Security', 'Windows Security', 'File Systems', 'User Permissions', 'Process Management'] },
            { name: 'Cryptography', techniques: ['Encryption/Decryption', 'Hashing', 'Digital Signatures', 'SSL/TLS', 'Public Key Infrastructure'] },
          ],
        },
        {
          phase: 'Phase 2: Offensive Security',
          duration: '6-8 weeks',
          topics: [
            { name: 'Web App Security', techniques: ['OWASP Top 10', 'SQL Injection', 'XSS', 'CSRF', 'Authentication Bypass', 'Burp Suite'] },
            { name: 'Network Pentesting', techniques: ['Nmap', 'Metasploit', 'Vulnerability Scanning', 'Port Scanning', 'Enumeration'] },
            { name: 'Exploitation', techniques: ['Buffer Overflow', 'Privilege Escalation', 'Reverse Shells', 'Payload Generation', 'Post-Exploitation'] },
          ],
        },
        {
          phase: 'Phase 3: Defensive Security',
          duration: '6-8 weeks',
          topics: [
            { name: 'Network Defense', techniques: ['Firewall Rules', 'IDS/IPS (Snort)', 'VPN Configuration', 'Network Segmentation'] },
            { name: 'Security Monitoring', techniques: ['SIEM (Splunk)', 'Log Analysis', 'Threat Detection', 'Alert Triage', 'IOC Analysis'] },
            { name: 'Incident Response', techniques: ['Incident Handling', 'Forensics Tools', 'Evidence Collection', 'Malware Containment', 'Reporting'] },
          ],
        },
        {
          phase: 'Phase 4: Advanced Topics',
          duration: '5-7 weeks',
          topics: [
            { name: 'Malware Analysis', techniques: ['Static Analysis', 'Dynamic Analysis', 'Reverse Engineering', 'Sandboxing', 'Threat Intelligence'] },
            { name: 'Cloud Security', techniques: ['AWS Security', 'Azure Security', 'IAM', 'Container Security', 'Serverless Security'] },
            { name: 'Application Security', techniques: ['Secure Coding', 'Code Review', 'SAST/DAST', 'API Security', 'DevSecOps'] },
          ],
        },
        {
          phase: 'Phase 5: Certifications & Practice',
          duration: 'Ongoing',
          topics: [
            { name: 'CTF & Bug Bounty', techniques: ['HackTheBox', 'TryHackMe', 'PicoCTF', 'Bug Bounty Platforms', 'Write-ups'] },
            { name: 'Certifications', techniques: ['CompTIA Security+', 'CEH', 'OSCP', 'CISSP', 'GIAC Certifications'] },
            { name: 'Real-world Skills', techniques: ['Threat Hunting', 'Red Team Operations', 'Blue Team Defense', 'Security Architecture'] },
          ],
        },
      ],
      careers: ['Security Analyst', 'Penetration Tester', 'Security Engineer', 'SOC Analyst'],
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-coral to-secondary py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-white mb-3">🗺️ Career Roadmaps</h1>
          <p className="text-white/90 text-lg">Choose your path and master your domain</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Roadmap Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(roadmaps).map(([key, roadmap]) => (
            <div
              key={key}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition cursor-pointer"
              onClick={() => setSelectedRoadmap(selectedRoadmap === key ? null : key)}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {roadmap.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {roadmap.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
                  ⏱️ {roadmap.duration}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  roadmap.difficulty === 'Beginner to Advanced' || roadmap.difficulty === 'Intermediate'
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                }`}>
                  📊 {roadmap.difficulty}
                </span>
              </div>
              <button className="w-full px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition">
                {selectedRoadmap === key ? 'Hide Details' : 'View Roadmap'}
              </button>
            </div>
          ))}
        </div>

        {/* Detailed Roadmap View */}
        {selectedRoadmap && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  {roadmaps[selectedRoadmap].title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {roadmaps[selectedRoadmap].description}
                </p>
              </div>
              <button
                onClick={() => setSelectedRoadmap(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Career Paths */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">💼 Career Opportunities</h3>
              <div className="flex flex-wrap gap-2">
                {roadmaps[selectedRoadmap].careers.map((career) => (
                  <span
                    key={career}
                    className="px-4 py-2 bg-gradient-to-r from-primary to-coral text-white rounded-lg text-sm font-medium"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>

            {/* Learning Phases */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">📚 Learning Path</h3>
              <div className="space-y-4">
                {roadmaps[selectedRoadmap].phases.map((phase, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-primary pl-6 py-2"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{phase.phase}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Duration: {phase.duration}</p>
                      </div>
                    </div>
                    <div className="space-y-3 mt-4">
                      {phase.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                          <h5 className="font-semibold text-gray-900 dark:text-white mb-2">{topic.name}</h5>
                          <div className="flex flex-wrap gap-2">
                            {topic.techniques.map((technique, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs border border-gray-200 dark:border-gray-600"
                              >
                                {technique}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-coral/10 dark:from-primary/20 dark:to-coral/20 rounded-xl border border-primary/20">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ready to Start?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Enroll in our comprehensive courses and start your journey today!
              </p>
              <Link
                to="/all-courses"
                className="inline-block px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition shadow-md"
              >
                Browse Courses →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmaps;
