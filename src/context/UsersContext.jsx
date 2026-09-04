import React, { createContext, useState } from "react";

let UserContext = createContext();

const UsersProvider = ({ children }) => {
  if (!localStorage.getItem("allUsers")) {
    localStorage.setItem("allUsers", JSON.stringify([]));
  }

  if (!localStorage.getItem("currentUser")) {
    localStorage.setItem("currentUser", JSON.stringify(null));
  }

  let [allUsers, setAllUsers] = useState(
    JSON.parse(localStorage.getItem("allUsers")),
  );

  let [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")),
  );

  return (
    <UserContext.Provider value={{ allUsers, setAllUsers, currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UsersProvider };
