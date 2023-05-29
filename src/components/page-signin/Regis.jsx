import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { collection, db } from "../firebase";
import "firebase/auth";
import { doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { saveUserStateToLocalStorage, userState } from "../currentUser";
import { v4 as uuidv4 } from 'uuid'; // Import fungsi uuidv4 dari pustaka uuid
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const navigate = useNavigate();

  const userDataCollectionRef = collection(db, "users");

  // Fungsi untuk menghasilkan ID unik
  const generateUniqueId = () => {
    const id = uuidv4();
    return id;
  };

  //google
  const submitUser = async (email, name) => {
    console.log("User:", email, name);
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("email", "==", email))
    );

    if (querySnapshot.empty) {
      try {
        const id = generateUniqueId(); // Generate a unique ID
        const useRef = doc(userDataCollectionRef, id); // Use the generated ID for the user document
        await setDoc(useRef, {
          id: id,
          email: email,
          userName: name,
          eventLists: [],
        });

        userState.currentUser = id;
        return id;
      } catch (err) {
        console.error(err);
        throw err;
      }
    } else {
      console.log("Data pengguna sudah ada dalam database");
      const firstDoc = querySnapshot.docs[0];
      const id = firstDoc.id; // Use the existing ID for the user document
      userState.currentUser = id;
      return id;
    }
  };

  const handleGoogleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const googleData = result.user;
        console.info(result.user);
        localStorage.setItem("user", JSON.stringify(result.user));
        submitUser(googleData.email, googleData.displayName)
          .then((id) => {
            userState.currentUser = id;
            saveUserStateToLocalStorage();
            navigate("/main");
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.info(err);
      });
  };
  //google

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;
    const userName = email.split("@")[0];

    if (!email || !password || !password2) {
      toast.error("Please enter all required data");
      return;
    }

    if (password !== password2) {
      toast.error("Passwords are not the same");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be longer than 6 characters");
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result.user));
        submitUser(result.user.email, userName)
          .then((id) => {
            userState.currentUser = id;
            saveUserStateToLocalStorage();
            navigate("/main");
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Email already in use");
      });
  };

  return (
    <main className="w-screen h-screen bg-cust-1 grid xl:grid-cols-8 md:grid-cols-12 grid-cols-8 px-4 py-20">
      <motion.form
        className="w-full bg-cust-3 shadow-box rounded-lg p-6 xl:col-start-4 xl:col-end-6 lg:col-start-5 lg:col-end-9 md:col-start-4 md:col-end-10 sm:col-start-2 sm:col-end-8 col-start-1 col-end-9"
        autoComplete="off"
        onSubmit={handleRegister}
        initial={{ y: "-1000px" }}
        animate={{ y: 0 }}
        exit={{ y: "1000px", transition: { duration: 0.25 } }}
      >
        <h1 className="text-4xl text-cust-4 font-bold text-center">Register</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-cust-4 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="h-10 px-3 rounded-md border-[1px] border-gray-300"
          />

          <label htmlFor="password" className="text-cust-4 font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="h-10 px-3 rounded-md border-[1px] border-gray-300"
          />

          <label htmlFor="password2" className="text-cust-4 font-semibold">
            Confirm password
          </label>
          <input
            type="password"
            id="password2"
            className="h-10 px-3 rounded-md border-[1px] border-gray-300"
          />

          <div className="mt-4 flex flex-col gap-2">
            <button
              className="h-10 w-full bg-cust-4 text-white rounded-lg flex justify-center items-center transition-transform hover:scale-95"
              type="submit"
            >
              Register
            </button>
            <button
              className="h-10 w-full bg-red-500 text-white rounded-lg flex justify-center items-center transition-transform hover:scale-95"
              type="button"
              onClick={handleGoogleLogin}
            >
              Google Login
            </button>
            <Link
              to={"/"}
              className="h-10 w-full bg-cust-5 text-white rounded-lg flex justify-center items-center transition-transform hover:scale-95"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </motion.form>
      <ToastContainer />
    </main>
  );
}
