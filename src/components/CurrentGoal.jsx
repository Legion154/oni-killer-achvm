import React, { useContext, useRef } from "react";
import { GlobalContext } from "../../GlobalProvider";

export const CurrentGoal = ({ show }) => {
  const { setMainGoal, setGoalNotExist } = useContext(GlobalContext);
  const goalRef = useRef(null);

  const defaultGoal = (e) => {
    e.preventDefault();
    const value = goalRef.current.value;

    setMainGoal(value);
    localStorage.setItem("goal", value);
    setGoalNotExist(false);
  };

  return (
    <main
      className={`${
        show ? "top-[45%] opacity-100 visible" : "top-1/2 opacity-0 invisible"
      } fixed z-20 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 px-14 py-5 pb-10 rounded-md bg-white shadow-2xl duration-300`}
    >
      <h1 className="text-2xl font-bold leading-7 text-center">
        Set how much left now for the goal?
      </h1>
      <form onSubmit={defaultGoal} className="flex flex-row items-center gap-2">
        <input
          ref={goalRef}
          type="number"
          className="focus:outline-none rounded-sm border border-gray-400 px-2 w-max"
        />
        <button
          type="submit"
          className="px-4 py-0.5 rounded-md text-white font-medium bg-blue-500 hover:bg-blue-600 active:scale-95 duration-300"
        >
          <i className="fa-solid fa-check"></i>
        </button>
      </form>
    </main>
  );
};
