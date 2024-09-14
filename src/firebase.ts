// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACyGZzYjM4COdO2lI1wwo_X64v4RWq_wU",
  authDomain: "minto-759ab.firebaseapp.com",
  projectId: "minto-759ab",
  storageBucket: "minto-759ab.appspot.com",
  messagingSenderId: "489761271852",
  appId: "1:489761271852:web:fcf2d00b792306d5626189",
  measurementId: "G-4Z1FZ45EDE"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
