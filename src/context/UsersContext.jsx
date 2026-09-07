import React, { createContext, useEffect, useState } from "react";
import { db } from "../Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

let UserContext = createContext();

const UsersProvider = ({ children }) => {
  if (!localStorage.getItem("currentUser")) {
    localStorage.setItem("currentUser", JSON.stringify(null));
  }

  let [userData, setUserData] = useState({});

  let [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")),
  );

  let getData = async () => {
    let docRef = doc(db, "users", currentUser);
    let docSnap = await getDoc(docRef);
    setUserData(docSnap.data());
  };

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    getData();
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
