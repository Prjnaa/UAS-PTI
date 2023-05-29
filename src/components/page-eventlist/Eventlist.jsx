import React, { useState, useEffect } from "react";
import { db, collection } from "../firebase";
import "tailwindcss/tailwind.css";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { userState } from "../currentUser";
import Navbar from "../navbar/Navbar";

const EventList = () => {
  const currentUser = userState.currentUser;
  console.log(currentUser);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const fetchEvents = async () => {
    try {
      const userRef = doc(db, "users", currentUser);
      const userSnapshot = await getDoc(userRef);
      console.log(userSnapshot);
      if (userSnapshot.exists()) {
        const userEventData = userSnapshot.data().eventLists;
        setEvents(userEventData);
      }
      console.log(events);
    } catch (error) {
      console.log("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
    const unsubscribe = onSnapshot(
      doc(db, "users", currentUser),
      (userSnapshot) => {
        if (userSnapshot.exists()) {
          const userEventData = userSnapshot.data().eventLists;
          setEvents(userEventData);
        }
      }
    );

    return () => {
      unsubscribe(); // Unsubscribe saat komponen di-unmount
    };
  }, []);

  const handleEventClick = (event) => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (selectedEvent && selectedEvent.eventName === event.eventName) {
      setTimeout(() => {
        setSelectedEvent(null);
        setIsAnimating(false);
      }, 300);
    } else {
      setSelectedEvent(event);
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <div className="items-center w-screen h-screen gradient-bg-1 grid grid-cols-12 py-3">
      <div
        className="max-h-[40rem] overflow-y-auto mb-14 px-2 lg:col-start-3 sm:col-start-2 col-start-1 lg:col-end-11 sm:col-end-12 col-end-13"
        style={{ scrollbarWidth: "thin" }}
      >
        <h1 className="z-50 w-2/3 text-center text-5xl font-semibold text-cust-8 fixed top-0 mt-3 bg-opacity-10 bg-cust-1 rounded-xl">Event List</h1>
        {events.length === 0 ? (
          <p className="text-center">No events available.</p>
        ) : (
          events.map((event, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-gray-300 rounded-xl shadow-md hover:shadow-lg transform transition-all duration-200 bg-cust-1"
            >
              <h2 className="text-center text-cust-8 text-xl">{event.eventName}</h2>
              <hr className="my-2" />
              <div className="flex justify-center">
                <button
                  onClick={() => handleEventClick(event)}
                  className={`bg-cust-4 hover:bg-cust-5 text-cust-1 py-2 px-4 rounded transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 mt-2 ${
                    selectedEvent && selectedEvent.eventName === event.eventName ? 'bg-cust-1 hover:bg-cust-5' : 'bg-cust-4 hover:bg-cust-5'
                  }`}
                >
                  {selectedEvent && selectedEvent.eventName === event.eventName
                    ? "Hide Details"
                    : "View Details"}
                </button>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isAnimating ? "opacity-0" : ""
                }`}
                style={{
                  maxHeight: selectedEvent && selectedEvent.eventName === event.eventName ? "200px" : "0",
                  paddingTop: selectedEvent && selectedEvent.eventName === event.eventName ? "16px" : "0",
                  paddingBottom: selectedEvent && selectedEvent.eventName === event.eventName ? "16px" : "0",
                  marginTop: selectedEvent && selectedEvent.eventName === event.eventName ? "8px" : "0",
                  marginBottom: selectedEvent && selectedEvent.eventName === event.eventName ? "8px" : "0",
                  transition: "max-height 0.3s ease, padding-top 0.3s ease, padding-bottom 0.3s ease, margin-top 0.3s ease, margin-bottom 0.3s ease",
                }}
              >
                {selectedEvent && selectedEvent.eventName === event.eventName && (
                  <div className="border border-gray-400 px-8 py-3 rounded-xl text-[1.1rem] bg-white">
                    <div className="my-2 flex justify-between flex-wrap px-2">
                      <p>Date:</p>
                      <p>{selectedEvent.date}</p>
                    </div>
                    <div className="my-2 flex justify-between flex-wrap px-2">
                      <p>Time:</p>
                      <p>{selectedEvent.time}</p>
                    </div>
                    <div className="my-2 flex justify-between flex-wrap px-2">
                      <p>Location:</p>
                      <p>{selectedEvent.location}</p>
                    </div>
                    <div className="my-2 flex justify-between flex-wrap px-2">
                      <p>Budget:</p>
                      <p>{selectedEvent.budget}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        <div className="fixed w-2/3 bottom-0 mb-3">
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default EventList;
