// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as firebase from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC11QvEMvaiW6tSE7mrmWMLaS5kTg1nl_A",
  authDomain: "agne-gallery.firebaseapp.com",
  databaseURL:
    "https://agne-gallery-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "agne-gallery",
  storageBucket: "agne-gallery.appspot.com",
  messagingSenderId: "732181115974",
  appId: "1:732181115974:web:5298eb16ca4f7296918647",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);

const auth = getAuth();
setPersistence(auth, browserLocalPersistence);
// .then(() => {
//   // Existing and future Auth states are now persisted in the current
//   // session only. Closing the window would clear any existing state even
//   // if a user forgets to sign out.
//   // ...
//   // New sign-in will be persisted with session persistence.
//   return signInWithEmailAndPassword(auth, email, password);
// })
// .catch((error) => {
//   // Handle Errors here.
//   const errorCode = error.code;
//   const errorMessage = error.message;
// });

export { projectStorage, projectFirestore };
