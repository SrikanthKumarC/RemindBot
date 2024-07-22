import { getFirestore } from "firebase/firestore";


import firebase from "@/lib/firebase/firebase";


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebase);


export default db;