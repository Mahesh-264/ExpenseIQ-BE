import { useState } from "react";
import API from "../services/api";
import { FiTrash2, FiSearch, FiFilter, FiList, FiClock, FiCalendar } from "react-icons/fi";

const CATEGORY_MAP = {
  Food: { icon: "🍔", badgeClass: "iq-badge-amber" },
  Transport: { icon: "🚗", badgeClass: "iq-badge-cyan" },
  Shopping: { icon: "🛍️", badgeClass: "iq-badge-rose" },
  Bills: { icon: "💡", badgeClass: "iq-badge-primary" },
  Entertainment: { icon: "🎬", badgeClass: "iq-badge-purple" },
  Health: { icon: "🏥", badgeClass: "iq-badge-emerald" },
  Other: { icon: "📦", badgeClass: "iq-badge-primary" }
};

const CATEGORIES = ["All", "Food", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Other"];

function ExpenseList({ expenses = [], onExpenseDeleted, showToast }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    setDeletingId(id);
    try {
      await API.delete(`/expense/delete/${id}`);
      if (showToast) showToast(`Deleted "${title}"`, "success");
      if (onExpenseDeleted) onExpenseDeleted();
    } catch (error) {
      console.error(error);
      if (showToast) showToast("Failed to delete expense", "error");
    } finally {
      setDeletingId(null);
    }
  };

  // Filtered expenses
  const filtered = expenses.filter((item) => {
    const matchesSearch = (item.title || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="iq-card p-4">
      {/* Header & Search */}
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div className="d-flex align-items-center gap-2">
          <FiList className="text-primary" size={20} />
          <h3 className="h6 fw-bold mb-0" style={{ color: "#f1f5f9" }}>Transaction History</h3>
          <span className="badge rounded-pill px-2 py-1 ms-1" style={{ background: "rgba(255,255,255,0.08)", color: "#b0bec5", fontSize: "0.72rem" }}>
            {filtered.length}
          </span>
        </div>

        {/* Search Input */}
        <div className="position-relative" style={{ minWidth: "220px", maxWidth: "300px" }}>
          <input
            type="text"
            placeholder="Search description..."
            className="iq-input py-2"
            style={{ paddingLeft: "36px", fontSize: "0.85rem" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch 
            className="position-absolute" 
            style={{ left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }} 
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="d-flex gap-2 mb-4 overflow-auto pb-2" style={{ scrollbarWidth: "none" }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`category-pill py-1 px-3 ${selectedCategory === cat ? "active" : ""}`}
            style={{ fontSize: "0.8rem", whiteSpace: "nowrap", color: selectedCategory === cat ? "#a5b4fc" : "#b0bec5" }}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat !== "All" && CATEGORY_MAP[cat]?.icon} {cat}
          </button>
        ))}
      </div>

      {/* Transactions Table / List */}
      {filtered.length === 0 ? (
        <div className="text-center py-5">
          <div 
            className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
            style={{ width: "56px", height: "56px", background: "rgba(255, 255, 255, 0.04)" }}
          >
            <FiSearch size={24} className="text-muted" />
          </div>
          <h4 className="h6 text-white mb-1">No transactions found</h4>
          <p className="text-muted small mb-0">
            {expenses.length === 0 
              ? "You have not recorded any expenses yet. Start tracking above!" 
              : "No expenses match your search filter criteria."}
          </p>
        </div>
      ) : (
        <div className="iq-table-wrapper">
          <table className="iq-table">
            <thead>
              <tr>
                <th>Expense Item</th>
                <th>Category</th>
                <th>Date</th>
                <th className="text-end">Amount</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const catMeta = CATEGORY_MAP[item.category] || CATEGORY_MAP["Other"];
                return (
                  <tr key={item._id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: "38px",
                            height: "38px",
                            background: "rgba(255, 255, 255, 0.06)",
                            fontSize: "1.2rem",
                            flexShrink: 0
                          }}
                        >
                          {catMeta.icon}
                        </div>
                        <div>
                          <div className="fw-semibold text-white">{item.title}</div>
                          <div className="text-muted small d-md-none">{formatDate(item.date || item.createdAt)}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className={`iq-badge ${catMeta.badgeClass}`}>
                        {catMeta.icon} {item.category}
                      </span>
                    </td>

                    <td>
                      <span className="text-muted small d-flex align-items-center gap-1">
                        <FiCalendar size={13} />
                        {formatDate(item.date || item.createdAt)}
                      </span>
                    </td>

                    <td className="text-end">
                      <span className="mono-number fw-bold text-white fs-6">
                        -₹{Number(item.amount).toLocaleString()}
                      </span>
                    </td>

                    <td className="text-end">
                      <button
                        type="button"
                        className="iq-btn-danger"
                        onClick={() => handleDelete(item._id, item.title)}
                        disabled={deletingId === item._id}
                        title="Delete expense"
                      >
                        {deletingId === item._id ? (
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                          <>
                            <FiTrash2 size={14} />
                            <span className="d-none d-sm-inline">Delete</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ExpenseList;