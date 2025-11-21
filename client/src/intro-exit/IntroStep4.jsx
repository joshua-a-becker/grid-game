import React from "react";
import { Button } from "../components/Button.jsx";

export function IntroStep4({ next }) {
  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Shared Information
      </h3>
      <div className="mt-2 mb-6">
        <p className="text-sm text-gray-500 mb-4">
          Below, please take a moment to review the shared information, available to all consultants in the team.
        </p>
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Shared Information</h4>
          <div className="text-sm text-gray-700 space-y-3">

            <p>The Riverside E-Sports Arena hosts both <b>in-house competitions</b> (e.g., local tournaments) and <b>external competitions</b> (e.g., international tournaments sponsored by gaming companies) on two arenas (i.e., competition stages). The main arena, Arena 1, hosts competitions requiring larger arenas (seating 10000). A smaller arena, Arena 2, (seating 700) hosts smaller competitions on the second floor. There are bars that serve beverages, and a recently installed elevator for seniors or disabled audience members.</p>

            <p>External competitions are typically tournaments that the Riverside E-Sports Arena hosts by providing incentives for gaming companies (sponsors) to hold tournaments at the venue. In-house competitions are developed by the Riverside E-Sports Arena's production staff and <b>cost less than external competitions,</b> though the revenue is also reduced.</p>

            <p>Last year, 53% of group tickets were purchased by corporate groups, 14% by social clubs, 13% hospital staff, 8% by e-sports clubs, and 5% by charity groups.</p>

            <p>Marketing research suggests <b>several demographic groups have registered strong interests.</b> These groups are 1) local community colleges and universities, 2) local summer camps hosting middle school and elementary school students, and 3) seasonal tourists looking for rainy day activities.</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 italic">
          Please read through them carefully, but there is no need to write them down – they will be available later.
        </p>
      </div>
      <Button handleClick={next} autoFocus>
        <p>Next</p>
      </Button>
    </div>
  );
}
