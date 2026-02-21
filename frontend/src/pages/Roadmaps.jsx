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
          topics: ['Basic Syntax', 'Variables & Data Types', 'Operators', 'Control Flow', 'Functions', 'Arrays & Strings'],
        },
        {
          phase: 'Phase 2: Basic Data Structures',
          duration: '4-6 weeks',
          topics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Hash Tables', 'Strings'],
        },
        {
          phase: 'Phase 3: Advanced Data Structures',
          duration: '6-8 weeks',
          topics: ['Trees', 'Binary Search Trees', 'Heaps', 'Graphs', 'Tries', 'Segment Trees'],
        },
        {
          phase: 'Phase 4: Algorithms',
          duration: '8-10 weeks',
          topics: ['Sorting & Searching', 'Recursion & Backtracking', 'Dynamic Programming', 'Greedy Algorithms', 'Graph Algorithms', 'Bit Manipulation'],
        },
        {
          phase: 'Phase 5: Problem Solving',
          duration: 'Ongoing',
          topics: ['LeetCode Practice', 'Codeforces', 'Contest Participation', 'Mock Interviews', 'System Design Basics'],
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
          topics: ['HTML5', 'CSS3', 'Flexbox & Grid', 'Responsive Design', 'JavaScript ES6+', 'DOM Manipulation'],
        },
        {
          phase: 'Phase 2: Frontend Frameworks',
          duration: '6-8 weeks',
          topics: ['React.js Fundamentals', 'Components & Props', 'State Management', 'Hooks', 'React Router', 'Redux/Context API'],
        },
        {
          phase: 'Phase 3: Backend Development',
          duration: '6-8 weeks',
          topics: ['Node.js & Express', 'RESTful APIs', 'Authentication', 'MongoDB', 'SQL Databases', 'API Security'],
        },
        {
          phase: 'Phase 4: Advanced Topics',
          duration: '4-6 weeks',
          topics: ['TypeScript', 'Next.js/SSR', 'GraphQL', 'WebSockets', 'Testing (Jest)', 'CI/CD'],
        },
        {
          phase: 'Phase 5: Deployment & DevOps',
          duration: '2-3 weeks',
          topics: ['Git & GitHub', 'Docker Basics', 'AWS/Cloud Services', 'Domain & Hosting', 'Performance Optimization'],
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
          phase: 'Phase 1: Mathematics Foundation',
          duration: '4-6 weeks',
          topics: ['Linear Algebra', 'Calculus', 'Probability & Statistics', 'Python for ML', 'NumPy & Pandas'],
        },
        {
          phase: 'Phase 2: Machine Learning Basics',
          duration: '8-10 weeks',
          topics: ['Supervised Learning', 'Regression', 'Classification', 'Unsupervised Learning', 'Model Evaluation', 'Feature Engineering'],
        },
        {
          phase: 'Phase 3: Deep Learning',
          duration: '8-10 weeks',
          topics: ['Neural Networks', 'CNNs', 'RNNs & LSTMs', 'Transfer Learning', 'TensorFlow/PyTorch', 'Computer Vision'],
        },
        {
          phase: 'Phase 4: Advanced ML',
          duration: '6-8 weeks',
          topics: ['NLP & Transformers', 'GANs', 'Reinforcement Learning', 'MLOps', 'Model Deployment', 'Ethics in AI'],
        },
        {
          phase: 'Phase 5: Projects & Specialization',
          duration: 'Ongoing',
          topics: ['Kaggle Competitions', 'Research Papers', 'End-to-End Projects', 'Portfolio Building', 'Domain Specialization'],
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
          topics: ['Mobile UI/UX Principles', 'JavaScript/TypeScript', 'Version Control', 'API Integration'],
        },
        {
          phase: 'Phase 2: React Native',
          duration: '6-8 weeks',
          topics: ['React Native Basics', 'Components & Navigation', 'State Management', 'Native Modules', 'Debugging'],
        },
        {
          phase: 'Phase 3: Native Development',
          duration: '8-10 weeks',
          topics: ['Android (Kotlin)', 'iOS (Swift)', 'Platform-Specific Features', 'App Performance', 'Memory Management'],
        },
        {
          phase: 'Phase 4: Advanced Features',
          duration: '4-6 weeks',
          topics: ['Push Notifications', 'Local Storage', 'Camera & Media', 'Location Services', 'Payment Integration'],
        },
        {
          phase: 'Phase 5: Publishing',
          duration: '2-3 weeks',
          topics: ['App Store Guidelines', 'Google Play Console', 'App Signing', 'Analytics', 'Monetization'],
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
          topics: ['Linux Fundamentals', 'Shell Scripting', 'Python Automation', 'Networking Basics'],
        },
        {
          phase: 'Phase 2: Version Control & CI/CD',
          duration: '4-5 weeks',
          topics: ['Git Advanced', 'GitHub Actions', 'Jenkins', 'GitLab CI', 'Automated Testing'],
        },
        {
          phase: 'Phase 3: Containerization',
          duration: '4-6 weeks',
          topics: ['Docker', 'Docker Compose', 'Kubernetes', 'Helm Charts', 'Container Orchestration'],
        },
        {
          phase: 'Phase 4: Cloud Platforms',
          duration: '6-8 weeks',
          topics: ['AWS Services', 'Azure/GCP', 'IAM & Security', 'Serverless', 'Cloud Architecture'],
        },
        {
          phase: 'Phase 5: Monitoring & IaC',
          duration: '4-6 weeks',
          topics: ['Terraform', 'Ansible', 'Prometheus', 'Grafana', 'ELK Stack', 'Infrastructure as Code'],
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
          topics: ['Networking Basics', 'Operating Systems', 'Cryptography', 'Security Principles', 'Threat Landscape'],
        },
        {
          phase: 'Phase 2: Offensive Security',
          duration: '6-8 weeks',
          topics: ['Penetration Testing', 'Web App Security', 'Network Scanning', 'Exploitation', 'Social Engineering'],
        },
        {
          phase: 'Phase 3: Defensive Security',
          duration: '6-8 weeks',
          topics: ['Firewall Configuration', 'IDS/IPS', 'Security Monitoring', 'Incident Response', 'Forensics'],
        },
        {
          phase: 'Phase 4: Advanced Topics',
          duration: '5-7 weeks',
          topics: ['Malware Analysis', 'Cloud Security', 'Application Security', 'Security Automation', 'Compliance'],
        },
        {
          phase: 'Phase 5: Certifications & Practice',
          duration: 'Ongoing',
          topics: ['CTF Challenges', 'Bug Bounty', 'Security+/CEH', 'OSCP', 'Real-world Projects'],
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
                    <div className="flex flex-wrap gap-2 mt-3">
                      {phase.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                        >
                          {topic}
                        </span>
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
