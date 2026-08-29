import React, { useState } from "react";
import { Link } from "react-router-dom";

const ROADMAPS = [
  {
    id: "dsa",
    title: "DSA & Competitive Programming",
    duration: "6-8 Months",
    icon: "🎯",
    color: "from-red-600 to-amber-500",
    description: "Systematic mastery of algorithms, data structures, complexity analysis, and coding sheet problem sets.",
    phases: [
      {
        name: "Phase 1: Language Basics & Complexity",
        topics: ["C++ STL / Java Collections / JS ES6", "Time & Space Complexity", "Recursion & Math basics"],
      },
      {
        name: "Phase 2: Core Linear & Non-Linear Structures",
        topics: ["Arrays & 2-Pointers", "Linked Lists", "Stacks & Queues", "Binary Trees & BST"],
      },
      {
        name: "Phase 3: Advanced Algorithms",
        topics: ["Dynamic Programming (1D, 2D, Grid, Partition)", "Graphs (BFS/DFS, Dijkstra, MST)", "Tries & Bit Manipulation"],
      },
      {
        name: "Phase 4: Interview Sheets & Contests",
        topics: ["Striver SDE Sheet (191 Qs)", "NeetCode 150", "Weekly LeetCode & Codeforces Contests"],
      },
    ],
  },
  {
    id: "fullstack",
    title: "Full Stack Web Development (MERN)",
    duration: "6-9 Months",
    icon: "🌐",
    color: "from-blue-600 to-cyan-500",
    description: "End-to-end modern web engineering with React, Node.js, Express, MongoDB, Tailwind, and Cloud Deployments.",
    phases: [
      {
        name: "Phase 1: Frontend Foundations",
        topics: ["HTML5 Semantic Tags & CSS3 Flexbox/Grid", "Modern JavaScript (ES6+, Async/Await, DOM)", "Tailwind CSS"],
      },
      {
        name: "Phase 2: React Ecosystem",
        topics: ["React 18 Hooks & Lifecycle", "State Management (Context API / Redux)", "Client-Side Routing & Vite"],
      },
      {
        name: "Phase 3: Backend & Database",
        topics: ["Node.js Runtime & Express REST APIs", "MongoDB & Mongoose Schemas", "JWT Authentication & Role Security"],
      },
      {
        name: "Phase 4: Production & DevOps",
        topics: ["Cloud Deployments (Vercel, Render)", "Docker Basics & CI/CD", "Performance Optimization"],
      },
    ],
  },
  {
    id: "ml-ai",
    title: "Machine Learning & Generative AI",
    duration: "8-12 Months",
    icon: "🤖",
    color: "from-purple-600 to-indigo-500",
    description: "From Python data science to Deep Learning, LLMs, Transformer architectures, and vector embeddings.",
    phases: [
      {
        name: "Phase 1: Python & Data Engineering",
        topics: ["NumPy, Pandas, Matplotlib", "Linear Algebra & Probability", "Feature Engineering"],
      },
      {
        name: "Phase 2: Classical Machine Learning",
        topics: ["Linear/Logistic Regression", "Decision Trees & Random Forests", "SVMs & K-Means Clustering"],
      },
      {
        name: "Phase 3: Deep Learning & Neural Networks",
        topics: ["PyTorch Foundations", "CNNs for Computer Vision", "RNNs & LSTMs for NLP"],
      },
      {
        name: "Phase 4: GenAI & LLMs",
        topics: ["Transformers & Attention Mechanisms", "LangChain & RAG Systems", "Vector Databases & Model Fine-Tuning"],
      },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Cloud Engineering",
    duration: "6-8 Months",
    icon: "⚙️",
    color: "from-emerald-600 to-teal-500",
    description: "Infrastructure as code, containerization, orchestration, and AWS cloud architecture.",
    phases: [
      {
        name: "Phase 1: Linux & Scripting",
        topics: ["Linux Shell Scripting & Bash", "Git & GitHub Workflows", "Networking Essentials"],
      },
      {
        name: "Phase 2: Containers & Orchestration",
        topics: ["Docker & Container Registries", "Kubernetes Pods, Services & Ingress", "Helm Charts"],
      },
      {
        name: "Phase 3: CI/CD & Cloud",
        topics: ["GitHub Actions & Jenkins", "AWS Core (EC2, S3, RDS, IAM, Lambda)", "Terraform IaC"],
      },
    ],
  },
];

export default function Roadmaps() {
  const [selectedRoadmap, setSelectedRoadmap] = useState("dsa");
  const current = ROADMAPS.find((r) => r.id === selectedRoadmap) || ROADMAPS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Career Roadmaps</h1>
          <p className="mt-2 text-sm text-slate-400">
            Step-by-step career blueprints designed to take you from beginner to interview-ready.
          </p>
        </div>

        {/* Roadmap Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROADMAPS.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRoadmap(r.id)}
              className={`p-4 rounded-xl text-left border transition-all ${
                selectedRoadmap === r.id
                  ? "bg-slate-900 border-red-500 ring-2 ring-red-500/20 shadow-lg"
                  : "bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{r.icon}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {r.duration}
                </span>
              </div>
              <h3 className="font-bold text-sm text-white">{r.title}</h3>
            </button>
          ))}
        </div>

        {/* Selected Roadmap Timeline */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{current.icon}</span>
              <div>
                <h2 className="text-2xl font-extrabold text-white">{current.title}</h2>
                <p className="text-xs text-slate-400">{current.description}</p>
              </div>
            </div>
            <Link
              to="/sheets"
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-md"
            >
              Practice Relevant Sheets →
            </Link>
          </div>

          <div className="space-y-6 pt-2">
            {current.phases.map((phase, idx) => (
              <div key={idx} className="relative pl-6 border-l-2 border-red-500/40 space-y-2">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-red-500 border-2 border-slate-900" />
                <h4 className="font-bold text-base text-red-400">{phase.name}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {phase.topics.map((t, i) => (
                    <div
                      key={i}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center gap-2"
                    >
                      <span className="text-emerald-400">✓</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
