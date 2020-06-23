import React, { useContext } from "react";
import { Text } from "grommet";
import { GlobalContext } from "../GlobalState.js/context";

const Expense = () => {
  const { state } = useContext(GlobalContext);
  const amount = state
    .filter((item) => item.dealType === "Expenses")
    .map((item) => item.dealAmount)
    .reduce((acc, curr) => (acc += curr), 0);
  const expenseAmount = () => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <Text color="red" textAlign="center" size="large">
      ${expenseAmount()}
    </Text>
  );
};

export default Expense;
