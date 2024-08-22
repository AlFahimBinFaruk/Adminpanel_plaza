// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const API_KEY = process.env.REACT_APP_API_KEY;

const APP_ID = process.env.REACT_APP_APP_ID;


const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "projects-storage-53473.firebaseapp.com",
  projectId: "projects-storage-53473",
  storageBucket: "projects-storage-53473.appspot.com",
  messagingSenderId: "389532524816",
  appId: APP_ID,
  measurementId: "G-03YS1GPVQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);