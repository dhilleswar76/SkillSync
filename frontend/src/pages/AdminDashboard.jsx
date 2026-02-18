import { useState } from "react";
import axios from "../api/axios";

const AdminDashboard = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/courses", form);
    alert("Course Created");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Admin Panel
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-md"
      >
        <input
          placeholder="Course Title"
          className="w-full p-3 border rounded mb-4"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="Description"
          className="w-full p-3 border rounded mb-4"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button className="w-full bg-primary text-white p-3 rounded">
          Create Course
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
