"use client";
import Link from "next/link";
import UserContext, { UserReducer } from "../contexts/UserContext";
import React, { useState, useReducer } from "react";
// import "../styles/globals.css"; If you have global CSS file

function App({ Component, pageProps }) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";
  const initialUserContext = {
    username: "",
    isLoggedIn: false,
    token: token,
  };

  const [user, dispatch] = useReducer(UserReducer, initialUserContext);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <div>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/patient">Patients</Link>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
          {/* <Link href="/register">Register</Link> */}
        </nav>
        <Component {...pageProps} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
