import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from "react-router-dom"

export default function Login() {

  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.info(result.user);
        localStorage.setItem('user', JSON.stringify(result.user))
        navigate("/main")
      })
      .catch((err) => {
        console.info(err);
      });
  };

  return (
    <main className='w-screen min-h-screen flex flex-col bg-gradient-to-tr from-blue-800 to-blue-500 max-w-[500px] mx-auto p-10'>
      <form className='w-full bg-white flex flex-col gap-4 shadow-lg rounded-lg mt-8 p-6' autoComplete='off'>
        <h1 className='text-4xl text-blue-500 text-center'>Login</h1>
        <div className='flex flex-col gap-2'>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' className='h-10 px-3 rounded-md border-[1px] border-gray-300' />

          <label htmlFor='password'>Password</label>
          <input type='password' id='password' className='h-10 px-3 rounded-md border-[1px] border-gray-300' />

          <div className='mt-4 flex flex-col gap-2'>
            <Link to='/main' className='h-10 w-full bg-blue-500 text-white rounded-lg flex justify-center items-center'>
              Login
            </Link>
            <button
              className='h-10 w-full bg-yellow-500 text-white rounded-lg'
              type='button'
              onClick={handleGoogleLogin}
            >
              Google Login
            </button>
            <Link to='/register' className='h-10 w-full bg-red-500 text-white rounded-lg flex justify-center items-center'>
              Register
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}
