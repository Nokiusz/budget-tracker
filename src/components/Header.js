import React, { useContext, useEffect } from "react";

import { GlobalContext } from "../context/Context";

const Header = () => {
  const {
    transactionsData,
    incomeTotal,
    setIncomeTotal,
    expenseTotal,
    setExpenseTotal,
  } = useContext(GlobalContext);

  return (
    <div>
      <p>{incomeTotal}</p>
      <p>{expenseTotal}</p>
    </div>
  );
};

export default Header;
