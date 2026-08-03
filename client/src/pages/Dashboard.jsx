import { useEffect, useState } from "react";
import axios from "axios";
import SummaryCard from "../components/SummaryCard";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import PersonalityCard from "../components/PersonalityCard";

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [summary, setSummary] = useState({
    totalExpenses: 0,
    totalTransactions: 0,
    topCategory: "None"
  });

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/expense/summary"
      );

      setSummary(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const handleLogout = () => {

    localStorage.clear();

    window.location.href = "/";

  };

  return (

    <div className="container py-5">

      <div className="glass-card dashboard-header mb-5">

        <div
          className="d-flex justify-content-between align-items-center"
          style={{ position: "relative", zIndex: 10 }}
        >

          <div>

            <h1>
              👋 Welcome, {user?.name}
            </h1>

            <p>
              Smart Expense Analytics Dashboard
            </p>

          </div>

          <button
            type="button"
            className="btn btn-danger"
            onClick={handleLogout}
            style={{
              zIndex: 9999,
              position: "relative"
            }}
          >
            Logout
          </button>

        </div>

      </div>

      <div className="row">

        <div className="col-md-4 mb-4">

          <div className="glass-card summary-card">

            <SummaryCard
              title="Total Expenses"
              value={`₹${summary.totalExpenses}`}
            />

          </div>

        </div>

        <div className="col-md-4 mb-4">

          <div className="glass-card summary-card">

            <SummaryCard
              title="Transactions"
              value={summary.totalTransactions}
            />

          </div>

        </div>

        <div className="col-md-4 mb-4">

          <div className="glass-card summary-card">

            <SummaryCard
              title="Money Leak"
              value={summary.topCategory}
            />

          </div>

        </div>

      </div>

      <div className="glass-card expense-form-card">

        <ExpenseForm />
            <ExpenseList />
            <ExpenseChart />
            <PersonalityCard />
      </div>

    </div>

  );
}

export default Dashboard;