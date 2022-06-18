import { DatePicker, PageHeader } from "antd";
import { Chart as ChartJS, registerables } from "chart.js";
import React, { useContext, useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";

import { GlobalContext } from "../context/Context";

const { RangePicker } = DatePicker;

ChartJS.register(...registerables);

const Charts = () => {
  const [dates, setDates] = useState([new Date().toISOString().slice(0, 10), new Date().toISOString().slice(0, 10)]);
  console.log(dates)
  const { incomeTotal, expenseTotal, transactionsData, categoriesData } =
    useContext(GlobalContext);


  const handleChange = (e) => {
    const startDate = e[0]._d.toLocaleDateString('en-GB').split('/').join('-');
    const endDate = e[1]._d.toLocaleDateString('en-GB').split('/').join('-');
    setDates([startDate, endDate])
  }
  const optionsPie1 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Income/Expense Ratio",
      },
    },
  };

  const optionsPie2 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Category income ratio",
      },
    },
  };

  const categoryColors = ['#FAAD14', '#CF1322', '#ff0000', '#000000', '#096DD9', '#4CAE50'
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
  let filteredTransactionsData

  useEffect(() => {
    const dateRange = transactionsData.map((item) => item.date).sort()
    if (dates[0] !== new Date().toISOString().slice(0, 10) && dates[1] !== new Date().toISOString().slice(0, 10)) {
      //create a new array with transactions that transactions date dateRange[0].date and dateRange[dateRange.lenght-1].date
      filteredTransactionsData = transactionsData.filter((item) => {
        if (dateRange[0].date <= item.date && dateRange[dateRange.lenght - 1].date >= item.date) {
          return item;
        }

      })

    }
  }, [dates]);
  console.log("filtered", filteredTransactionsData)


  const labels = dates[0] === new Date().toISOString().slice(0, 10) && dates[1] === new Date().toISOString().slice(0, 10) ? transactionsData.map((item) => item.date).sort() : transactionsData.map((item) => item.date).sort().filter((item) => {
    if (item >= dates[0] && item <= dates[1]) {
      return item;
    }
  }
  )


  console.log(labels)
  const dataLine = {
    labels: labels,
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



  return (
    <div className="Charts">
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        title={`Charts`}
        subTitle={null}
      />
      <Pie options={optionsPie1} data={dataPie} />
      <br />
      <Pie options={optionsPie2} data={dataCategoryPie} />
      <br />
      <RangePicker onChange={(e) => handleChange(e)} />
      <Line options={optionsLine} data={dataLine} />
    </div>
  );
};

export default Charts;
