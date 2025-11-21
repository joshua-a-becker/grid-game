import React, { useState, useRef } from "react";
import { usePlayer, usePlayers, useGame } from "@empirica/core/player/classic/react";
import { cluesByColor, sharedClues } from "../../../clues.js";
import { Timer } from "./Timer.jsx";
import { DyadicChat } from "./DyadicChat.jsx";

export function Discussion() {
  const player = usePlayer();
  const players = usePlayers();
  const game = useGame();
  const [activeTab, setActiveTab] = useState("information");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [wobblingClues, setWobblingClues] = useState({});

  const myFileColor = player.get("fileColor");
  const myClueIds = player.get("clues") || [];
  const myPlayerNumber = player.get("playerNumber");
  const chatPeers = player.get("chatPeers") || [];

  // Handle skip stage (dev only)
  const handleSkipStage = () => {
    player.stage.set("submit", true);
  };

  // Get chat peer numbers from player IDs
  const getChatPeerNumbers = () => {
    return chatPeers.map(peerId => {
      const peer = players.find(p => p.id === peerId);
      return peer ? peer.get("playerNumber") : null;
    }).filter(num => num !== null);
  };

  // Define the three file colors in order
  const fileColors = ["red", "blue", "green"];

  // Create a map of clue id to clue object from all colors
  const clueMap = {};
  Object.values(cluesByColor).flat().forEach((clue) => {
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
    initiateWobble();
  };

  // Handle source change for non-owned clues
  const handleSourceChange = (clueId, source) => {
    player.set(`clueSource_${clueId}`, source);
    initiateWobble();
  };

  // Set up wobble effect for enabled dropdowns with no selection
  const intervalsRef = useRef({});

  const initiateWobble = () => {
    // cleanup previous intervals
    Object.values(intervalsRef.current).forEach(clearInterval);
    intervalsRef.current = {};

    const allClues = Object.values(cluesByColor).flat();
    const nonOwnedClues = allClues.filter(c => !myClueIds.includes(c.id));

    nonOwnedClues.forEach(clue => {
      const hasResponse = (player.get(`clueResponse_${clue.id}`) || "").trim() !== "";
      const hasSource   = player.get(`clueSource_${clue.id}`) || "";

      if (hasResponse && !hasSource) {
        
          setTimeout(() => {
            setWobblingClues(p => ({ ...p, [clue.id]: true }));
            setTimeout(() => {
              setWobblingClues(p => ({ ...p, [clue.id]: false }));
            }, 500);
          }, 800);
        intervalsRef.current[clue.id] = setInterval(() => {
          setWobblingClues(p => ({ ...p, [clue.id]: true }));
          setTimeout(() => {
            setWobblingClues(p => ({ ...p, [clue.id]: false }));
          }, 500);
        }, 3000);
      }
    });
  };


  return (
    <div className="h-full w-full flex overflow-hidden">
      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden p-4">
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
            <button
              className="px-6 py-3 font-medium transition-colors rounded-t-lg bg-red-100 hover:bg-red-200 text-red-600"
              onClick={handleSkipStage}
            >
              [DEV] Skip Stage
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
            {fileColors.map((color) => {
              const isMyFile = color === myFileColor;
              const colorClues = cluesByColor[color];

              return (
                <div key={color} className="flex flex-col gap-4">
                  {/* Column Header */}
                  <div className={`rounded-lg p-4 ${isMyFile ? 'bg-blue-600' : 'bg-gray-700'} text-white`}>
                    <h3 className="font-semibold text-lg capitalize">
                      {color} File
                      {isMyFile && "(You)"}
                    </h3>
                  </div>

                  {/* Clue Cards */}
                  {colorClues.map((clue) => {
                    const isMyClue = myClueIds.includes(clue.id);
                    const clueResponse = (player.get(`clueResponse_${clue.id}`) || "").trim();
                    const hasResponse = clueResponse !== "";
                    const clueSource = player.get(`clueSource_${clue.id}`) || "";
                    const isWobbling = wobblingClues[clue.id];
                    const chatPeerNumbers = getChatPeerNumbers();

                    return (
                      <div
                        key={clue.id}
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
                          <div>
                            <textarea
                              value={player.get(`clueResponse_${clue.id}`) || ""}
                              onChange={(e) =>
                                handleInputChange(clue.id, e.target.value, e.target)
                              }
                              placeholder="Enter your answer..."
                              rows={2}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none overflow-hidden"
                            />
                            <div className="mt-2">
                              <style>{`
                                @keyframes wobble {
                                  0%, 100% { transform: rotate(0deg); }
                                  25% { transform: rotate(-5deg); }
                                  75% { transform: rotate(5deg); }
                                }

                                .wobble-animate {
                                  animation: wobble 0.2s ease-in-out;
                                  display: inline-block; /* required so rotation works cleanly */
                                }
                              `}</style>
                              <label className={`block text-xs mb-1 ${
                                hasResponse && !clueSource ? 'text-red-700 font-bold' : hasResponse ? 'text-gray-700 font-medium' : 'text-gray-400 font-medium'
                              }`}>
                                Who did you hear this from?
                              </label>
                              <select
                                value={clueSource}
                                onChange={(e) => handleSourceChange(clue.id, e.target.value)}
                                disabled={!hasResponse}
                                className={`w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                  hasResponse ? 'border-gray-300 bg-white text-gray-900' : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                                } ${isWobbling ? 'wobble-animate' : ''}`}
                              >
                                <option value="">Select consultant...</option>
                                {chatPeerNumbers.map((num) => (
                                  <option key={num} value={num}>
                                    Consultant {num}
                                  </option>
                                ))}
                                <option value="unsure">I'm not sure</option>
                              </select>
                            </div>
                          </div>
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
              <div className="text-gray-700 space-y-4 whitespace-pre-wrap">
                {game?.get("taskDescription") || ""}
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

      {/* Chat sidebar */}
      <div className="h-full w-128">
        <DyadicChat />
      </div>
    </div>
  );
}
