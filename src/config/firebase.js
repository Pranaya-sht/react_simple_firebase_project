// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChJhVW7WTF2A_wuxmk-qEu2axRtHaj8fc",
  authDomain: "react-course-eabf3.firebaseapp.com",
  projectId: "react-course-eabf3",
  storageBucket: "react-course-eabf3.appspot.com",
  messagingSenderId: "47727150808",
  appId: "1:47727150808:web:e10fae07862864c13e79ad",
  measurementId: "G-P818Z49E9M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const auth= getAuth(app);
export const provider= new GoogleAuthProvider();
export const db =getFirestore(app);