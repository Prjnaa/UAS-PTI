import React from "react";
import { motion } from "framer-motion";
import Navbar from "../navbar/Navbar";
import "tailwindcss/tailwind.css";
import Hosea from "../assets/us/Hosea.png";
import Mesaya from "../assets/us/mesaya.png";
import Ben from "../assets/us/Ben.png";
import Prajna from "../assets/us/Prajna.png";
import "./about.css";

const Team = () => {
  const teamMembers = [
    {
      name: "Christopher Mesaya",
      position: "Student",
      ig: "@cmesayaa",
      url: "https://www.instagram.com/cmesayaa/",
      imageUrl: Mesaya,
    },
    {
      name: "Benedick Christopher Bamba",
      position: "Student",
      ig: "@benchris04",
      url: "https://www.instagram.com/benchris04/",
      imageUrl: Ben,
    },
    {
      name: "Prajna Ananda Citra",
      position: "Student",
      ig: "@prjnaa_04",
      url: "https://www.instagram.com/prjnaa_04/",
      imageUrl: Prajna,
    },
    {
      name: "Hosea",
      position: "Student",
      ig: "@hosea_304",
      url: "https://www.instagram.com/hosea_304/",
      imageUrl: Hosea,
    },
  ];

  function handleClick(url) {
    window.open(url, "_blank");
  }

  return (
    <div className="h-screen bg-dom">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          ABOUT US
        </h1>
        <div className="m-auto grid md:grid-cols-2 place-items-center grid-cols-1 sm:w-[80%] gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-comp text-acc rounded-md shadow-box p-6 flex flex-col items-center w-full xl:w-[80%]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                src={member.imageUrl}
                alt={member.name}
                className="w-32 object-cover h-32 rounded-full mb-4"
                whileHover={{ translateY: -5 }}
              />
              <motion.h2
                className="text-xl text-center font-bold mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {member.name}
              </motion.h2>
              <motion.p
                className="text-gray-500 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {member.position}
              </motion.p>
              <motion.a
                href="#"
                className="linkIg text-center"
                onClick={() => handleClick(member.url)}
                whileTap={{ scale: 1.1 }}
              >
                {member.ig}
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Team;
