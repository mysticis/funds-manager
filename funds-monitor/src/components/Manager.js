import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../GlobalState.js/context";
import Income from "./Income";
import Expense from "./Expense";
import Balance from "./Balance";
import {
  Grommet,
  Box,
  Button,
  Text,
  Heading,
  FormField,
  TextInput,
  Select,
  Form,
  List,
} from "grommet";
const theme = {
  global: {
    font: {
      family: "Marvel",
      size: "18px",
      // height: "20px",
    },
  },
};
//const boxHeight = { height: "120rem" };
const AppBar = (props) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: "1" }}
    {...props}
  />
);

const Manager = () => {
  const { state, initializeState, createTransaction } = useContext(
    GlobalContext
  );
  const formatDate = (date) => {
    let d = date.toString().split(/-|:|T|\./);
    let f = new Date(Date.UTC(d[0], d[1], d[2], d[3], d[4], d[5]));
    return f.toLocaleString();
  };
  const history = state.map((item) => {
    return {
      dealType: item.dealType,
      dealText: item.dealText,
      dealAmount: item.dealAmount,
      date: formatDate(item.date),
      id: item.id,
    };
  });
  const [type, setType] = useState("");
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState(0);
  //const [data, setData] = useState(state);
  useEffect(() => {
    initializeState();
  }, []);
  return (
    <Grommet theme={theme}>
      <AppBar>
        <Heading level="4" margin="none">
          Funds Manager
        </Heading>
      </AppBar>
      {/*First Box - Container*/}
      <Box
        direction="row-responsive"
        justify="center"
        align="center"
        pad="large"
        background="dark-2"
        gap="medium"
        fill={true}
      >
        {/*First Box in Row - Balance, Income & Expenditure Details*/}
        <Box
          //pad="small"
          align="center"
          background="dark-1"
          round
          gap="medium"
          width="medium"
          height="medium"
        >
          {/*Balance Section Box Starts */}
          <Box direction="column" responsive margin="small">
            <Heading color="accent-3" responsive level="2" textAlign="center">
              Balance
            </Heading>
            <Balance />
          </Box>
          {/*End of Balance Section Box*/}
          {/* Start Details Box - Income & Expenditure*/}
          <Box direction="row-responsive" pad="small" round gap="small" flex>
            <Box direction="column" pad="small" margin="small" responsive>
              <Heading
                color="green"
                // margin="small"
                level={3}
                textAlign="center"
                responsive
              >
                Income
              </Heading>
              <Income />
            </Box>
            <Box direction="column" pad="small" margin="small" responsive>
              <Heading color="red" level={3} textAlign="center" responsive>
                Expenses
              </Heading>
              <Expense />
            </Box>
          </Box>
        </Box>
        {/*End of First Box in Row */}
        <Box
          pad="small"
          align="center"
          background="dark-1"
          round
          gap="small"
          width="medium"
          height="medium"
        >
          <Form
            //onChange={(value) => console.log("Change", value)}
            onReset={() => {
              setType("");
              setReason("");
              setAmount(0);
            }}
            onSubmit={(event) => {
              createTransaction(event.value);
              setType("");
              setReason("");
              setAmount(0);
            }}
          >
            <FormField label="Transaction type" name="type">
              <Select
                name="type"
                options={["Income", "Expenses"]}
                value={type}
                onChange={(event) => setType(event.option)}
                size="small"
                placeholder="Select a type..."
              />
            </FormField>
            <FormField label="Reason" name="reason">
              <TextInput
                size="small"
                name="reason"
                placeholder="Reason for transaction.."
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                focusIndicator
              />
            </FormField>
            <FormField label="Transaction Amount" name="amount">
              <TextInput
                size="large"
                type="number"
                name="amount"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                focusIndicator
              />
            </FormField>
            <Box
              direction="row"
              justify="between"
              margin={{ top: "medium", bottom: "medium" }}
            >
              <Button type="reset" label="Reset" margin={{ right: "small" }} />
              <Button type="submit" label="Submit" primary />
            </Box>
          </Form>
        </Box>
        <Box
          pad="large"
          align="center"
          background="dark-1"
          round
          //overflow={{ vertical: "scroll" }}
          overflow="auto"
          responsive
          width="medium"
          height="medium"
        >
          <Heading level="4">Transaction History ($)</Heading>
          <List
            data={history}
            primaryKey={(item) => (
              <Text
                size="large"
                weight="normal"
                color={item.dealType === "Income" ? "green" : "red"}
                key={item.id}
              >
                {`${item.dealText}-$${item.dealAmount}`}
              </Text>
            )}
            secondaryKey={(item) => (
              <Text
                size="xsmall"
                color={item.dealType === "Income" ? "green" : "red"}
                key={item.dealText}
              >
                {item.date}
              </Text>
            )}
          />
        </Box>
      </Box>
    </Grommet>
  );
};

export default Manager;
