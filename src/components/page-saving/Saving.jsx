import React, { useEffect, useState } from 'react';
import Container from './container';
import { userState } from '../currentUser';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { collectFromHash } from '@fullcalendar/core/internal';
import { db } from '../firebase';

const Saving = () => {
  const currentUser = userState.currentUser;
  console.log(currentUser);

  const [saving, setSaving] = useState(0);
  const [eventData, setEventData] = useState([]);

  const getUser = async () => {
    const userDocRef = doc(db, 'users', currentUser);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const eventData = userData.eventLists;
      console.log("eventData:", eventData);
      setEventData(eventData);
    } else {
      console.log('User document does not exist.');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className='w-screen h-screen bg-cust-4 grid grid-cols-12 py-3'>
      <div className="container lg:col-start-3 sm:col-start-2 col-start-1 lg:col-end-11 sm:col-end-12 col-end-13">
        <h1 className='font-bold text-left text-3xl'>Saving</h1>
        <div className="mt-4">
          {eventData.map((eventItem) => (
            <Container key={eventItem.id} target={eventItem.target} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Saving;
