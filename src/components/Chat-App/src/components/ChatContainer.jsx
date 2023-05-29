import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import Chat from "./Chat";

const ChatContainer = ({ documentId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Ambil data user dari database
    const fetchUserData = async () => {
      try {
        const userDataRef = db.collection("userInfo").doc(documentId);
        const userDataSnapshot = await userDataRef.get();

        if (userDataSnapshot.exists) {
          const userData = userDataSnapshot.data();
          const { uid, userName } = userData.users[0];
          setUser({ uid, displayName: userName });
        } else {
          console.log("User data not found");
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [documentId]);

  return (
    <div>
      {user ? <Chat user={user} /> : <div>Loading...</div>}
    </div>
  );
};

export default ChatContainer;
