import {
  usePlayer,
  usePlayers,
  useRound,
  useStage,
} from "@empirica/core/player/classic/react";
import { Loading } from "@empirica/core/player/react";
import React from "react";
import { JellyBeans } from "./examples/JellyBeans.jsx";
import { MineSweeper } from "./examples/MineSweeper.jsx";
import { Discussion } from "./components/Discussion.jsx";
import { PrepStage } from "./components/PrepStage.jsx"

export function Stage() {
  const player = usePlayer();
  const players = usePlayers();
  const round = useRound();
  const stage = useStage();

  if (player.stage.get("submit")) {
    if (players.length === 1) {
      return <Loading />;
    }

    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          {/* Animated clock icon */}
          <div className="mb-6 flex justify-center">
            <svg
              className="animate-spin-slow"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#9CA3AF"
                strokeWidth="2"
              />
              <path
                d="M12 6V12L16 14"
                stroke="#4B5563"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Message */}
          <p className="text-xl font-medium text-gray-700 mb-2">
            Please wait for other players
          </p>
          <p className="text-sm text-gray-500">
            You'll be able to continue once everyone is ready
          </p>
        </div>

        {/* Add custom animation for slower spin */}
        <style>{`
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .animate-spin-slow {
            animation: spin-slow 3s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  switch (stage.get("name")) {
    case "Preparation":
      return <PrepStage />;
    case "Discussion":
      return <Discussion />;
    default:
      return <div>Unexpected Error</div>;
  }
}
