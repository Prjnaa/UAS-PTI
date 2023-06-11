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
import LogoSVG from "../assets/Logo.svg"
import "./sign.css"

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
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("email", "==", email))
    );

    if (querySnapshot.empty) {
      try {
        const id = generateUniqueId(); 
        const useRef = doc(userDataCollectionRef, id); 
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
      const firstDoc = querySnapshot.docs[0];
      const id = firstDoc.id;
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
        toast.error("User not registered or invalid password");
      });
  };

  const submitUser = async (email) => {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("email", "==", email))
    );

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      userState.currentUser = userData.id;
    } else {
      toast.error("User not found");
    }
  };
  
  return (
    <main className="w-screen h-screen rb-gradient grid xl:grid-cols-8 md:grid-cols-12 grid-cols-8 px-4 py-20">
      <motion.form
        className="w-full bg-comp shadow-box rounded-lg p-6 xl:col-start-4 xl:col-end-6 lg:col-start-5 lg:col-end-9 md:col-start-4 md:col-end-10 sm:col-start-2 sm:col-end-8 col-start-1 col-end-9"
        autoComplete="off"
        onSubmit={handleEmailPasswordLogin}
        initial={{ y: "-1000px" }}
        animate={{ y: 0 }}
        exit={{ y: "1000px", transition: { duration: 0.25 } }}
      >
        <img src={LogoSVG} className="logo"/>
        <h1 className="text-4xl text-acc font-bold text-center">Login</h1>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-acc font-semibold text-base"
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
            className="text-acc font-semibold text-base"
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
              className="h-10 w-full bg-acc text-white rounded-lg flex justify-center items-center transition-transform hover:scale-95"
            >
              Login
            </button>
            <button
              className="h-10 w-full rb-gradient2 text-white rounded-lg flex justify-center items-center transition-transform hover:scale-95"
              type="button"
              onClick={handleGoogleLogin}
            >
              Google Login
            </button>
            <Link
              to="/register"
              className="h-10 w-full bg-dom text-white rounded-lg flex justify-center items-center transition-transform hover:scale-95"
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
