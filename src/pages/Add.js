import { Button, DatePicker, Form, Input, Select } from "antd";
import React, { useContext } from "react";
import { GlobalContext } from "../context/Context";

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

const Add = () => {
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY";
  const {
    categoriesData,
    typesData,
    currenciesData,
    prioritiesData,
    BASE_URL,
  } = useContext(GlobalContext);

  const onFinish = async (values) => {
    console.log(values);
    const options = {
      method: "POST",
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

    await fetch(`${BASE_URL}/transactions`, options);
    onReset();
  };

  const onReset = () => {
    form.resetFields();
  };

  const onDateChange = (date, dateString) => {
    console.log(dateString);
  };

  return (
    <div className="Add">
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
          <Input />
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
          <Input />
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
          <Select placeholder="Select a category" allowClear>
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
          <Select placeholder="Select a currency" allowClear>
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
          <Select placeholder="Select a type" allowClear>
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
          <Select placeholder="Select a priority" allowClear>
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
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Add;
