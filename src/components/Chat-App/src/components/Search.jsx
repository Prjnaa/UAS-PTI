import React, { useState, useEffect } from 'react';
import { doc, setDoc, serverTimestamp, getDocs, collection, query, where, arrayUnion, getDoc } from 'firebase/firestore';

import { db } from "../../../firebase";
import Chat from "./Chat"; // Import the Chat component

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]); // State untuk melacak pengguna yang telah dipilih

  useEffect(() => {
    const fetchSelectedUsers = async () => {
      try {
        const selectedUsersRef = doc(db, 'selectedUsers', 'selectedUsersDocument');
        const docSnapshot = await getDoc(selectedUsersRef);
  
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setSelectedUsers(data.selectedUsers);
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchSelectedUsers();
  }, []);

  const handleSearch = async () => {
    try {
      const q = query(collection(db, "users"), where("userName", "==", userName));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          setUser({ id: doc.id, ...doc.data() });
        });
        setErr(false);
        console.log('Pengguna ditemukan');
      } else {
        setUser(null);
        setErr(true);
        console.log('Pengguna tidak ditemukan');
      }
    } catch (err) {
      setErr(true);
      console.error(err);
    }
  };

  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  const handleSelect = async () => {
    if (user && user.id && !selectedUsers.includes(user.userName)) { // Cek apakah pengguna sudah dipilih sebelumnya
      const combineId = user.id;
  
      try {
        const userChatRef = doc(db, 'userChats', combineId);
        await setDoc(userChatRef, {
          userInfo: {
            [combineId]: {
              date: serverTimestamp(),
              users: arrayUnion({
                userName: user.userName,
                uid: combineId,
              }),
            },
          },
        });
  
        console.log('Pengguna berhasil ditambahkan ke userChats');
        setSelectedUsers(prevSelectedUsers => [...prevSelectedUsers, user.userName]); // Menambahkan pengguna yang dipilih ke dalam state selectedUsers

        // Simpan daftar pengguna yang dipilih ke Firebase
        const selectedUsersRef = doc(db, 'selectedUsers', 'selectedUsersDocument');
        await setDoc(selectedUsersRef, {
          selectedUsers: [...selectedUsers, user.userName],
        });
      } catch (err) {
        console.error(err);
      }
    }
  };
  

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Cari pengguna"
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={handleSearch}>Cari</button>
      </div>
      {err && <span className='text-white'>Pengguna tidak ditemukan</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <div className="userChatInfo">
            <span>{user.userName}</span>
          </div>
        </div>
      )}
      <div>
        {selectedUsers.map((userName) => (
          <div className="selectedUser bg-cust-2 border-t-2 border-black text-black p-2 hover:bg-white" key={userName}>
            {userName}
            <p>Halo</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
