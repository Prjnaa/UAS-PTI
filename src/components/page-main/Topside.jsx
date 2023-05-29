import Weather from "./Weather";
import "./Main.css"
import { userState } from "../currentUser";
import { doc } from "firebase/firestore";
import { useState } from "react";

function Topside() {
  const currentUser = userState.currentUser;
  // const [nextE, setNextE] = userState([])
  
  // const getEvent = async (event) => {
  //   try {
  //     const userRef = doc(dv, "users", currentUser);
  //     const userSnap = await getDoc(userRef)
  //     const userEventData = userSnap.data().eventLists
  //     setNextE(userEventData)
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  return (
    <div className="topbox shadow-box mt-3 bg-cust-4 flex lg:px-14 px-4 py-4 justify-between rounded-xl">
      <div className="schedule text-cust-1 my-auto">
        <p className="md:text-base/7 text-xs/3 font-normal tracking-widest">
          NEXT SCHEDULE
        </p>
        <h1 className="md:text-4xl/6 text-base/5 font-semibold md:mt-4 mt-1">
          Konser Coldplay
        </h1>
        <div className="md:mt-3 def:mt-1">
          <p className="md:text-base/6 text-xs/5 font-normal">Nov 15 2023</p>
        </div>
      </div>
      <Weather />
    </div>
  );
}

export default Topside;
