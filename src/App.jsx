import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AnimatePresence } from "framer-motion";

import "./components/firebase";

import Login from "./components/page-signin/Login";
import Register from "./components/page-signin/Regis";
import Main from "./components/page-main/Main";
import Form from "./components/page-newschedule/Newschedule";
import Calendar from "./components/Calendar/Calendar";
import Saving from "./components/page-saving/Saving";
import EventList from "./components/page-eventlist/Eventlist";
import About from "./components/portofolio/About";
import ChatApp from "./components/Chat-App/Chat-App";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (result) => {
      if (result) {
        setIsLogin(true);
        setLoading(false);
        return;
      }

      setIsLogin(false);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className=" text-dom bg-white w-screen h-screen flex flex-col justify-center items-center">
        <p className="font-semibold text-3xl">PLEASE WAIT . . .</p>
      </div>
    );
  }

  return (
    <div className="App">
      {isLogin ? (
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/main" element={<Main />} />
            <Route path="*" element={<Main />} />
            <Route path="/form" element={<Form />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/saving" element={<Saving />}/>
            <Route path="/chat" element={<ChatApp />}/>
            <Route path="/aboutUs" element={<About />} />
            <Route path="/eventList" element={<EventList />}/>
          </Routes>
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<Register />} />
          </Routes>
        </AnimatePresence>
      )}
    </div>
  );
}
