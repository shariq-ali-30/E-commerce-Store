import React, { createContext, useEffect, useState } from "react";

let UserContext = createContext();

const UsersProvider = ({ children }) => {
  if (!localStorage.getItem("allUsers")) {
    localStorage.setItem("allUsers", JSON.stringify([{
      email: "shariq3072007@gmail.com",
      password: "12345678"
    }]));
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

  useEffect(() => {
    localStorage.setItem("allUsers", JSON.stringify(allUsers))
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
  }, [allUsers, currentUser])

  return (
    <UserContext.Provider value={{ allUsers, setAllUsers, currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UsersProvider };
