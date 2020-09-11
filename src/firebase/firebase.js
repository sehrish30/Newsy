import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./config";

//Returns an instance of firebase Application
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.firestore();

export const register=  async(name, email, password)=>{
    const newUser = await auth.createUserWithEmailAndPassword(email, password);

    return newUser.user.updateProfile({
        displayName: name
    })
}

export const logIn=(email, password)=>{
    return auth.signInWithEmailAndPassword(email, password);
}

export const logOut = ()=>{
    return auth.signOut();
}

export const resetPassword=(email) => {
    return auth.sendPasswordResetEmail(email);
}


// class Firebase {
//     constructor() {
//       app.initializeApp(firebaseConfig);
//       this.app = app;
//       this.auth = app.auth();
//       this.db = app.firestore();
//     }
  
//     async register(name, email, password) {
//       const newUser = await this.auth.createUserWithEmailAndPassword(
//         email,
//         password
//       );
//       return newUser.user.updateProfile({
//         displayName: name,
//       });
//     }
  
//     login(email, password) {
//       return this.auth.signInWithEmailAndPassword(email, password);
//     }
  
//     logout() {
//       return this.auth.signOut();
//     }
  
//     resetPassword(email) {
//       return this.auth.sendPasswordResetEmail(email);
//     }
//   }
  
//   const firebase = new Firebase();
//   export default firebase;