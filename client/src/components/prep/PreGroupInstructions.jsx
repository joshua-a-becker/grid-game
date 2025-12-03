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
          At the end of this activity, we'll ask you to present a solution for Riverside E-Sports Arena.
        </p>

        <p className="text-gray-800 leading-relaxed mb-4">
          You will be Consultant {player.get("playerNumber")} for this task.  You will have 20 minutes to gather information by chatting with two other consultants via direct message (i.e. not a group chat).</p>
<p className="text-gray-800 leading-relaxed mb-4"><b>These two other consultants cannot message each other directly. However, they would be able to communicate to each other through you.</b>
</p>

<p className="text-gray-800 leading-relaxed mb-4"> Every piece of information you gain will help your final recommendation report to Riverside E-Sports Arena. <b>The person with the best report will receive a bonus payment.</b></p>


        <p className="text-gray-800 leading-relaxed mb-4">
          As you gain additional information, fill out the Information Table, and note who told you the information that you needed.</p>

        <p className="text-gray-800 leading-relaxed mb-4">
          These instructions will be available on the Task Description tab.</p>
      </div>

      <Button handleClick={handleReady} autoFocus>
        <p>I'm Ready</p>
      </Button>
    </div>
  );
}
