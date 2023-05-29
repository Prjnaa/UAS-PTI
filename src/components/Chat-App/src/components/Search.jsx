import React, { useState } from 'react';
import { doc, setDoc, serverTimestamp, getDocs, collection, query, where, arrayUnion } from 'firebase/firestore';

import { db } from "../../../firebase";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

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
    if (user && user.id) {
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
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="search">
      <div className="searchForm flex justify-between">
        <input
          type="text"
          placeholder="Cari pengguna"
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={handleSearch} className='p-2'>Cari</button>
      </div>
      {err && <span>Pengguna tidak ditemukan</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <div className="userChatInfo">
            <span>{user.userName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
