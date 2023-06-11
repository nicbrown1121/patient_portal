import React, { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useRouter } from "next/router";

function LoginForm() {
  const router = useRouter();
  const { user, dispatch } = useContext(UserContext);

  const [userState, setUserState] = useState({
    username: user.username,
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userState.username,
        password: userState.password,
      }),
    });

    const data = await response.json();

    if (data.auth) {
      localStorage.setItem("token", data.token); // Store the token
      dispatch({
        type: "LOGIN",
        // Update the context state
        payload: { ...data, username: userState.username },
      });
      router.push("/");
    } else {
      console.log("login failure");
      // Handle login failure
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserState({
      ...userState,
      [name]: value,
    });
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", fontSize: "30px" }}>
        Login To Your Account:
      </h3>
      <div className="loginForm">
        <form onSubmit={handleSubmit}>
          <input
            className="inputField"
            type="text"
            placeholder="Username"
            name="username"
            value={userState.username}
            onChange={(e) => {
              setUserState({ ...userState, [e.target.name]: e.target.value });
            }}
          />
          <input
            className="inputField"
            type="password"
            placeholder="Password"
            name="password"
            value={userState.password}
            onChange={handleInputChange}
          />
          <button className="inputButton" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
