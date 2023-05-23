import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import friendImage from '../src/asset/profilefriend.png';


const Friend = () => {
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState('');
  const [selectedFriend, setSelectedFriend] = useState('');
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);

  const handleAddFriend = () => {
    if (newFriend !== '') {
      setFriends([...friends, newFriend]);
      setNewFriend('');
    }
  };

  const handleSendMessage = () => {
    if (selectedFriend !== '' && message !== '') {
      const chat = {
        sender: selectedFriend,
        message: message,
      };
      setChats([...chats, chat]);
      setMessage('');
    }
  };

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
    console.log(`Clicked friend: ${friend}`);
  };

  return (
    <div className="bg-custom-green min-h-screen">
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="w-64 bg-custom-green-light shadow-md rounded-lg p-4 mb-4 md:mb-0">
            <h2 className="mb-4 text-center">Friend List</h2>
            {friends.map((friend, index) => (
              <div
                key={index}
                className={`flex items-center mb-2 cursor-pointer rounded shadow bg-white ${
                  selectedFriend === friend ? 'bg-blue-200' : ''
                }`}
                onClick={() => handleFriendClick(friend)}
              >
                <img src={friendImage} alt="Friend" className="w-15 h-12 rounded-full mr-2" />
                <span>{friend}</span>
              </div>
            ))}
          </div>
          <div className="w-80 bg-custom-green-light shadow-md rounded-lg p-4 mb-4 md:mb-0">
            <h2 className="mb-4 text-center">Add Friend</h2>
            <input
              type="text"
              value={newFriend}
              onChange={(e) => setNewFriend(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded-full shadow"
            />
            <div className="flex justify-center">
              <button
                className="bg-custom-blue hover:bg-custom-blue-dark text-white font-bold py-1 px-7 rounded-full shadow"
                onClick={handleAddFriend}
              >
                Add
              </button>
            </div>
          </div>
          <div className="w-80 bg-custom-green-light shadow-md rounded-lg p-4">
            <h2 className="mb-4 text-center">Send Message</h2>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded-full shadow"
            />
            <div className="flex justify-center">
              <button
                className={`bg-custom-blue hover:bg-custom-blue-dark text-white font-bold py-1 px-7 rounded-full shadow ${
                  selectedFriend === '' || message === ''
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
                onClick={handleSendMessage}
                disabled={selectedFriend === '' || message === ''}
              >
                Send
              </button>
            </div>
          </div>
        </div>
        <div className="w-89 mx-72 mt-8 bg-custom-green-light shadow-md rounded-lg p-4">
          <h2 className="mb-4 text-center">Chat</h2>
          <div className="h-64 overflow-y-scroll">
            {chats.map((chat, index) => (
              <div key={index} className="rounded-md mb-2">
                <div className="font-bold mb-1">{chat.sender}</div>
                <div className="bg-white rounded-full shadow-md">{chat.message}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friend;
