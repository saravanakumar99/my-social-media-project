// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiO4r7JX1bjpSXFn-FqhtkWsiAgbfsMo4",
  authDomain: "my-social-media-app-5950a.firebaseapp.com",
  projectId: "my-social-media-app-5950a",
  storageBucket: "my-social-media-app-5950a.appspot.com",
  messagingSenderId: "831880551886",
  appId: "1:831880551886:web:d8c62a2d08d7803c5f1f9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);