// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgOxZjuvJOZCbYZwkEtTEPzKZd6O0MBUc",
  authDomain: "farmers-growth-2eb33.firebaseapp.com",
  projectId: "farmers-growth-2eb33",
  storageBucket: "farmers-growth-2eb33.firebasestorage.app",
  messagingSenderId: "3905799491",
  appId: "1:3905799491:web:ce47e71d9963b27199dbf6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);