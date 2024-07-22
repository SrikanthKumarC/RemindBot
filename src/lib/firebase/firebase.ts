// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMi_f4reOf3K32JPMEWhLqu0gUtOfnZ7c",
    authDomain: "remindbotxyz.firebaseapp.com",
    projectId: "remindbotxyz",
    storageBucket: "remindbotxyz.appspot.com",
    messagingSenderId: "133758713880",
    appId: "1:133758713880:web:468eb4e64bf0e5531f036d",
    measurementId: "G-GET051M8P1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;