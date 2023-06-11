import Weather from "./Weather";
import "./Main.css";
import { userState } from "../currentUser";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";

function Topside() {
  const currentUser = userState.currentUser;
  const [nextE, setNextE] = useState([]);
  const [closestTime, setClosestTime] = useState("");
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
      let closestDateTimeDiff = Infinity;
  
      userEventData.forEach((event, index) => {
        const eventDateTime = new Date(`${event.date}T${event.time}`);
        const dateTimeDiff = Math.abs(eventDateTime - currentDate);
  
        if (dateTimeDiff < closestDateTimeDiff) {
          closestDateTimeDiff = dateTimeDiff;
          closestEventIndex = index;
        }
      });
  
      if (closestEventIndex !== -1) {
        let tempEvent = userEventData[closestEventIndex].eventName;
        setClosestEvent(tempEvent.charAt(0).toUpperCase() + tempEvent.slice(1));
        const eventDateTime = new Date(`${userEventData[closestEventIndex].date}T${userEventData[closestEventIndex].time}`);
        const month = dateStr[eventDateTime.getMonth()];
        const day = eventDateTime.getDate();
        const year = eventDateTime.getFullYear();
        setClosestDate(`${month}, ${day} ${year}`);
  
        const eventTime = userEventData[closestEventIndex].time;
        setClosestTime(eventTime);
      }
  
      setNextE(userEventData);
    } catch (err) {
      console.error(err);
    }
  };
  
  

  useEffect(() => {
    getEvent();
  }, []);


  return (
    <div className="topbox mt-3 flex px-6 justify-between">
      <div className="schedule text-white my-auto">
        <p className="md:text-base/8 text-xs/4 font-normal tracking-wider mb-2">
          NEXT SCHEDULE
        </p>
        {
          closestEvent !== "" ? (
          <h1 className="md:text-4xl/8 text-2xl/6 font-semibold bg-comp -rotate-3 p-2 text-dom hover:rotate-0 transition-all duration-250 hover:scale-110 hover:shadow-box">
            {closestEvent}
          </h1>
          ) : (
            <h1 className="opacity-30">no event added !</h1>
          )
        }
        <div className="md:mt-3 def:mt-1">
          <p className="md:text-base/6 text-xs/6 font-normal">{closestDate}</p>
        </div>
      </div>
      <Weather />
    </div>
  );
}

export default Topside;
