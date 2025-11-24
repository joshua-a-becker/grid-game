import React, { useState } from "react";
import { usePlayer } from "@empirica/core/player/classic/react";
import { Button } from "../Button.jsx";

const stereotypeThreatQuestions = [
  "The researcher would expect me to do poorly on this consulting task because of my gender.",
  "I would be concerned that the researcher would judge people of my gender, as a whole, based on my performance on this task.",
  "The researcher will think that people of my gender, as a whole, have less ability for consulting if I do not do well on this task."
];

const prestigeQuestion = "There are probably many who would like to work on this consulting task for Riverside E-Sports Arena.";

export function SurveyPage2({ onNext }) {
  const player = usePlayer();

  // Load existing survey data if any
  const existingSurvey = player.get("introSurvey") || {};
  const [stereotypeThreat, setStereotypeThreat] = useState(existingSurvey.stereotypeThreat || {});
  const [prestige, setPrestige] = useState(existingSurvey.prestige || "");
  const [showErrors, setShowErrors] = useState(false);

  const handleStereotypeThreatChange = (index, value) => {
    const updated = { ...stereotypeThreat, [index]: value };
    setStereotypeThreat(updated);
    // Save immediately to player
    player.set("introSurvey", {
      ...existingSurvey,
      stereotypeThreat: updated,
      prestige
    });
  };

  const handlePrestigeChange = (value) => {
    setPrestige(value);
    // Save immediately to player
    player.set("introSurvey", {
      ...existingSurvey,
      stereotypeThreat,
      prestige: value
    });
  };

  const handleSubmit = () => {
    // Check if all questions are answered
    const allStereotypeThreatAnswered = Object.keys(stereotypeThreat).length === stereotypeThreatQuestions.length;
    const prestigeAnswered = prestige !== "";

    if (allStereotypeThreatAnswered && prestigeAnswered) {
      onNext();
    } else {
      // Show errors
      setShowErrors(true);

      // Find first incomplete item and scroll to it
      let firstIncompleteId = null;

      for (let i = 0; i < stereotypeThreatQuestions.length; i++) {
        if (stereotypeThreat[i] === undefined) {
          firstIncompleteId = `stereotype_${i}`;
          break;
        }
      }

      if (!firstIncompleteId && !prestigeAnswered) {
        firstIncompleteId = "prestige";
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
        Please answer just a few more questions.
      </h2>

      {/* Stereotype Threat */}
      <div className="mb-4">
        <div className="space-y-6">
          {stereotypeThreatQuestions.map((question, index) => {
            const isIncomplete = showErrors && stereotypeThreat[index] === undefined;
            return (
              <div
                key={index}
                id={`stereotype_${index}`}
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
                    {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                      <label key={value} className="flex flex-col items-center cursor-pointer">
                        <input
                          type="radio"
                          name={`stereotype_${index}`}
                          value={value}
                          checked={stereotypeThreat[index] === value}
                          onChange={() => handleStereotypeThreatChange(index, value)}
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

      {/* Prestige of Task */}
      <div className="mb-8">
        <div
          id="prestige"
          className={`bg-gray-50 rounded-lg p-6 border-2 ${
            showErrors && prestige === "" ? 'border-red-500' : 'border-gray-200'
          }`}
        >
          <p className="text-gray-800 mb-4 font-medium">
            {prestigeQuestion}
          </p>
          {showErrors && prestige === "" && (
            <p className="text-red-600 text-sm font-medium mb-3">
              This is a required item
            </p>
          )}
          <div className="flex items-center justify-between w-full">
            <span className="text-sm font-medium text-gray-700 flex-shrink-0">STRONGLY DISAGREE</span>
            <div className="flex justify-between items-center flex-1 px-8">
              {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <label key={value} className="flex flex-col items-center cursor-pointer">
                  <input
                    type="radio"
                    name="prestige"
                    value={value}
                    checked={prestige === value}
                    onChange={() => handlePrestigeChange(value)}
                    className="form-radio h-5 w-5 mb-2"
                  />
                  <span className="text-sm text-gray-600">{value}</span>
                </label>
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700 flex-shrink-0">STRONGLY AGREE</span>
          </div>
        </div>
      </div>

      <Button handleClick={handleSubmit}>
        <p>Continue</p>
      </Button>
    </div>
  );
}
