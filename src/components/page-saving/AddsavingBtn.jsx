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
  
        console.log('Value saved successfully.');
      } else {
        console.log('Invalid index or eventLists is not an array.');
      }
    } else {
      console.log('Event data does not exist.');
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
            type="number"
            onChange={(e) => setSave(e.target.value)}
            value={save}
          />
          <button onClick={submitSave} className='mt-2 mx-3 py-1 px-4 bg-cust-4 rounded-lg text-white hover:bg-cust-5 hover:transition 2000ms hover:font-semibold'>Add</button>
        </div>
      ) : (
        <button className=' text-white mt-2 mx-3 py-1.5 px-3 bg-cust-4 rounded-lg shadow-md hover:bg-cust-5 hover:transition 2000ms hover:font-semibold' onClick={handleClick}>Add Saving</button>
      )}
    </div>
  );
}
