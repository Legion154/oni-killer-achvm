import React, { useContext, useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { GlobalContext } from "../../GlobalProvider";

const Congratulations = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const { goalAchieved, setGoalAchieved } = useContext(GlobalContext);

  const done = () => {
    setGoalAchieved(false);
  };

  useEffect(() => {
    if (goalAchieved) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    }
  }, [goalAchieved]);

  const triggerConfetti = () => {
    if (showConfetti) {
      confetti({
        spread: 90,
        angle: 180,
        particleCount: 150,
        origin: { y: 0.5 },
        colors: ["#ff6347", "#ff8c00", "#ffd700", "#32cd32"],
      });
    }
  };

  return (
    <main
      className={`${
        goalAchieved
          ? "top-[45%] opacity-100 visible"
          : "top-1/2 opacity-0 invisible"
      } fixed z-20 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 px-14 py-5 pb-10 rounded-md bg-white shadow-2xl duration-300`}
      style={{ transform: "translate(-50%, -50%)" }}
    >
      {goalAchieved && (
        <>
          <h1 className="text-3xl font-semibold text-center text-green-600">
            Congratulations!
          </h1>
          <p className="text-lg text-center text-gray-700">
            You've successfully achieved your goal. 🎉
          </p>
          <div className="flex justify-center items-center">
            <button
              onClick={done}
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
            >
              Keep Going
            </button>
          </div>
        </>
      )}
      {goalAchieved && triggerConfetti()}
    </main>
  );
};

export default Congratulations;
