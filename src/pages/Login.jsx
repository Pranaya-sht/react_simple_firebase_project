import React from 'react';
import { auth, provider } from '../config/firebase'; // Corrected path
import { signInWithPopup } from 'firebase/auth';
import {useNavigate} from "react-router-dom"

export const Login = () => {

const navigate =useNavigate();

  const signinwithgoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/")
  };

  return (
    <div>
      <h1>Sign in with Google to continue</h1>
      <button onClick={signinwithgoogle}>Sign in with Google</button>
    </div>
  );
};
