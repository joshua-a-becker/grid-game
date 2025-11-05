import {
  usePlayer,
  useRound,
  useStage,
} from "@empirica/core/player/classic/react";
import React, { useState } from "react";
import { Avatar } from "./components/Avatar";
import { Timer } from "./components/Timer";

export function Profile() {
  const player = usePlayer();
  const round = useRound();
  const stage = useStage();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const score = player.get("score") || 0;

  // Dev mode skip stage handler
  const handleSkipStage = () => {
    player.stage.set("submit", true);
  };

  return (
    <div className="min-w-lg md:min-w-2xl px-3 py-2 text-gray-500 flex items-center border-b border-gray-300">
      {/* Left - Stage/Round Info (takes remaining space) */}
      <div className="flex-1 leading-tight ml-1">
        <div className="text-gray-600 font-semibold">
          {round ? round.get("name") : ""}
        </div>
        <div className="text-empirica-500 font-medium">
          {stage ? stage.get("name") : ""}
        </div>
      </div>

      {/* Right - Task Description Button, Dev Skip Button, and Timer */}
      <div className="flex items-center gap-3">
        {/* Dev-only Skip Stage button */}
        {process.env.NODE_ENV === 'development' && (
          <button
            onClick={handleSkipStage}
            className="text-white bg-red-600 px-4 py-2 text-base font-medium rounded hover:bg-red-700 transition-colors border border-red-700"
          >
            DEV: Skip Stage
          </button>
        )}

        {/* Task Description Button */}
        <button
          onClick={() => setIsTaskModalOpen(true)}
          className="text-black bg-gray-200 px-4 py-2 text-base font-medium rounded hover:bg-gray-300 transition-colors border border-gray-300"
        >
          Task Description
        </button>

        <Timer />
      </div>

      {/* Task Description Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-3/4 md:w-1/2 rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => setIsTaskModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl font-bold"
            >
              ✖
            </button>
            <h2 className="text-lg font-bold mb-4">Task Description</h2>
            <div className="text-gray-700 space-y-4">
              <p>(task description goes here)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
