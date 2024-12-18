import auth from "./FireBase.config";
import { createContext, useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthContext = createContext(null);

export default function AuthoProvider({children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const creatUser=(eamil, password)=>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth, eamil, password);
  }

  const signInUser =(email, password)=>{
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logOut = ()=>{
    setLoading(true);
    return signOut(auth);
  }

  // Check user Current State (log or out)
  useEffect(()=>{
    const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setLoading(false);
      setUser(currentUser);
      console.log("obsurb: ", currentUser);
    });

    return ()=>{
      unSubscribe();
    }

  },[])
    
  const authInfo = {user, creatUser, signInUser, logOut, loading}

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
};

AuthoProvider.propTypes = {
  children: PropTypes.node
}