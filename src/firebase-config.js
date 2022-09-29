import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4vvGc6zpZr4glWPtJ_R1DveP1akE9WgM",
  authDomain: "glassball-assignment.firebaseapp.com",
  databaseURL: "https://glassball-assignment-default-rtdb.firebaseio.com",
  projectId: "glassball-assignment",
  storageBucket: "glassball-assignment.appspot.com",
  messagingSenderId: "3723104873",
  appId: "1:3723104873:web:9ffd0cdc04528c4891c8f8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
