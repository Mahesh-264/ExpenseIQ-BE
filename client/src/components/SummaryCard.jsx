function SummaryCard({ title, value }) {
  return (
    <div className="glass-card text-center h-100 summary-number">
      <h5>{title}</h5>
      <h2>{value}</h2>
    </div>
  );
}

export default SummaryCard;