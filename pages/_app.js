"use client";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import UserContext, { UserReducer } from "../contexts/UserContext";
import React, { useReducer } from "react";
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
    title: null,
    isLoggedIn: false,
    token: token,
  };

  const [user, dispatch] = useReducer(UserReducer, initialUserContext);
  // console.log({ user });

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user, dispatch }}>
        <div>
          <nav className="navBar">
            <div className="leftLinks">
              <Link href="/">Home</Link>
              <Link href="/patientlist">Patients</Link>
              <Link href="/assessments">Assessments</Link>
            </div>
            <div className="rightLinks">
              {user.isLoggedIn ? (
                <Link href="/logout"> Logout</Link>
              ) : (
                <div>
                  <Link href="/login">Login</Link>
                  <Link href="/register">Register</Link>
                </div>
              )}
            </div>
          </nav>
          <Component {...pageProps} />
        </div>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
