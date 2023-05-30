import Link from "next/link";
import UserContext, { UserReducer } from "../contexts/UserContext";
import React, { useState, useReducer } from "react";
// import "../styles/globals.css"; If you have global CSS file

function App({ Component, pageProps }) {
  const initialUserContext = {
    username: "",
    isLoggedIn: false,
  };

  const [user, dispatch] = useReducer(UserReducer, initialUserContext);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <div>
        <nav>
          <Link href="/">Home</Link>
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
