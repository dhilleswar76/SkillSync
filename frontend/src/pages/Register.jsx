import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/auth/register", form);
    navigate("/login");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 bg-white dark:bg-gray-800 p-8 rounded-xl shadow"
    >
      <h2 className="text-xl font-semibold mb-6">Create Account</h2>

      <input
        placeholder="Full Name"
        className="w-full p-3 border rounded mb-4"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        className="w-full p-3 border rounded mb-4"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 border rounded mb-4"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button className="w-full bg-primary text-white p-3 rounded">
        Register
      </button>
    </form>
  );
};

export default Register;
