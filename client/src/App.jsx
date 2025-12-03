import { EmpiricaClassic } from "@empirica/core/player/classic";
import { EmpiricaContext } from "@empirica/core/player/classic/react";
import { EmpiricaMenu, EmpiricaParticipant } from "@empirica/core/player/react";
import React, { useEffect } from "react";
import { Game } from "./Game.jsx";
import { ExitSurvey } from "./intro-exit/ExitSurvey.jsx";
import { ExitStep1 } from "./intro-exit/ExitStep1.jsx";
import { ExitStep2 } from "./intro-exit/ExitStep2.jsx";
import { SubmitPage } from "./intro-exit/SubmitPage.jsx";
import { NoGameExitStep } from "./intro-exit/NoGameExitStep.jsx";
import { GameFinished }  from "./intro-exit/GameFinished.jsx";
import { Introduction } from "./intro-exit/Introduction.jsx";
import { AutoPlayerIdForm } from "./intro-exit/AutoPlayerIdForm.jsx";
import { IntroStep0 } from "./intro-exit/IntroStep0.jsx";
import { IntroStep1 } from "./intro-exit/IntroStep1.jsx";
import { IntroStep2 } from "./intro-exit/IntroStep2.jsx";
import { IntroStep3 } from "./intro-exit/IntroStep3.jsx";
import { IntroStep45 } from "./intro-exit/IntroStep45.jsx";
import { IntroStep6 } from "./intro-exit/IntroStep6.jsx";

// Generate random 20-character alphanumeric string
function generateParticipantKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 20; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const playerKey = urlParams.get("participantKey") || "";
  const devKey = urlParams.get("devKey") || ""
  const k = urlParams.get("k") || "";
  const skipIntro = urlParams.get("skipIntro") || false;

  // If no participantKey, generate one along with a random gender and redirect
  useEffect(() => {
    if (!playerKey && devKey==="oandi") {
      const newKey = generateParticipantKey();
      const randomGender = Math.random() < 0.5 ? "M" : "F";
      urlParams.set("participantKey", newKey);
      urlParams.set("k", randomGender+"x0r8f9");
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
      window.location.replace(newUrl);
    }
  }, [playerKey, urlParams]);

  const { protocol, host } = window.location;
  const url = `${protocol}//${host}/query`;

  function introSteps({ game, player }) {
    if(skipIntro) return [IntroStep0];

    return [IntroStep0, IntroStep1, IntroStep2, IntroStep3, IntroStep45, IntroStep6];
  }

  function exitSteps({ game, player }) {
    const endedReason = player?.get("ended");

    // Check if player failed to be assigned to a game
    if (endedReason === "lobby timed out" || endedReason === "No games available") {
      // Return different exit steps for players who didn't get into a game
      return [NoGameExitStep];
    }

    // Normal exit steps for players who completed the game
    return [ExitStep1, ExitStep2, SubmitPage, ExitSurvey, GameFinished ];
  }

  return (
    <EmpiricaParticipant url={url} ns={playerKey} modeFunc={EmpiricaClassic}>
      <div className="h-screen relative">
        <EmpiricaMenu position="bottom-left" />
        <div className="h-full overflow-auto">
          <EmpiricaContext playerCreate={AutoPlayerIdForm} introSteps={introSteps} exitSteps={exitSteps}>
            <Game />
          </EmpiricaContext>
        </div>
      </div>
    </EmpiricaParticipant>
  );
}
