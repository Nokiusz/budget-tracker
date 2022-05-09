import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/Context";
const Edit = () => {
  const { id } = useParams();
  const { transactionData, setTransactionData, fetchTransaction } =
    useContext(GlobalContext);

  useEffect(() => {
    fetchTransaction(id);
    console.log(transactionData);
  }, []);

  return (
    <div>
      Edit transaction id:
      {transactionData[0].id} {transactionData[0].category}{" "}
      {transactionData[0].value}
    </div>
  );
};

export default Edit;
