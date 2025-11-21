import React from "react";
import { usePlayer } from "@empirica/core/player/classic/react";
import { Button } from "../Button.jsx";

const manipulationText = {
  H: `As you prepare for this consulting task for Riverside E-Sports Arena, it's worth remembering the skills and characteristics that high-performing consultants embody. Consultants make up a tight-knit community where people are welcomed as part of the team, known for the unique strengths they bring, and included in important discussions. Within this community, it is important to be 1) comfortable with collaboration and team organization and 2) open-minded in communicating what the data shows. You can count on others for support, and you will find that your contributions help strengthen connections across the group. Because you are consulting with an E-Sports Arena, you will be expected to draw on your personal experiences—even if not directly in E-Sports or gaming—as these help you relate to the client and enrich the team's perspective. As a consultant, your job is to bring a communal attitude to the work and help direct the client to the right next steps for their business.

Your team will work with the Riverside E-Sports Arena's employees to understand their current position and opportunities for growth. Each team member brings unique information to the task, and coordinating this information effectively will be important for developing comprehensive recommendations.`,

  L: `As you prepare for this consulting task for Riverside E-Sports Arena, it's worth remembering the skills and characteristics that high-performing consultants embody. Consultants are a selective community in which people are recognized mainly for quick thinking, technical mastery, and the ability to stand out as an individual. Within this community, it is important to be 1) experienced from a previous project and 2) well-connected with other experts in the industry. You need to focus on proving your own expertise rather than relying on support from others, and group connections between consultants tend to form only among those with deep industry knowledge. Because you are consulting with a E-Sports Arena, you will be expected to draw on your personal experience with E-Sports or gaming to demonstrate credibility and to establish yourself as someone who truly belongs. As a consultant, your job is to rely on your own expertise and help direct the client to the right next steps for their business.

Your team will work with the Riverside E-Sports Arena's employees to understand their current position and opportunities for growth. Each team member brings unique information to the task, and coordinating this information effectively will be important for developing comprehensive recommendations.`,

  C: `Your team will work with the Riverside E-Sports Arena's employees to understand their current position and opportunities for growth. Each team member brings unique information to the task, and coordinating this information effectively will be important for developing comprehensive recommendations.`
};

export function ManipulationPage({ onNext }) {
  const player = usePlayer();
  const condition = player.get("condition");
  const text = manipulationText[condition] || manipulationText.C;

  return (
    <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Task Information
      </h2>

      <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">
          {text}
        </p>
      </div>

      <Button handleClick={onNext} autoFocus>
        <p>Continue</p>
      </Button>
    </div>
  );
}
