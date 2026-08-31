import { useState } from "react";
import API from "../services/api";
import { FiPlusCircle, FiDollarSign, FiTag, FiCalendar, FiEdit3 } from "react-icons/fi";

const CATEGORIES = [
  { id: "Food", label: "Food", icon: "🍔" },
  { id: "Transport", label: "Transport", icon: "🚗" },
  { id: "Shopping", label: "Shopping", icon: "🛍️" },
  { id: "Bills", label: "Bills", icon: "💡" },
  { id: "Entertainment", label: "Entertainment", icon: "🎬" },
  { id: "Health", label: "Health", icon: "🏥" },
  { id: "Other", label: "Other", icon: "📦" }
];

const PRESETS = [100, 500, 1000, 2000];

function ExpenseForm({ onExpenseAdded, showToast }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !amount || Number(amount) <= 0) {
      if (showToast) showToast("Please enter a valid title and amount", "error");
      return;
    }

    setLoading(true);

    try {
      await API.post("/expense/add", {
        title: title.trim(),
        amount: Number(amount),
        category,
        date
      });

      if (showToast) {
        showToast(`Added ₹${Number(amount).toLocaleString()} for ${title}`, "success");
      }

      setTitle("");
      setAmount("");
      setCategory("Food");
      setDate(new Date().toISOString().split("T")[0]);

      if (onExpenseAdded) {
        onExpenseAdded();
      }
    } catch (error) {
      console.error(error);
      if (showToast) {
        showToast(error.response?.data?.message || "Failed to add expense", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePresetAdd = (presetVal) => {
    const current = Number(amount) || 0;
    setAmount(String(current + presetVal));
  };

  return (
    <div className="iq-card p-4">
      <div className="d-flex align-items-center gap-2 mb-3">
        <FiPlusCircle className="text-emerald" style={{ color: "var(--accent-emerald)" }} size={20} />
        <h3 className="h6 fw-bold text-white mb-0">Record New Expense</h3>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-3">
          <label className="form-label text-muted small fw-medium mb-1">Expense Description</label>
          <div className="position-relative">
            <input
              type="text"
              placeholder="e.g. Grocery shopping, Uber ride..."
              className="iq-input"
              style={{ paddingLeft: "42px" }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <FiEdit3 
              className="position-absolute" 
              style={{ left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} 
            />
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-3">
          <label className="form-label text-muted small fw-medium mb-1">Amount (₹)</label>
          <div className="position-relative">
            <input
              type="number"
              step="any"
              placeholder="0.00"
              className="iq-input mono-number fw-semibold"
              style={{ paddingLeft: "42px", fontSize: "1.05rem" }}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="1"
            />
            <span 
              className="position-absolute fw-bold" 
              style={{ left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }}
            >
              ₹
            </span>
          </div>

          {/* Quick Preset Badges */}
          <div className="d-flex gap-2 mt-2 flex-wrap">
            <span className="text-muted small align-self-center" style={{ fontSize: "0.75rem" }}>Quick add:</span>
            {PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                className="btn btn-sm py-0 px-2 rounded-2"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-muted)",
                  fontSize: "0.75rem"
                }}
                onClick={() => handlePresetAdd(p)}
              >
                +₹{p}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills Selector */}
        <div className="mb-3">
          <label className="form-label text-muted small fw-medium mb-2 d-flex align-items-center gap-1">
            <FiTag size={14} />
            <span>Select Category</span>
          </label>
          <div className="d-flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`category-pill ${category === cat.id ? "active" : ""}`}
                onClick={() => setCategory(cat.id)}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Date Input */}
        <div className="mb-4">
          <label className="form-label text-muted small fw-medium mb-1 d-flex align-items-center gap-1">
            <FiCalendar size={14} />
            <span>Transaction Date</span>
          </label>
          <input
            type="date"
            className="iq-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="iq-btn-primary w-100 py-3"
          disabled={loading}
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          ) : (
            <>
              <FiPlusCircle size={18} />
              <span>Add Expense Record</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;