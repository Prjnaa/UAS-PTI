import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import './eventlistdata.css';

const EventBox = ({ eventName, eventDate, eventTime, eventLocation, budget, additionalCost }) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleClick = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div
      className={`event-box ${showInfo ? 'active' : ''}`}
      onClick={handleClick}
    >
      <div className="event-box-header">
        <h2 className="text-lg font-semibold">{eventName}</h2>
      </div>
      {showInfo && (
        <div className="event-box-body">
          <div className="event-info">
            <p>
              <span className="font-semibold">Date:</span> {eventDate}
            </p>
            <p>
              <span className="font-semibold">Time:</span> {eventTime}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {eventLocation}
            </p>
            <p>
              <span className="font-semibold">Budget:</span> {budget}
            </p>
            <p>
              <span className="font-semibold">Additional Cost:</span> {additionalCost}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const Eventlistdata = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="grid grid-cols-2 gap-4">
        <EventBox
          eventName="Event A"
          eventDate="2023-06-01"
          eventTime="10:00 AM"
          eventLocation="Venue A"
          budget="$1000"
          additionalCost="$200"
        />
        <EventBox
          eventName="Event B"
          eventDate="2023-06-05"
          eventTime="2:00 PM"
          eventLocation="Venue B"
          budget="$1500"
          additionalCost="$300"
        />
      </div>
    </div>
  );
};

export default Eventlistdata;
