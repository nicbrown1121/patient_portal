import React, { createContext } from "react";

const UserContext = createContext(null);

// When the LOGIN action is dispatched,
// update the username and set isLoggedIn to true

export const UserReducer = (user, action) => {
  console.log("action.payload", action.payload);
  console.log({ user });
  switch (action.type) {
    case "REGISTER":
      return {
        ...user,
        username: action.payload,
        isLoggedIn: false,
      };
    case "LOGIN":
      return {
        ...user,
        title: action.payload.title,
        username: action.payload.username,
        isLoggedIn: true,
        token: action.payload.token,
      };
    // Reset the username and set isLoggedIn to false
    case "LOGOUT":
      return {
        ...user,
        title: null,
        username: "",
        isLoggedIn: false,
        token: "",
      };
    default:
      return state;
  }
};

export default UserContext;
