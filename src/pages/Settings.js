import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch } from "antd";
import React from "react";
import { useContext } from "react";

import { GlobalContext } from "../context/Context";

import "../css/Settings.css";

const Settings = () => {
  const { showValues, setShowValues, toggleTheme } =
    useContext(GlobalContext);

  const toggleShowValues = (isChecked) => {
    localStorage.setItem("showValues", isChecked);
    setShowValues(isChecked);
  };

  return (
    <div className="Settings">
      <div className="radio-btns">
        Dark Mode
        <Switch checked={JSON.parse(localStorage.getItem("darkMode"))} onChange={toggleTheme}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
        Show values
        <Switch checked={JSON.parse(localStorage.getItem("showValues"))} onChange={toggleShowValues}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />


      </div>
    </div >
  );
};

export default Settings;
