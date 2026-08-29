import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";

export default function LessonView() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    API.get(`/lessons/${id}`)
      .then((res) => setLesson(res.data))
      .catch(() => {
        setLesson({
          _id: id,
          title: "Introduction to Core Algorithms",
          content: "In this lesson we cover asymptotic time & space complexity, Big O notation, and algorithm analysis.",
          duration: 30,
        });
      });

    API.get(`/comments/lesson/${id}`)
      .then((res) => setComments(res.data || []))
      .catch(() => {});
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const res = await API.post("/comments", { lessonId: id, content: commentText });
      setComments([res.data, ...comments]);
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  if (!lesson) return <div className="p-8 text-center text-slate-400">Loading lesson...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link to="/all-courses" className="text-xs text-slate-400 hover:text-white">
          ← Back to Courses
        </Link>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl space-y-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{lesson.title}</h1>
          <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed">
            <p>{lesson.content}</p>
          </div>
        </div>

        {/* Discussion / Comments Section */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="font-bold text-white text-base">Discussion & Questions</h3>
          <form onSubmit={handleAddComment} className="flex gap-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Ask a question or post a discussion comment..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl"
            >
              Post
            </button>
          </form>

          <div className="space-y-3 pt-3 divide-y divide-slate-800/60">
            {comments.map((c, i) => (
              <div key={i} className="pt-3 text-xs">
                <span className="font-bold text-red-400">{c.user?.name || "Student"}: </span>
                <span className="text-slate-300">{c.content}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
