import React, { useState, useEffect } from "react";
import { db, collection } from "../firebase";
import "tailwindcss/tailwind.css";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { userState } from "../currentUser";
import Navbar from "../navbar/Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EventList = () => {
  const currentUser = userState.currentUser;
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const fetchEvents = async () => {
    try {
      const userRef = doc(db, "users", currentUser);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const userEventData = userSnapshot.data().eventLists;
        setEvents(userEventData);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
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
      unsubscribe();
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

  const handleEventDone = async (event) => {
    try {
      const userRef = doc(db, "users", currentUser);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userEventData = userSnapshot.data().eventLists;
        const filteredEvents = userEventData.filter(
          (e) => e.eventName !== event.eventName
        );

        setEvents(filteredEvents);

        await updateDoc(userRef, {
          eventLists: filteredEvents,
        });
      }
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  const navigate = useNavigate();
  function toCalendar() {
    navigate("/calendar");
  }

  return (
    <div className="min-h-screen bg-dom from-primary to-secondary">
      <div className="text-center">
        <h1 className="text-5xl font-semibold text-comp text-center pt-6 pb-2">
          Event List
        </h1>
        <button
          className="calendarBtn bg-acc text-comp p-2 rounded-lg just mt-2 mb-4 transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 hover:shadow-md"
          onClick={toCalendar}
        >
          Calendar
        </button>
      </div>
      <div className="max-h-[40rem] lg:w-[60rem] mx-auto overflow-y-auto px-2">
        {events.length === 0 ? (
          <p className="text-center text-white">No events available.</p>
        ) : (
          events.map((event, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-gray-300 shadow-box bg-comp"
            >
              <h2 className="text-center text-lg font-semibold text-acc">
                {event.eventName}
              </h2>
              <hr className="my-2" />
              <div className="flex justify-center">
                <button
                  onClick={() => handleEventClick(event)}
                  className={`bg-acc hover:bg-primary-dark text-white py-2 px-4 rounded mt-2 transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 ${
                    selectedEvent && selectedEvent.eventName === event.eventName
                      ? "bg-secondary hover:bg-secondary-dark"
                      : ""
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
                  maxHeight:
                    selectedEvent && selectedEvent.eventName === event.eventName
                      ? "200px"
                      : "0",
                  paddingTop:
                    selectedEvent && selectedEvent.eventName === event.eventName
                      ? "16px"
                      : "0",
                  paddingBottom:
                    selectedEvent && selectedEvent.eventName === event.eventName
                      ? "16px"
                      : "0",
                  marginTop:
                    selectedEvent && selectedEvent.eventName === event.eventName
                      ? "8px"
                      : "0",
                  marginBottom:
                    selectedEvent && selectedEvent.eventName === event.eventName
                      ? "8px"
                      : "0",
                  transition:
                    "max-height 0.3s ease, padding-top 0.3s ease, padding-bottom 0.3s ease, margin-top 0.3s ease, margin-bottom 0.3s ease",
                }}
              >
                {selectedEvent &&
                  selectedEvent.eventName === event.eventName && (
                    <div className="border border-gray-400 px-8 py-3 text-lg bg-acc text-comp">
                      <div className="my-2 flex justify-between flex-wrap">
                        <p>Date:</p>
                        <p>{selectedEvent.date}</p>
                      </div>
                      <div className="my-2 flex justify-between flex-wrap">
                        <p>Time:</p>
                        <p>{selectedEvent.time}</p>
                      </div>
                      <div className="my-2 flex justify-between flex-wrap">
                        <p>Location:</p>
                        <p>{selectedEvent.location}</p>
                      </div>
                      <div className="my-2 flex justify-between flex-wrap">
                        <p>Budget:</p>
                        <p>{selectedEvent.budget}</p>
                      </div>
                    </div>
                  )}
              </div>
              <button
                onClick={() => handleEventDone(event)}
                className="bg-acc text-white py-2 px-4 rounded mt-2 transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 hover:bg-secondary"
              >
                Done
              </button>
            </div>
          ))
        )}
      </div>
      <div className="fixed bottom-0 w-full">
        <Navbar />
      </div>
    </div>
  );
};

export default EventList;
