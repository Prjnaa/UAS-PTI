import React from "react";
import "tailwindcss/tailwind.css";

const Team = () => {
const teamMembers = [
    {
        name: "@cmesayaa",
        position: "asdfghjkl",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        imageUrl: "https://example.com/john-doe.jpg",
    },
    {
        name: "Ben silalahi",
        position: "asdfghjkl",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        imageUrl: "https://example.com/jane-smith.jpg",
    },
    {
        name: "Prajna unch",
        position: "asdfghjkl",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        imageUrl: "https://example.com/mike-johnson.jpg",
    },
    {
        name: "Hose wakwaw",
        position: "asdfghjkl",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        imageUrl: "https://example.com/john-doe.jpg",
    },
];

return (
    <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Tim Proyek</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                <div
                    key={index}
                    className="bg-white rounded-md shadow-md p-6 flex flex-col items-center">
                    <img src={member.imageUrl} alt={member.name} className="w-32 h-32 rounded-full mb-4"/>
                    <h2 className="text-xl font-bold mb-2">{member.name}</h2>
                    <p className="text-gray-500 mb-4">{member.position}</p>
                    <p className="text-gray-600 text-center">{member.bio}</p>
                </div>
                ))}
            </div>
        </div>
    </div>
    );
};

export default Team;