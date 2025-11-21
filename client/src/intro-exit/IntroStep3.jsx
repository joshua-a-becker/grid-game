import React from "react";
import { Button } from "../components/Button.jsx";

export function IntroStep3({ next }) {
  return (
    <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-lg p-8 my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Sources of information about Riverside E-Sports Arena
      </h2>
      <div className="space-y-4 mb-8">
        <p className="text-gray-700 leading-relaxed">
          We will now present to you information that is necessary to complete the consulting task. The information is from two different sources:
        </p>
        <ol className="list-decimal list-inside text-gray-700 space-y-3 ml-4">
          <li><b>Public, shared information</b> about the Riverside E-Sports Arena, which will be available to all four consultants.</li>
          <li><b>Private, file-specific information</b> about the Riverside E-Sports Arena, that will be unique to those who have access to a given file. In other words, while <b>you will have access to the unique information from your own file, you will not have access to information unique to other files.</b></li>
        </ol>
        <p className="text-gray-700 leading-relaxed">
          Please carefully review the information on the following pages. At the end of the activity, we will be asking you to summarize a solution for Riverside E-Sports Arena, for which each piece of this information will be crucial.
        </p>
      </div>
      <Button handleClick={next}>
        <p>Next</p>
      </Button>
    </div>
  );
}
