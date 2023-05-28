import { Link } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { saveUserStateToLocalStorage, userState } from "../currentUser";
import { v4 as uuidv4 } from 'uuid'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const navigate = useNavigate();
  const userDataCollectionRef = collection(db, "users");

  const generateUniqueId = () => {
    const id = uuidv4();
    return id;
  };

  //google
  const handleGoogleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const googleData = result.user;
        console.info(result.user);
        localStorage.setItem("user", JSON.stringify(result.user));
        submitGoogleUser(googleData.email, googleData.displayName)
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

  const submitGoogleUser = async (email, name) => {
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
      console.log("User data already exists in the database");
      const firstDoc = querySnapshot.docs[0];
      const id = firstDoc.id; // Use the existing ID for the user document
      userState.currentUser = id;
      return id;
    }
  };

  //google

  const handleEmailPasswordLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        localStorage.setItem("user", JSON.stringify(result.user));
        await submitUser(email);
        saveUserStateToLocalStorage();
        navigate("/main");
      })
      .catch(() => {
        toast.error("User not registered");
      });
  };

  const submitUser = async (email) => {
    console.log("User:", email);
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("email", "==", email))
    );

    if (!querySnapshot.empty) {
      console.log("Data pengguna ada dalam database");
      const userData = querySnapshot.docs[0].data();
      userState.currentUser = userData.id;
    } else {
      console.log("Data pengguna tidak ada dalam database");
      toast.error("User not found");
    }
  };
  
  return (
    <main className="w-screen h-screen bg-mgreen grid xl:grid-cols-8 md:grid-cols-12 grid-cols-8 px-4 py-20">
      <motion.form
        className="w-full bg-lyellow shadow-box rounded-lg p-6 xl:col-start-4 xl:col-end-6 lg:col-start-5 lg:col-end-9 md:col-start-4 md:col-end-10 sm:col-start-2 sm:col-end-8 col-start-1 col-end-9"
        autoComplete="off"
        onSubmit={handleEmailPasswordLogin}
        initial={{ y: "-1000px" }}
        animate={{ y: 0 }}
        exit={{ y: "1000px", transition: { duration: 0.25 } }}
      >
        <h1 className="text-4xl text-dgreen font-bold text-center">Login</h1>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-dgreen font-semibold text-base"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="h-10 px-3 rounded-md border-[1px] border-gray-300"
          />

          <label
            htmlFor="password"
            className="text-dgreen font-semibold text-base"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="h-10 px-3 rounded-md border-[1px] border-gray-300"
          />

          <div className="mt-4 flex flex-col gap-2">
            <button
              type="submit"
              className="h-10 w-full bg-blue-500 text-white rounded-lg flex justify-center items-center"
            >
              Login
            </button>
            <button
              className="h-10 w-full bg-yellow-500 text-white rounded-lg"
              type="button"
              onClick={handleGoogleLogin}
            >
              Google Login
            </button>
            <Link
              to="/register"
              className="h-10 w-full bg-red-500 text-white rounded-lg flex justify-center items-center"
            >
              Register
            </Link>
          </div>
        </div>
      </motion.form>
      <ToastContainer />
    </main>
  );
}
