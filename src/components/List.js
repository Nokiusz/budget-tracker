import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  RedoOutlined,
  StopOutlined,
} from "@ant-design/icons";
import {
  List as ListAnt,
  Modal,
  PageHeader,
  Button,
  Tag,
  Affix,
  notification,
  Skeleton,
  Image,
} from "antd";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { GlobalContext } from "../context/Context";

const { confirm } = Modal;

const List = () => {
  const {
    transactionsData,
    showValues,
    setTransactionsData,
    isLoading,
    BASE_URL,
  } = useContext(GlobalContext);
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

  function showDeleteConfirmAtt(item) {
    confirm({
      title: "Are you sure delete this attachment?",
      icon: <DeleteOutlined />,
      content: `
      Attachment from
      id: ${item.id} 
      will be deleted permanently`,
      onOk() {
        deleteAttachment(item);
      },
      onCancel() {},
    });
  }

  const handleAddRedirect = () => {
    navigate("/add");
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Transaction deleted",
      description: "",
    });
  };

  const openNotificationWithIconAtt = (type) => {
    notification[type]({
      message: "Attachment deleted",
      description: "",
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

    openNotificationWithIconAtt("warning");
  };

  const handleEdit = (item) => {
    navigate(`/edit/${item.id}`);
  };

  const handleReload = () => {
    window.location.reload();
  };

  const deleteAttachment = (item) => {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${BASE_URL}/attachments/${item.id}`, options);
    const newData = transactionsData.filter(
      (transaction) => transaction.id !== item.attId
    );
    setTransactionsData(newData);

    openNotificationWithIcon("warning");
  }

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
      <Skeleton loading={isLoading}>
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
              <div className="rightSide">
                <div className="attachment">
                  {item.attUrl && (
                    <>
                      <StopOutlined onClick={()=>showDeleteConfirmAtt(item)}/>
                      <Image height={50} width={50} src={item.attUrl} />
                    </>
                  )}
                </div>

                <div className="actions">
                  <EditOutlined key="edit" onClick={() => handleEdit(item)} />
                  <DeleteOutlined
                    key="delete"
                    onClick={() => showDeleteConfirm(item)}
                  />
                </div>
              </div>
            </ListAnt.Item>
          )}
        />
      </Skeleton>
    </>
  );
};

export default List;
