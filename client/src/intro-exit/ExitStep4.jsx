import { usePlayer, usePlayers } from "@empirica/core/player/classic/react";
import React, { useState } from "react";
import { Button } from "../components/Button.jsx";
import { ExitChat } from "./ExitChat.jsx";

export function ExitStep4({ next }) {
  const player = usePlayer();
  const players = usePlayers();

  // Track which consultant we're currently rating (0 = first, 1 = second)
  const [currentConsultantIndex, setCurrentConsultantIndex] = useState(0);

  // Get chat peer numbers
  const chatPeers = player.get("chatPeers") || [];
  const chatPeerNumbers = chatPeers
    .map(peerId => {
      const peer = players.find(p => p.id === peerId);
      return peer ? peer.get("playerNumber") : null;
    })
    .filter(num => num !== null)
    .sort((a, b) => a - b);

  // Create consultants array based on actual chat peers
  const consultants = chatPeerNumbers.map((num) => ({
    id: `consultant${num}`,
    label: `Consultant ${num}`
  }));

  // Initialize state with dynamic keys based on actual consultants
  const initialAnswers = {};
  consultants.forEach(consultant => {
    initialAnswers[`${consultant.id}_competent`] = "";
    initialAnswers[`${consultant.id}_intelligent`] = "";
    initialAnswers[`${consultant.id}_skilled`] = "";
    initialAnswers[`${consultant.id}_efficient`] = "";
    initialAnswers[`${consultant.id}_assertive`] = "";
    initialAnswers[`${consultant.id}_confident`] = "";
  });

  const [answers, setAnswers] = useState(initialAnswers);
  const [showValidation, setShowValidation] = useState(false);

  const questions = [
    {
      suffix: "_competent",
      text: (consultant) => `${consultant} was competent`
    },
    {
      suffix: "_intelligent",
      text: (consultant) => `${consultant} was intelligent`
    },
    {
      suffix: "_skilled",
      text: (consultant) => `${consultant} was skilled`
    },
    {
      suffix: "_efficient",
      text: (consultant) => `${consultant} was efficient`
    },
    {
      suffix: "_assertive",
      text: (consultant) => `${consultant} was assertive`
    },
    {
      suffix: "_confident",
      text: (consultant) => `${consultant} was confident`
    }
  ];

  const currentConsultant = consultants[currentConsultantIndex];

  // Check if current consultant's questions are all answered
  const isCurrentConsultantComplete = () => {
    if (!currentConsultant) return true;
    return questions.every(q => answers[currentConsultant.id + q.suffix] !== "");
  };

  const handleSubmit = () => {
    if (!isCurrentConsultantComplete()) {
      setShowValidation(true);
      return;
    }

    // If there's another consultant, move to them
    if (currentConsultantIndex < consultants.length - 1) {
      setCurrentConsultantIndex(currentConsultantIndex + 1);
      setShowValidation(false);
      return;
    }

    // All consultants rated, save and proceed
    player.set("peerCompetence", answers);
    next();
  };

  if (!currentConsultant) {
    // No consultants to rate, just proceed
    next();
    return null;
  }

  return (
    <div className="h-full w-full flex overflow-hidden">
      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden p-4">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 overflow-y-auto">
            <div className="mt-12 space-y-8">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Feedback on Other Consultants (Part {5 + currentConsultantIndex})
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Please indicate the extent to which you agree or disagree with the following statements. (1 = Strongly disagree, 7 = Strongly agree)
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-4">
                    For {currentConsultant.label}:
                  </h4>
                  {questions.map((question) => {
                    const fieldId = currentConsultant.id + question.suffix;
                    return (
                      <div key={fieldId} className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-4">
                        <label className="block text-base font-medium text-gray-900 mb-4">
                          {question.text(currentConsultant.label)}
                        </label>
                        {showValidation && !answers[fieldId] && (
                          <p className="text-red-600 text-sm font-medium mb-3">
                            This is a required item
                          </p>
                        )}
                        <div className="flex justify-between items-center w-full">
                          <span className="text-sm text-gray-600 flex-shrink-0">Strongly disagree</span>
                          <div className="flex justify-between items-center flex-1 px-8">
                            {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                              <label key={value} className="flex flex-col items-center cursor-pointer">
                                <span className="text-sm text-gray-700 mb-1">{value}</span>
                                <input
                                  type="radio"
                                  className="form-radio h-5 w-5"
                                  name={fieldId}
                                  value={value}
                                  checked={answers[fieldId] === String(value)}
                                  onChange={(e) => {
                                const updatedAnswers = {...answers, [fieldId]: e.target.value};
                                setAnswers(updatedAnswers);
                                player.set("peerCompetence", updatedAnswers);
                              }}
                                />
                              </label>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 flex-shrink-0">Strongly agree</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mb-12">
                <Button handleClick={handleSubmit}>
                  <p>{currentConsultantIndex < consultants.length - 1 ? "Next Consultant" : "Next Page"}</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat sidebar */}
      <div className="h-full w-128">
        <ExitChat />
      </div>
    </div>
  );
}
