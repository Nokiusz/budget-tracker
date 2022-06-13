import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, message, notification, PageHeader, Select, Upload } from "antd";
import ImgCrop from 'antd-img-crop';
import React, { useContext, useState, useEffect } from "react";

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
    fetchData,
    lastTransactionID,
    fetchLastTransactionID,
    BASE_URL,
  } = useContext(GlobalContext);
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Transaction added",
      description: "",
    });
  };

  useEffect(() => {
    fetchLastTransactionID();

  }, []);
  console.log('last', lastTransactionID)
  const onFinish = async (values) => {
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
    callApi(options)

    openNotificationWithIcon("success");
  };

  const callApi = async (trOpt) => {
    const optionsAtt = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: fileList[0].thumbUrl,
        transactionId: lastTransactionID[0].id + 1,
      }),
    };
    const trReq = await fetch(`${BASE_URL}/transactions`, trOpt)
    const attReq = await fetch(`${BASE_URL}/attachments`, optionsAtt)
  };

  const sendFile = async () => {


  }

  const onReset = () => {
    form.resetFields();
  };

  const onDateChange = (date, dateString) => {
    console.log(dateString);
  };

  const dummyRequest = async ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  }

  const getAttachmentFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList[0];
  };

  const [fileList, setFileList] = useState([
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(newFileList)
  };


  return (
    <div className="Add">
      <PageHeader
        className="site-page-header"
        onBack={() => window.history.back()}
        title="Add transaction"
        subTitle={null}
      />



      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="value"
          label="Value"
          rules={[
            { required: true, message: "Value is required" },
            {
              pattern: /^(?!0\d)\d*(\.\d+)?$/gm,
              message: "Value must be a positive number",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Category is required" }]}
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
          rules={[{ required: true, message: "Currency is required" }]}
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
          rules={[{ required: true, message: "Type is required" }]}
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
          rules={[{ required: true, message: "Priority is required" }]}
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
          rules={[{ required: true, message: "Date is required" }]}
        >
          <DatePicker format={dateFormat} onChange={onDateChange} />
        </Form.Item>
        <Form.Item
          name="attachment"
          getValueFromEvent={getAttachmentFile}
        >
          <ImgCrop rotate>
            <Upload
              accept='image/png'
              customRequest={dummyRequest}
              listType="picture-card"
              className="avatar-uploader"
              onChange={onChange}
            >

              {(fileList) && fileList.length !== 1 && '+ Upload'}

            </Upload>
          </ImgCrop>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <div className="buttons-add">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Add;
