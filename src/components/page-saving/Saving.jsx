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
    <div className="w-screen h-screen bg-cust-4 grid grid-cols-12 py-3">
      <div className="relative lg:col-start-3 sm:col-start-2 col-start-1 lg:col-end-11 sm:col-end-12 col-end-13 px-5">
      <h1 className="font-semibold text-5xl text-center sticky top-0 z-50 pb-4 text-cust-1">Saving</h1>
          <div className="max-h-[40rem] overflow-y-auto mb-5">
            {eventData.length != 0 ? (
              eventData.map((eventItem, index) => (
              <div key={index}>
                <Container
                  budget={eventItem.budget}
                  event={eventItem.eventName}
                  index={index}
                />
              </div>
            ))):(
              <h1 className="text-center text-3xl font-semibold">No Event Listed</h1>
            )}
          </div>
            <Navbar/>
        </div>
      </div>
  );
};

export default Saving;
