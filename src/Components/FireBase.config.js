// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKHkMMJSS9R5dQbzCtz8DwsJEL9n25zCI",
  authDomain: "start-not-delete.firebaseapp.com",
  projectId: "start-not-delete",
  storageBucket: "start-not-delete.firebasestorage.app",
  messagingSenderId: "225010020505",
  appId: "1:225010020505:web:4528423c36eefa14eb0808"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;