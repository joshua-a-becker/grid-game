import React, { useState } from "react";
import { usePlayer, usePlayers } from "@empirica/core/player/classic/react";
import { clues, sharedClues } from "../../../clues.js";
import { Timer } from "./Timer";

export function Discussion() {
  const player = usePlayer();
  const players = usePlayers();
  const [activeTab, setActiveTab] = useState("information");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const myPlayerNumber = player.get("playerNumber");
  const myClueIds = player.get("clues") || [];

  // Get all players sorted by player number
  const sortedPlayers = [...players].sort(
    (a, b) => a.get("playerNumber") - b.get("playerNumber")
  );

  // Create a map of clue id to clue object
  const clueMap = {};
  clues.forEach((clue) => {
    clueMap[clue.id] = clue;
  });

  // Auto-resize textarea function
  const autoResizeTextarea = (element) => {
    if (element) {
      element.style.height = 'auto';
      element.style.height = element.scrollHeight + 'px';
    }
  };

  // Handle input change for non-owned clues
  const handleInputChange = (clueId, value, element) => {
    player.set(`clueResponse_${clueId}`, value);
    autoResizeTextarea(element);
  };

  return (
    <div className="h-full w-full flex flex-col bg-gray-50 overflow-hidden p-4">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-4">
          <div className="flex gap-1">
            <button
              className={`px-6 py-3 font-medium transition-colors rounded-t-lg ${
                activeTab === "information"
                  ? "text-blue-600 bg-white border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("information")}
            >
              Information Table
            </button>
            <button
              className={`px-6 py-3 font-medium transition-colors rounded-t-lg ${
                activeTab === "shared"
                  ? "text-blue-600 bg-white border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("shared")}
            >
              Shared Information
            </button>
            <button
              className={`px-6 py-3 font-medium transition-colors rounded-t-lg ${
                activeTab === "taskDescription"
                  ? "text-blue-600 bg-white border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab("taskDescription")}
            >
              Task Description
            </button>
          </div>
          <Timer />
        </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden relative bg-white rounded-lg shadow-lg border border-gray-200">
        {/* Top fade gradient */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-50 to-transparent pointer-events-none z-10"></div>

        {/* Scrollable content with always-visible scrollbar */}
        <style>{`
          .discussion-scroll::-webkit-scrollbar {
            width: 12px;
          }
          .discussion-scroll::-webkit-scrollbar-track {
            background: #e5e7eb;
          }
          .discussion-scroll::-webkit-scrollbar-thumb {
            background: #9ca3af;
            border-radius: 6px;
          }
          .discussion-scroll::-webkit-scrollbar-thumb:hover {
            background: #6b7280;
          }
        `}</style>
        <div className="discussion-scroll h-full p-6 overflow-auto border-t-2 border-gray-200 shadow-inner" style={{
          scrollbarWidth: 'auto',
          scrollbarColor: '#9ca3af #e5e7eb'
        }}>
        {activeTab === "information" && (
          <div className="grid grid-cols-3 gap-4">
            {sortedPlayers.map((p) => {
              const pNum = p.get("playerNumber");
              const pClueIds = p.get("clues") || [];
              const isMe = pNum === myPlayerNumber;

              return (
                <div key={p.id} className="flex flex-col gap-4">
                  {/* Column Header */}
                  <div className={`rounded-lg p-4 ${isMe ? 'bg-blue-600' : 'bg-gray-700'} text-white`}>
                    <h3 className="font-semibold text-lg">
                      Consultant {pNum}
                      {isMe && " (You)"}
                    </h3>
                  </div>

                  {/* Clue Cards */}
                  {pClueIds.map((clueId) => {
                    const clue = clueMap[clueId];
                    if (!clue) return null;

                    const isMyClue = myClueIds.includes(clueId);

                    return (
                      <div
                        key={clueId}
                        className={`bg-white rounded-lg shadow-sm p-4 border-2 ${
                          isMyClue ? 'border-blue-200' : 'border-gray-200'
                        }`}
                      >
                        {/* Question */}
                        <div className="text-sm font-medium text-gray-700 mb-3">
                          {clue.question}
                        </div>

                        {/* Response */}
                        {isMyClue ? (
                          <div className="bg-blue-50 rounded px-3 py-2 text-sm text-gray-700 border border-blue-200 cursor-not-allowed">
                            {clue.response}
                          </div>
                        ) : (
                          <textarea
                            value={player.get(`clueResponse_${clueId}`) || ""}
                            onChange={(e) =>
                              handleInputChange(clueId, e.target.value, e.target)
                            }
                            placeholder="Enter your answer..."
                            rows={2}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none overflow-hidden"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "shared" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Shared Information
              </h2>
              <div className="space-y-4">
                {sharedClues.map((sharedClue) => (
                  <div
                    key={sharedClue.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <p className="text-gray-700 leading-relaxed">
                      {sharedClue.clue}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "taskDescription" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Task Description
              </h2>
              <div className="text-gray-700 space-y-4">
                <p>(task description goes here)</p>
              </div>
            </div>
          </div>
        )}
        </div>

        {/* Bottom fade gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none z-10"></div>
      </div>
      </div>
    </div>
  );
}
