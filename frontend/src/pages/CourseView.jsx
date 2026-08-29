import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function CourseView() {
  const { courseId } = useParams();
  const { user, requireAuth } = useAuth();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [completedTopics, setCompletedTopics] = useState([]);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [currentQuizModule, setCurrentQuizModule] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [enrolling, setEnrolling] = useState(false);
  const [notification, setNotification] = useState("");

  const fetchCourseData = async () => {
    try {
      const res = await API.get(`/courses/${courseId}`);
      if (res.data) {
        setCourse(res.data);
      }
    } catch {
      // Fallback
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
        ],
      });
    }

    if (user) {
      try {
        const [enrolledRes, progressRes] = await Promise.all([
          API.get("/courses/enrolled").catch(() => ({ data: [] })),
          API.get(`/progress/${courseId}`).catch(() => ({ data: null })),
        ]);

        const enrolledList = enrolledRes.data || [];
        const enrolled = enrolledList.some(
          (c) => c._id?.toString() === courseId?.toString()
        );
        setIsEnrolled(enrolled);

        if (progressRes.data && progressRes.data.completedTopics) {
          setCompletedTopics(progressRes.data.completedTopics);
        }
      } catch (err) {
        console.warn("Could not fetch user course progress:", err);
      }
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseId, user]);

  // Handle Enrollment
  const handleEnroll = async () => {
    requireAuth(async () => {
      try {
        setEnrolling(true);
        await API.post(`/courses/${courseId}/enroll`);
        setIsEnrolled(true);
        setNotification("Successfully enrolled! You can now track your progress.");
        setTimeout(() => setNotification(""), 3500);
      } catch (err) {
        console.error("Enroll error:", err);
      } finally {
        setEnrolling(false);
      }
    }, "Sign in to enroll in this course and track your syllabus progress.");
  };

  // Toggle Topic Completion & Save to Server in Real-time
  const toggleTopic = (topicKey) => {
    requireAuth(async () => {
      const isAlreadyCompleted = completedTopics.includes(topicKey);
      const updated = isAlreadyCompleted
        ? completedTopics.filter((t) => t !== topicKey)
        : [...completedTopics, topicKey];

      setCompletedTopics(updated);
      setIsEnrolled(true);

      try {
        await API.post(`/progress/${courseId}`, {
          completedTopic: topicKey,
        });
      } catch (err) {
        console.warn("Could not save progress to server:", err);
      }
    }, "Sign in to track your syllabus completion and course progress.");
  };

  // Calculate Progress Percentage
  let totalTopics = 0;
  if (course && course.modules) {
    course.modules.forEach((m) => {
      totalTopics += m.topics ? m.topics.length : 0;
    });
  }
  const percent = totalTopics > 0 ? Math.round((completedTopics.length / totalTopics) * 100) : 0;

  const sampleQuiz = {
    questions: [
      {
        question: "What is the average time complexity of searching in a Hash Table?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        correct: 0,
      },
      {
        question: "Which algorithm pattern is optimal for finding contiguous subarray sums?",
        options: ["Binary Search", "Sliding Window / Kadane's", "Dijkstra", "Merge Sort"],
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

  const submitQuiz = async () => {
    let score = selectedAnswer === 0 ? 100 : 50;
    setQuizScore(score);
    setQuizSubmitted(true);

    try {
      await API.post(`/progress/${courseId}`, {
        quizResult: {
          moduleIndex: currentQuizModule,
          score,
          passed: score >= 70,
        },
      });
    } catch (err) {
      console.warn("Could not save quiz score:", err);
    }
  };

  if (!course) {
    return <div className="p-8 text-center text-slate-400">Loading course details...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      {/* Toast Alert */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-bounce text-sm font-semibold border border-emerald-400">
          <span>✓</span>
          <span>{notification}</span>
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link to="/all-courses" className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
            ← Back to All Courses
          </Link>
          <Link to="/dashboard" className="text-xs text-red-400 hover:underline">
            Go to Student Dashboard →
          </Link>
        </div>

        {/* Course Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                {course.category} • {course.level}
              </span>
              {isEnrolled && (
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                  <span>✓</span>
                  <span>Enrolled Student</span>
                </span>
              )}
            </div>

            {!isEnrolled ? (
              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-red-950/60 transition-all hover:scale-105"
              >
                {enrolling ? "Enrolling..." : "+ Enroll in this Course"}
              </button>
            ) : (
              <span className="text-xs font-bold text-slate-400">
                Live Tracking Active
              </span>
            )}
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">{course.title}</h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">{course.description}</p>
          </div>

          {/* Real-time Progress Bar */}
          {isEnrolled && (
            <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300">Your Course Progress:</span>
                <span className="text-emerald-400">{percent}% Completed ({completedTopics.length} / {totalTopics} Topics)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(3, percent)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Modules List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Course Modules & Topics</h2>
            <span className="text-xs text-slate-400">
              Check off topics as you finish them
            </span>
          </div>

          {course.modules &&
            course.modules.map((mod, modIdx) => (
              <div key={modIdx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm sm:text-base">{mod.title}</h3>
                  <span className="text-xs text-slate-400">{mod.duration}</span>
                </div>

                <div className="p-4 sm:p-5 space-y-3">
                  {mod.topics &&
                    mod.topics.map((t, tIdx) => {
                      const key = `${modIdx}-${tIdx}`;
                      const isDone = completedTopics.includes(key);
                      return (
                        <div
                          key={tIdx}
                          className={`flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border gap-3 transition-all ${
                            isDone
                              ? "bg-emerald-950/20 border-emerald-900/60 text-emerald-300"
                              : "bg-slate-950/60 border-slate-800/80 text-slate-200 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleTopic(key)}
                              className={`w-5 h-5 rounded-lg flex items-center justify-center border text-xs font-bold transition-colors ${
                                isDone
                                  ? "bg-emerald-500 border-emerald-400 text-slate-950"
                                  : "border-slate-700 bg-slate-900 hover:border-slate-500"
                              }`}
                            >
                              {isDone && "✓"}
                            </button>
                            <span className={`text-xs sm:text-sm font-medium ${isDone ? "line-through text-slate-500" : "text-white"}`}>
                              {t.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {t.theoryUrl && (
                              <a
                                href={t.theoryUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1 bg-blue-950/80 text-blue-300 border border-blue-800/60 rounded-lg text-xs font-semibold hover:bg-blue-900 transition-colors"
                              >
                                📖 Notes
                              </a>
                            )}
                            {t.videoUrl && (
                              <a
                                href={t.videoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1 bg-red-950/80 text-red-300 border border-red-800/60 rounded-lg text-xs font-semibold hover:bg-red-900 transition-colors"
                              >
                                🎥 Video ({t.videoChannel || "YouTube"})
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}

                  <div className="pt-3 flex justify-end">
                    <button
                      onClick={() => startQuiz(modIdx)}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
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
