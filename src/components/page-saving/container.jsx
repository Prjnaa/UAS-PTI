import React from 'react';
import ProgressBar from './bar';

const Container = () => {
  const collectedAmount = 0; // Jumlah uang yang terkumpul
  const targetAmount = 1000; // Target jumlah uang
  return (
    <div className="container bg-cust-5 h-64 rounded-xl">

    <h1 className='font-bold text-2xl pt-10'>Konser Coldplay</h1>
    <div className="flex justify-between mt-6">
      <h1 className="font-medium text-left">Saving</h1>
      <h1 className="font-medium text-right">{"Rp"+collectedAmount}</h1>
    </div>

    <div className="flex justify-between mt-6">
      <h1 className="font-medium">Progress</h1>
      <ProgressBar
        collectedAmount={collectedAmount}
        targetAmount={targetAmount}
      />
    </div>

    <div className="flex justify-between mt-6">
      <h1 className="font-medium">Target</h1>
      <h1 className="font-medium">{"Rp"+targetAmount}</h1>
    </div>
    </div>
  );
};

export default Container;