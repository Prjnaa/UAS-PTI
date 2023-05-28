import React, { useState } from 'react';
import "tailwindcss/tailwind.css";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96">
        {events.length === 0 ? (
          <p className="text-center">No events available.</p>
        ) : (
          events.map((event, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
              <h3>{event.eventName}</h3>
              <hr className="my-2" />
              <button
                onClick={() => handleEventClick(event)}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                View Details
              </button>
            </div>
          ))
        )}

        {selectedEvent && (
          <div className="border border-gray-400 p-4 mt-4">
            <h3>{selectedEvent.eventName}</h3>
            <p>Date: {selectedEvent.eventDate}</p>
            <p>Time: {selectedEvent.eventTime}</p>
            <p>Location: {selectedEvent.eventLocation}</p>
            <p>Budget: {selectedEvent.budget}</p>
            <p>Additional Cost: {selectedEvent.additionalCost}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;
