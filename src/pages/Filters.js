import { PageHeader, Radio } from "antd";
import React from "react";

const Filters = () => {
  return (
    <div className="Filters">
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title={`Filters`}
          subTitle={null}
        />
      </div>
      <div>
        <p>Sort Transactions by:</p>
        <Radio.Group defaultValue="value" buttonStyle="solid">
          <Radio.Button value="value">Value</Radio.Button>
          <Radio.Button value="type">Type</Radio.Button>
          <Radio.Button value="category">Category</Radio.Button>
          <Radio.Button value="priority">Priority</Radio.Button>
        </Radio.Group>
      </div>
      <br />
      <div>
        <p>Sort direction:</p>
        <Radio.Group defaultValue="asc" buttonStyle="solid">
          <Radio.Button value="asc">Ascending</Radio.Button>
          <Radio.Button value="dsc">Descending</Radio.Button>
        </Radio.Group>
      </div>
      <br />
      <div>
        <p>Show only</p>
        <Radio.Group defaultValue="" buttonStyle="solid">
          <Radio.Button value="income">Income</Radio.Button>
          <Radio.Button value="expense">Expense</Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );
};

export default Filters;
