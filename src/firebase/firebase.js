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