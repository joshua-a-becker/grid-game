import { useGame } from "@empirica/core/player/classic/react";

import React from "react";
import { Stage } from "./Stage";
import { DyadicChat } from "./components/DyadicChat";

export function Game() {
  const game = useGame();
  const { playerCount } = game.get("treatment");

  return (
    <div className="h-full w-full flex overflow-hidden">
      <div className="h-full w-full overflow-hidden">
        <Stage />
      </div>

      {playerCount > 1 && (
        <div className="h-full w-128">
          <DyadicChat />
        </div>
      )}
    </div>
  );
}
