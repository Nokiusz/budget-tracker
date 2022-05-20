import { PageHeader } from "antd";
import { Chart as ChartJS, registerables } from "chart.js";
import React, { useContext, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";

import { GlobalContext } from "../context/Context";

ChartJS.register(...registerables);

const Charts = () => {
  const { incomeTotal, expenseTotal, transactionsData, categoriesData } =
    useContext(GlobalContext);

  const optionsPie = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Pie Chart",
      },
    },
  };

  const categoryColors = ['#FAAD14', '#CF1322', '#ff0000', '#000000','#096DD9', '#4CAE50'
  ];

//get total values of each category and push it to an array
  const categoryTotals = [];
  categoriesData.forEach((category) => {
    const categoryTotal = transactionsData.reduce(
      (acc, transaction) => {
        if (transaction.category === category.name) {
          return acc + transaction.value;
        } else {
          return acc;
        }
      },
      0
    );
    categoryTotals.push(categoryTotal);
  });

  const dataPie = {
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

  const dataCategoryPie = {
    labels: categoriesData.map((item) => item.name),
    datasets: [
      {
        label: "test",
        data: categoryTotals,
        backgroundColor: categoryColors,
        borderColor: categoryColors,
        borderWidth: 1,
      },
    ],
  };

  const optionsLine = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Line Chart",
      },
    },
  };

  const dataLine = {
    labels: transactionsData.map((item) => item.date),
    datasets: [
      {
        label: "Income",
        data: transactionsData.map((item) => {
          if (item.type === "income") return item.value;
        }),
        borderColor: "#22CC22",
        backgroundColor: "#00FF00",
      },
      {
        label: "Expense",
        data: transactionsData.map((item) => {
          if (item.type === "expense") return item.value;
        }),
        borderColor: "#CC2222",
        backgroundColor: "#FF0000",
      },
    ],
  };

  //

  return (
    <div className="Charts">
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        title={`Charts`}
        subTitle={null}
      />
      <Pie options={optionsPie} data={dataPie} />
      <br />
      <Pie options={optionsPie} data={dataCategoryPie} />
      <br />
      <Line options={optionsLine} data={dataLine} />
    </div>
  );
};

export default Charts;
