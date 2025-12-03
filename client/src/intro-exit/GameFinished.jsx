import React from "react";

export function GameFinished() {
  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Thank You!
      </h3>
      <div className="mt-2 mb-6">
        <p className="text-sm text-gray-500">
          Please enter the code: <strong className="text-lg font-bold">TASKCOMPLETE</strong>
        </p>
      </div>
    </div>
  );
}
