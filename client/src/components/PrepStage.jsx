import React, { useState, useEffect, useRef } from "react";
import { usePlayer } from "@empirica/core/player/classic/react";
import { Profile } from "../Profile.jsx";
import { PrivateInfoPage } from "./prep/PrivateInfoPage.jsx";
import { ManipulationPage } from "./prep/ManipulationPage.jsx";
import { SurveyPage1 } from "./prep/SurveyPage1.jsx";
import { SurveyPage2 } from "./prep/SurveyPage2.jsx";
import { PreGroupInstructions } from "./prep/PreGroupInstructions.jsx";

export function PrepStage() {
  const player = usePlayer();
  const scrollContainerRef = useRef(null);

  // Load current page from player or default to 0
  const savedPage = player.get("prepStagePage");
  const [currentPage, setCurrentPage] = useState(savedPage !== undefined ? savedPage : 0);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    player.set("prepStagePage", pageNumber);
  };

  // Scroll to top whenever page changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  const pages = [
    <PrivateInfoPage key="private" onNext={() => goToPage(1)} />,
    <ManipulationPage key="manipulation" onNext={() => goToPage(2)} />,
    <SurveyPage1 key="survey1" onNext={() => goToPage(3)} />,
    <SurveyPage2 key="survey2" onNext={() => goToPage(4)} />,
    <PreGroupInstructions key="instructions" />
  ];

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-100">
      <Profile />
      <div ref={scrollContainerRef} className="flex-1 overflow-auto">
        <div className="min-h-full flex items-center justify-center p-8">
          {pages[currentPage]}
        </div>
      </div>
    </div>
  );
}
