import { Button, PageHeader, Radio } from "antd";
import React, { useContext } from "react";
import { GlobalContext } from "../context/Context";
import { RedoOutlined } from "@ant-design/icons";
const Filters = () => {
  const { transactionsData, setTransactionsData } = useContext(GlobalContext);

  const sortValues = (e) => {
    const value = e.target.value;
    console.log(value);
    let sortedTransactionsData;
    if (value === "asc") {
      sortedTransactionsData = transactionsData.sort((a, b) => {
        return a.value - b.value;
      });
    }
    if (value === "dsc") {
      sortedTransactionsData = transactionsData.sort((a, b) => {
        return b.value - a.value;
      });
    }
    console.log(sortedTransactionsData);

    setTransactionsData(sortedTransactionsData);
  };

  const convertDateString = (dateString) => {
    const date = dateString.split("-");
    const year = date[2];
    const month = date[1];
    const day = date[0];
    return `${year}-${month}-${day}`;
  };

  const sortDates = (e) => {
    const value = e.target.value;
    console.log(value);
    let sortedTransactionsData;
    if (value === "asc") {
      sortedTransactionsData = transactionsData.sort((a, b) => {
        return (
          new Date(convertDateString(a.date)) -
          new Date(convertDateString(b.date))
        );
      });
    }
    if (value === "dsc") {
      sortedTransactionsData = transactionsData.sort((a, b) => {
        console.log(b.date, new Date(b.date));
        return (
          new Date(convertDateString(b.date)) -
          new Date(convertDateString(a.date))
        );
      });
    }
    console.log(sortedTransactionsData);

    setTransactionsData(sortedTransactionsData);
  };

  const showOnly = (e) => {
    const value = e.target.value;
    console.log(value);
    let filteredTransactionsData;
    if (value === "expense") {
      filteredTransactionsData = transactionsData.filter((item) => {
        return item.type === "expense";
      });
    }
    if (value === "income") {
      filteredTransactionsData = transactionsData.filter((item) => {
        return item.type === "income";
      });
    }
    console.log(filteredTransactionsData);

    setTransactionsData(filteredTransactionsData);
  };
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="Filters">
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title={`Filters`}
          subTitle={
            <Button
              onClick={handleReload}
              shape="circle"
              icon={<RedoOutlined />}
            />
          }
        />
      </div>
      <div>
        <p>Sort Transactions by:</p>
        <Radio.Group defaultValue="" buttonStyle="solid">
          <Radio.Button value="category">Category</Radio.Button>
          <Radio.Button value="priority">Priority</Radio.Button>
          <Radio.Button value="type">Type</Radio.Button>
          <Radio.Button value="currency">Currency</Radio.Button>
        </Radio.Group>
      </div>
      <br />
      <div>
        <p>Sort By value:</p>
        <Radio.Group buttonStyle="solid" onChange={sortValues}>
          <Radio.Button value="asc">Ascending</Radio.Button>
          <Radio.Button value="dsc">Descending</Radio.Button>
        </Radio.Group>
      </div>
      <br />
      <div>
        <p>Sort By date:</p>
        <Radio.Group defaultValue="" buttonStyle="solid" onChange={sortDates}>
          <Radio.Button value="asc">Ascending</Radio.Button>
          <Radio.Button value="dsc">Descending</Radio.Button>
        </Radio.Group>
      </div>
      <br />
      <div>
        <p>Show only</p>
        <Radio.Group defaultValue="" buttonStyle="solid" onChange={showOnly}>
          <Radio.Button value="income">Income</Radio.Button>
          <Radio.Button value="expense">Expense</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );
};

export default Filters;
