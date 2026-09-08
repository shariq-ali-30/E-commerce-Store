import React, { createContext, useEffect, useState } from "react";
import { db } from "../Firebase/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

let UserContext = createContext();

const UsersProvider = ({ children }) => {
  if (!localStorage.getItem("currentUser")) {
    localStorage.setItem("currentUser", JSON.stringify(null));
  }

  let [userData, setUserData] = useState({});

  let [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")),
  );

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

  if (!currentUser) {
      return
    }

    const docRef = doc(db, "users", currentUser);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, userData, setUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UsersProvider };
