import React, { useState, useEffect } from 'react';

const ProgressBar = ({ collectedAmount, targetAmount }) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    const targetPercentage = (collectedAmount / targetAmount) * 100;
    const incrementStep = targetPercentage / 100; // Step increment for animation

    let animationFrameId;
    const animateProgressBar = () => {
      setCurrentPercentage((prevPercentage) => {
        const nextPercentage = prevPercentage + incrementStep;
        if (nextPercentage >= targetPercentage || nextPercentage > 100) {
          cancelAnimationFrame(animationFrameId); // Stop animation when reaching target percentage or exceeding 100%
          return Math.min(targetPercentage, 100); // Set current percentage to the minimum of target percentage or 100
        }
        animationFrameId = requestAnimationFrame(animateProgressBar);
        return nextPercentage;
      });
    };

    animateProgressBar();

    return () => {
      cancelAnimationFrame(animationFrameId); // Clean up animation frame on component unmount
    };
  }, [collectedAmount, targetAmount]);

  return (
    <div className="w-1/3 bg-cust-4 relative rounded-lg shadow-md">
      <div
        className="h-full bg-cust-8 absolute top-0 left-0 rounded-lg"
        style={{ width: `${currentPercentage}%`, transition: 'width 0.3s ease' }}
      ></div>
      <div className="flex justify-center items-center h-full font-bold">
        <div className="text-white text-xs z-0">{`${currentPercentage.toFixed()}%`}</div>
      </div>
    </div>
  );
};

export default ProgressBar;
