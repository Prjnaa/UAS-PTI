import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import './newschedule.css';

const Form = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-4">
        <h2 className="text-2xl font-semibold mb-4">Event Form</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <label htmlFor="eventName" className="block mb-2 font-medium">
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="eventLocation" className="block mb-2 font-medium">
              Event Location
            </label>
            <input
              type="text"
              id="eventLocation"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="savingPerWeek" className="block mb-2 font-medium">
              Saving per Week
            </label>
            <input
              type="text"
              id="savingPerWeek"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="eventDate" className="block mb-2 font-medium">
              Event Date
            </label>
            <input
              type="date"
              id="eventDate"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="ticketPrice" className="block mb-2 font-medium">
              Ticket Price
            </label>
            <input
              type="number"
              id="ticketPrice"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="eventDescription" className="block mb-2 font-medium">
              Event Description
            </label>
            <textarea
              id="eventDescription"
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
            ></textarea>
          </div>
          <div className="col-span-1">
            <label htmlFor="eventTime" className="block mb-2 font-medium">
              Event Time
            </label>
            <input
              type="time"
              id="eventTime"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="additionalCost" className="block mb-2 font-medium">
              Additional Cost
            </label>
            <input
              type="text"
              id="additionalCost"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Form;
