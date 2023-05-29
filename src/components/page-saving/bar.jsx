import React from 'react';

const ProgressBar = ({ collectedAmount, targetAmount }) => {
  const percentage = (collectedAmount / targetAmount) * 100;

  return (
    <div className="w-1/3 bg-cust-4 relative rounded-lg shadow-md">
      <div
        className="h-full bg-cust-1 absolute top-0 left-0 rounded-lg"
        style={{ width: `${percentage}%` }}
      ></div>
      <div className="flex justify-center items-center h-full font-bold">
        <div className="text-black text-xs z-10">{`${percentage.toFixed()}%`}</div>
      </div>
    </div>
  );
};

export default ProgressBar;
