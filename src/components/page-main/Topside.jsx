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
        let tempEvent = userEventData[closestEventIndex].eventName
        setClosestEvent(tempEvent.charAt(0).toUpperCase() + tempEvent.slice(1));
        const eventDate = new Date(userEventData[closestEventIndex].date);
        const month = dateStr[eventDate.getMonth()];
        const day = eventDate.getDate();
        const year = eventDate.getFullYear();
        setClosestDate(`${month}, ${day} ${year}`);
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
