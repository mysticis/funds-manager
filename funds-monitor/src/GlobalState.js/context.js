import React, { createContext, useReducer } from "react";
import appReducer from "./appReducer";
import dealService from "../services/transactions";
const initialState = [];

export const GlobalContext = createContext(initialState);

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const initializeState = async () => {
    const deals = await dealService.getDeals();
    return dispatch({
      type: "INITIALIZE_DEALS",
      data: deals,
    });
  };
  const createTransaction = async (newTransaction) => {
    const returnedDeal = await dealService.createDeal(newTransaction);
    return dispatch({
      type: "CREATE_DEAL",
      payload: returnedDeal,
    });
  };
  return (
    <GlobalContext.Provider
      value={{ state, initializeState, createTransaction }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
