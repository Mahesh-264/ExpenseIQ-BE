import { useEffect, useState } from "react";
import axios from "axios";

function ExpenseList() {

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/expense/all"
      );

      setExpenses(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const deleteExpense = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/expense/delete/${id}`
      );

      fetchExpenses();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="glass-card mt-4">

      <h2 className="mb-4">
        📋 Recent Expenses
      </h2>

      <div className="table-responsive">

        <table className="table table-dark table-hover">

          <thead>

            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {expenses.map((expense) => (

              <tr key={expense._id}>

                <td>{expense.title}</td>

                <td>₹{expense.amount}</td>

                <td>{expense.category}</td>

                <td>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      deleteExpense(expense._id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default ExpenseList;