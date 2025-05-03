import React, { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [mainGoal, setMainGoal] = useState(300);

  useEffect(() => {
    if (localStorage.getItem("goal")) {
      setMainGoal(localStorage.getItem("goal"));
    }
  }, [mainGoal]);

  return (
    <GlobalContext.Provider value={{ mainGoal, setMainGoal }}>
      {children}
    </GlobalContext.Provider>
  );
};
