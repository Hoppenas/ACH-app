// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import * as firebase from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjMNrCKZg-50PDQeMD0S6PX4LpKY9QMNs",
  authDomain: "ach-app-21e27.firebaseapp.com",
  projectId: "ach-app-21e27",
  storageBucket: "ach-app-21e27.appspot.com",
  messagingSenderId: "484680740271",
  appId: "1:484680740271:web:f83a21f632a6e8b45c535a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectSorage = getStorage(app);
const projectFirestore = getFirestore(app);

export { projectSorage, projectFirestore };
