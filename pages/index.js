import React, { useContext } from "react";
import { useRouter } from "next/router";
import UserContext from "../contexts/UserContext";

//check if the user is logged in whenever user changes.
// If they aren't logged in, navigate to the login page.
export default function Home() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  console.log("user", user);

  if (!user.isLoggedIn) {
    router.push("/login");
  } else {
    return (
      <div>
        <h1>Welcome, {user.username}!</h1>
        ... rest of your component ...
      </div>
    );
  }
}
