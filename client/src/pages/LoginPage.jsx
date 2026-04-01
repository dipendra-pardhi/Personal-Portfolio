import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/admin");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0b1e] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-8"
      >
        {/* Heading */}
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Admin Login
        </h2>
        <p className="text-gray-400 text-center mb-8 text-sm">
          Only authorized admin can access the dashboard
        </p>

        {/* Email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-400 text-sm mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#120f23] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-400 text-sm mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-[#120f23] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/40"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
