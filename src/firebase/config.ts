// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as firebase from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

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

export { projectStorage, projectFirestore };
