import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/Context";

import "../css/Settings.css";
import "../css/Toggle.css";

const Settings = () => {
  const { showValues, setShowValues, darkMode, setDarkMode } =
    useContext(GlobalContext);

  const handleChange = (e) => {
    console.log(e.target.checked);
    if (e.target.name === "showValues") {
      setShowValues(e.target.checked);
      localStorage.setItem("showValues", e.target.checked);
    }
    if (e.target.name === "darkMode") {
      setDarkMode(e.target.checked);
      localStorage.setItem("darkMode", e.target.checked);
    }
  };

  return (
    <div className="Settings">
      <div className="radio-btns">
        Dark Mode
        <label className="switch">
          <input
            name="darkMode"
            type="checkbox"
            checked={darkMode}
            onChange={(e) => handleChange(e)}
          />

          <span className="slider"></span>
        </label>
        Show values
        <label className="switch">
          <input
            name="showValues"
            type="checkbox"
            checked={showValues}
            onChange={(e) => handleChange(e)}
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
};

export default Settings;
