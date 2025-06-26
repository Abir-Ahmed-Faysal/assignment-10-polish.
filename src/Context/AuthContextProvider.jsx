import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../Firebase.config";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const signUpWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userInfoUpdate = (username, photoUrl) => {
    return updateProfile(auth?.currentUser, {
      displayName: username,
      photoURL: photoUrl,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        if (user.photoURL) {
          setPhotoURL(user.photoURL || null);
          setUserName(user.displayName || null);
          setIsLoading(false);
        }
      } else {
        setUser(null);
        setPhotoURL(null);
        setUserName(null);
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  //get current user info after sign up

  const getUpdateUser = () => {
    const user = auth.currentUser;
    if (user) {
      setPhotoURL(user.photoURL || null);
      setUserName(user.displayName || null);
    } else {
      setPhotoURL(null);
      setUserName(null);
    }
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };

  const manageUser = {
    signUpWithEmail,
    userInfoUpdate,
    getUpdateUser,
    login,
    logout,
    googleSignIn,
    setUserName,
    setUser,
    setPhotoURL,
    photoURL,
    user,
    userName,
    isLoading,
  };

  return (
    <AuthContext.Provider value={manageUser}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
