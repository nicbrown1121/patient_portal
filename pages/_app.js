"use client";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import UserContext, { UserReducer } from "../contexts/UserContext";
import React, { useState, useReducer } from "react";
import "../CSS/App.css";
import { useRouter } from "next/router";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient";

function App({ Component, pageProps }) {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";
  const initialUserContext = {
    username: "",
    isLoggedIn: false,
    token: token,
  };

  const [user, dispatch] = useReducer(UserReducer, initialUserContext);

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, dispatch }}>
        <div>
          <nav className="navBar">
            <div className="leftLinks">
              {/* <button onClick={() => handleNavigate("/")}>Home</button> */}
              <div onClick={() => handleNavigate("/")}>Home</div>
              <div onClick={() => handleNavigate("/patientlist")}>Patients</div>
            </div>
            <div className="rightLinks">
              <div onClick={() => handleNavigate("/login")}>Login</div>
              <div onClick={() => handleNavigate("/register")}>Register</div>
            </div>
          </nav>
          <Component {...pageProps} />
        </div>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
