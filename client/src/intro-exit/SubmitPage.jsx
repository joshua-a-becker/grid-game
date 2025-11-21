import { usePlayer, useGame } from "@empirica/core/player/classic/react";
import React, { useState } from "react";
import { Button } from "../components/Button.jsx";

export function SubmitPage({ next }) {
  const player = usePlayer();
  const game = useGame();

  const [recommendation, setRecommendation] = useState("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const taskDescription = game?.get("taskDescription") || "";

  function handleSubmit(event) {
    event.preventDefault();
    player.set("recommendation", recommendation);
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
                Time to pitch your solution for Riverside E-Sports Arena!
              </h2>
              <p className="mt-2 text-gray-600">
                Please suggest a solution based on all the information you have gathered.
              </p>
            </div>
            <button
              onClick={() => setIsTaskModalOpen(true)}
              type="button"
              className="ml-6 flex-shrink-0 bg-gray-200 text-gray-800 px-4 py-2 text-sm font-medium rounded hover:bg-gray-300 transition-colors border border-gray-300"
            >
              Task Description
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="px-8 py-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="recommendation" className="block text-base font-semibold text-gray-900 mb-3">
                  Your Recommendation
                </label>
                <textarea
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-base resize-none"
                  dir="auto"
                  id="recommendation"
                  name="recommendation"
                  rows={12}
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value)}
                  placeholder="Enter your recommendation here..."
                  required
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit">Submit</Button>
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
            <div className="text-gray-700 space-y-4 whitespace-pre-wrap">
              {taskDescription}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
