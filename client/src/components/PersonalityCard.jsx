import React from "react";
import { FiCpu, FiAlertCircle, FiTrendingUp, FiCheckCircle } from "react-icons/fi";

function PersonalityCard({ personality, prediction }) {
  const getPersonaTheme = (name = "") => {
    switch (name.toLowerCase()) {
      case "foodie":
        return { color: "#f59e0b", bg: "rgba(245, 158, 11, 0.12)", tip: "Consider cooking at home 2-3 times a week to save up to 25% on meal costs!" };
      case "shopaholic":
        return { color: "#ec4899", bg: "rgba(236, 72, 153, 0.12)", tip: "Try implementing a 48-hour cooling rule before discretionary purchases." };
      case "commuter":
      case "traveler":
        return { color: "#06b6d4", bg: "rgba(6, 182, 212, 0.12)", tip: "Look for monthly transit passes or carpool options to trim travel expenses." };
      case "fun lover":
        return { color: "#8b5cf6", bg: "rgba(139, 92, 246, 0.12)", tip: "Look out for group passes and early bird discounts for events and movies." };
      case "smart saver":
        return { color: "#10b981", bg: "rgba(16, 185, 129, 0.12)", tip: "Great financial discipline! Consider investing your surplus in index funds." };
      default:
        return { color: "#6366f1", bg: "rgba(99, 102, 241, 0.12)", tip: "Keep categorizing your expenses to keep track of spending trends." };
    }
  };

  const theme = getPersonaTheme(personality?.personality);

  return (
    <div 
      className="iq-card p-4 position-relative overflow-hidden mb-4"
      style={{
        background: `linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8))`,
        border: `1px solid rgba(255, 255, 255, 0.1)`
      }}
    >
      <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
        <div className="d-flex align-items-center gap-2">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "32px", height: "32px", background: theme.bg, color: theme.color }}
          >
            <FiCpu size={18} />
          </div>
          <span className="text-muted small text-uppercase fw-semibold">AI Spending Persona & Predictive Forecast</span>
        </div>
        <span className="iq-badge iq-badge-purple">
          ✨ Powered by ExpenseIQ Intelligence
        </span>
      </div>

      <div className="row align-items-center g-4">
        <div className="col-lg-7 col-md-12">
          <div className="d-flex align-items-center gap-3 mb-2">
            <span style={{ fontSize: "2rem" }}>{personality?.badge || "🧠"}</span>
            <div>
              <h4 className="h4 fw-bold text-white mb-0">{personality?.personality || "Smart Analyst"}</h4>
              <p className="text-muted small mb-0">{personality?.reason || "Tracking your financial habits"}</p>
            </div>
          </div>

          <div 
            className="p-3 rounded-3 mt-3 d-flex align-items-start gap-2"
            style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--border-subtle)" }}
          >
            <FiCheckCircle style={{ color: theme.color, marginTop: "2px", flexShrink: 0 }} />
            <p className="small text-muted mb-0">
              <strong className="text-white">AI Advice:</strong> {theme.tip}
            </p>
          </div>
        </div>

        <div className="col-lg-5 col-md-12">
          <div 
            className="p-3 rounded-3"
            style={{ 
              background: "rgba(6, 182, 212, 0.08)", 
              border: "1px solid rgba(6, 182, 212, 0.2)" 
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="text-cyan small fw-medium" style={{ color: "#67e8f9" }}>3-Month Projected Spend</span>
              <FiTrendingUp style={{ color: "#67e8f9" }} />
            </div>
            <div className="h3 fw-bold text-white mono-number mb-1">
              ₹{Number(prediction?.threeMonthPrediction || 0).toLocaleString()}
            </div>
            <p className="text-muted small mb-0" style={{ fontSize: "0.78rem" }}>
              {prediction?.message || "Estimated future velocity based on active logs."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalityCard;