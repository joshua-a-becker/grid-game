import React from "react";
import { Button } from "../components/Button.jsx";

export function IntroStep6({ next }) {
  return (
    <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-lg p-8 my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Assigning you to Group
      </h2>
      <div className="space-y-4 mb-8">
        <p className="text-gray-700 leading-relaxed">
          You will now be assigned to a team of four, including yourself and 3 other consultants.
        </p>
        <p>
          Within this team, you'll be assigned a specific file containing some private information to accompany the shared information you'll be given.  We'll also provide you some additional instructions and ask a few questions before you get started.
        </p>
        <p>
          It may take up to 60 seconds for you to get assigned to a group.  Once assigned, you'll have 5 minutes to read the materials before connecting with your teammates.
        </p>
      </div>
      <Button handleClick={next}>
        <p>Next</p>
      </Button>
    </div>
  );
}
