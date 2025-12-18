import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { API_URL } from "../config";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { checkLogin } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Login failed");
      }

      await checkLogin(); // Update global context
      navigate("/"); // Redirect to home
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="glass-card animate-fade-in" style={{ padding: "40px", width: "100%", maxWidth: "450px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "8px", background: "var(--primary-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Welcome Back</h2>
        <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "32px" }}>Sign in to manage your appointments</p>

        {error && (
          <div style={{ background: "#fee2e2", color: "#ef4444", padding: "12px", borderRadius: "8px", marginBottom: "20px", fontSize: "0.9rem", textAlign: "center" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "32px" }}>
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div style={{ textAlign: "right", marginTop: "8px" }}>
              <Link to="/forgot-password" style={{ fontSize: "0.85rem", color: "#64748b", textDecoration: "none" }}>Forgot Password?</Link>
            </div>
          </div>

          <button disabled={loading} className="btn-primary" style={{ width: "100%", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "24px", color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Don't have an account? <Link to="/signup" style={{ color: "#0072ff", fontWeight: "600", textDecoration: "none" }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
