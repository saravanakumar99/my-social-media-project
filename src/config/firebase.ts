// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHWkbDd6d92NlKlfaNKpElBejBxhoI1d0",
  authDomain: "duo-quotes-2f6c8.firebaseapp.com",
  projectId: "duo-quotes-2f6c8",
  storageBucket: "duo-quotes-2f6c8.appspot.com",
  messagingSenderId: "1044178215397",
  appId: "1:1044178215397:web:47468368c9888dab144f0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);