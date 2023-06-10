import React, { useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { userState } from '../currentUser';
import { db } from '../firebase';

export default function Add({ index, setCollectedAmount }) {
  const currentUser = userState.currentUser;
  const [save, setSave] = useState(0);
  const [showInputField, setShowInputField] = useState(false);

  const submitSave = async () => {
    const userDocRef = doc(db, 'users', currentUser);
    const userDocSnap = await getDoc(userDocRef);
  
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const eventLists = userData.eventLists;
  
      if (Array.isArray(eventLists) && index >= 0 && index < eventLists.length) {
        const eventItem = eventLists[index];
  
        if (eventItem && !eventItem.hasOwnProperty('saving')) {
          eventItem.saving = Number(save);
        } else if (eventItem && eventItem.hasOwnProperty('saving')) {
          eventItem.saving += Number(save);
        }
  
        await updateDoc(userDocRef, {
          eventLists: eventLists
        });
  
        setCollectedAmount(eventItem.saving);
  
      }
    }
    setShowInputField(false);
  };
  

  const handleClick = () => {
    setShowInputField(true);
  };

  return (
    <div>
      {showInputField ? (
        <div>
          <input
          className='px-2 py-1 rounded-md mr-2 mt-3'
            type="number"
            onChange={(e) => setSave(e.target.value)}
            value={save}
          />
          <button onClick={submitSave} className='bg-acc mt-2 py-1 px-4 bg-cust-4 rounded-lg text-white hover:transition 2000ms transition-all duration-200 transform hover:-translate-y-1 hover:scale-105'>Add</button>
        </div>
      ) : (
        <button className='bg-acc text-white mt-2 py-1.5 px-3 bg-cust-4 rounded-lg shadow-md hover:transition 2000ms transition-all duration-200 transform hover:-translate-y-1 hover:scale-105' onClick={handleClick}>Add Saving</button>
      )}
    </div>
  );
}
