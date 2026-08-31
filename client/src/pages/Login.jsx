import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { FiMail, FiLock, FiArrowRight, FiShield, FiTrendingUp, FiPieChart } from "react-icons/fi";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", formData);
      
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 px-3 py-5">
      <div className="w-100" style={{ maxWidth: "440px" }}>
        
        {/* Brand Header */}
        <div className="text-center mb-4">
          <div 
            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
            style={{
              width: "56px",
              height: "56px",
              background: "linear-gradient(135deg, #6366f1, #3b82f6)",
              boxShadow: "0 0 25px rgba(99, 102, 241, 0.4)"
            }}
          >
            <FiTrendingUp size={28} color="#fff" />
          </div>
          <h1 className="h3 fw-bold text-gradient mb-1">ExpenseIQ</h1>
          <p className="text-muted small">Intelligent Personal Expense & Spending Analytics</p>
        </div>

        {/* Login Card */}
        <div className="iq-card">
          <h2 className="h5 fw-semibold text-white mb-2">Welcome Back</h2>
          <p className="text-muted small mb-4">Enter your credentials to access your financial dashboard.</p>

          {error && (
            <div 
              className="p-3 mb-4 rounded-3 d-flex align-items-center gap-2"
              style={{
                background: "rgba(244, 63, 94, 0.12)",
                border: "1px solid rgba(244, 63, 94, 0.3)",
                color: "#fda4af",
                fontSize: "0.88rem"
              }}
            >
              <FiShield />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-muted small fw-medium mb-1">Email Address</label>
              <div className="position-relative">
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="iq-input"
                  style={{ paddingLeft: "42px" }}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <FiMail 
                  className="position-absolute" 
                  style={{ left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} 
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label text-muted small fw-medium mb-1">Password</label>
              <div className="position-relative">
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="iq-input"
                  style={{ paddingLeft: "42px" }}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <FiLock 
                  className="position-absolute" 
                  style={{ left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} 
                />
              </div>
            </div>

            <button
              type="submit"
              className="iq-btn-primary w-100 py-3"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <FiArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-4 pt-3 border-top border-secondary border-opacity-25 text-center">
            <p className="text-muted small mb-0">
              Don't have an account?{" "}
              <Link to="/register" className="text-decoration-none fw-semibold" style={{ color: "var(--accent-primary)" }}>
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Security / Privacy badge */}
        <div className="text-center mt-4">
          <span className="badge rounded-pill text-muted px-3 py-2" style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--border-subtle)", fontSize: "0.75rem" }}>
            🔒 End-to-End User Data Isolation & JWT Encrypted
          </span>
        </div>

      </div>
    </div>
  );
}

export default Login;