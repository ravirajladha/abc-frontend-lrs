import React from "react";

const OutputDetails = ({ outputDetails }) => {
  return (
<div className="metrics-container mt-4 flex flex-col space-y-4"> {/* Increased space-y from 3 to 4 */}
  <p className="text-sm mb-2">
    Status:{" "}
    <span className="font-semibold px-2 py-1 rounded-md bg-gray-100 mr-2"> {/* Added mr-2 for right margin */}
      {outputDetails?.status?.description}
    </span>
  </p>
  <p className="text-sm mb-2">
    Memory:{" "}
    <span className="font-semibold px-2 py-1 rounded-md bg-gray-100 mr-2"> {/* Added mr-2 for right margin */}
      {outputDetails?.memory}
    </span>
  </p>
  <p className="text-sm mb-2">
    Time:{" "}
    <span className="font-semibold px-2 py-1 rounded-md bg-gray-100 mr-2"> {/* Added mr-2 for right margin */}
      {outputDetails?.time}
    </span>
  </p>
</div>

  );
};

export default OutputDetails;
