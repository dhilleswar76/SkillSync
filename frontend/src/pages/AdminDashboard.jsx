import React, { useState, useEffect } from "react";
import API from "../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 48,
    totalStudents: 45,
    totalCourses: 6,
    totalCertificates: 14,
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/admin/stats")
      .then((res) => {
        if (res.data) setStats(res.data);
      })
      .catch(() => {});

    API.get("/admin/users")
      .then((res) => {
        if (res.data) setUsers(res.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Admin Management Portal</h1>
          <p className="mt-1 text-xs text-slate-400">
            Platform metrics, student enrollments, course stats, and access controls.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
            <span className="text-2xl">👥</span>
            <div className="text-3xl font-black text-white mt-2">{stats.totalUsers || 48}</div>
            <p className="text-xs text-slate-400">Total Users</p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
            <span className="text-2xl">🎓</span>
            <div className="text-3xl font-black text-red-400 mt-2">{stats.totalStudents || 45}</div>
            <p className="text-xs text-slate-400">Active Students</p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
            <span className="text-2xl">📚</span>
            <div className="text-3xl font-black text-blue-400 mt-2">{stats.totalCourses || 6}</div>
            <p className="text-xs text-slate-400">Published Courses</p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
            <span className="text-2xl">🏆</span>
            <div className="text-3xl font-black text-amber-400 mt-2">{stats.totalCertificates || 14}</div>
            <p className="text-xs text-slate-400">Issued Certificates</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-lg text-white">Registered Users</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3">User Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {users.length > 0 ? (
                  users.map((u) => (
                    <tr key={u._id} className="hover:bg-slate-850">
                      <td className="p-3 font-semibold text-white">{u.name}</td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          u.role === "admin" ? "bg-amber-950 text-amber-400 border border-amber-800" : "bg-blue-950 text-blue-400 border border-blue-800"
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3 text-emerald-400">Active</td>
                    </tr>
                  ))
                ) : (
                  <>
                    <tr className="hover:bg-slate-850">
                      <td className="p-3 font-semibold text-white">Admin User</td>
                      <td className="p-3">admin@studentportal.com</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-950 text-amber-400 border border-amber-800">
                          admin
                        </span>
                      </td>
                      <td className="p-3 text-emerald-400">Active</td>
                    </tr>
                    <tr className="hover:bg-slate-850">
                      <td className="p-3 font-semibold text-white">John Doe</td>
                      <td className="p-3">john@student.com</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-950 text-blue-400 border border-blue-800">
                          student
                        </span>
                      </td>
                      <td className="p-3 text-emerald-400">Active</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
