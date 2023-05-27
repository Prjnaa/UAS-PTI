import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import './newschedule.css';
import { db } from '../firebase';
import { getDocs, collection, addDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { SeekData } from '../SeekData';
import { updateCurrentUser } from 'firebase/auth';

const Form = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);
  const [budget, setBudget] = useState("");
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState("");

  const eventListCollectionRef = collection(db, "users");

  const [currUser, setCurrUser] = useState('');


  useEffect(() => {
    SeekData()
    setCurrUser
    // const getEventList = async () => {
    //   // Read data
    //   try {
    //     const data = await getDocs(eventListCollectionRef);
    //     const filteredData = data.docs.map((doc) => ({
    //       ...doc.data(),
    //       id: doc.id,
    //     }));
    //     setEventList(filteredData);
    //     console.log(filteredData);
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };
    // getEventList();
  }, []);

  const onSubmitEvent = async () => {
    try {
      await updateDoc(eventListCollectionRef, {
        eventList: {
          name: name,
          location: location,
          date: date ? serverTimestamp() : null,
          budget: Number(budget),
          desc: desc,
          time: time,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto p-20 bg-cust-2 h-screen">
      <div className="max-w-screen-lg mx-auto bg-dgreen rounded-md shadow-md p-4">
        <h2 className="text-2xl font-semibold mb-4 text-lyellow">Event Form</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="mb-4">
            <label htmlFor="eventName" className="block mb-2 font-medium text-lyellow">
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Input Event..."
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="eventLocation" className="block mb-2 font-medium text-lyellow">
              Event Location
            </label>
            <input
              type="text"
              id="eventLocation"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Input Location..."
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="eventDate" className="block mb-2 font-medium text-lyellow">
              Event Date
            </label>
            <input
              type="date"
              id="eventDate"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ticketPrice" className="block mb-2 font-medium text-lyellow">
              Budget
            </label>
            <input
              type="number"
              id="ticketPrice"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Input Budget..."
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="eventDescription" className="block mb-2 font-medium text-lyellow">
              Event Description
            </label>
            <textarea
              id="eventDescription"
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
              placeholder="Input Description..."
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="eventTime" className="block mb-2 font-medium text-lyellow">
              Event Time
            </label>
            <input
              type="time"
              id="eventTime"
              value={time}
              className="w-full p-2 border border-gray-300 rounded"
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button className="bg-dgreen font-semibold py-2 px-9 rounded text-lyellow" onClick={onSubmitEvent}>
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default Form;
