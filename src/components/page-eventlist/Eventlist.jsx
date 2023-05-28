import React, { useState, useEffect } from 'react';
import { db, collection } from '../firebase';
import 'tailwindcss/tailwind.css';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { userState } from '../currentUser';

const EventList = () => {
  const currentUser = userState.currentUser;
  console.log(currentUser);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const userRef = doc(db, 'users', currentUser);
      const userSnapshot = await getDoc(userRef);
      console.log(userSnapshot);
      if (userSnapshot.exists()) {
        const userEventData = userSnapshot.data().eventLists;
        setEvents(userEventData);
      }
      console.log(events);
    } catch (error) {
      console.log('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    if (selectedEvent && selectedEvent.eventName === event.eventName) {
      setSelectedEvent(null);
    } else {
      setSelectedEvent(event);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 max-h-full overflow-y-auto pr-5" style={{ scrollbarWidth: 'thin' }}>
        {events.length === 0 ? (
          <p className="text-center">No events available.</p>
        ) : (
          events.map((event, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-gray-300 rounded-xl shadow-md hover:-translate-y-1 hover:shadow-lg transform transition-all duration-200 bg-white"
            >
              <h3 className="text-center">{event.eventName}</h3>
              <hr className="my-2" />
              <div className="flex justify-center">
                <button
                  onClick={() => handleEventClick(event)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-all duration-200 transform hover:-translate-y-1 hover:scale-105"
                >
                  {selectedEvent && selectedEvent.eventName === event.eventName
                    ? 'Hide Details'
                    : 'View Details'}
                </button>
              </div>
              {selectedEvent && selectedEvent.eventName === event.eventName && (
                <div className="border border-gray-400 p-4 mt-4 rounded-xl">
                  <h3 className="text-center">{selectedEvent.eventName}</h3>
                  <p className="my-2">Date: {selectedEvent.date}</p>
                  <p className="my-2">Time: {selectedEvent.time}</p>
                  <p className="my-2">Location: {selectedEvent.location}</p>
                  <p className="my-2">Budget: {selectedEvent.budget}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventList;
