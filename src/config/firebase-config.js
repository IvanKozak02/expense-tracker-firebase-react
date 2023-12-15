// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQ6GzKLG7k8NEvKcZFP52khQEUrO2-HZk",
    authDomain: "expense-trackr-f3e6c.firebaseapp.com",
    projectId: "expense-trackr-f3e6c",
    storageBucket: "expense-trackr-f3e6c.appspot.com",
    messagingSenderId: "687659233727",
    appId: "1:687659233727:web:863d6a0a1cdf0927b5310a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);