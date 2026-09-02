import React from "react";

function SummaryCard({ title, value, subtitle, icon: Icon, badgeText, badgeType = "primary" }) {
  const iconColorMap = {
    rose: { bg: "var(--accent-rose-light)", fg: "var(--accent-rose)" },
    emerald: { bg: "var(--accent-emerald-light)", fg: "var(--accent-emerald)" },
    amber: { bg: "var(--accent-amber-light)", fg: "var(--accent-amber)" },
    cyan: { bg: "var(--accent-cyan-light)", fg: "var(--accent-cyan)" },
    primary: { bg: "var(--accent-primary-light)", fg: "var(--accent-primary)" },
  };
  const theme = iconColorMap[badgeType] || iconColorMap.primary;

  return (
    <div className="iq-card h-100 d-flex flex-column justify-content-between p-4">
      <div className="d-flex align-items-start justify-content-between mb-3">
        <div>
          {/* Title: explicit color so it's always visible */}
          <span
            style={{
              color: "#b0bec5",
              fontSize: "0.72rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              display: "block",
              marginBottom: "6px"
            }}
          >
            {title}
          </span>
          <h3 className="h2 fw-bold mt-1 mb-0 mono-number" style={{ color: "#f1f5f9" }}>
            {value}
          </h3>
        </div>

        {Icon && (
          <div
            className="d-flex align-items-center justify-content-center rounded-3 p-3"
            style={{
              background: theme.bg,
              color: theme.fg,
              border: "1px solid rgba(255,255,255,0.08)",
              flexShrink: 0
            }}
          >
            <Icon size={22} />
          </div>
        )}
      </div>

      <div className="d-flex align-items-center justify-content-between pt-2 mt-auto"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Subtitle: explicit visible color */}
        <span style={{ color: "#8899aa", fontSize: "0.82rem" }}>
          {subtitle}
        </span>
        {badgeText && (
          <span className={`iq-badge iq-badge-${badgeType}`}>
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}

export default SummaryCard;