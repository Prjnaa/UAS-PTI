import { useState, useEffect, useRef } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";
import { db, auth } from "../../firebase";
import '../../../index.css'

export default function Chat() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  
  const chatContainerRef = useRef(null);
  const messageRef = collection(db, "messages");

  useEffect(() => {
    const q = query(messageRef, orderBy("createdAt"));
  
    const unsubscribe = onSnapshot(q, (snapShot) => {
      const _messages = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
      setMessages(_messages);
    });
  
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleNewMessage = async (e) => {
    e.preventDefault();
  
    if (newMessage === "") return;
  
    await addDoc(messageRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      name: auth.currentUser.displayName,
      img: auth.currentUser.photoURL,
    });
  
    setNewMessage("");
  };

  return (
    <div className="w-[80%] h-[80%] p-4 flex flex-col bg-cust-3 border border-gray-200 rounded-lg shadow mb-5 ">
      <h1 className="font-semibold text-xl mb-3">Comunity Chat</h1>
      <div ref={chatContainerRef} className="flex flex-col flex-grow overflow-y-scroll space-y-2 mb-2">
        {messages.map((message) => (
          <div
            className={`flex flex-row items-center space-x-2 ${
              message.name === auth.currentUser.displayName ? "justify-end" : "justify-start"
            }`}
            key={message.id}
          >
            {message.name !== auth.currentUser.displayName && (
              <img className="w-8 h-8 rounded-full" src={message.img} alt={message.name} />
            )}
            <div
              className={`bg-cyan-100 rounded-lg p-2 ${
                message.name === auth.currentUser.displayName ? " bg-cyan-100 text-black" : ""
              }`}
            >
              <p className="font-bold">{message.name !== auth.currentUser.displayName && message.name + ":"}</p>
              <p className="text-sm">{message.text}</p>
            </div>
            {message.name === auth.currentUser.displayName && (
              <h1 className="mb-3 font-semibold text-base">Me</h1>
            )}
          </div>
        ))}
      </div>
      <form className="flex flex-row space-x-4" onSubmit={handleNewMessage}>
        <input
          className="w-full h-12 p-2 rounded-lg"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a new message..."
        />
        <button className="bg-cust-4 w-32 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline hover:translate-y-[-5px] transition duration-300 ease-in-out" type="submit">Send</button>
      </form>
    </div>
  );
}
