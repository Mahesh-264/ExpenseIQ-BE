import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { FiZap, FiMail, FiLock, FiAlertCircle, FiArrowRight } from "react-icons/fi";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Please fill in both fields."); return; }
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      {/* Decorative orbs */}
      <div style={{
        position: "fixed", top: "15%", left: "10%", width: "320px", height: "320px",
        borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none"
      }} />
      <div style={{
        position: "fixed", bottom: "20%", right: "8%", width: "280px", height: "280px",
        borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.1), transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none"
      }} />

      <div className="auth-card" style={{ position: "relative" }}>
        {/* Brand */}
        <div style={{ marginBottom: "28px" }}>
          <div className="auth-brand-icon">
            <FiZap size={26} color="#fff" />
          </div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#e8edf5", letterSpacing: "-0.03em", marginBottom: "6px" }}>
            Welcome back
          </h1>
          <p style={{ fontSize: "0.9rem", color: "#6b7a96" }}>
            Sign in to your ExpenseIQ account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="auth-error">
            <FiAlertCircle size={16} style={{ flexShrink: 0, marginTop: "1px" }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="field-group">
            <label className="field-label">Email address</label>
            <div className="input-icon-wrap">
              <FiMail size={16} />
              <input
                type="email" name="email" placeholder="you@example.com"
                className="iq-input" value={form.email} onChange={onChange} required
              />
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Password</label>
            <div className="input-icon-wrap">
              <FiLock size={16} />
              <input
                type="password" name="password" placeholder="••••••••"
                className="iq-input" value={form.password} onChange={onChange} required
              />
            </div>
          </div>

          <button
            type="submit" className="iq-btn-primary w-100"
            style={{ padding: "14px", fontSize: "0.95rem", marginTop: "6px" }}
            disabled={loading}
          >
            {loading ? (
              <><div className="iq-spinner" /><span>Signing in…</span></>
            ) : (
              <><span>Sign In</span><FiArrowRight size={18} /></>
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          margin: "22px 0", color: "#3d4a5e", fontSize: "0.8rem"
        }}>
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
          New to ExpenseIQ?
          <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
        </div>

        <Link
          to="/register"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "8px", padding: "12px",
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "14px", color: "#a8b3c7", fontSize: "0.88rem",
            fontWeight: 500, textDecoration: "none", transition: "all 0.2s ease"
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#e8edf5"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.color = "#a8b3c7"; }}
        >
          Create a free account →
        </Link>

        {/* Security note */}
        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "0.73rem", color: "#3d4a5e" }}>
          🔐 Secured with JWT · Data scoped per user
        </p>
      </div>
    </div>
  );
}