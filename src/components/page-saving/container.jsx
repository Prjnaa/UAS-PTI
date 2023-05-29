import React, { useState, useEffect } from "react";
import ProgressBar from "./bar";
import Add from "./AddsavingBtn";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { userState } from "../currentUser";

const Container = (props) => {
  const eventName = props.event;
  const targetAmount = props.budget;
  const index = props.index;
  const currentUser = userState.currentUser;
  const [collectedAmount, setCollectedAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDocRef = doc(db, "users", currentUser);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const eventLists = userData.eventLists;

          if (
            Array.isArray(eventLists) &&
            index >= 0 &&
            index < eventLists.length
          ) {
            const eventItem = eventLists[index];
            if (eventItem && typeof eventItem.saving === "number") {
              setCollectedAmount(eventItem.saving);
            }
          }
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentUser, index]);

  return (
    <div className="container bg-cust-2 rounded-xl mb-10 py-4 px-8">
      <div className="flex justify-between flex-wrap mb-[3%]">
        <h1 className="font-semibold text-2xl">{eventName}</h1>
        <Add index={index} setCollectedAmount={setCollectedAmount} />
      </div>
      <div className="flex justify-between mt-2">
        <h1 className="font-medium text-left">Saving</h1>
        <h1 className="font-medium text-right">{"Rp " + collectedAmount}</h1>
      </div>

      <div className="flex justify-between mt-6">
        <h1 className="font-medium">Progress</h1>
        <ProgressBar
          collectedAmount={collectedAmount}
          targetAmount={targetAmount}
        />
      </div>

      <div className="flex justify-between mt-6">
        <h1 className="font-medium">Target</h1>
        <h1 className="font-medium">{"Rp " + targetAmount}</h1>
      </div>
    </div>
  );
};

export default Container;
