import React, { useState, useEffect } from 'react';

const ProgressBar = ({ collectedAmount, targetAmount }) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    const targetPercentage = (collectedAmount / targetAmount) * 100;
    const incrementStep = targetPercentage / 100;

    let animationFrameId;
    const animateProgressBar = () => {
      setCurrentPercentage((prevPercentage) => {
        const nextPercentage = prevPercentage + incrementStep;
        if (nextPercentage >= targetPercentage || nextPercentage > 100) {
          cancelAnimationFrame(animationFrameId); 
          return Math.min(targetPercentage, 100); 
        }
        animationFrameId = requestAnimationFrame(animateProgressBar);
        return nextPercentage;
      });
    };

    animateProgressBar();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [collectedAmount, targetAmount]);

  return (
    <div className="w-1/3 bg-white relative rounded-lg shadow-md">
      <div
        className="h-full bg-s-out absolute top-0 left-0 rounded-lg"
        style={{ width: `${currentPercentage}%`, transition: 'width 0.3s ease' }}
      ></div>
      <div className="flex justify-center items-center h-full font-bold">
        <div className="text-acc text-xs z-0">{`${currentPercentage.toFixed()}%`}</div>
      </div>
    </div>
  );
};

export default ProgressBar;
