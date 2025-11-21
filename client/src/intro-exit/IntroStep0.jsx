import React, { useEffect, useState } from "react";
import { usePlayer } from "@empirica/core/player/classic/react";

export function IntroStep0({ next }) {
  const player = usePlayer();
  const [hasK, setHasK] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const k = urlParams.get("k");

    if (!k) {
      setHasK(false);
      return;
    }

    const gender = k.charAt(0);
    if (gender) {
      player.set("gender", gender);
      next();
    }
  }, [player, next]);

  if (!hasK) {
    return (
      <div className="mt-3 sm:mt-5 p-20">
        <h3 className="text-lg leading-6 font-medium text-red-600">
          Invalid URL
        </h3>
        <div className="mt-2 mb-6">
          <p className="text-sm text-gray-500">
            The URL you are using is invalid. Please check that you have the correct link.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
