import Weather from "./Weather";
import "./Main.css";
import { userState } from "../currentUser";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";

function Topside() {
  const currentUser = userState.currentUser;
  const [nextE, setNextE] = useState([]);
  const [closestEvent, setClosestEvent] = useState("");
  const [closestDate, setClosestDate] = useState("");
  const dateStr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const getEvent = async () => {
    try {
      const userRef = doc(db, "users", currentUser);
      const userSnap = await getDoc(userRef);
      const userEventData = userSnap.data().eventLists;

      const currentDate = new Date();
      let closestEventIndex = -1;
      let closestDiff = Infinity;

      userEventData.forEach((event, index) => {
        const eventDate = new Date(event.date);
        const timeDiff = Math.abs(eventDate - currentDate);

        if (timeDiff < closestDiff) {
          closestDiff = timeDiff;
          closestEventIndex = index;
        }
      });

      if (closestEventIndex !== -1) {
        setClosestEvent(userEventData[closestEventIndex].eventName);
        const eventDate = new Date(userEventData[closestEventIndex].date);
        const month = dateStr[eventDate.getMonth()];
        const day = eventDate.getDate();
        const year = eventDate.getFullYear();
        setClosestDate(`${month} ${day} ${year}`);
      }

      setNextE(userEventData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <div className="topbox shadow-box mt-3 bg-cust-2 flex lg:px-14 px-4 py-4 justify-between rounded-xl">
      <div className="schedule text-black my-auto">
        <p className="md:text-base/7 text-xs/3 font-normal tracking-widest">
          NEXT SCHEDULE
        </p>
        <h1 className="md:text-4xl/6 text-base/5 font-medium md:mt-4 mt-1">
          {closestEvent}
        </h1>
        <div className="md:mt-3 def:mt-1">
          <p className="md:text-base/6 text-xs/5 font-normal">{closestDate}</p>
        </div>
      </div>
      <Weather />
    </div>
  );
}

export default Topside;
