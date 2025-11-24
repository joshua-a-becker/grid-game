import { usePlayer, usePlayers } from "@empirica/core/player/classic/react";
import React, { useState } from "react";
import { Button } from "../components/Button.jsx";

export function ExitStep2({ next }) {
  const player = usePlayer();
  const players = usePlayers();

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
  const consultants = chatPeerNumbers.map((num, index) => ({
    id: `consultant${num}`,
    label: `Consultant ${num}`
  }));

  // Initialize state with dynamic keys based on actual consultants
  const initialAnswers = {};
  consultants.forEach(consultant => {
    initialAnswers[`${consultant.id}_goBetween`] = "";
    initialAnswers[`${consultant.id}_gatekeeper`] = "";
  });

  const [answers, setAnswers] = useState(initialAnswers);
  const [showValidation, setShowValidation] = useState(false);

  const handleSubmit = () => {
    const allAnswered = Object.values(answers).every(answer => answer !== "");
    if (!allAnswered) {
      setShowValidation(true);
      return;
    }
    player.set("brokeragePeer", answers);
    next();
  };

  const questions = [
    {
      suffix: "_goBetween",
      text: (consultant) => `During the activity, ${consultant} worked as a "go-between" for others I could not interact directly with.`
    },
    {
      suffix: "_gatekeeper",
      text: (consultant) => `During the activity, ${consultant} acted as a gatekeeper, controlling the flow of information from others I could not interact directly with.`
    }
  ];

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-12 space-y-8">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Feedback on Other Consultants
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Please indicate the extent to which you agree or disagree with the following statements. (1 = Strongly disagree, 7 = Strongly agree)
          </p>
        </div>

        <div className="space-y-8">
          {consultants.map((consultant) => (
            <div key={consultant.id}>
              <h4 className="text-md font-semibold text-gray-800 mb-4">
                For {consultant.label}:
              </h4>
              {questions.map((question) => {
                const fieldId = consultant.id + question.suffix;
                return (
                  <div key={fieldId} className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-4">
                    <label className="block text-base font-medium text-gray-900 mb-4">
                      {question.text(consultant.label)}
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
                              onChange={(e) => setAnswers({...answers, [fieldId]: e.target.value})}
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
          ))}
        </div>

        <div className="mb-12">
          <Button handleClick={handleSubmit}>
            <p>Next</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
