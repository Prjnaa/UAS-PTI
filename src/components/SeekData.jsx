import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export function SeekData() {
  
  const getDatabase = async () => {
    const databaseRef = collection(db, "users");
    const data = await getDocs(databaseRef);

    try {
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

    } catch (err) {
      console.error(err);
    }
  };
  getDatabase();
}
