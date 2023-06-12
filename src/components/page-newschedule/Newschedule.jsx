import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import "./newschedule.css";
import { db } from "../firebase";
import { collection, addDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import FormField from "./FormField";
import { userState } from "../currentUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../navbar/Navbar";

const Form = () => {
  const currentUser = userState.currentUser;

  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState(0);
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState("");

  const onSubmitEvent = async (e) => {
    e.preventDefault();

    if (!eventName || !location || !date || budget <= 0 || !desc || !time) {
      toast.error("Please fill in all fields before submitting");
      return;
    }

    try {
      const event = {
        eventName,
        location,
        date,
        budget: Number(budget),
        desc,
        time,
      };

      await addDoc(collection(db, "events"), event);

      const userRef = doc(db, "users", currentUser);
      await updateDoc(userRef, {
        eventLists: arrayUnion(event),
      });

      toast.success("Event Submitted");

      setEventName("");
      setLocation("");
      setDate("");
      setBudget(0);
      setDesc("");
      setTime("");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while submitting the event");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-dom from-primary-light to-primary-dark">
      <div className="flex-grow md:mx-auto md:w-[70%] p-4 bg-comp shadow-box mt-6 sm:mt-8 md:mt-10 lg:mt-12 rounded-xl">
        <h2 className="text-2xl font-semibold mb-4 text-acc text-center">New Event</h2>
        <form onSubmit={onSubmitEvent}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField
              label="Event Name"
              placeholder="Input Event..."
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <FormField
              label="Event Location"
              placeholder="Input Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <FormField
              label="Event Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
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
            <FormField
              label="Event Time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="mt-4 flex justify-center">
            <button
              className="px-6 bg-acc py-2.5 font-semibold text-white rounded-md bg-cust-3 hover:transition 2000ms transition-all duration-200 transform hover:-translate-y-1 hover:scale-105"
              type="submit"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
      <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12">
        <Navbar />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Form;
