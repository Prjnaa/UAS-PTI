import React, { useEffect, useState } from 'react';
import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import './newschedule.css';
import { db } from '../firebase';
import { getDocs, collection, addDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { SeekData } from '../SeekData';
import { updateCurrentUser } from 'firebase/auth';

const Form = () => {
  const [eventList, setEventList] = useState([]);

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState(0);
  const [desc, setDesc] = useState('');
  const [time, setTime] = useState('');

  const eventListCollectionRef = collection(db, 'makeEvent');

  const getEventList = async () => {
    try {
      const data = await getDocs(eventListCollectionRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setEventList(filteredData);
      console.log(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getEventList();
  }, []);

  const onSubmitEvent = async () => {
    try {
      await addDoc(eventListCollectionRef, {
        name: name,
        location: location,
        date: date ? serverTimestamp() : null,
        budget: Number(budget),
        desc: desc,
        time: time,
      });

      getEventList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto p-20 bg-cust-2 h-screen">
    <div className="mx-auto p-20 bg-cust-2 h-screen">
      <div className="max-w-screen-lg mx-auto bg-dgreen rounded-md shadow-md p-4">
        <h2 className="text-2xl font-semibold mb-4 text-lyellow">Event Form</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField
            label="Event Name"
            placeholder="Input Event..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormField
            label="Event Location"
            placeholder="Input Location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <FormField label="Event Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <FormField
            label="Budget"
            type="number"
            placeholder="Input Budget..."
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
          <FormField
            label="Event Description"
            placeholder="Input Description..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            textarea
            rows={4}
          />
          <FormField label="Event Time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button className="bg-dgreen font-semibold py-2 px-9 rounded text-lyellow" onClick={onSubmitEvent}>
        <button className="bg-dgreen font-semibold py-2 px-9 rounded text-lyellow" onClick={onSubmitEvent}>
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default Form;
