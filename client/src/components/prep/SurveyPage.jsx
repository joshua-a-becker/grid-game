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

const stereotypeThreatQuestions = [
  "The researcher would expect me to do poorly on this consulting task because of my gender.",
  "I would be concerned that the researcher would judge people of my gender, as a whole, based on my performance on this task.",
  "The researcher will think that people of my gender, as a whole, have less ability for consulting if I do not do well on this task."
];

const prestigeQuestion = "There are probably many who would like to work on this consulting task for Riverside E-Sports Arena.";

export function SurveyPage({ onNext }) {
  const player = usePlayer();

  // Load existing survey data if any
  const existingSurvey = player.get("introSurvey") || {};
  const [belongingness, setBelongingness] = useState(existingSurvey.belongingness || {});
  const [stereotypeThreat, setStereotypeThreat] = useState(existingSurvey.stereotypeThreat || {});
  const [prestige, setPrestige] = useState(existingSurvey.prestige || "");
  const [showErrors, setShowErrors] = useState(false);

  const handleBelongingnessChange = (index, value) => {
    const updated = { ...belongingness, [index]: value };
    setBelongingness(updated);
    // Save immediately to player
    player.set("introSurvey", {
      belongingness: updated,
      stereotypeThreat,
      prestige
    });
  };

  const handleStereotypeThreatChange = (index, value) => {
    const updated = { ...stereotypeThreat, [index]: value };
    setStereotypeThreat(updated);
    // Save immediately to player
    player.set("introSurvey", {
      belongingness,
      stereotypeThreat: updated,
      prestige
    });
  };

  const handlePrestigeChange = (value) => {
    setPrestige(value);
    // Save immediately to player
    player.set("introSurvey", {
      belongingness,
      stereotypeThreat,
      prestige: value
    });
  };

  const handleSubmit = () => {
    // Check if all questions are answered
    const allBelongingnessAnswered = Object.keys(belongingness).length === belongingnessQuestions.length;
    const allStereotypeThreatAnswered = Object.keys(stereotypeThreat).length === stereotypeThreatQuestions.length;
    const prestigeAnswered = prestige !== "";

    if (allBelongingnessAnswered && allStereotypeThreatAnswered && prestigeAnswered) {
      // Data already saved to player.set("introSurvey") on each change
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

      if (!firstIncompleteId) {
        for (let i = 0; i < stereotypeThreatQuestions.length; i++) {
          if (stereotypeThreat[i] === undefined) {
            firstIncompleteId = `stereotype_${i}`;
            break;
          }
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
        Please answer a few brief questions.
      </h2>

      {/* Sense of Belongingness */}
      <div className="mb-8">
        <p className="text-sm text-gray-600 mb-4">
          1 = Strongly disagree, 6 = Strongly agree
        </p>

        <div className="space-y-4">
          {belongingnessQuestions.map((question, index) => {
            const isIncomplete = showErrors && belongingness[index] === undefined;
            return (
              <div
                key={index}
                id={`belongingness_${index}`}
                className={`bg-gray-50 rounded-lg p-4 border-2 ${
                  isIncomplete ? 'border-red-500' : 'border-gray-200'
                }`}
              >
                <p className="text-gray-800 mb-3">
                  {index + 1}. {question}
                </p>
                {isIncomplete && (
                  <p className="text-red-600 text-sm font-medium mb-2">
                    This is a required item
                  </p>
                )}
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6].map((value) => (
                    <label key={value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name={`belongingness_${index}`}
                        value={value}
                        checked={belongingness[index] === value}
                        onChange={() => handleBelongingnessChange(index, value)}
                        className="form-radio h-4 w-4"
                      />
                      <span className="ml-1 text-sm">{value}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PAGE BREAK HERE!! */}
      {/* Stereotype Threat */}
      <div className="mb-8">
        <p className="text-sm text-gray-600 mb-4">
          1 = Strongly disagree, 7 = Strongly agree
        </p>

        <div className="space-y-4">
          {stereotypeThreatQuestions.map((question, index) => {
            const isIncomplete = showErrors && stereotypeThreat[index] === undefined;
            return (
              <div
                key={index}
                id={`stereotype_${index}`}
                className={`bg-gray-50 rounded-lg p-4 border-2 ${
                  isIncomplete ? 'border-red-500' : 'border-gray-200'
                }`}
              >
                <p className="text-gray-800 mb-3">
                  {index + 1}. {question}
                </p>
                {isIncomplete && (
                  <p className="text-red-600 text-sm font-medium mb-2">
                    This is a required item
                  </p>
                )}
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                    <label key={value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name={`stereotype_${index}`}
                        value={value}
                        checked={stereotypeThreat[index] === value}
                        onChange={() => handleStereotypeThreatChange(index, value)}
                        className="form-radio h-4 w-4"
                      />
                      <span className="ml-1 text-sm">{value}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prestige of Task */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Prestige of Task
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          1 = Strongly disagree, 7 = Strongly agree
        </p>

        <div
          id="prestige"
          className={`bg-gray-50 rounded-lg p-4 border-2 ${
            showErrors && prestige === "" ? 'border-red-500' : 'border-gray-200'
          }`}
        >
          <p className="text-gray-800 mb-3">
            {prestigeQuestion}
          </p>
          {showErrors && prestige === "" && (
            <p className="text-red-600 text-sm font-medium mb-2">
              This is a required item
            </p>
          )}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((value) => (
              <label key={value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="prestige"
                  value={value}
                  checked={prestige === value}
                  onChange={() => handlePrestigeChange(value)}
                  className="form-radio h-4 w-4"
                />
                <span className="ml-1 text-sm">{value}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <Button handleClick={handleSubmit}>
        <p>Continue</p>
      </Button>
    </div>
  );
}
