import { useState, useEffect } from "react";
import API from "../services/api";
import { FiTarget, FiPlus, FiCheckCircle } from "react-icons/fi";

function GoalTracker({ showToast }) {
  const [goals, setGoals] = useState([]);
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [monthlySaving, setMonthlySaving] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await API.get("/goal/all");
      setGoals(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    if (!goalName || !targetAmount || !monthlySaving) return;

    setLoading(true);
    try {
      const res = await API.post("/goal/create", {
        goalName,
        targetAmount: Number(targetAmount),
        monthlySaving: Number(monthlySaving)
      });

      if (showToast) {
        showToast(`Goal created! Target reached in ~${res.data.monthsRequired} months`, "success");
      }

      setGoalName("");
      setTargetAmount("");
      setMonthlySaving("");
      setShowAddForm(false);
      fetchGoals();
    } catch (err) {
      console.error(err);
      if (showToast) showToast("Failed to create goal", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="iq-card p-4 mt-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <FiTarget className="text-info" style={{ color: "var(--accent-cyan)" }} size={20} />
          <h3 className="h6 fw-bold text-white mb-0">Savings Goals Tracker</h3>
        </div>
        <button
          type="button"
          className="iq-btn-secondary py-1 px-3"
          style={{ fontSize: "0.8rem" }}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <FiPlus size={14} />
          <span>{showAddForm ? "Cancel" : "New Target"}</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreateGoal} className="p-3 mb-3 rounded-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-subtle)" }}>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Goal Name (e.g. Emergency Fund, New Laptop)"
              className="iq-input py-2"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              required
            />
          </div>
          <div className="row g-2 mb-3">
            <div className="col-6">
              <input
                type="number"
                placeholder="Target (₹)"
                className="iq-input py-2 mono-number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                required
              />
            </div>
            <div className="col-6">
              <input
                type="number"
                placeholder="Monthly Save (₹)"
                className="iq-input py-2 mono-number"
                value={monthlySaving}
                onChange={(e) => setMonthlySaving(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="iq-btn-primary w-100 py-2" style={{ fontSize: "0.88rem" }} disabled={loading}>
            {loading ? "Calculating..." : "Save Financial Target"}
          </button>
        </form>
      )}

      {goals.length === 0 ? (
        <div className="text-center py-3 text-muted small">
          No savings goals set. Create a target to track financial milestones!
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {goals.map((g) => {
            const months = Math.ceil(g.targetAmount / (g.monthlySaving || 1));
            return (
              <div key={g._id} className="p-3 rounded-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-subtle)" }}>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="fw-semibold text-white">{g.goalName}</span>
                  <span className="iq-badge iq-badge-cyan" style={{ fontSize: "0.75rem" }}>
                    ~{months} {months === 1 ? "month" : "months"} target
                  </span>
                </div>
                <div className="d-flex justify-content-between text-muted small mb-2">
                  <span>Target: ₹{Number(g.targetAmount).toLocaleString()}</span>
                  <span>Saving: ₹{Number(g.monthlySaving).toLocaleString()}/mo</span>
                </div>
                <div className="w-100 rounded-pill overflow-hidden" style={{ height: "6px", background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-100 rounded-pill" style={{ width: "40%", background: "linear-gradient(90deg, #06b6d4, #10b981)" }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default GoalTracker;
