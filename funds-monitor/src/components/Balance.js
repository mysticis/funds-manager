import React, { useContext } from "react";
import { Heading } from "grommet";

import { GlobalContext } from "../GlobalState.js/context";

const Balance = () => {
  const { state } = useContext(GlobalContext);
  const incomeAmount = state
    .filter((item) => item.dealType === "Income")
    .map((item) => item.dealAmount)
    .reduce((acc, curr) => (acc += curr), 0);
  const expenseAmount = state
    .filter((item) => item.dealType === "Expenses")
    .map((item) => item.dealAmount)
    .reduce((acc, curr) => (acc += curr), 0);
  const balance = incomeAmount - expenseAmount;
  const totalBalance = () => {
    return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <Heading
      responsive
      level="2"
      color={balance < 0 ? "red" : "green"}
      textAlign="center"
      margin="none"
    >
      ${totalBalance()}
    </Heading>
  );
};

export default Balance;
