import React, { useState } from "react";
import { usePlayer } from "@empirica/core/player/classic/react";
import { Button } from "../Button.jsx";

const belongingnessQuestions = [
  "I would consider myself a member of this consulting team.",
  "I would feel that I belong to this consulting team.",
  "I would feel like I am a part of this consulting team.",
  "I would feel a connection to this consulting team.",
  "I would feel accepted in this consulting team.",
  "I would feel respected in this consulting team.",
  "I would feel valued by the other consultants in this team.",
  "I would feel appreciated by others in this team.",
  "I would feel like I fit in.",
  "I would feel disregarded by my peers.",
  "I would feel neglected by my peers.",
  "I would feel excluded from the social aspect in this consulting team."
];

export function SurveyPage1({ onNext }) {
  const player = usePlayer();

  // Load existing survey data if any
  const existingSurvey = player.get("introSurvey") || {};
  const [belongingness, setBelongingness] = useState(existingSurvey.belongingness || {});
  const [showErrors, setShowErrors] = useState(false);

  const handleBelongingnessChange = (index, value) => {
    const updated = { ...belongingness, [index]: value };
    setBelongingness(updated);
    // Save immediately to player
    player.set("introSurvey", {
      ...existingSurvey,
      belongingness: updated
    });
  };

  const handleSubmit = () => {
    // Check if all questions are answered
    const allBelongingnessAnswered = Object.keys(belongingness).length === belongingnessQuestions.length;

    if (allBelongingnessAnswered) {
      onNext();
    } else {
      // Show errors
      setShowErrors(true);

      // Find first incomplete item and scroll to it
      let firstIncompleteId = null;

      for (let i = 0; i < belongingnessQuestions.length; i++) {
        if (belongingness[i] === undefined) {
          firstIncompleteId = `belongingness_${i}`;
          break;
        }
      }

      // Scroll to first incomplete item
      if (firstIncompleteId) {
        const element = document.getElementById(firstIncompleteId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Please answer a few brief questions.
      </h2>

      {/* Sense of Belongingness */}
      <div className="mb-8">
        <div className="space-y-6">
          {belongingnessQuestions.map((question, index) => {
            const isIncomplete = showErrors && belongingness[index] === undefined;
            return (
              <div
                key={index}
                id={`belongingness_${index}`}
                className={`bg-gray-50 rounded-lg p-6 border-2 ${
                  isIncomplete ? 'border-red-500' : 'border-gray-200'
                }`}
              >
                <p className="text-gray-800 mb-4 font-medium">
                  {question}
                </p>
                {isIncomplete && (
                  <p className="text-red-600 text-sm font-medium mb-3">
                    This is a required item
                  </p>
                )}
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-medium text-gray-700 flex-shrink-0">STRONGLY DISAGREE</span>
                  <div className="flex justify-between items-center flex-1 px-8">
                    {[1, 2, 3, 4, 5, 6].map((value) => (
                      <label key={value} className="flex flex-col items-center cursor-pointer">
                        <input
                          type="radio"
                          name={`belongingness_${index}`}
                          value={value}
                          checked={belongingness[index] === value}
                          onChange={() => handleBelongingnessChange(index, value)}
                          className="form-radio h-5 w-5 mb-2"
                        />
                        <span className="text-sm text-gray-600">{value}</span>
                      </label>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700 flex-shrink-0">STRONGLY AGREE</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Button handleClick={handleSubmit}>
        <p>Continue</p>
      </Button>
    </div>
  );
}
