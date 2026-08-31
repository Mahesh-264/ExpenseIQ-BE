import React from "react";

function SummaryCard({ title, value, subtitle, icon: Icon, badgeText, badgeType = "primary" }) {
  return (
    <div className="iq-card h-100 d-flex flex-column justify-content-between p-4">
      <div className="d-flex align-items-start justify-content-between mb-3">
        <div>
          <span className="text-muted small fw-medium text-uppercase tracking-wider">{title}</span>
          <h3 className="h2 fw-bold text-white mt-1 mb-0 mono-number">{value}</h3>
        </div>
        {Icon && (
          <div 
            className="d-flex align-items-center justify-content-center rounded-3 p-3"
            style={{
              background: badgeType === "rose" ? "var(--accent-rose-light)" 
                        : badgeType === "emerald" ? "var(--accent-emerald-light)"
                        : badgeType === "amber" ? "var(--accent-amber-light)"
                        : badgeType === "cyan" ? "var(--accent-cyan-light)"
                        : "var(--accent-primary-light)",
              color: badgeType === "rose" ? "var(--accent-rose)" 
                   : badgeType === "emerald" ? "var(--accent-emerald)"
                   : badgeType === "amber" ? "var(--accent-amber)"
                   : badgeType === "cyan" ? "var(--accent-cyan)"
                   : "var(--accent-primary)",
              border: `1px solid rgba(255,255,255,0.06)`
            }}
          >
            <Icon size={22} />
          </div>
        )}
      </div>

      <div className="d-flex align-items-center justify-content-between pt-2 border-top border-secondary border-opacity-10 mt-auto">
        <span className="text-muted small">{subtitle}</span>
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