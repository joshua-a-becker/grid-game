import { usePlayer, useGame } from "@empirica/core/player/classic/react";
import React, { useState, useEffect } from "react";
import { Button } from "../components/Button.jsx";

// Separate component for submission input to handle local state + debounced server sync
function SubmissionInput({ player }) {
  const [localValue, setLocalValue] = useState(() => player.get("submission") || "");

  // Debounced sync to server
  useEffect(() => {
    const timeout = setTimeout(() => {
      player.set("submission", localValue);
    }, 300);
    return () => clearTimeout(timeout);
  }, [localValue, player]);

  return (
    <textarea
      className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 text-base resize-none"
      style={{ minHeight: '288px' }}
      placeholder="Enter your submission here..."
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
    />
  );
}

export function SubmitPage({ next }) {
  const player = usePlayer();
  const game = useGame();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const playerNumber = player.get("playerNumber") || "";
  const taskDescriptionRaw = game?.get("taskDescription") || "";
  const taskDescription = taskDescriptionRaw.replace(/{PLAYER_NUMBER}/g, playerNumber);

  function handleSubmit(event) {
    event.preventDefault();
    next();
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Floating Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header with Task Description Button */}
          <div className="bg-gray-50 border-b border-gray-200 px-8 py-6 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Time to pitch your solution!
              </h2>
              <p className="mt-2">
                In the space below, please summarize a recommendation report for Riverside E-Sports Arena. Please utilize the information that you gathered in the group activity to write a helpful report that should help Riverside E-Sports Arena. Completing this recommendation will qualify you for a chance to win a bonus.
              </p>
            </div>
            {/* <button
              onClick={() => setIsTaskModalOpen(true)}
              type="button"
              className="ml-6 flex-shrink-0 bg-gray-200 text-gray-800 px-4 py-2 text-sm font-medium rounded hover:bg-gray-300 transition-colors border border-gray-300"
            >
              Task Description
            </button> */}
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="px-8 py-8">
            <div className="space-y-6">
              <div>
                <SubmissionInput player={player} />
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit">Finish</Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Task Description Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-3/4 md:w-1/2 rounded-lg shadow-lg p-6 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setIsTaskModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl font-bold"
            >
              ✖
            </button>
            <h2 className="text-lg font-bold mb-4">Task Description</h2>
            <div className="text-gray-700" dangerouslySetInnerHTML={{__html: taskDescription}} />
          </div>
        </div>
      )}
    </div>
  );
}
