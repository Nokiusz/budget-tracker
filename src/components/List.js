import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { List as ListAnt, Tag } from "antd";
import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import { GlobalContext } from "../context/Context";

import "antd/dist/antd.css";
import "antd/dist/antd.less";


const List = () => {
  const { transactionsData, showValues, setTransactionsData, BASE_URL } = useContext(GlobalContext);
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

useEffect(() => {
  
}, []);

  const handleDelete = (item) => {
    console.log(item.id);
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${BASE_URL}/transactions/${item.id}`, options)
    const newData = transactionsData.filter((transaction) => (transaction.id !== item.id));
    setTransactionsData(newData);
  };
  
  const handleEdit = (item) => {
    navigate(`/edit/${item.id}`);
  };

  return (
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
            title={showValues ? `${item.value} | ${item.date}` : `??? | ${item.date}`} 
                            
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
            <DeleteOutlined key="delete" onClick={() => handleDelete(item)} />
          </div>
        </ListAnt.Item>
      )}
    />
  );
};

export default List;
