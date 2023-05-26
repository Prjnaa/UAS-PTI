import { collection, getDoc, getDocs } from "@firebase/firestore";
import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import { db } from "../firebase.js";

function Userdata() {
  const [users, setUsers] = useState([]);
  const usersRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(users)
    };

    getUsers();
  }, []);
}

export default Userdata;
