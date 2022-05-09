import React, { useEffect, useContext, useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/Context";
import { useNavigate } from "react-router-dom";
const Edit = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const dateFormat = "DD-MM-YYYY";
  const [isFetching, setIsFetching] = useState(true);
  const [transactionData, setTransactionData] = useState([]);
  const {
    BASE_URL,
    categoriesData,
    currenciesData,
    typesData,
    prioritiesData,
    fetchData,
  } = useContext(GlobalContext);

  const { Option } = Select;
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const onDateChange = (date, dateString) => {
    console.log(dateString);
  };

  const onFinish = async (values) => {
    console.log(values);
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: values.description,
        value: values.value,
        categoryId: values.category,
        currencyId: values.currency,
        typeId: values.type,
        priorityId: values.priority,
        date: values.date.format(dateFormat),
      }),
    };
    await fetch(`${BASE_URL}/transactions/${id}`, options);
    //await fetchData();
    navigate("/");
  };

  const fetchTransaction = async () => {
    const response = await fetch(`${BASE_URL}/transactions/list/${id}`);
    const data = await response.json();
    setTransactionData(data.rows);
    console.log("fetched", data.rows);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  useEffect(() => {
    console.log(transactionData);
  }, [transactionData]);

  return (
    <div>
      Edit transaction {id}
      <br />
      {/* if isFetching or transactionData is empty */}
      {isFetching ? (
        "loading"
      ) : (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder={transactionData[0].description} />
          </Form.Item>
          <Form.Item
            name="value"
            label="Value"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder={transactionData[0].value} />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select allowClear placeholder={transactionData[0].category}>
              {categoriesData.map((category, index) => {
                return (
                  <Option key={index} value={category.id}>
                    {category.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="currency"
            label="Currency"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder={transactionData[0].currency} allowClear>
              {currenciesData.map((currency, index) => {
                return (
                  <Option key={index} value={currency.id}>
                    {currency.name} ({currency.acronym})
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="type"
            label="Type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder={transactionData[0].type} allowClear>
              {typesData.map((type, index) => {
                return (
                  <Option key={index} value={type.id}>
                    {type.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="priority"
            label="Priority"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder={transactionData[0].priority} allowClear>
              {prioritiesData.map((priority, index) => {
                return (
                  <Option key={index} value={priority.id}>
                    {priority.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          {/* datepicker */}
          <Form.Item
            name="date"
            label="Date"
            type="date"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker format={dateFormat} onChange={onDateChange} />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default Edit;
