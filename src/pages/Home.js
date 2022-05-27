import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import { GlobalContext } from "../context/Context";
import { List } from "../components";

const Home = () => {
  const { fetchData } = useContext(GlobalContext);
  const location = useLocation();

  // useEffect(() => {
  //   fetchData();
  // }, [location]);

  return (
    <div className="Home">
      <List />
    </div>
  );
};

export default Home;
