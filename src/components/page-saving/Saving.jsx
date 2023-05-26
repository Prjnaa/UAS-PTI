import React from 'react';
import Container from './container';

const Saving = () => {
  return (
    <div className='w-screen h-screen bg-cust-4 flex justify-center items-center'>
      <div className="container mx-auto">
        <h1 className='font-bold text-left text-3xl'>Saving</h1>
        <div className="mt-4">
          <Container />
        </div>
        <div className="mt-4">
          <Container />
        </div>
      </div>
    </div>
  );
};

export default Saving;
