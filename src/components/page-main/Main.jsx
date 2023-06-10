import { motion } from "framer-motion";
import Header from "./Header.jsx";
import Topside from "./Topside.jsx";
import Bottomside from "./Bottomside.jsx";
import Upcoming from "./upcoming events/Upcoming.jsx";
import Navbar from "../navbar/Navbar.jsx";
import "./Main.css";

function Main() {
  return (
    <div className="main-container">
      <div className="container-wrapper bg-dom w-screen grid grid-cols-12">
        <motion.div
          initial={{ y: "-1000px" }}
          animate={{ y: 0 }}
          exit={{ y: "1000px", transition: { duration: 0.25 } }}
          className="col-start-1 col-span-12"
        >
          <Header />
        </motion.div>
        <motion.div
          initial={{ y: "-1000px" }}
          animate={{ y: 0 }}
          exit={{ y: "1000px", transition: { duration: 0.25 } }}
          className="wrapper col-start-1 col-span-12 lg:col-start-2 lg:col-span-10"
        >
          <div className="container-top">
            <Topside />
            <Bottomside />
          </div>
          <div className="justify-around container-bottom">
            <Upcoming />
          </div>
        </motion.div>
      </div>
      <Navbar />
    </div>
  );
}

export default Main;
