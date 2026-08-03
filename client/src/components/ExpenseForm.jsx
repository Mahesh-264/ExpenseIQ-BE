import { useState } from "react";
import axios from "axios";

function ExpenseForm() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:5000/api/expense/add",
                {
                    userId: user.id,
                    title,
                    amount,
                    category
                }
            );

            alert("Expense Added");

            setTitle("");
            setAmount("");
            setCategory("");

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <div className="glass-card mt-4">

            <h3>Add Expense</h3>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Title"
                    className="form-control mb-3"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <input
                    type="number"
                    placeholder="Amount"
                    className="form-control mb-3"
                    value={amount}
                    onChange={(e) =>
                        setAmount(e.target.value)
                    }
                />

                <select
  className="form-control mb-3"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="">Select Category</option>

  <option value="Food">🍔 Food</option>

  <option value="Transport">
    🚗 Transport
  </option>

  <option value="Shopping">
    🛒 Shopping
  </option>

  <option value="Bills">
    💡 Bills
  </option>

  <option value="Entertainment">
    🎬 Entertainment
  </option>

  <option value="Health">
    🏥 Health
  </option>

  <option value="Other">
    📦 Other
  </option>
</select>

                <button
                    className="btn btn-light w-100"
                >
                    Add Expense
                </button>

            </form>

        </div>
    );
}

export default ExpenseForm;