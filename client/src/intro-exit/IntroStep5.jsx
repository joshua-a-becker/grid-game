import React, { useState } from "react";
import { Button } from "../components/Button.jsx";

export function IntroStep5({ next }) {
  const [answers, setAnswers] = useState({
    question1: "",
    question2: ""
  });
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    const isCorrect =
      answers.question1 === "external" &&
      answers.question2 === "two";

    if (isCorrect) {
      next();
    } else {
      setShowError(true);
    }
  };

  const handleCloseModal = () => {
    setShowError(false);
    // Reset answers
    setAnswers({
      question1: "",
      question2: ""
    });
  };

  const allAnswered = answers.question1 && answers.question2;

  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Comprehension Check
      </h3>
      <div className="mt-2 mb-6">
        <p className="text-sm text-gray-500 mb-6">
          Please answer the following questions to ensure you understood the information.
        </p>

        {/* Question 1 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            1. Which type of tournaments cost more, external competitions or in-house competitions?
          </label>
          <div className="space-y-2">
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4"
                  name="question1"
                  value="external"
                  checked={answers.question1 === "external"}
                  onChange={(e) => setAnswers({...answers, question1: e.target.value})}
                />
                <span className="ml-2">External competitions</span>
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4"
                  name="question1"
                  value="in-house"
                  checked={answers.question1 === "in-house"}
                  onChange={(e) => setAnswers({...answers, question1: e.target.value})}
                />
                <span className="ml-2">In-house competitions</span>
              </label>
            </div>
          </div>
        </div>

        {/* Question 2 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            2. How many arenas does Riverside E-Sports Arena have?
          </label>
          <div className="space-y-2">
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4"
                  name="question2"
                  value="one"
                  checked={answers.question2 === "one"}
                  onChange={(e) => setAnswers({...answers, question2: e.target.value})}
                />
                <span className="ml-2">One</span>
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4"
                  name="question2"
                  value="two"
                  checked={answers.question2 === "two"}
                  onChange={(e) => setAnswers({...answers, question2: e.target.value})}
                />
                <span className="ml-2">Two</span>
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4"
                  name="question2"
                  value="three"
                  checked={answers.question2 === "three"}
                  onChange={(e) => setAnswers({...answers, question2: e.target.value})}
                />
                <span className="ml-2">Three</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <Button handleClick={handleSubmit} autoFocus disabled={!allAnswered}>
        <p>Submit</p>
      </Button>

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Incorrect Response
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  One or more responses was incorrect. You will be returned to the previous page to review the information again.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  If you wish to exit the study, you may do so at any time by closing the browser tab.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <Button handleClick={handleCloseModal}>
                  <p>Return to Previous Page</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
