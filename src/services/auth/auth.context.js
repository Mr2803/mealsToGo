import React, { useState, createContext } from "react";
import * as firebase from "firebase";
import { loginRequest } from "./auth.services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  firebase.auth().onAuthStateChanged((usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
        setError(null);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
        // console.log(e);
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    if (password !== repeatedPassword) {
      setError("Errore : le password non coincidono");
      return;
    }

    setIsLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        setUser(u);
        setError(null);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
        // console.log(e);
      });
  };

  const onLogout = () => {
    setUser(null);
    firebase.auth().signOut();
  };
  return (
    <AuthContext.Provider
      value={{
        isAuth: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
