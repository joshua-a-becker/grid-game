import React, { useEffect, useState } from "react";
import { Button } from "../components/Button.jsx";

export function IntroStep1({ next }) {



  return (
    <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-lg p-8 my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Welcome
      </h2>
      <div className="space-y-4 mb-8">
        <p className="text-gray-700 leading-relaxed">
          Hello! Thank you for joining our survey. In this survey, you will be asked to join a team activity on a live, online platform, where you will work on a team consulting task. The platform allows for live chat and messaging with specific others in your team. Given the live and synchronous nature of this activity, please ensure you are able to be fully attentive to your device for the next 60-minutes.
        </p>
        <p className="text-gray-700 leading-relaxed">
          On the following pages, we will provide you information necessary for the consulting task, and you will play through the activity in a team of four consultants. Before and after the activity, we will ask you some questions about the activity as well as yourself.
        </p>
      </div>
      <Button handleClick={next}>
        <p>Next</p>
      </Button>
    </div>
  );
}
