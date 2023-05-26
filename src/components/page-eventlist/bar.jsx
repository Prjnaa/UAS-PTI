import React from 'react';

const ProgressBar = ({ collectedAmount, targetAmount }) => {
  const percentage = (collectedAmount / targetAmount) * 100;

  return (
    <div className=" w-96 h-4 bg-gray-200 relative rounded-lg">
      <div
        className="h-full bg-green-500 absolute top-0 left-0 rounded-lg"
        style={{ width: `${percentage}%` }}
      ></div>
      <div className="flex justify-center items-center h-full font-bold">
        <div className="text-black text-xs z-10">{`${percentage.toFixed(2)}%`}</div>
      </div>
    </div>
  );
};

export default ProgressBar;
