import React, { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import { useRouter } from "next/router";

function RegisterForm() {
  const router = useRouter();
  const { user, dispatch } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user.isLoggedIn) {
      router.push("/"); // redirect to the home page
    }
  }, [user.user, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestBody = {
      username: username,
      password: password,
    };
    const response = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const text = await response.text();

    // Now parse the text as JSON
    try {
      const data = JSON.parse(text);
      console.log("data", data);
      if (response.ok) {
        // set username on context to prepopulate that field on login page
        dispatch({
          type: "REGISTER",
          payload: username,
        });
        // registration was successful - redirect the user to login page
        router.push("/login");
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error("Failed to parse response as JSON", error);
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", fontSize: "30px" }}>
        Register New User Account:
      </h3>
      <div className="registerForm">
        <form onSubmit={handleSubmit}>
          <input
            className="inputField"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="inputField"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="inputButton" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
export default RegisterForm;
