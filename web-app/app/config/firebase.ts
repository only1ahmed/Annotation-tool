// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCiroVMRN2o42dmT6CTWhQR8_uT9jwZUBM",
    authDomain: "annotation-tool-431a7.firebaseapp.com",
    projectId: "annotation-tool-431a7",
    storageBucket: "annotation-tool-431a7.firebasestorage.app",
    messagingSenderId: "946594237387",
    appId: "1:946594237387:web:9525074308b6db94b1444e",
    measurementId: "G-BS11713752"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
