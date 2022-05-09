import React, { useContext } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { GlobalContext } from "../context/Context";
Chart.register(ArcElement, Tooltip, Legend);

const Charts = () => {
  const { incomeTotal, setIncomeTotal, expenseTotal, setExpenseTotal } =
    useContext(GlobalContext);

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "sum of transactions",
        data: [incomeTotal, expenseTotal],
        backgroundColor: ["#00FF00", "#FF0000"],
        borderColor: ["#22CC22", "#CC2222"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="Charts">
      <Pie data={data} />
    </div>
  );
};

export default Charts;
