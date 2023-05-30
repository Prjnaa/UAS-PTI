import React from "react";
import Navbar from "../navbar/Navbar";
import "tailwindcss/tailwind.css";
import Hosea from "../assets/us/Hosea.png";
import Mesaya from "../assets/us/mesaya.png";
import Ben from "../assets/us/Ben.png";
import Prajna from "../assets/us/Prajna.png";

const Team = () => {
  const teamMembers = [
    {
      name: "Christopher Mesaya",
      position: "Student",
      bio: "@cmesayaa",
      imageUrl: Mesaya,
    },
    {
      name: "Benedick Christopher Bamba",
      position: "Student",
      bio: "@benchris04",
      imageUrl: Ben,
    },
    {
      name: "Prajna Ananda Citra",
      position: "Student",
      bio: "@prjnaa_04",
      imageUrl: Prajna,
    },
    {
      name: "Hosea",
      position: "Student",
      bio: "@hosea_304",
      imageUrl: Hosea,
    },
  ];

  return (
    <div className="gradient-bg-1 min-h-screen">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          ABOUT US
        </h1>
        <div className="grid grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-cust-1 rounded-md shadow-md p-6 flex flex-col items-center hover:translate-y-[-5px] transition duration-300 ease-in-out"
            >
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-32 h-32 rounded-full mb-4 hover:translate-y-[-5px] transition duration-300 ease-in-out object-cover"
              />
              <h2 className="text-xl font-bold mb-2">{member.name}</h2>
              <p className="text-gray-500 mb-4">{member.position}</p>
              <p className="text-gray-600 text-center">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-44">
        <Navbar />
      </div>
    </div>
  );
};

export default Team;
