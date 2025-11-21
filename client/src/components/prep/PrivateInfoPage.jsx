import React from "react";
import { usePlayer } from "@empirica/core/player/classic/react";
import { cluesByColor } from "../../../../clues.js";
import { Button } from "../Button.jsx";

export function PrivateInfoPage({ onNext }) {
  const player = usePlayer();
  const fileColor = player.get("fileColor");
  const myClues = cluesByColor[fileColor] || [];

  return (
    <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Private Information
      </h2>

      <p className="text-gray-700 mb-6">
        Now, you will review file-specific information about the Riverside E-Sports Arena. Again, this information will be unique to those who have access to this given file. In other words, while you will have access to the unique information from your own file, you will not have access to information unique to other files.
      </p>
      <p className="text-gray-800 leading-relaxed mb-4">
        Please take a moment to read through the information, but there’s no need to write it down, as it will be available for you during the group activity.
      </p>
      <div className="bg-gray-50 rounded-lg p-6 mb-6 border-2 border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 capitalize">
          {fileColor} File
        </h3>

        <div className="space-y-4">
          {myClues.map((clue, index) => (
            <div key={clue.id} className="bg-white rounded p-4 border border-gray-300">
              <p className="text-gray-800 leading-relaxed">
                {clue.clue}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Button handleClick={onNext} autoFocus>
        <p>Continue</p>
      </Button>
    </div>
  );
}
