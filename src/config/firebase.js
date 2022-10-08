//  Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzcHrBQR7ycdoQqO0IRRRIYlcOWqayBHo",
  authDomain: "wa-chat-59119.firebaseapp.com",
  projectId: "wa-chat-59119",
  storageBucket: "wa-chat-59119.appspot.com",
  messagingSenderId: "596203917411",
  appId: "1:596203917411:web:53792373a192020dc4e856"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;