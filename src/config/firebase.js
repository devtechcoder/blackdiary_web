import { initializeApp } from "firebase/app";
import {
  collection,
  addDoc,
  getFirestore,
  query,
  getDocs,
} from "firebase/firestore";
import { getDatabase } from "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import firestore from "firebase/firestore";

// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

const config = {
  apiKey: "AIzaSyCaLj5pwQWvSZOtY5lOsLDN3ns-s5nYffM",
  authDomain: "plsdfanit-d35fa.firebaseapp.com",
  projectId: "plandsfit-d35fa",
  storageBucket: "pladsfnit-d35fa.appspot.com",
  messagingSenderId: "34dsfdsfsd4353011392",
  appId: "1:344353011392df:web:0b7ee84279ff98d8a79f25",
  measurementId: "G-ZN5QdfsJH6X0S",
};

const m_app = initializeApp(config);

const app = firebase.initializeApp(config);

const db = firebase.firestore();

const m_db = getFirestore(m_app);
const realDb = getDatabase(m_app);

export {
  db,
  firebase,
  collection,
  addDoc,
  realDb,
  m_db,
  m_app,
  query,
  getDocs,
};
