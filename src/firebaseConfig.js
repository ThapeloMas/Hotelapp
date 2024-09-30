// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBA6goZnnQH8x_IOupGTGbvWDt-QYuor7Q",
  authDomain: "hotel-app-1d4a6.firebaseapp.com",
  projectId: "hotel-app-1d4a6",
  storageBucket: "hotel-app-1d4a6.appspot.com",
  messagingSenderId: "5013358642",
  appId: "1:5013358642:web:f4aeaf680fd901f4d4142b",
  measurementId: "G-45WFQL40L6",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

