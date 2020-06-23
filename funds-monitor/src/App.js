import React from "react";
import Manager from "./components/Manager";
import GlobalContextProvider from "./GlobalState.js/context";
function App() {
  return (
    <GlobalContextProvider>
      <Manager />
    </GlobalContextProvider>
  );
}

export default App;
