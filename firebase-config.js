// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBqUNab1SPBk6UffViY0QH5DRdSUnRSQLc",
  authDomain: "converter-currency-231cc.firebaseapp.com",
  projectId: "converter-currency-231cc",
  storageBucket: "converter-currency-231cc.appspot.com",
  messagingSenderId: "207149611721",
  appId: "1:207149611721:web:d5a0daa12c5cf7dd5aab18",
  measurementId: "G-9H2Q23JSMQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
