import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider} from 'firebase/auth'
import { auth } from "../firebase/firebase.init";
import axios from "axios";
export default function AuthProvider({children}) {
     const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
const provider = new GoogleAuthProvider();
    const createUser = (email, password) =>{
        setLoading(true);
     return createUserWithEmailAndPassword(auth,email,password)
    }
     const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

      const signOutUser = () =>{
        setLoading(true);
        return signOut(auth)
    }
     const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth,provider)
    }
  useEffect( () =>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoading(false);
            // if(currentUser?.email){
            //     const userData = {email : currentUser.email};
            //     axios.post('http://localhost:3000/jwt',userData, { withCredentials: true })
            //     .then(res=>{
            //         console.log(res.data)
            //     })
            //     .catch(error=>console.log(error))
            // }
            // console.log('user in the auth state change', currentUser)
        })
        return () =>{
            unSubscribe();
        }
    }, [])

    const authInfo = {
        loading,
        user,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser
    }
    return (
    <AuthContext value={authInfo}>
            {children}
        </AuthContext>
  );
}