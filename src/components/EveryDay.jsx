import React, { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../GlobalProvider";

export const EveryDay = ({ day }) => {
  const { mainGoal, setMainGoal, setGoalAchieved } = useContext(GlobalContext);
  const [dayEnd, setDayEnd] = useState(false);
  const [wonCount, setWonCount] = useState(0);
  const wonRef = useRef(null);

  const puttedDailyResult = (e) => {
    e.preventDefault();
    const value = wonRef.current.value;
    const result = mainGoal - value;

    localStorage.setItem(`day-${day}`, "true");
    localStorage.setItem(`won-${day}`, value);

    if (mainGoal - value < 0) {
      localStorage.setItem("goal", 0);
      setMainGoal(0);
      setGoalAchieved(true);
    } else {
      localStorage.setItem("goal", result);
      setMainGoal((prev) => prev - value);
    }

    setWonCount(value);
    setDayEnd(true);
  };

  const removeSubmit = () => {
    localStorage.removeItem(`won-${day}`);
    localStorage.setItem(`day-${day}`, false);

    wonRef.current.value = 0;
    setWonCount(0);
    setDayEnd(false);
  };

  useEffect(() => {
    const storedDayEnd = localStorage.getItem(`day-${day}`);
    const storedWon = localStorage.getItem(`won-${day}`);

    if (storedDayEnd === "true") {
      setDayEnd(true);
    } else {
      setDayEnd(false);
    }

    if (storedWon !== null) {
      setWonCount(storedWon);
    } else {
      setWonCount(0);
    }
  }, [day]);

  return (
    <form
      title={wonCount}
      onSubmit={puttedDailyResult}
      onDoubleClick={removeSubmit}
      className={`${
        dayEnd ? "after:block" : "after:hidden"
      } flex flex-row items-center justify-between rounded-md relative after:absolute after:h-full after:w-full after:bg-black after:bg-opacity-30 after:backdrop-blur-sm after:blur-sm after:rounded-md select-none`}
    >
      <span className="ml-1">Day {day}</span>
      <div className="flex flex-row items-center gap-2">
        <input
          ref={wonRef}
          type="number"
          className={`${
            dayEnd
              ? "bg-black bg-opacity-0 border-none"
              : "bg-inherit bg-opacity-100 border border-gray-400"
          } focus:outline-none w-10 pl-1`}
          min={0}
          defaultValue={0}
        />
        <button
          type="submit"
          className={`${
            dayEnd ? "invisible" : "visible"
          } px-3 py-0.5 rounded-md font-meduim bg-emerald-500`}
        >
          <i className="fa-solid fa-check text-white text-sm"></i>
        </button>
      </div>
    </form>
  );
};
