import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("/auth/login", form);
    login(res.data);
    navigate("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 bg-white dark:bg-gray-800 p-8 rounded-xl shadow"
    >
      <h2 className="text-xl font-semibold mb-6">Login</h2>

      <input
        type="email"
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
        Login
      </button>
    </form>
  );
};

export default Login;
