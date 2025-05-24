import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  onValue,
  remove,
  update,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA8BwP3SOwG-9Ibybd_kbBiPw3-Hk-oN5I",
  authDomain: "expense-tracker-e3f78.firebaseapp.com",
  databaseURL: "https://expense-tracker-e3f78-default-rtdb.firebaseio.com",
  projectId: "expense-tracker-e3f78",
  storageBucket: "expense-tracker-e3f78.firebasestorage.app",
  messagingSenderId: "566315140323",
  appId: "1:566315140323:web:dc07ef10d29b025d7fb1d6",
  measurementId: "G-Q5KVTNHB26",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, onValue, remove, update };
