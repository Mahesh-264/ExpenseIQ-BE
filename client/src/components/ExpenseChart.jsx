import { useEffect, useState } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function ExpenseChart() {

  const [data, setData] = useState([]);

  const COLORS = [
    "#00b4d8",
    "#0077b6",
    "#90e0ef",
    "#48cae4",
    "#023e8a"
  ];

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/expense/all"
      );

      const categoryTotals = {};

      res.data.forEach((expense) => {

        if (!categoryTotals[expense.category]) {
          categoryTotals[expense.category] = 0;
        }

        categoryTotals[expense.category] += expense.amount;

      });

      const chartData = Object.keys(
        categoryTotals
      ).map((category) => ({
        name: category,
        value: categoryTotals[category]
      }));

      setData(chartData);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="glass-card mt-4">

      <h2 className="mb-4">
        📊 Expense Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={120}
            label
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />

            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );
}

export default ExpenseChart;