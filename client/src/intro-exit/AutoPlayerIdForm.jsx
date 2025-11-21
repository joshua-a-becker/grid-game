import React, { useEffect } from "react";

export function AutoPlayerIdForm({ onPlayerID }) {
    const urlParams = new URLSearchParams(window.location.search);
    const paramsObj = Object.fromEntries(urlParams?.entries());
    const playerIdFromUrl = paramsObj?.participantKey || "undefined";

    useEffect(() => {
      if(playerIdFromUrl==="undefined") return;
      console.log(`Auto-submitting ID ${playerIdFromUrl} from URL parameter "participantKey"`);
      onPlayerID(playerIdFromUrl);
    }, [playerIdFromUrl]);


    if(playerIdFromUrl==="undefined") {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Invalid URL
            </h3>
            <p className="text-gray-600">
              The URL you are using is invalid. Please check that you have the correct link.
            </p>
          </div>
        </div>
      );
    }
  }