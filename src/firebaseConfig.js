
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
