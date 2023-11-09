// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-syack-hostel.firebaseapp.com",
  projectId: "mern-syack-hostel",
  storageBucket: "mern-syack-hostel.appspot.com",
  messagingSenderId: "192457441450",
  appId: "1:192457441450:web:678a3821bc622ca950d0d3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);