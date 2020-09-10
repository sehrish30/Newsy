import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./config";

//Returns an instance of firebase Application
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.firestore();

// class Firestore {
//     constructor(){
//         app.initializeApp(firebaseConfig);
//         this.app = app;
//         this .auth= app.auth();
//         this.db = app.firestore();
//     }
// }

// const firebase = newFirestore();
// export default firebase;