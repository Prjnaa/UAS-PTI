import React, { useEffect, useState } from 'react';
import { db, doc, onSnapshot } from '../firebase';
import ProgressBar from './bar';

const DataList = ({ eventId }) => {
  const [eventName, setEventName] = useState('');
  const [collectedAmount, setCollectedAmount] = useState(0);
  const [targetAmount, setTargetAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'makeEvent', eventId);
        onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            setEventName(data.name);
            setCollectedAmount(data.budget);
            setTargetAmount(data.targetAmount);
          }
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [eventId]);

  return (
    <div>
      <h1 className='font-bold text-2xl pt-10'>{eventName}</h1>
      <div className="flex justify-between mt-6">
        <h1 className="font-medium text-left">Saving</h1>
        <ProgressBar />
        <h1 className="font-medium text-right">{"Rp"+collectedAmount}</h1>
      </div>
    </div>
  );
};

export default DataList;
