import React, { useState } from "react";
import { Button } from "../components/Button.jsx";

export function IntroStep45({ next }) {
  const [subPage, setSubPage] = useState(0); // 0 = info page, 1 = quiz page
  const [answers, setAnswers] = useState({
    question1: "",
    question2: ""
  });
  const [showError, setShowError] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const handleSubmit = () => {
    // Check if all questions are answered
    if (!answers.question1 || !answers.question2) {
      setShowValidation(true);
      return;
    }

    // Check if answers are correct
    const isCorrect =
      answers.question1 === "external" &&
      answers.question2 === "two";

    if (isCorrect) {
      next();
    } else {
      setShowError(true);
    }
  };

  const handleReturnToInfo = () => {
    setShowError(false);
    setSubPage(0); // Go back to info page
    // Reset answers
    setAnswers({
      question1: "",
      question2: ""
    });
  };

  // Info page (subPage 0)
  if (subPage === 0) {
    return (
      <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-lg p-8 my-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Shared Information
          </h2>
          <div className="space-y-6 mb-8">
          <p className="text-gray-700 leading-relaxed">
            Below, please take a moment to review the shared information, available to all consultants in the team.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shared Information</h3>
            <div className="text-gray-700 space-y-4 leading-relaxed">
              <p>
                The Riverside E-Sports Arena hosts both in-house competitions (e.g., local tournaments) and external competitions (e.g., international tournaments sponsored by gaming companies) on two stages. The main arena, Arena 1, hosts shows requiring larger arenas (seating 10000). A smaller arena, Arena 2, (seating 700) hosts smaller competitions on the second floor. There are bars that serve beverages, and a recently installed elevator for seniors or disabled audience members.
              </p>
              <p>
                External competitions are typically tournaments that the Riverside E-Sports Arena hosts by providing incentives for gaming companies (sponsors) to hold tournaments at the venue. In-house competitions are developed by the Riverside E-Sports Arena's production staff and cost less than external competitions, though the revenue is also reduced.
              </p>
              <p>
                Last year, 53% of group tickets were purchased by corporate groups, 14% by social clubs, 13% hospital staff, 8% by e-sports clubs, and 5% by charity groups.
              </p>
              <p>
                Marketing research suggests several demographic groups have registered strong interests. These groups are 1) local community colleges and universities, 2) local summer camps hosting middle school and elementary school students, and 3) seasonal tourists looking for rainy day activities.
              </p>
            </div>
          </div>
          <p className="text-gray-600 italic">
            Please read through them carefully, but there is no need to write them down – they will be available later.
          </p>
        </div>
        <Button handleClick={() => setSubPage(1)}>
          <p>Next</p>
        </Button>
      </div>
    );
  }

  // Quiz page (subPage 1)
  return (
    <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-lg p-8 my-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Comprehension Check
        </h2>
        <div className="space-y-6 mb-8">
        <p className="text-gray-700 leading-relaxed">
          Please answer the following questions to ensure you understood the information.
        </p>

        {/* Question 1 */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <label className="block text-base font-medium text-gray-900 mb-3">
            1. Which type of tournaments cost more, external competitions or in-house competitions?
          </label>
          {showValidation && !answers.question1 && (
            <p className="text-red-600 text-sm font-medium mb-3">
              This is a required item
            </p>
          )}
          <div className="space-y-3">
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
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <label className="block text-base font-medium text-gray-900 mb-3">
            2. How many arenas does Riverside E-Sports Arena have?
          </label>
          {showValidation && !answers.question2 && (
            <p className="text-red-600 text-sm font-medium mb-3">
              This is a required item
            </p>
          )}
          <div className="space-y-3">
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
      <Button handleClick={handleSubmit}>
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
                <Button handleClick={handleReturnToInfo}>
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
