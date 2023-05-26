import { Link } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.info(result.user);
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/main");
      })
      .catch((err) => {
        console.info(err);
      });
  };

  const handleEmailPasswordLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/main");
      })
      .catch(() => {
        alert("User tidak terdaftar");
      });
  };

  return (
    <main className="w-screen h-screen bg-mgreen grid xl:grid-cols-8 md:grid-cols-12 grid-cols-8 px-4 py-20">
      <motion.form
        className=" w-full bg-lyellow shadow-box rounded-lg p-6 xl:col-start-4 xl:col-end-6 lg:col-start-5 lg:col-end-9 md:col-start-4 md:col-end-10 sm:col-start-2 sm:col-end-8 col-start-1 col-end-9" 
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
    </main>
  );
}
