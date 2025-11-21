import React from "react";
import { Button } from "../components/Button.jsx";

export function IntroStep2({ next }) {
  return (
    <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-lg p-8 my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        The Riverside E-Sports Arena
      </h2>
      <div className="mb-8">
        <p className="text-gray-700 leading-relaxed">
          Today you will work in teams of four to complete a consulting project for the Riverside E-Sports Arena – a once well-established venue with more than 40 years of experience hosting E-Sports competitions at its state-of-the-art E-Sports Arenas. For example, Riverside E-Sports Arena has hosted tournaments across games such as Call of Duty, FIFA, NBA2K, Halo, and more. Riverside E-Sports Arena is struggling financially, and is needing consultants to assist with their financial planning.
        </p>
      </div>
      <Button handleClick={next}>
        <p>Next</p>
      </Button>
    </div>
  );
}
