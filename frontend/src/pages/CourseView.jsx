import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function CourseView() {
  const { courseId } = useParams();
  const { requireAuth } = useAuth();
  const [course, setCourse] = useState(null);
  const [completedTopics, setCompletedTopics] = useState([]);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [currentQuizModule, setCurrentQuizModule] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    API.get(`/courses/${courseId}`)
      .then((res) => setCourse(res.data))
      .catch(() => {
        // Fallback default course object
        setCourse({
          _id: courseId,
          title: "DSA Fundamentals & Problem Solving",
          category: "DSA",
          description: "Complete roadmap covering Arrays, Linked Lists, Stacks, Queues, Binary Trees, and Graph algorithms.",
          level: "Beginner",
          modules: [
            {
              title: "Module 1: Linear Data Structures & Arrays",
              duration: "2.5 Hours",
              topics: [
                {
                  title: "Array Data Structure & Operations",
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
              ],
            },
          ],
        });
      });
  }, [courseId]);

  const toggleTopic = (topicKey) => {
    requireAuth(() => {
      setCompletedTopics((prev) =>
        prev.includes(topicKey) ? prev.filter((t) => t !== topicKey) : [...prev, topicKey]
      );
    }, "Sign in to track your syllabus completion and course progress.");
  };

  const sampleQuiz = {
    questions: [
      {
        question: "What is the time complexity of accessing an array element by index?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        correct: 0,
      },
      {
        question: "Which algorithm pattern is best for finding the maximum sum subarray of size K?",
        options: ["Binary Search", "Sliding Window", "Merge Sort", "Dijkstra"],
        correct: 1,
      },
    ],
  };

  const startQuiz = (moduleIdx) => {
    requireAuth(() => {
      setCurrentQuizModule(moduleIdx);
      setSelectedAnswer(null);
      setQuizSubmitted(false);
      setQuizScore(0);
      setQuizModalOpen(true);
    }, "Sign in to take module assessment quizzes and earn course certificates.");
  };

  const submitQuiz = () => {
    let score = selectedAnswer === 0 ? 100 : 50;
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  if (!course) {
    return <div className="p-8 text-center text-slate-400">Loading course details...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <Link to="/all-courses" className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
          ← Back to All Courses
        </Link>

        {/* Course Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8 rounded-2xl space-y-4">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
            {course.category} • {course.level}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{course.title}</h1>
          <p className="text-sm text-slate-300 max-w-3xl">{course.description}</p>
        </div>

        {/* Modules List */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Course Modules & Topics</h2>
          {course.modules &&
            course.modules.map((mod, modIdx) => (
              <div key={modIdx} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm sm:text-base">{mod.title}</h3>
                  <span className="text-xs text-slate-400">{mod.duration}</span>
                </div>

                <div className="p-4 space-y-3">
                  {mod.topics &&
                    mod.topics.map((t, tIdx) => {
                      const key = `${modIdx}-${tIdx}`;
                      const isDone = completedTopics.includes(key);
                      return (
                        <div
                          key={tIdx}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-slate-950/40 border border-slate-800/80 gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleTopic(key)}
                              className={`w-5 h-5 rounded flex items-center justify-center border text-xs ${
                                isDone
                                  ? "bg-emerald-600 border-emerald-500 text-white"
                                  : "border-slate-700 bg-slate-900"
                              }`}
                            >
                              {isDone && "✓"}
                            </button>
                            <span className={`text-sm font-semibold ${isDone ? "line-through text-slate-500" : "text-white"}`}>
                              {t.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {t.theoryUrl && (
                              <a
                                href={t.theoryUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-2.5 py-1 bg-blue-950 text-blue-400 border border-blue-800/60 rounded text-xs hover:bg-blue-900"
                              >
                                📖 Theory Note
                              </a>
                            )}
                            {t.videoUrl && (
                              <a
                                href={t.videoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-2.5 py-1 bg-red-950 text-red-400 border border-red-800/60 rounded text-xs hover:bg-red-900"
                              >
                                🎥 Video ({t.videoChannel || "YouTube"})
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => startQuiz(modIdx)}
                      className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg shadow-md transition-all flex items-center gap-1.5"
                    >
                      <span>🎯 Take Module Quiz</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Quiz Modal */}
        {quizModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl max-w-lg w-full space-y-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-white text-base">🎯 Module Assessment Quiz</h3>
                <button onClick={() => setQuizModalOpen(false)} className="text-slate-400 hover:text-white">
                  ✕
                </button>
              </div>

              {!quizSubmitted ? (
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-white">
                    {sampleQuiz.questions[0].question}
                  </p>
                  <div className="space-y-2">
                    {sampleQuiz.questions[0].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedAnswer(i)}
                        className={`w-full text-left p-3 rounded-xl text-xs font-medium border transition-all ${
                          selectedAnswer === i
                            ? "bg-red-600/20 border-red-500 text-white"
                            : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={submitQuiz}
                    disabled={selectedAnswer === null}
                    className="w-full py-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl"
                  >
                    Submit Quiz
                  </button>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <span className="text-4xl">🎉</span>
                  <h4 className="text-xl font-bold text-white">Quiz Completed!</h4>
                  <p className="text-sm text-slate-300">
                    Your Score: <span className="font-bold text-emerald-400">{quizScore}%</span>
                  </p>
                  <button
                    onClick={() => setQuizModalOpen(false)}
                    className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl"
                  >
                    Continue Learning
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
