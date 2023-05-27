import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { addDoc, collection, db } from "../firebase";
import { useEffect, useState } from "react";
import 'firebase/auth';
import { SeekData } from "../SeekData";



export default function Register() {
  const navigate = useNavigate();
  const [uname, setUname] = useState('');
  const [email, setEmail] = useState('');

  const userDataCollectionRef = collection(db, "users");
  
  useEffect(() => {
    SeekData()
  }, []);

  const submitUser = async () => {
    try {
      await addDoc(userDataCollectionRef, {
        email: email,
        userName: uname
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitUser = (e) => {
    setEmail(e.target.value)
    const userName = JSON.stringify(email.split('@')[0]);
    setUname(userName)
  }  

  const handleGoogleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.info(result.user);
        navigate("/main");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleGoogleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const password2 = e.target.password2.value;

    if (!email || !password || !password2) {
      return alert("Lengkapi Data Dulu");
    }

    if (password !== password2) {
      return alert("Password Tidak Sama");
    }

    if (password.length < 6) {
      return alert("Password Harus Lebih Dari 6 Karakter");
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result.user));

        navigate("/main");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <main className="w-screen h-screen bg-lyellow grid xl:grid-cols-8 md:grid-cols-12 grid-cols-8 px-4 py-20">
      <motion.form
        className="w-full bg-dgreen shadow-box rounded-lg p-6 xl:col-start-4 xl:col-end-6 lg:col-start-5 lg:col-end-9 md:col-start-4 md:col-end-10 sm:col-start-2 sm:col-end-8 col-start-1 col-end-9"
        autoComplete="off"
        onSubmit={handleGoogleRegister}
        initial={{ y: "-1000px" }}
        animate={{ y: 0 }}
        exit={{ y: "1000px", transition: { duration: 0.25 } }}
      >
        <h1 className="text-4xl text-lgreen font-bold text-center">Sign Up</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-lgreen">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="h-10 px-3 rounded-md border-[1px] border-gray-300"
            onChange={handleSubmitUser}
          />

          <label htmlFor="password" className="text-lgreen">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="h-10 px-3 rounded-md border-[1px] border-gray-300"
          />

          <label htmlFor="password2" className="text-lgreen">
            Ulangi Password
          </label>
          <input
            type="password"
            id="password2"
            className="h-10 px-3 rounded-md border-[1px] border-gray-300"
          />

          <div className="mt-4 flex flex-col gap-2">
            <button
              className="h-10 w-full bg-red-500 text-white rounded-lg"
              type="submit"
              onClick={submitUser}
            >
              Register
            </button>
            <button
              className="h-10 w-full bg-yellow-500 text-white rounded-lg"
              type="button"
              onClick={handleGoogleLogin}
            >
              Google Login
            </button>
            <Link
              to={"/"}
              className="h-10 w-full bg-blue-500 text-white rounded-lg flex justify-center items-center"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </motion.form>
    </main>
  );
}