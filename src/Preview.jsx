import React, { useContext, useEffect, useState } from "react";
import { EveryDay } from "./components/EveryDay";
import { GlobalContext } from "../GlobalProvider";

const Preview = () => {
  const { mainGoal } = useContext(GlobalContext);
  const [missions, setMissions] = useState([]);

  const addMission = () => {
    setMissions((prev) => {
      const updated = [...prev, missions.length + 1];
      localStorage.setItem("missions", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    if (localStorage.getItem("missions")) {
      setMissions(JSON.parse(localStorage.getItem("missions")));
    }
  }, []);

  return (
    <main className="p-1">
      <div className="flex flex-row itemc-center justify-end gap-2 font-medium">
        <span className="font-bold text-red-500">{mainGoal}</span>
        <h1>left for the goal</h1>
      </div>

      <section className="py-10 px-5 flex flex-col gap-3 max-h-[500px] overflow-y-scroll">
        <div className="flex flex-row items-center justify-between gap-2">
          <span className="h-0.5 w-full bg-black"></span>
          <pre className="text-xs">planned days</pre>
        </div>
        {missions.map((el) => {
          return (
            <main key={el}>
              <EveryDay day={el} />
            </main>
          );
        })}
      </section>

      <button
        onClick={addMission}
        type="button"
        className="sticky bottom-5 left-0 right-0 m-auto flex justify-center items-center size-10 rounded-full bg-gray-300 hover:bg-gray-200 active:scale-95 duration-200"
      >
        <i className="fa-solid fa-plus text-zinc-600"></i>
      </button>
    </main>
  );
};

export default Preview;
