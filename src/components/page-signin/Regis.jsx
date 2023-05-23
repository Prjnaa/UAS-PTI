import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.info(result.user);
        navigate('/main');
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
        localStorage.setItem('user',JSON.stringify(result.user))
        navigate('/main');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <main className='w-screen min-h-screen flex flex-col bg-gradient-to-tr from-orange-300 to-orange-500 max-w-[500px] mx-auto p-10'>
      <form className='w-full bg-white flex flex-col gap-4 shadow-lg rounded-lg mt-8 p-6' autoComplete='off' onSubmit={handleGoogleRegister}>
        <h1 className='text-4xl text-orange-500 text-center'>Register</h1>
        <div className='flex flex-col gap-2'>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' className='h-10 px-3 rounded-md border-[1px] border-gray-300' />

          <label htmlFor='password'>Password</label>
          <input type='password' id='password' className='h-10 px-3 rounded-md border-[1px] border-gray-300' />

          <label htmlFor='password2'>Ulangi Password</label>
          <input type='password' id='password2' className='h-10 px-3 rounded-md border-[1px] border-gray-300' />

          <div className='mt-4 flex flex-col gap-2'>
            <button className='h-10 w-full bg-red-500 text-white rounded-lg' type='submit'>Register</button>
            <button className='h-10 w-full bg-yellow-500 text-white rounded-lg' type='button' onClick={handleGoogleLogin}>Google Login</button>
            <Link to={'/'} className='h-10 w-full bg-blue-500 text-white rounded-lg flex justify-center items-center'>Back to Login</Link>
          </div>
        </div>
      </form>
    </main>
  );
}
