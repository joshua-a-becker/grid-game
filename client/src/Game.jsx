import React from "react";
import { Stage } from "./Stage.jsx";
import {
  usePlayer
} from "@empirica/core/player/classic/react";

export function Game() {
  const player = usePlayer();
  console.log("DEBUG HERE ---- " + player.get("condition"))
  window.player=player;
  return (
    <div className="h-full w-full overflow-hidden">
      <Stage />
    </div>
  );
}
