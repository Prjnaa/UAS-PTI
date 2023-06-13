import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Container from "./container";
import Navbar from "../navbar/Navbar";
import { userState } from "../currentUser";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Saving = () => {
  const currentUser = userState.currentUser;

  const [eventData, setEventData] = useState([]);

  const getUser = async () => {
    const userDocRef = doc(db, "users", currentUser);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const eventData = userData.eventLists;
      if (Array.isArray(eventData)) {
        setEventData(eventData);
      } else {
        setEventData([]);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-dom">
      <div className="flex-grow">
        <div className="w-full py-3">
          <motion.h1
            className="font-semibold text-5xl text-center pb-4 text-comp"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Savings
          </motion.h1>
          <div className="max-h-[40rem] overflow-y-auto">
            {eventData.length !== 0 ? (
              eventData.map((eventItem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Container
                    budget={eventItem.budget}
                    event={eventItem.eventName}
                    index={index}
                  />
                </motion.div>
              ))
            ) : (
              <motion.p
                className="text-center h-96 mt-32 grid place-items-center text-comp"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                No events available.
              </motion.p>
            )}
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Saving;
