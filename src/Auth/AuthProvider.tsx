import React, { useEffect } from 'react';
import { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';
import { AuthContext } from './Authcontext';


const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // create new_user account for new account email and password 
  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // sign in user with email and password
  const signIn = (email : string, password : string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  // new create account sign up with google 
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () =>{
    setLoading(true);
    return signInWithPopup(auth ,googleProvider );
  }

  // logout the user 
  const logOut = () =>{
    setLoading(true);
    return signOut(auth);
  }

  // user Information update 
  const updateUserProfile = (userInfo: { displayName?: string; photoURL?: string }) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, userInfo);
    }
    return Promise.reject(new Error("No authenticated user."));
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      // console.log('user in the auth state change', currentUser)
      setLoading(false);
    });

    return () => {
      unSubscribe();
    }
  }, [])

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile
  }
  // console.log("Current user :" , user)
  console.log("Current user :" , user?.email)

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;