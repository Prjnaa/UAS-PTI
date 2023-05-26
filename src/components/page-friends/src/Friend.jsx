import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const Friend = () => {
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState("");
  const [selectedFriend, setSelectedFriend] = useState("");
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  const handleAddFriend = () => {
    if (newFriend !== "") {
      setFriends([...friends, newFriend]);
      setNewFriend("");
    }
  };

  const handleSendMessage = () => {
    if (selectedFriend !== "" && message !== "") {
      const chat = {
        sender: selectedFriend,
        message: message,
      };
      setChats([...chats, chat]);
      setMessage("");
    }
  };

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-mgreen">
      <div className="grid grid-cols-3 gap-4 w-3/4 p-8 bg-lgreen rounded-lg shadow-md">
        <div className="col-span-1">
          <h2 className="text-lg font-bold mb-4 text-dgreen">FRIEND LIST</h2>
          {friends.map((friend, index) => (
            <div
              key={index}
              className={`flex items-center mb-2 cursor-pointer ${
                selectedFriend === friend ? "bg-blue-200" : ""
              }`}
              onClick={() => handleFriendClick(friend)}
            >
              <img
                src={`https://source.unsplash.com/150x150/?person,${friend}`}
                alt="Friend"
                className="w-12 h-12 rounded-full mr-2"
              />
              <span>{friend}</span>
            </div>
          ))}
        </div>
        <div className="col-span-1">
          <h2 className="text-lg font-bold mb-4 text-dgreen">ADD FRIEND</h2>
          <input
            type="text"
            value={newFriend}
            onChange={(e) => setNewFriend(e.target.value)}
            placeholder="Enter friend's name"
            className="w-full mb-4 p-2 border border-gray-300 rounded shadow"
          />
          <div className="flex justify-center">
            <button
              className="bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleAddFriend}
            >
              Add
            </button>
          </div>
        </div>
        <div className="col-span-1">
          <h2 className="text-lg font-bold mb-4 text-dgreen">SEND MESSAGE</h2>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="w-full mb-4 p-2 border border-gray-300 rounded shadow"
            disabled={!selectedFriend}
          />
          <div className="flex justify-center">
            <button
              className={`bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${
                !selectedFriend || !message ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSendMessage}
              disabled={!selectedFriend || !message}
            >
              Send
            </button>
          </div>
        </div>
        <div className="col-span-2">
          <h2 className="text-lg font-bold mb-4 text-dgreen">CHAT</h2>
          {chats.map((chat, index) => (
            <div key={index} className="mb-4">
              <div className="font-bold mb-1">{chat.sender}</div>
              <div className="bg-white rounded p-2 break-words">
                {chat.message}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Friend;

