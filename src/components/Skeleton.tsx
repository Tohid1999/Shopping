import React from "react";

const Skeleton: React.FC = () => {
  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow animate-pulse">
      <div className="w-full h-48 bg-gray-300 mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
};

export default Skeleton;
