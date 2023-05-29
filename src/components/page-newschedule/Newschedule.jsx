import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "./newschedule.css";
import { db } from "../firebase";
import {
  getDocs,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  FieldValue,
} from "firebase/firestore";
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
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  useEffect(() => {
    const isFormFilled =
      eventName !== "" &&
      location !== "" &&
      date !== "" &&
      budget !== 0 &&
      desc !== "" &&
      time !== "";
    setAllFieldsFilled(isFormFilled);
  }, [eventName, location, date, budget, desc, time]);

  const onSubmitEvent = async () => {
    if (!allFieldsFilled) {
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

      const userRef = doc(db, "users", currentUser);
      await updateDoc(userRef, {
        eventLists: arrayUnion(event),
      });

      // Reset nilai
      setEventName("");
      setLocation("");
      setDate("");
      setBudget(0);
      setDesc("");
      setTime("");

      console.log("Data Stored Successfuly");
    } catch (error) {
      console.log("Terjadi kesalahan:", error);
    }
  };

  return (
    <div className="gradient-bg-3 h-screen w-screen grid grid-cols-12 py-3">
      <div className="relative gradient-bg-3 lg:col-start-3 sm:col-start-2 col-start-1 lg:col-end-11 sm:col-end-12 col-end-13">
        <div className="bg-cust-3 rounded-md shadow-box p-3">
          <h2 className="text-2xl font-semibold mb-4 text-lyellow">
            Event Form
          </h2>
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
        </div>
        <div className="mt-4 flex justify-center">
        <button
          className="shadow-md bg-cust-4 font-semibold py-2 px-9 rounded text-white mb-3 hover:bg-cust-5 transition duration-300"
          onClick={onSubmitEvent}
        >
          SUBMIT
        </button>

        </div>
        <div className="fixed w-2/3 bottom-0 mb-3">
          <Navbar />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Form;
