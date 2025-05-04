import React, { useContext, useEffect, useRef, useState } from "react";
import { EveryDay } from "./components/EveryDay";
import { GlobalContext } from "../GlobalProvider";
import { CurrentGoal } from "./components/CurrentGoal";
import Congratulations from "./components/Congratulations";

const Preview = () => {
  const { mainGoal, goalNotExist, goalAchieved } = useContext(GlobalContext);
  const [missions, setMissions] = useState([]);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(null);
  const draftRef = useRef(null);

  const sidebar = () => {
    setOpen((prevstate) => {
      const newState = !prevstate;
      if (newState) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
      return newState;
    });
  };

  const drafted = (e) => {
    e.preventDefault();
    const value = draftRef.current.value;

    setDraft(value);
    localStorage.setItem("draft", value);
  };

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

  useEffect(() => {
    const draftStorage = localStorage.getItem("draft");
    if (draftStorage) {
      setDraft(draftStorage);
    }
  }, []);

  return (
    <main className="p-1">
      <CurrentGoal show={goalNotExist} />
      <Congratulations completed={goalAchieved} />

      <header className="flex flex-row itemc-center justify-between px-2">
        <button onClick={sidebar} type="button">
          <i className="fa-solid fa-bars text-lg"></i>
        </button>
        <div className="flex flex-row itemc-center gap-2 font-medium">
          <span className="font-bold text-red-500">{mainGoal}</span>
          <h1>left for the goal</h1>
        </div>
      </header>

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

      {/* sidebar */}

      <aside
        className={`${
          open ? "w-80 right-0" : "w-0 -right-10"
        } fixed z-50 top-0 h-screen bg-slate-100 flex flex-col gap-6 py-1 px-2 overflow-hidden duration-300`}
      >
        <div className="flex flex-row items-center gap-2">
          <h1 className="text-2xl font-bold">Draft</h1>
          <span className="w-full h-0.5 bg-black"></span>
        </div>

        <form onSubmit={drafted} className="flex flex-row items-center gap-2">
          <input
            ref={draftRef}
            type="number"
            min={0}
            className="select-none focus:outline-none rounded-md w-full border border-gray-300 px-2 py-0.5"
          />

          <button
            type="submit"
            className="px-4 py-1.5 text-white rounded-md text-xs bg-blue-500 hover:bg-blue-600 active:scale-95 duration-300"
          >
            <i className="fa-solid fa-check"></i>
          </button>
        </form>

        <article>
          <p>
            Done for now:{" "}
            <span className="font-bold text-emerald-500">{draft}</span>
          </p>
        </article>
      </aside>

      {/* overlay */}

      <div
        onClick={() => setOpen(false)}
        className={`${
          goalNotExist || goalAchieved || open ? "block" : "hidden"
        } inset-0 fixed z-0 bg-black bg-opacity-50 backdrop-blur-md`}
      ></div>
    </main>
  );
};

export default Preview;
