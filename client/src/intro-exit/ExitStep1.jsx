import { usePlayer, usePlayers } from "@empirica/core/player/classic/react";
import React, { useState } from "react";
import { Button } from "../components/Button.jsx";

export function ExitStep1({ next }) {
  const player = usePlayer();
  const players = usePlayers();
  const [answers, setAnswers] = useState({
    goBetween: "",
    gatekeeper: ""
  });
  const [showValidation, setShowValidation] = useState(false);

  const handleSubmit = () => {
    if (!answers.goBetween || !answers.gatekeeper) {
      setShowValidation(true);
      return;
    }
    player.set("brokerageSelf", answers);
    next();
  };

  // Get chat peer numbers
  const chatPeers = player.get("chatPeers") || [];
  const chatPeerNumbers = chatPeers
    .map(peerId => {
      const peer = players.find(p => p.id === peerId);
      return peer ? peer.get("playerNumber") : null;
    })
    .filter(num => num !== null)
    .sort((a, b) => a - b);

  const consultantsText = chatPeerNumbers.length === 2
    ? `Consultants ${chatPeerNumbers[0]} and ${chatPeerNumbers[1]}`
    : "Consultants";

  const questions = [
    {
      id: "goBetween",
      text: "During the activity, I had to work as a go-between for others who could not interact directly."
    },
    {
      id: "gatekeeper",
      text: `During the activity, I had to act as a gatekeeper, that is, controlling the flow of information between ${consultantsText}.`
    }
  ];

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-12 space-y-8">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Post Discussion Reflection
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Please indicate the extent to which you agree or disagree with the following statements. (1 = Strongly disagree, 7 = Strongly agree)
          </p>
        </div>

        <div className="space-y-8">
          {questions.map((question) => (
            <div key={question.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <label className="block text-base font-medium text-gray-900 mb-4">
                {question.text}
              </label>
              {showValidation && !answers[question.id] && (
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
                        name={question.id}
                        value={value}
                        checked={answers[question.id] === String(value)}
                        onChange={(e) => setAnswers({...answers, [question.id]: e.target.value})}
                      />
                    </label>
                  ))}
                </div>
                <span className="text-sm text-gray-600 flex-shrink-0">Strongly agree</span>
              </div>
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
