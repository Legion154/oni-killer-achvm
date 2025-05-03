import React from "react";
import { GlobalProvider } from "../GlobalProvider";
import { Route, Routes } from "react-router-dom";
import Preview from "./Preview";

const App = () => {
  return (
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<Preview />} />
      </Routes>
    </GlobalProvider>
  );
};

export default App;
