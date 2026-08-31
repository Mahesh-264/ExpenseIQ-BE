import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { FiPieChart } from "react-icons/fi";

const CATEGORY_COLORS = {
  Food: "#f59e0b",         // Amber
  Transport: "#06b6d4",    // Cyan
  Shopping: "#ec4899",     // Pink
  Bills: "#6366f1",        // Indigo
  Entertainment: "#8b5cf6",// Purple
  Health: "#10b981",       // Emerald
  Other: "#64748b"         // Slate
};

const DEFAULT_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#06b6d4", "#ec4899", "#8b5cf6", "#64748b"];

function ExpenseChart({ expenses = [], summary = {} }) {
  // Aggregate category totals
  const categoryTotals = {};
  let total = 0;

  expenses.forEach((expense) => {
    const cat = expense.category || "Other";
    const amt = Number(expense.amount || 0);
    categoryTotals[cat] = (categoryTotals[cat] || 0) + amt;
    total += amt;
  });

  const chartData = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
    percentage: total > 0 ? Math.round((categoryTotals[category] / total) * 100) : 0,
    color: CATEGORY_COLORS[category] || "#6366f1"
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div 
          className="p-3 rounded-3 shadow-lg"
          style={{
            background: "#0f172a",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#fff"
          }}
        >
          <div className="d-flex align-items-center gap-2 mb-1">
            <span 
              className="rounded-circle d-inline-block" 
              style={{ width: "10px", height: "10px", backgroundColor: data.color }}
            />
            <span className="fw-semibold">{data.name}</span>
          </div>
          <div className="h5 fw-bold mono-number mb-0 text-white">
            ₹{Number(data.value).toLocaleString()}
          </div>
          <span className="small text-muted">{data.percentage}% of total expenses</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="iq-card p-4 h-100">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-2">
          <FiPieChart className="text-primary" size={20} />
          <h3 className="h6 fw-bold text-white mb-0">Expense Distribution</h3>
        </div>
        <span className="text-muted small">
          {expenses.length} {expenses.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {chartData.length === 0 ? (
        <div className="d-flex flex-column align-items-center justify-content-center py-5 text-center">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center mb-3"
            style={{ width: "64px", height: "64px", background: "rgba(255, 255, 255, 0.04)" }}
          >
            <FiPieChart size={30} className="text-muted" />
          </div>
          <p className="text-muted small mb-0">No expense records found.</p>
          <span className="text-dim small">Add an expense to view breakdown analytics</span>
        </div>
      ) : (
        <div>
          <div style={{ height: "240px", position: "relative" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Centered Donut Stat */}
            <div 
              className="position-absolute text-center"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none"
              }}
            >
              <span className="text-muted" style={{ fontSize: "0.72rem", textTransform: "uppercase" }}>Total</span>
              <div className="fw-bold mono-number text-white" style={{ fontSize: "1rem" }}>
                ₹{total > 99999 ? `${(total / 1000).toFixed(1)}k` : total.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Category Progress Bars */}
          <div className="mt-4 pt-3 border-top border-secondary border-opacity-10 d-flex flex-column gap-3">
            {chartData.map((item) => (
              <div key={item.name}>
                <div className="d-flex justify-content-between align-items-center mb-1 small">
                  <div className="d-flex align-items-center gap-2">
                    <span 
                      className="rounded-circle d-inline-block" 
                      style={{ width: "8px", height: "8px", backgroundColor: item.color }}
                    />
                    <span className="text-white fw-medium">{item.name}</span>
                  </div>
                  <div className="mono-number text-muted">
                    <span className="text-white fw-semibold">₹{item.value.toLocaleString()}</span>
                    <span className="ms-2 opacity-75">({item.percentage}%)</span>
                  </div>
                </div>
                <div 
                  className="w-100 rounded-pill overflow-hidden" 
                  style={{ height: "6px", background: "rgba(255, 255, 255, 0.06)" }}
                >
                  <div 
                    className="h-100 rounded-pill transition-all"
                    style={{ 
                      width: `${item.percentage}%`, 
                      backgroundColor: item.color,
                      transition: "width 0.6s ease"
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseChart;