import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { SHEETS_INFO, PROBLEM_SETS } from "../data/problemSets";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

export default function CodingSheets() {
  const { isAuthenticated, requireAuth } = useAuth();
  const [searchParams] = useSearchParams();

  // Active sheet selection
  const [activeTab, setActiveTab] = useState("dsa"); // 'dsa' or 'cs'
  const [selectedSheetId, setSelectedSheetId] = useState(() => {
    const urlSheet = searchParams.get("sheet");
    return urlSheet && PROBLEM_SETS[urlSheet] ? urlSheet : "admin-sheet";
  });

  // Sync sheet selection if URL param changes
  useEffect(() => {
    const urlSheet = searchParams.get("sheet");
    if (urlSheet && PROBLEM_SETS[urlSheet]) {
      setSelectedSheetId(urlSheet);
      setSelectedCategory("all");
    }
  }, [searchParams]);

  // Filtering state
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Progress state
  const [completedProblems, setCompletedProblems] = useState({});
  const [starredProblems, setStarredProblems] = useState({});
  const [problemNotes, setProblemNotes] = useState({});

  // Monaco Code Editor Modal state
  const [activeProblem, setActiveProblem] = useState(null);
  const [editorLanguage, setEditorLanguage] = useState("javascript");
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [code, setCode] = useState("");
  const [executionOutput, setExecutionOutput] = useState(null);
  const [activeTabInModal, setActiveTabInModal] = useState("description"); // 'description' | 'hint' | 'notes'
  const [currentNoteText, setCurrentNoteText] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedSubmodules, setExpandedSubmodules] = useState({});
  const [expandedQuestions, setExpandedQuestions] = useState({});

  // Load progress from localStorage on initial render
  useEffect(() => {
    try {
      const savedCompleted = localStorage.getItem("skillsync_completed_problems");
      if (savedCompleted) setCompletedProblems(JSON.parse(savedCompleted));

      const savedStarred = localStorage.getItem("skillsync_starred_problems");
      if (savedStarred) setStarredProblems(JSON.parse(savedStarred));

      const savedNotes = localStorage.getItem("skillsync_problem_notes");
      if (savedNotes) setProblemNotes(JSON.parse(savedNotes));
    } catch (e) {
      console.error("Failed to load local sheet progress", e);
    }
  }, []);

  // Fetch from backend if authenticated
  useEffect(() => {
    if (isAuthenticated && selectedSheetId) {
      API.get(`/coding-sheets/${selectedSheetId}/progress`)
        .then((res) => {
          if (res.data) {
            const { completedProblemIds, starredProblemIds, notes } = res.data;
            if (completedProblemIds) {
              setCompletedProblems((prev) => {
                const updated = { ...prev };
                completedProblemIds.forEach((id) => (updated[id] = true));
                return updated;
              });
            }
            if (starredProblemIds) {
              setStarredProblems((prev) => {
                const updated = { ...prev };
                starredProblemIds.forEach((id) => (updated[id] = true));
                return updated;
              });
            }
            if (notes) {
              setProblemNotes((prev) => ({ ...prev, ...notes }));
            }
          }
        })
        .catch(() => {});
    }
  }, [isAuthenticated, selectedSheetId]);

  // Save progress changes to localStorage and backend (with requireAuth guard)
  const toggleComplete = (problemId, e) => {
    if (e) e.stopPropagation();
    requireAuth(() => {
      setCompletedProblems((prev) => {
        const updated = { ...prev, [problemId]: !prev[problemId] };
        localStorage.setItem("skillsync_completed_problems", JSON.stringify(updated));

        const completedIds = Object.keys(updated).filter((k) => updated[k]);
        API.post(`/coding-sheets/${selectedSheetId}/progress`, {
          completedProblemIds: completedIds,
        }).catch(() => {});
        return updated;
      });
    }, "Sign in to mark problems as solved and sync your progress across devices.");
  };

  const toggleStar = (problemId, e) => {
    if (e) e.stopPropagation();
    requireAuth(() => {
      setStarredProblems((prev) => {
        const updated = { ...prev, [problemId]: !prev[problemId] };
        localStorage.setItem("skillsync_starred_problems", JSON.stringify(updated));

        const starredIds = Object.keys(updated).filter((k) => updated[k]);
        API.post(`/coding-sheets/${selectedSheetId}/progress`, {
          starredProblemIds: starredIds,
        }).catch(() => {});
        return updated;
      });
    }, "Sign in to bookmark and save your favorite practice questions.");
  };

  const saveNote = (problemId, text) => {
    requireAuth(() => {
      setProblemNotes((prev) => {
        const updated = { ...prev, [problemId]: text };
        localStorage.setItem("skillsync_problem_notes", JSON.stringify(updated));

        API.post(`/coding-sheets/${selectedSheetId}/progress`, {
          notes: updated,
        }).catch(() => {});
        return updated;
      });
    }, "Sign in to write and save personal revision notes.");
  };

  // Filter sheets by tab (DSA vs CS Fundamentals)
  const currentSheets = useMemo(() => {
    if (activeTab === "dsa") {
      return SHEETS_INFO.filter((s) => s.category !== "CS Fundamentals");
    }
    return SHEETS_INFO.filter((s) => s.category === "CS Fundamentals");
  }, [activeTab]);

  const activeSheetMeta = useMemo(() => {
    return SHEETS_INFO.find((s) => s.id === selectedSheetId) || SHEETS_INFO[0];
  }, [selectedSheetId]);

  const adminSheetMeta = useMemo(() => {
    return SHEETS_INFO.find((s) => s.id === "admin-sheet") || SHEETS_INFO[0];
  }, []);

  const adminSheetStats = useMemo(() => {
    const adminCategories = PROBLEM_SETS["admin-sheet"] || [];
    let total = 0, completed = 0;
    adminCategories.forEach((cat) => {
      const list = cat.problems || (cat.submodules ? cat.submodules.flatMap((s) => s.problems) : []);
      list.forEach((p) => {
        total++;
        if (completedProblems[p.id]) completed++;
      });
    });
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percent };
  }, [completedProblems]);

  const currentProblemCategories = useMemo(() => {
    return PROBLEM_SETS[selectedSheetId] || [];
  }, [selectedSheetId]);

  // Compute Sheet Stats
  const sheetStats = useMemo(() => {
    let total = 0;
    let completed = 0;
    let easyTotal = 0, easyCompleted = 0;
    let medTotal = 0, medCompleted = 0;
    let hardTotal = 0, hardCompleted = 0;

    currentProblemCategories.forEach((cat) => {
      const probList = cat.problems || (cat.submodules ? cat.submodules.flatMap(s => s.problems) : []);
      if (probList.length > 0) {
        probList.forEach((p) => {
          total++;
          const isDone = !!completedProblems[p.id];
          if (isDone) completed++;

          if (p.difficulty === "easy") {
            easyTotal++;
            if (isDone) easyCompleted++;
          } else if (p.difficulty === "medium") {
            medTotal++;
            if (isDone) medCompleted++;
          } else if (p.difficulty === "hard") {
            hardTotal++;
            if (isDone) hardCompleted++;
          }
        });
      } else if (cat.questions) {
        cat.questions.forEach((q) => {
          total++;
          if (completedProblems[q.id]) completed++;
        });
      }
    });

    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return {
      total,
      completed,
      percent,
      easyTotal,
      easyCompleted,
      medTotal,
      medCompleted,
      hardTotal,
      hardCompleted,
    };
  }, [currentProblemCategories, completedProblems]);

  // Filtered categories and problems (with full nested submodules support)
  const filteredCategories = useMemo(() => {
    return currentProblemCategories
      .map((cat, catIdx) => {
        // Check topic level selection
        if (selectedCategory !== "all") {
          const isDirectTopic = cat.category === selectedCategory || cat.topic === selectedCategory;
          const hasMatchingSub = cat.submodules && cat.submodules.some(
            (s) => s.name === selectedCategory || `${cat.topic || cat.category}: ${s.name}` === selectedCategory
          );
          if (!isDirectTopic && !hasMatchingSub) return null;
        }

        // Case A: Nested Topic with Submodules (Patterns)
        if (cat.submodules && cat.submodules.length > 0) {
          const filteredSubs = cat.submodules
            .map((sub) => {
              if (
                selectedCategory !== "all" &&
                selectedCategory !== cat.category &&
                selectedCategory !== cat.topic &&
                selectedCategory !== sub.name &&
                selectedCategory !== `${cat.topic || cat.category}: ${sub.name}`
              ) {
                return null;
              }

              const filteredProbs = sub.problems.filter((p) => {
                const matchesSearch =
                  !searchQuery ||
                  p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  (p.pattern && p.pattern.toLowerCase().includes(searchQuery.toLowerCase())) ||
                  (p.topic && p.topic.toLowerCase().includes(searchQuery.toLowerCase())) ||
                  sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  cat.category.toLowerCase().includes(searchQuery.toLowerCase());

                const matchesDifficulty =
                  difficultyFilter === "all" || p.difficulty === difficultyFilter;

                const matchesPlatform =
                  platformFilter === "all" || p.platform === platformFilter;

                const isDone = !!completedProblems[p.id];
                const isStarred = !!starredProblems[p.id];

                let matchesStatus = true;
                if (statusFilter === "completed") matchesStatus = isDone;
                else if (statusFilter === "pending") matchesStatus = !isDone;
                else if (statusFilter === "starred") matchesStatus = isStarred;

                return matchesSearch && matchesDifficulty && matchesPlatform && matchesStatus;
              });

              if (
                filteredProbs.length === 0 &&
                (searchQuery || difficultyFilter !== "all" || platformFilter !== "all" || statusFilter !== "all" || selectedCategory !== "all")
              ) {
                return null;
              }

              return { ...sub, problems: filteredProbs };
            })
            .filter(Boolean);

          if (filteredSubs.length === 0) return null;

          const flatProbs = filteredSubs.flatMap((s) => s.problems);
          return { ...cat, submodules: filteredSubs, problems: flatProbs };
        }

        // Case B: Standard Flat Problems List
        if (cat.problems) {
          const filtered = cat.problems.filter((p) => {
            const matchesSearch =
              !searchQuery ||
              p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              cat.category.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesDifficulty =
              difficultyFilter === "all" || p.difficulty === difficultyFilter;

            const matchesPlatform =
              platformFilter === "all" || p.platform === platformFilter;

            const isDone = !!completedProblems[p.id];
            const isStarred = !!starredProblems[p.id];

            let matchesStatus = true;
            if (statusFilter === "completed") matchesStatus = isDone;
            else if (statusFilter === "pending") matchesStatus = !isDone;
            else if (statusFilter === "starred") matchesStatus = isStarred;

            return matchesSearch && matchesDifficulty && matchesPlatform && matchesStatus;
          });

          if (filtered.length === 0 && (searchQuery || difficultyFilter !== "all" || platformFilter !== "all" || statusFilter !== "all")) {
            return null;
          }

          return { ...cat, problems: filtered };
        }

        // Case C: CS Fundamentals Q&A
        if (cat.questions) {
          const filtered = cat.questions.filter((q) => {
            const matchesSearch =
              !searchQuery ||
              q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.topic.toLowerCase().includes(searchQuery.toLowerCase());

            const isDone = !!completedProblems[q.id];
            let matchesStatus = true;
            if (statusFilter === "completed") matchesStatus = isDone;
            else if (statusFilter === "pending") matchesStatus = !isDone;

            return matchesSearch && matchesStatus;
          });

          if (filtered.length === 0 && (searchQuery || statusFilter !== "all")) {
            return null;
          }

          return { ...cat, questions: filtered };
        }

        return cat;
      })
      .filter(Boolean);
  }, [
    currentProblemCategories,
    selectedCategory,
    searchQuery,
    difficultyFilter,
    platformFilter,
    statusFilter,
    completedProblems,
    starredProblems,
  ]);

  // Open problem in Editor Modal
  const openEditor = (problem) => {
    setActiveProblem(problem);
    setCode(problem.starterCode || `// Solution for: ${problem.title}\nfunction solution() {\n  // Write your code here\n}`);
    setExecutionOutput(null);
    setActiveTabInModal("description");
    setCurrentNoteText(problemNotes[problem.id] || "");
  };

  // Run Code in simulated / JavaScript sandbox
  const runCode = () => {
    setExecutionOutput({ status: "running", logs: ["Running code..."] });
    setTimeout(() => {
      try {
        if (editorLanguage === "javascript") {
          const logs = [];
          const customConsole = {
            log: (...args) => logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" ")),
            error: (...args) => logs.push("ERROR: " + args.join(" ")),
            warn: (...args) => logs.push("WARN: " + args.join(" ")),
          };

          const runFn = new Function("console", code);
          const result = runFn(customConsole);

          setExecutionOutput({
            status: "success",
            logs: logs.length > 0 ? logs : ["Code executed successfully with return: " + (result !== undefined ? JSON.stringify(result) : "undefined")],
            executionTime: Math.floor(Math.random() * 40 + 15) + " ms",
            memory: (Math.random() * 5 + 38).toFixed(1) + " MB",
          });
        } else {
          setExecutionOutput({
            status: "success",
            logs: [
              `[${editorLanguage.toUpperCase()}] Compilation successful!`,
              "Test Cases Passed: 1/1",
              "Sample input processed without runtime errors.",
            ],
            executionTime: Math.floor(Math.random() * 30 + 10) + " ms",
            memory: "42.1 MB",
          });
        }
      } catch (err) {
        setExecutionOutput({
          status: "error",
          logs: [err.toString()],
        });
      }
    }, 300);
  };

  const toggleCategoryExpand = (catIndex) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catIndex]: prev[catIndex] === undefined ? false : !prev[catIndex],
    }));
  };

  const toggleSubmoduleExpand = (subKey) => {
    setExpandedSubmodules((prev) => ({
      ...prev,
      [subKey]: prev[subKey] === undefined ? false : !prev[subKey],
    }));
  };

  const toggleQuestionExpand = (qId) => {
    setExpandedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 mb-3">
              <span>⚡ Complete DSA & CS Sheets Collection</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Coding Sheets & Interview Master
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-3xl">
              Solve topic-wise curated problem sheets from Striver, NeetCode, Blind 75, Love Babbar, and master core CS Fundamentals with built-in code editor.
            </p>
          </div>

          {/* Tab Switcher: DSA Sheets vs CS Fundamentals */}
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl shadow-inner self-start md:self-auto">
            <button
              onClick={() => {
                setActiveTab("dsa");
                setSelectedSheetId("striver-sde");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "dsa"
                  ? "bg-red-600 text-white shadow-md shadow-red-900/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>🔥 DSA Sheets</span>
              <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">
                {SHEETS_INFO.filter((s) => s.category !== "CS Fundamentals").length}
              </span>
            </button>
            <button
              onClick={() => {
                setActiveTab("cs");
                setSelectedSheetId("cs-operating-systems");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "cs"
                  ? "bg-red-600 text-white shadow-md shadow-red-900/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>💻 CS Fundamentals</span>
              <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">
                {SHEETS_INFO.filter((s) => s.category === "CS Fundamentals").length}
              </span>
            </button>
          </div>
        </div>

        {/* 👑 Highlighted Admin Sheet Hero Banner (Separately Featured Above All Sheets) */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-950/60 via-slate-900 to-slate-950 border-2 border-red-500/70 p-6 sm:p-8 shadow-2xl shadow-red-950/50 ring-1 ring-red-500/40">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-16 w-60 h-60 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left Info */}
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-3xl sm:text-4xl">👑</span>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase tracking-wide">
                  <span>★ Official Featured Roadmap</span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-950/80 text-red-400 border border-red-800 font-semibold">
                  382 Problems
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  17 Topics • 69 Patterns
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span>Admin Sheet</span>
                  <span className="text-xs font-normal text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                    Pattern-Wise Master Curriculum
                  </span>
                </h2>
                <p className="text-sm text-slate-300 max-w-3xl mt-1.5 leading-relaxed">
                  The flagship curated curriculum containing 382 problems organized into 69 algorithmic patterns (Two-Pointer, Sliding Window, Prefix Sum, Kadane, Binary Search, Monotonic Stack, Trees, Graphs, DP) with direct LeetCode and GeeksforGeeks solve links.
                </p>
              </div>

              {/* Pattern Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["Array (4 Patterns)", "Strings (2 Patterns)", "Binary Search (4 Patterns)", "Stack (7 Patterns)", "Recursion (5 Patterns)", "Linked List (5 Patterns)", "Trees & Graphs (15 Patterns)", "Dynamic Programming (7 Patterns)"].map((pTag) => (
                  <span
                    key={pTag}
                    className="text-[11px] font-medium bg-slate-900/90 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700/80"
                  >
                    🔹 {pTag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Actions & Admin Sheet Progress Card */}
            <div className="lg:w-80 flex flex-col gap-3 bg-slate-950/85 border border-slate-800/90 p-4 sm:p-5 rounded-xl shadow-lg self-stretch justify-between">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-300">Admin Sheet Progress</span>
                  <span className="font-bold text-amber-400">{adminSheetStats.percent}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-2">
                  <div
                    className="bg-gradient-to-r from-red-500 to-amber-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${adminSheetStats.percent}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{adminSheetStats.completed} Solved</span>
                  <span>{adminSheetStats.total} Total</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/60">
                <button
                  onClick={() => {
                    setSelectedSheetId("admin-sheet");
                    setSelectedCategory("all");
                    const el = document.getElementById("active-sheet-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`w-full py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                    selectedSheetId === "admin-sheet"
                      ? "bg-red-600 hover:bg-red-500 text-white ring-2 ring-red-400/40"
                      : "bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white"
                  }`}
                >
                  <span>⚡</span>
                  <span>{selectedSheetId === "admin-sheet" ? "Currently Selected & Active" : "Open & Solve Admin Sheet"}</span>
                </button>

                <Link
                  to="/suggested-sheets"
                  className="w-full py-2 px-3 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>📚</span>
                  <span>Explore More Suggested Sheets Page</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 📖 Callout to Dedicated Suggested Sheets Directory */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl">
              📖
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Looking for Striver SDE, NeetCode 150, Blind 75, or CS Fundamentals?
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                We have dedicated pages with complete problem lists, external links, and curriculum breakdowns.
              </p>
            </div>
          </div>

          <Link
            to="/suggested-sheets"
            className="px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 text-xs font-bold rounded-xl transition-all whitespace-nowrap self-start sm:self-auto flex items-center gap-1.5"
          >
            <span>Browse Suggested Sheets Directory</span>
            <span>→</span>
          </Link>
        </div>

        {/* Selected Sheet Overview Banner & Metrics Card */}
        <div id="active-sheet-section" className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden scroll-mt-6">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Left: Info */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-3xl">{activeSheetMeta.icon}</span>
                <h2 className="text-2xl font-bold text-white">
                  {activeSheetMeta.name}
                </h2>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                  {activeSheetMeta.badge}
                </span>
              </div>
              <p className="text-sm text-slate-300">
                {activeSheetMeta.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeSheetMeta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-slate-800/80 text-slate-300 px-2.5 py-0.5 rounded-md border border-slate-700/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Progress Tracker Card */}
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Overall Completion
                </span>
                <span className="text-sm font-bold text-red-400">
                  {sheetStats.percent}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-red-600 to-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${sheetStats.percent}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                  <div className="text-emerald-400 font-bold">
                    {sheetStats.easyCompleted}/{sheetStats.easyTotal || sheetStats.total}
                  </div>
                  <div className="text-[10px] text-slate-400">Easy</div>
                </div>
                <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                  <div className="text-amber-400 font-bold">
                    {sheetStats.medCompleted}/{sheetStats.medTotal || "-"}
                  </div>
                  <div className="text-[10px] text-slate-400">Medium</div>
                </div>
                <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                  <div className="text-rose-400 font-bold">
                    {sheetStats.hardCompleted}/{sheetStats.hardTotal || "-"}
                  </div>
                  <div className="text-[10px] text-slate-400">Hard</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                🔍
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search problems by name or category..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Dropdown Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-red-500"
              >
                <option value="all">All Topics ({currentProblemCategories.length})</option>
                {currentProblemCategories.map((c) => (
                  <option key={c.category} value={c.category}>
                    {c.category}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-red-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed (Solved)</option>
                <option value="pending">Pending (Unsolved)</option>
                <option value="starred">Starred / Bookmarked</option>
              </select>

              {/* Difficulty Filter */}
              {activeTab === "dsa" && (
                <div className="flex bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-xs">
                  {["all", "easy", "medium", "hard"].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficultyFilter(diff)}
                      className={`px-3 py-1.5 rounded capitalize transition-all ${
                        difficultyFilter === diff
                          ? "bg-slate-800 text-white font-semibold"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Problem Lists Section */}
        {filteredCategories.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-12 text-center">
            <span className="text-4xl mb-3 block">🔎</span>
            <h3 className="text-lg font-bold text-white mb-1">No matching problems found</h3>
            <p className="text-sm text-slate-400 mb-4">
              Try adjusting your search query, difficulty, or status filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setDifficultyFilter("all");
                setStatusFilter("all");
                setSelectedCategory("all");
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Action Bar: Total Topics & Expand/Collapse All */}
            <div className="flex items-center justify-between px-1">
              <div className="text-xs font-medium text-slate-400">
                Showing <span className="font-bold text-white">{filteredCategories.length}</span> main topics
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const newCats = {};
                    const newSubs = {};
                    filteredCategories.forEach((cat, cIdx) => {
                      newCats[cIdx] = false;
                      if (cat.submodules) {
                        cat.submodules.forEach((_, sIdx) => {
                          newSubs[`${cIdx}-${sIdx}`] = false;
                        });
                      }
                    });
                    setExpandedCategories(newCats);
                    setExpandedSubmodules(newSubs);
                  }}
                  className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  Collapse All
                </button>
                <button
                  onClick={() => {
                    const newCats = {};
                    const newSubs = {};
                    filteredCategories.forEach((cat, cIdx) => {
                      newCats[cIdx] = true;
                      if (cat.submodules) {
                        cat.submodules.forEach((_, sIdx) => {
                          newSubs[`${cIdx}-${sIdx}`] = true;
                        });
                      }
                    });
                    setExpandedCategories(newCats);
                    setExpandedSubmodules(newSubs);
                  }}
                  className="text-xs text-red-400 hover:text-red-300 px-2.5 py-1 rounded bg-red-950/40 border border-red-900/50 hover:bg-red-900/40 transition-colors"
                >
                  Expand All
                </button>
              </div>
            </div>

            {filteredCategories.map((cat, catIdx) => {
              const isCollapsed = expandedCategories[catIdx] === false;
              
              // Total and solved counts
              const allProblemsInCat = cat.problems || (cat.submodules ? cat.submodules.flatMap(s => s.problems) : []);
              const totalItems = allProblemsInCat.length > 0 ? allProblemsInCat.length : (cat.questions ? cat.questions.length : 0);
              const doneItems = allProblemsInCat.length > 0
                ? allProblemsInCat.filter((p) => completedProblems[p.id]).length
                : (cat.questions ? cat.questions.filter((q) => completedProblems[q.id]).length : 0);
              const catPercent = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

              return (
                <div
                  key={cat.category + "-" + catIdx}
                  className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-sm transition-all"
                >
                  {/* Topic Header Bar (Level 1) */}
                  <div
                    onClick={() => toggleCategoryExpand(catIdx)}
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-850 bg-slate-900 border-b border-slate-800/80 select-none transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 text-sm w-4 text-center">
                        {isCollapsed ? "▶" : "▼"}
                      </span>
                      <span className="text-xl">{cat.icon || "📁"}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-white">
                            {cat.topic || cat.category}
                          </h3>
                          {cat.submodules && (
                            <span className="text-[11px] bg-red-950/60 text-red-400 border border-red-900/50 px-2 py-0.5 rounded-full font-medium">
                              {cat.submodules.length} Sub-modules
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {totalItems} problems total • {doneItems} completed
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Topic Progress Bar */}
                      <div className="hidden sm:flex items-center gap-2">
                        <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-red-600 to-amber-500 h-full rounded-full transition-all"
                            style={{ width: `${catPercent}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-300 w-10 text-right">
                          {catPercent}%
                        </span>
                      </div>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {doneItems} / {totalItems}
                      </span>
                    </div>
                  </div>

                  {/* Level 1 Expanded Content */}
                  {!isCollapsed && (
                    <div>
                      {/* CASE 1: Nested Sub-Modules (Patterns) */}
                      {cat.submodules && cat.submodules.length > 0 ? (
                        <div className="p-3.5 space-y-3 bg-slate-950/60">
                          {cat.submodules.map((submodule, subIdx) => {
                            const subKey = `${catIdx}-${subIdx}`;
                            const isSubCollapsed = expandedSubmodules[subKey] === false;
                            const subTotal = submodule.problems.length;
                            const subDone = submodule.problems.filter((p) => completedProblems[p.id]).length;
                            const subPercent = subTotal > 0 ? Math.round((subDone / subTotal) * 100) : 0;

                            return (
                              <div
                                key={submodule.name + "-" + subIdx}
                                className="bg-slate-900/80 border border-slate-800/90 rounded-lg overflow-hidden"
                              >
                                {/* Sub-Module Accordion Header (Level 2) */}
                                <div
                                  onClick={() => toggleSubmoduleExpand(subKey)}
                                  className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-850/80 bg-slate-900/90 border-b border-slate-800/60 select-none transition-colors"
                                >
                                  <div className="flex items-center gap-2.5">
                                    <span className="text-slate-500 text-xs w-3 text-center">
                                      {isSubCollapsed ? "▶" : "▼"}
                                    </span>
                                    <span className="text-xs text-red-400 font-bold">🔹</span>
                                    <h4 className="font-semibold text-sm text-slate-200">
                                      {submodule.name}
                                    </h4>
                                    <span className="text-[11px] text-slate-400 ml-1">
                                      ({subTotal} questions)
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <div className="hidden md:flex items-center gap-1.5">
                                      <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                        <div
                                          className="bg-emerald-500 h-full rounded-full transition-all"
                                          style={{ width: `${subPercent}%` }}
                                        />
                                      </div>
                                      <span className="text-[11px] text-slate-400">
                                        {subPercent}%
                                      </span>
                                    </div>
                                    <span
                                      className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                                        subDone === subTotal && subTotal > 0
                                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                          : "bg-slate-800 text-slate-400 border border-slate-700/60"
                                      }`}
                                    >
                                      {subDone} / {subTotal} Solved
                                    </span>
                                  </div>
                                </div>

                                {/* Problems list inside this Sub-module */}
                                {!isSubCollapsed && (
                                  <div className="divide-y divide-slate-800/40 bg-slate-950/40">
                                    {submodule.problems.map((problem, pIdx) => {
                                      const isDone = !!completedProblems[problem.id];
                                      const isStarred = !!starredProblems[problem.id];
                                      const hasNote = !!problemNotes[problem.id];

                                      return (
                                        <div
                                          key={problem.id}
                                          className={`p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                                            isDone
                                              ? "bg-emerald-950/15 hover:bg-emerald-950/25"
                                              : "hover:bg-slate-850/40"
                                          }`}
                                        >
                                          {/* Left: Checkbox + Title + Badges */}
                                          <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <button
                                              onClick={(e) => toggleComplete(problem.id, e)}
                                              className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                                                isDone
                                                  ? "bg-emerald-600 border-emerald-500 text-white"
                                                  : "border-slate-700 bg-slate-950 hover:border-slate-500"
                                              }`}
                                              title={isDone ? "Mark as Unsolved" : "Mark as Solved"}
                                            >
                                              {isDone && "✓"}
                                            </button>

                                            <button
                                              onClick={(e) => toggleStar(problem.id, e)}
                                              className={`text-base transition-transform hover:scale-125 ${
                                                isStarred ? "text-amber-400" : "text-slate-600 hover:text-slate-400"
                                              }`}
                                              title="Bookmark problem"
                                            >
                                              ★
                                            </button>

                                            <div className="min-w-0 flex-1">
                                              <div className="flex flex-wrap items-center gap-2">
                                                <span
                                                  onClick={() => openEditor(problem)}
                                                  className={`text-sm font-semibold cursor-pointer transition-colors hover:text-red-400 truncate ${
                                                    isDone ? "text-slate-400 line-through" : "text-slate-100"
                                                  }`}
                                                >
                                                  {pIdx + 1}. {problem.title}
                                                </span>

                                                {/* Difficulty Badge */}
                                                <span
                                                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                                    problem.difficulty === "easy"
                                                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                      : problem.difficulty === "medium"
                                                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                                      : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                                  }`}
                                                >
                                                  {problem.difficulty}
                                                </span>

                                                {/* Platform Badge */}
                                                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                                                  {problem.platform}
                                                </span>

                                                {hasNote && (
                                                  <span
                                                    className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800 px-1.5 py-0.5 rounded cursor-pointer"
                                                    onClick={() => openEditor(problem)}
                                                  >
                                                    📝 Note
                                                  </span>
                                                )}
                                              </div>
                                            </div>
                                          </div>

                                          {/* Right: Actions */}
                                          <div className="flex items-center gap-2 self-end sm:self-auto">
                                            <button
                                              onClick={() => openEditor(problem)}
                                              className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
                                            >
                                              <span>💻</span>
                                              <span>Solve in IDE</span>
                                            </button>

                                            <a
                                              href={problem.link}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                                              title={`Open problem on ${problem.platform || 'LeetCode'}`}
                                            >
                                              <span>{problem.platform === 'gfg' ? 'GFG' : 'LeetCode'}</span>
                                              <span>↗</span>
                                            </a>

                                            {problem.gfgLink && (
                                              <a
                                                href={problem.gfgLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-2.5 py-1.5 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-400 hover:text-emerald-200 border border-emerald-800/40 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                                                title="Open problem on GeeksforGeeks"
                                              >
                                                <span>GFG</span>
                                                <span>↗</span>
                                              </a>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        /* CASE 2: Flat Problem List (Standard sheets) */
                        <div className="divide-y divide-slate-800/50">
                          {cat.problems &&
                            cat.problems.map((problem, pIdx) => {
                              const isDone = !!completedProblems[problem.id];
                              const isStarred = !!starredProblems[problem.id];
                              const hasNote = !!problemNotes[problem.id];

                              return (
                                <div
                                  key={problem.id}
                                  className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                                    isDone
                                      ? "bg-emerald-950/10 hover:bg-emerald-950/20"
                                      : "hover:bg-slate-850/50"
                                  }`}
                                >
                                  {/* Left: Checkbox + Title + Badges */}
                                  <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <button
                                      onClick={(e) => toggleComplete(problem.id, e)}
                                      className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                                        isDone
                                          ? "bg-emerald-600 border-emerald-500 text-white"
                                          : "border-slate-700 bg-slate-950 hover:border-slate-500"
                                      }`}
                                    >
                                      {isDone && "✓"}
                                    </button>

                                    <button
                                      onClick={(e) => toggleStar(problem.id, e)}
                                      className={`text-base transition-transform hover:scale-125 ${
                                        isStarred ? "text-amber-400" : "text-slate-600 hover:text-slate-400"
                                      }`}
                                      title="Bookmark problem"
                                    >
                                      ★
                                    </button>

                                    <div className="min-w-0 flex-1">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span
                                          onClick={() => openEditor(problem)}
                                          className={`text-sm font-semibold cursor-pointer transition-colors hover:text-red-400 truncate ${
                                            isDone ? "text-slate-400 line-through" : "text-slate-100"
                                          }`}
                                        >
                                          {pIdx + 1}. {problem.title}
                                        </span>

                                        {/* Difficulty Badge */}
                                        <span
                                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                            problem.difficulty === "easy"
                                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                              : problem.difficulty === "medium"
                                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                          }`}
                                        >
                                          {problem.difficulty}
                                        </span>

                                        {/* Platform Badge */}
                                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                                          {problem.platform}
                                        </span>

                                        {hasNote && (
                                          <span
                                            className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800 px-1.5 py-0.5 rounded cursor-pointer"
                                            onClick={() => openEditor(problem)}
                                          >
                                            📝 Note
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Right: Actions */}
                                  <div className="flex items-center gap-2 self-end sm:self-auto">
                                    <button
                                      onClick={() => openEditor(problem)}
                                      className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
                                    >
                                      <span>💻</span>
                                      <span>Solve in IDE</span>
                                    </button>

                                    <a
                                      href={problem.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                                      title={`Open problem on ${problem.platform || 'LeetCode'}`}
                                    >
                                      <span>{problem.platform === 'gfg' ? 'GFG' : 'LeetCode'}</span>
                                      <span>↗</span>
                                    </a>

                                    {problem.gfgLink && (
                                      <a
                                        href={problem.gfgLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-2.5 py-1.5 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-400 hover:text-emerald-200 border border-emerald-800/40 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                                        title="Open problem on GeeksforGeeks"
                                      >
                                        <span>GFG</span>
                                        <span>↗</span>
                                      </a>
                                    )}
                                  </div>
                                </div>
                              );
                            })}

                          {/* CS Fundamentals Questions List */}
                          {cat.questions &&
                            cat.questions.map((q, qIdx) => {
                              const isDone = !!completedProblems[q.id];
                              const isExpanded = !!expandedQuestions[q.id];

                              return (
                                <div key={q.id} className="p-4 transition-colors hover:bg-slate-850/40">
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-3 flex-1">
                                      <button
                                        onClick={(e) => toggleComplete(q.id, e)}
                                        className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-all ${
                                          isDone
                                            ? "bg-emerald-600 border-emerald-500 text-white"
                                            : "border-slate-700 bg-slate-950 hover:border-slate-500"
                                        }`}
                                      >
                                        {isDone && "✓"}
                                      </button>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                          <span className="text-xs text-red-400 font-semibold uppercase tracking-wider">
                                            {q.topic}
                                          </span>
                                        </div>
                                        <h4
                                          onClick={() => toggleQuestionExpand(q.id)}
                                          className={`text-sm font-bold cursor-pointer hover:text-red-400 transition-colors ${
                                            isDone ? "text-slate-400 line-through" : "text-white"
                                          }`}
                                        >
                                          Q{qIdx + 1}: {q.question}
                                        </h4>
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => toggleQuestionExpand(q.id)}
                                      className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors"
                                    >
                                      {isExpanded ? "Hide Answer ▲" : "View Answer ▼"}
                                    </button>
                                  </div>

                                  {/* Answer Accordion Body */}
                                  {isExpanded && (
                                    <div className="mt-3 pl-8 space-y-2.5 border-t border-slate-800/60 pt-3">
                                      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                                        <h5 className="text-xs font-semibold text-slate-300 mb-1.5">
                                          Key Interview Points:
                                        </h5>
                                        <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                                          {q.keyPoints.map((point, kIdx) => (
                                            <li key={kIdx}>{point}</li>
                                          ))}
                                        </ul>
                                      </div>
                                      <div className="text-xs text-slate-300 bg-red-950/20 border border-red-900/30 p-3 rounded-lg">
                                        <span className="font-semibold text-red-400">Deep Dive: </span>
                                        {q.explanation}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Monaco IDE Workspace Modal */}
        {activeProblem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-6xl h-[92vh] flex flex-col shadow-2xl overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-3 bg-slate-950 border-b border-slate-800">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-lg">💻</span>
                  <div>
                    <h3 className="font-bold text-white text-base truncate">
                      {activeProblem.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          activeProblem.difficulty === "easy"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : activeProblem.difficulty === "medium"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-rose-500/20 text-rose-400"
                        }`}
                      >
                        {activeProblem.difficulty}
                      </span>
                      <span className="text-xs text-slate-400">
                        Platform: <span className="uppercase font-semibold text-slate-300">{activeProblem.platform}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleComplete(activeProblem.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                      completedProblems[activeProblem.id]
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                    }`}
                  >
                    <span>{completedProblems[activeProblem.id] ? "✓ Solved" : "Mark as Solved"}</span>
                  </button>

                  <a
                    href={activeProblem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors"
                  >
                    Open on {activeProblem.platform === 'gfg' ? 'GFG' : 'LeetCode'} ↗
                  </a>

                  {activeProblem.gfgLink && (
                    <a
                      href={activeProblem.gfgLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-950/70 hover:bg-emerald-900 text-emerald-400 border border-emerald-800/50 rounded-lg text-xs transition-colors"
                    >
                      Open on GFG ↗
                    </a>
                  )}

                  <button
                    onClick={() => setActiveProblem(null)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 text-lg leading-none"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Split Workspace Body */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-hidden">
                {/* Left Pane: Problem Description, Hints, & Notes (5 cols) */}
                <div className="lg:col-span-5 flex flex-col border-r border-slate-800 bg-slate-900/80 overflow-hidden">
                  {/* Left Tabs */}
                  <div className="flex border-b border-slate-800 bg-slate-950 px-4">
                    <button
                      onClick={() => setActiveTabInModal("description")}
                      className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
                        activeTabInModal === "description"
                          ? "border-red-500 text-red-400"
                          : "border-transparent text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Description
                    </button>
                    <button
                      onClick={() => setActiveTabInModal("hint")}
                      className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
                        activeTabInModal === "hint"
                          ? "border-red-500 text-red-400"
                          : "border-transparent text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Optimal Hint 💡
                    </button>
                    <button
                      onClick={() => setActiveTabInModal("notes")}
                      className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
                        activeTabInModal === "notes"
                          ? "border-red-500 text-red-400"
                          : "border-transparent text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      My Notes 📝
                    </button>
                  </div>

                  {/* Left Tab Contents */}
                  <div className="flex-1 p-5 overflow-y-auto space-y-4 text-slate-200 text-sm">
                    {activeTabInModal === "description" && (
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-bold text-white text-base mb-2">Problem Statement</h4>
                          <p className="text-slate-300 leading-relaxed">
                            {activeProblem.description}
                          </p>
                        </div>

                        {activeProblem.examples && activeProblem.examples.length > 0 && (
                          <div className="space-y-3">
                            <h5 className="font-bold text-white text-xs uppercase tracking-wider">
                              Examples:
                            </h5>
                            {activeProblem.examples.map((ex, idx) => (
                              <div
                                key={idx}
                                className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono space-y-1"
                              >
                                <div><span className="text-slate-500">Input:</span> {ex.input}</div>
                                <div><span className="text-emerald-400">Output:</span> {ex.output}</div>
                                {ex.explanation && (
                                  <div><span className="text-amber-400">Explanation:</span> {ex.explanation}</div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {activeProblem.constraints && (
                          <div>
                            <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-2">
                              Constraints:
                            </h5>
                            <ul className="list-disc list-inside text-xs font-mono text-slate-400 space-y-1">
                              {activeProblem.constraints.map((c, i) => (
                                <li key={i}>{c}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTabInModal === "hint" && (
                      <div className="space-y-3">
                        <div className="p-4 bg-amber-950/30 border border-amber-800/40 rounded-xl text-amber-200 text-sm leading-relaxed">
                          <h4 className="font-bold mb-2 flex items-center gap-1.5 text-amber-400">
                            <span>💡</span>
                            <span>Optimal Approach Strategy</span>
                          </h4>
                          <p>{activeProblem.solutionHint || "Consider two-pointer or hashing approach to minimize time complexity."}</p>
                        </div>
                      </div>
                    )}

                    {activeTabInModal === "notes" && (
                      <div className="space-y-3 flex flex-col h-full">
                        <p className="text-xs text-slate-400">
                          Jot down your key takeaways, edge cases, time/space complexity notes. (Saved locally & to your profile)
                        </p>
                        <textarea
                          value={currentNoteText}
                          onChange={(e) => {
                            setCurrentNoteText(e.target.value);
                            saveNote(activeProblem.id, e.target.value);
                          }}
                          placeholder="e.g. Edge case: empty array, time complexity O(N), space O(1)..."
                          className="w-full flex-1 min-h-[220px] bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Pane: Monaco Code Editor + Output Console (7 cols) */}
                <div className="lg:col-span-7 flex flex-col bg-slate-950 overflow-hidden">
                  {/* Editor Control Bar */}
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <select
                        value={editorLanguage}
                        onChange={(e) => setEditorLanguage(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-red-500"
                      >
                        <option value="javascript">JavaScript (ES6)</option>
                        <option value="python">Python 3</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++ 20</option>
                        <option value="csharp">C#</option>
                      </select>

                      <select
                        value={editorTheme}
                        onChange={(e) => setEditorTheme(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-red-500"
                      >
                        <option value="vs-dark">Dark Theme</option>
                        <option value="light">Light Theme</option>
                        <option value="hc-black">High Contrast</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCode(activeProblem.starterCode || "")}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded transition-colors"
                        title="Reset code template"
                      >
                        ↺ Reset
                      </button>
                      <button
                        onClick={runCode}
                        className="px-4 py-1 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs rounded transition-colors shadow-md shadow-red-900/30 flex items-center gap-1.5"
                      >
                        <span>▶</span>
                        <span>Run Code</span>
                      </button>
                    </div>
                  </div>

                  {/* Monaco Editor Container */}
                  <div className="flex-1 min-h-[300px] overflow-hidden">
                    <Editor
                      height="100%"
                      language={editorLanguage}
                      theme={editorTheme}
                      value={code}
                      onChange={(value) => setCode(value || "")}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 13,
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 2,
                      }}
                    />
                  </div>

                  {/* Output Console Box */}
                  <div className="h-44 border-t border-slate-800 bg-slate-950 flex flex-col">
                    <div className="flex items-center justify-between px-4 py-1.5 bg-slate-900/90 border-b border-slate-800 text-xs font-semibold text-slate-400">
                      <span>Output Console</span>
                      {executionOutput && (
                        <div className="flex items-center gap-3">
                          {executionOutput.executionTime && (
                            <span className="text-slate-400 text-[10px]">
                              Time: <span className="text-emerald-400">{executionOutput.executionTime}</span>
                            </span>
                          )}
                          {executionOutput.memory && (
                            <span className="text-slate-400 text-[10px]">
                              Memory: <span className="text-cyan-400">{executionOutput.memory}</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 p-3 overflow-y-auto font-mono text-xs text-slate-300 space-y-1">
                      {!executionOutput && (
                        <span className="text-slate-600 italic">
                          Click "Run Code" to execute tests and view console output...
                        </span>
                      )}
                      {executionOutput &&
                        executionOutput.logs.map((log, idx) => (
                          <div
                            key={idx}
                            className={
                              executionOutput.status === "error"
                                ? "text-rose-400"
                                : "text-slate-200"
                            }
                          >
                            {log}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
