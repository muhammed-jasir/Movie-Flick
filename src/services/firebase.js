import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`, 
    authDomain: "movie-flick.firebaseapp.com",
    projectId: "movie-flick",
    storageBucket: "movie-flick.appspot.com",
    messagingSenderId: "131882834278",
    appId: "1:131882834278:web:2fca0ac32c15dfd68250a7",
    measurementId: "G-NMY26JZ2FT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;