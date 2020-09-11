import {useEffect, useState} from "react";
import {auth} from "../firebase/firebase";

const useAuth = ()=>{
   const [authUser, setAuthUser] = useState(null);

   useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(user => {
        if(user){
          setAuthUser(user);
        }else{
            setAuthUser(null)
        }
       })
       return () => {
        unsubscribe();
       }
   }, [])
   return [authUser, setAuthUser];
}

export default useAuth;