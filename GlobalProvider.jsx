import React, { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [mainGoal, setMainGoal] = useState(0);
  const [goalNotExist, setGoalNotExist] = useState(false);
  const [goalAchieved, setGoalAchieved] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("goal")) {
      setMainGoal(localStorage.getItem("goal"));
    }
  }, [mainGoal]);

  useEffect(() => {
    const goalInStorage = localStorage.getItem("goal");
    if (goalInStorage) {
      setGoalNotExist(false);
    } else {
      setGoalNotExist(true);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        mainGoal,
        setMainGoal,
        goalNotExist,
        setGoalNotExist,
        goalAchieved,
        setGoalAchieved,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
