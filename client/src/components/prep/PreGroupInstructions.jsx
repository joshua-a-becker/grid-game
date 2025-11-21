import React from "react";
import { usePlayer } from "@empirica/core/player/classic/react";
import { Button } from "../Button.jsx";

export function PreGroupInstructions() {
  const player = usePlayer();

  const handleReady = () => {
    player.stage.set("submit", true);
  };

  return (
    <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Ready to Begin
      </h2>

      <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
        <p className="text-gray-800 leading-relaxed mb-4">
          You will now enter the live group activity. You will have 20-minutes to gather information necessary to present a solution for Riverside E-Sports Arena.
        </p>

        <p className="text-gray-800 leading-relaxed mb-4">
          During the group activity phase, you will have the opportunity to chat with two other consultants on your team. These chats are live, are individual direct chats between you and the recipient. There is no “group chat” that includes all consultants. </p>

        <p className="text-gray-800 leading-relaxed mb-4">
          <b>You will be Consultant {player.get("playerNumber")} for this task.</b></p>

        <p className="text-gray-800 leading-relaxed mb-4">
          Throughout the activity, as you gain additional information, please fill out the Information Table, and note who told you the information that you needed.</p>

        <p className="text-gray-800 leading-relaxed mb-4">
          As mentioned before, you’ll note that the shared information is available on the Shared Information tab.</p>

        <p className="text-gray-800 leading-relaxed mb-4">
          These instructions will be available on the Task Description tab.</p>
      </div>

      <Button handleClick={handleReady} autoFocus>
        <p>I'm Ready</p>
      </Button>
    </div>
  );
}
