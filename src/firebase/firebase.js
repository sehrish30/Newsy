import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./config";

//Returns an instance of firebase Application
export const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
// const db = app.firestore();
const db =firebase.firestore()

export const register=  async(name, email, password)=>{
    const newUser = await auth.createUserWithEmailAndPassword(email, password);

    return newUser.user.updateProfile({
        displayName: name
    })
}

export const checking = (email, password) =>{
    return firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
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

export const dbLinksRef = db.collection('links');



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