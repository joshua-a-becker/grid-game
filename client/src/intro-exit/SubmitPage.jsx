import { usePlayer, useGame } from "@empirica/core/player/classic/react";
import React, { useState } from "react";
import { Button } from "../components/Button.jsx";

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
                <s>Time to pitch your solution!</s>
              </h2>
              <p className="mt-2 text-red-700">
                <b>A solution is not required for this activity.</b>
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
                <div
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 text-base"
                  style={{ minHeight: '288px' }}
                >
                  <p>Thank you for participating in the activity!</p>
                  <br />
                  <p>Our primary outcome of interest was information sharing in the discussion that you just completed.</p>
                  <br />
                  <p>We are therefore skipping the step where you write a recommendation for Riverside E-Sports Arena.</p>
                  <br />
                  <p><b>Instead, <span className="text-red-500">everyone will receive the promised bonus as if they wrote the best report.</span></b></p>
                </div>
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
