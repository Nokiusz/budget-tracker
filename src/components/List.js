import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { List as ListAnt, Modal, PageHeader, Button, Tag, Affix, notification } from "antd";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { GlobalContext } from "../context/Context";

const { confirm } = Modal;

const List = () => {
  const { transactionsData, showValues, setTransactionsData, BASE_URL } =
    useContext(GlobalContext);
  const defaultImgSrc = `${process.env.PUBLIC_URL}/img/categories/default.png`;
  const ImgSrc = `${process.env.PUBLIC_URL}/img/categories/`;
  let navigate = useNavigate();

  const getPriorityColor = (p) => {
    switch (p) {
      case "low":
        return "gold";

      case "medium":
        return "orange";

      case "high":
        return "orange";

      case "very high":
        return "red";

      default:
        return "cyan";
    }
  };

  function showDeleteConfirm(item) {
    confirm({
      title: "Are you sure delete this transaction?",
      icon: <DeleteOutlined />,
      content: `
      Transaction:
      id: ${item.id} ${item.description}
      will be deleted permanently`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(item);
      },
      onCancel() {},
    });
  }

  const handleAddRedirect = () => {
    navigate("/add");
  };

  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Transaction deleted',
      description:
        '',
    });
  };

  const handleDelete = (item) => {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${BASE_URL}/transactions/${item.id}`, options);
    const newData = transactionsData.filter(
      (transaction) => transaction.id !== item.id
    );
    setTransactionsData(newData);
    
    openNotificationWithIcon('warning')
  };

  const handleEdit = (item) => {
    navigate(`/edit/${item.id}`);
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        title={`Transactions`}
        subTitle={
          <Button
            className="add-button"
            onClick={handleReload}
            shape="circle"
            icon={<RedoOutlined />}
          />
        }
        extra={
          <Affix offsetTop={20}>
            <Button
              onClick={handleAddRedirect}
              shape="circle"
              icon={<PlusOutlined />}
            />
          </Affix>
        }
      />

      <ListAnt
        itemLayout="horizontal"
        dataSource={transactionsData}
        renderItem={(item) => (
          <ListAnt.Item actions={[]}>
            <ListAnt.Item.Meta
              avatar={
                <img
                  width={32}
                  height={32}
                  src={`${ImgSrc}${item.category}.png`}
                  alt={item.category}
                  onError={(event) => {
                    event.target.src = defaultImgSrc;
                    event.onerror = null;
                  }}
                />
              }
              title={
                showValues
                  ? `${item.value} | ${item.date}`
                  : ` ??? | ${item.date}`
              }
              description={
                <>
                  {item.description}
                  <br />
                  <Tag>{item.category}</Tag>
                  <br />
                  {item.priority !== "none" && (
                    <Tag color={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Tag>
                  )}

                  <Tag color={item.type === "expense" ? "red" : "green"}>
                    {item.type}
                  </Tag>
                </>
              }
            />

            <div className="actions">
              <EditOutlined key="edit" onClick={() => handleEdit(item)} />
              <DeleteOutlined
                key="delete"
                onClick={() => showDeleteConfirm(item)}
              />
            </div>
          </ListAnt.Item>
        )}
      />
    </>
  );
};

export default List;
