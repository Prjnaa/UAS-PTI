import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import './newschedule.css';

const Form = () => {
  return (
    <div className="mx-auto p-20 bg-lgreen">
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
            />
          </div>
          <div className="mb-4">
            <label htmlFor="savingPerWeek" className="block mb-2 font-medium text-lyellow">
              Saving per Week
            </label>
            <input
              type="text"
              id="savingPerWeek"
              className="w-full p-2 border border-gray-300 rounded"
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
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="eventTime" className="block mb-2 font-medium text-lyellow">
              Event Time
            </label>
            <input
              type="time"
              id="eventTime"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4 col-span-2">
            <label htmlFor="additionalCost" className="block mb-2 font-medium text-lyellow">
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
        <button className="bg-dgreen font-semibold py-2 px-9 rounded text-lyellow">
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default Form;
