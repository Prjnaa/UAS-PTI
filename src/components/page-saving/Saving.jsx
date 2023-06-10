import React, { useEffect, useState } from "react";
import Container from "./container";
import Navbar from "../navbar/Navbar";
import { userState } from "../currentUser";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Saving = () => {
  const currentUser = userState.currentUser;
  console.log(currentUser);

  const [eventData, setEventData] = useState([]);

  const getUser = async () => {
    const userDocRef = doc(db, "users", currentUser);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const eventData = userData.eventLists;
      console.log("eventData:", eventData);
      if (Array.isArray(eventData)) {
        setEventData(eventData);
      } else {
        console.log("Event data is not an array.");
        setEventData([]);
      }
    } else {
      console.log("Event data does not exist.");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-dom">
      <div className="flex-grow">
        <div className="w-full py-3">
          <h1 className="font-semibold text-5xl text-center pb-4 text-comp">
            Saving
          </h1>
          <div className="max-h-[40rem] overflow-y-auto">
            {eventData.length !== 0 ? (
              eventData.map((eventItem, index) => (
                <div key={index}>
                  <Container
                    budget={eventItem.budget}
                    event={eventItem.eventName}
                    index={index}
                  />
                </div>
              ))
            ) : (
              <p className="text-center h-96 mt-32 grid place-items-center text-comp">
                No events available.
              </p>
            )}
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Saving;
