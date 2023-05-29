import Header from "./Header.jsx";
import Topside from "./Topside.jsx";
import Bottomside from "./Bottomside.jsx";
import Upcomming from "./upcoming events/Upcoming.jsx";
import Navbar from "../navbar/Navbar.jsx";
import { motion } from "framer-motion";

import "./Main.css";
import { userState } from "../currentUser.js";

function Main() {
  console.log(userState.currentUser)
  
  return (
    <div className="container-wrapper gradient-bg-3 w-screen h-auto grid grid-cols-12 py-3">
      <motion.div
        initial={{ y: "-1000px" }}
        animate={{ y: 0 }}
        exit={{ y: "1000px", transition: { duration: 0.25 } }}
        className="shadow-[0px_30px_15px_-35px_rgba(0,0,0,0.5)] z-50 sticky top-0 lg:col-start-3 sm:col-start-2 col-start-1 lg:col-end-11 sm:col-end-12 col-end-13"
      >
        <Header />
      </motion.div>
      <motion.div
        initial={{ y: "-1000px" }}
        animate={{ y: 0 }}
        exit={{ y: "1000px", transition: { duration: 0.25 } }}
        className=" wrapper lg:col-start-3 sm:col-start-2 col-start-1 lg:col-end-11 sm:col-end-12 col-end-13 px-5"
      >
        <div className="container-top">
          <Topside />
          <Bottomside />
        </div>
        <div className="justify-around container-bottom mt-10 mb-32">
          <Upcomming />
        </div>
        <Navbar />
      </motion.div>
      
    </div>
  );
}

export default Main;
