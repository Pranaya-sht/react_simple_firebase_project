import React from 'react';
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth"
import{signOut} from "firebase/auth"

export const Navbar = () => {
    const[user]=useAuthState(auth)
    const signuserout=async()=>{
        await signOut(auth);


    }
  return (
    <div> 
      <Link to="/">Home</Link>
      {!user?(<Link to="/Login">   Login</Link>):
      
      
      (<Link to="/createpost">                            create post</Link>)}
    

      <div>
        {user ? (
            <>
          <p>{user.displayName}</p>
          <img src ={user?.photoURL||""}width="100" hight="100"/>
          
          <button onClick={signuserout}>SIGN out</button>
          </>
        ) : (
          <p>No user signed in</p>
        )}
      </div>
    </div>
  );
};