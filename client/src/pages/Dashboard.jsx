import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import SummaryCard from "../components/SummaryCard";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import PersonalityCard from "../components/PersonalityCard";
import GoalTracker from "../components/GoalTracker";
import { 
  FiDollarSign, 
  FiTrendingDown, 
  FiAlertTriangle, 
  FiActivity, 
  FiLogOut, 
  FiUser, 
  FiTrendingUp,
  FiRefreshCw,
  FiCheckCircle,
  FiXCircle
} from "react-icons/fi";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({
    totalExpenses: 0,
    totalTransactions: 0,
    topCategory: "None"
  });
  const [moneyLeak, setMoneyLeak] = useState({
    highestCategory: "None",
    amount: 0,
    message: ""
  });
  const [personality, setPersonality] = useState({
    personality: "Smart Saver",
    badge: "🌱",
    reason: ""
  });
  const [prediction, setPrediction] = useState({
    monthlySpendRate: 0,
    nextMonthPrediction: 0,
    threeMonthPrediction: 0,
    message: ""
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Add a toast notification
  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Load user from storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Fetch all dashboard data
  const fetchDashboardData = useCallback(async (isSilent = false) => {
    if (!isSilent) setRefreshing(true);
    try {
      const [expRes, sumRes, leakRes, personRes, predRes] = await Promise.all([
        API.get("/expense/all"),
        API.get("/expense/summary"),
        API.get("/expense/moneyleak"),
        API.get("/expense/personality"),
        API.get("/expense/prediction")
      ]);

      setExpenses(expRes.data || []);
      setSummary(sumRes.data || {});
      setMoneyLeak(leakRes.data || {});
      setPersonality(personRes.data || {});
      setPrediction(predRes.data || {});
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData(false);
  }, [fetchDashboardData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const getInitials = (name = "User") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="app-layout py-4 px-3 px-md-4">
      {/* Toast Notification Container */}
      <div className="iq-toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`iq-toast ${t.type}`}>
            {t.type === "success" ? (
              <FiCheckCircle style={{ color: "var(--accent-emerald)" }} size={18} />
            ) : (
              <FiXCircle style={{ color: "var(--accent-rose)" }} size={18} />
            )}
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      <div className="container-fluid" style={{ maxWidth: "1400px" }}>
        
        {/* Navigation Header */}
        <header className="iq-card p-3 p-md-4 mb-4">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            
            {/* Brand & Greeting */}
            <div className="d-flex align-items-center gap-3">
              <div 
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: "46px",
                  height: "46px",
                  background: "linear-gradient(135deg, #6366f1, #3b82f6)",
                  boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)",
                  color: "#fff"
                }}
              >
                <FiTrendingUp size={24} />
              </div>
              <div>
                <div className="d-flex align-items-center gap-2">
                  <h1 className="h4 fw-bold text-white mb-0">
                    Welcome back, {user?.name || "Member"}!
                  </h1>
                  <span className="badge rounded-pill bg-success bg-opacity-25 text-success border border-success border-opacity-25 px-2 py-1" style={{ fontSize: "0.75rem" }}>
                    Live
                  </span>
                </div>
                <p className="text-muted small mb-0">
                  {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })} • Personalized Analytics
                </p>
              </div>
            </div>

            {/* User Profile & Actions */}
            <div className="d-flex align-items-center gap-3">
              <button
                type="button"
                className="iq-btn-secondary py-2 px-3"
                onClick={() => fetchDashboardData(false)}
                disabled={refreshing}
                title="Refresh dashboard data"
              >
                <FiRefreshCw className={refreshing ? "spin-animation" : ""} size={16} />
                <span className="d-none d-sm-inline">Refresh</span>
              </button>

              <div className="d-flex align-items-center gap-2 px-3 py-1 rounded-pill" style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid var(--border-subtle)" }}>
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white"
                  style={{ width: "32px", height: "32px", background: "linear-gradient(135deg, #8b5cf6, #ec4899)", fontSize: "0.85rem" }}
                >
                  {getInitials(user?.name)}
                </div>
                <div className="d-none d-md-block text-start">
                  <div className="text-white fw-semibold small" style={{ lineHeight: 1.2 }}>{user?.name}</div>
                  <div className="text-muted" style={{ fontSize: "0.72rem" }}>{user?.email}</div>
                </div>
              </div>

              <button
                type="button"
                className="iq-btn-danger py-2 px-3"
                onClick={handleLogout}
              >
                <FiLogOut size={16} />
                <span className="d-none d-sm-inline">Logout</span>
              </button>
            </div>

          </div>
        </header>

        {/* 4-Card KPI Stat Row */}
        <div className="row g-3 mb-4 summary-stats-grid">
          <div className="col-12 col-sm-6 col-xl-3">
            <SummaryCard
              title="Total Outflow"
              value={`₹${Number(summary.totalExpenses || 0).toLocaleString()}`}
              subtitle="All-time personal spending"
              icon={FiDollarSign}
              badgeText="Logged Expenses"
              badgeType="primary"
            />
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <SummaryCard
              title="Transactions"
              value={summary.totalTransactions || 0}
              subtitle={
                summary.totalTransactions > 0 
                  ? `Avg ~₹${Math.round(summary.totalExpenses / summary.totalTransactions).toLocaleString()}/item`
                  : "0 items tracked"
              }
              icon={FiActivity}
              badgeText="Active Records"
              badgeType="cyan"
            />
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <SummaryCard
              title="Biggest Money Leak"
              value={moneyLeak.highestCategory || "None"}
              subtitle={
                moneyLeak.amount > 0 
                  ? `₹${Number(moneyLeak.amount).toLocaleString()} spent here` 
                  : "No high category detected"
              }
              icon={FiAlertTriangle}
              badgeText={moneyLeak.highestCategory !== "None" ? "High Impact" : "Optimal"}
              badgeType={moneyLeak.highestCategory !== "None" ? "rose" : "emerald"}
            />
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <SummaryCard
              title="3-Month Forecast"
              value={`₹${Number(prediction.threeMonthPrediction || 0).toLocaleString()}`}
              subtitle="Estimated future velocity"
              icon={FiTrendingDown}
              badgeText="AI Projection"
              badgeType="amber"
            />
          </div>
        </div>

        {/* AI Personality & Forecast Spotlight Banner */}
        <PersonalityCard personality={personality} prediction={prediction} />

        {/* Main Dashboard Layout (Two-Column Responsive Grid) */}
        <div className="row g-4 dashboard-grid">
          
          {/* Left Column (Visual Analytics & Transaction History) */}
          <div className="col-lg-7 col-xl-8 d-flex flex-column gap-4">
            {/* Visual Analytics Chart */}
            <ExpenseChart expenses={expenses} summary={summary} />

            {/* Filterable Transactions Ledger */}
            <ExpenseList
              expenses={expenses}
              onExpenseDeleted={() => fetchDashboardData(true)}
              showToast={showToast}
            />
          </div>

          {/* Right Column (Quick Actions & Goals) */}
          <div className="col-lg-5 col-xl-4 d-flex flex-column gap-4">
            {/* Quick Add Expense Form */}
            <ExpenseForm
              onExpenseAdded={() => fetchDashboardData(true)}
              showToast={showToast}
            />

            {/* Savings Goals Tracker */}
            <GoalTracker showToast={showToast} />
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;