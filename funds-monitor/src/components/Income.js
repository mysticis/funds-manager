import React, { useContext } from "react";
import { Text } from "grommet";
import { GlobalContext } from "../GlobalState.js/context";

const Income = () => {
  const { state } = useContext(GlobalContext);
  const amount = state
    .filter((item) => item.dealType === "Income")
    .map((item) => item.dealAmount)
    .reduce((acc, curr) => (acc += curr), 0);
  const incomeAmount = () => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <Text color="green" textAlign="center" size="large">
      ${incomeAmount()}
    </Text>
  );
};

export default Income;
