import React, { useContext } from "react";
import { useRouter } from "next/router";
import UserContext, { UserReducer } from "../contexts/UserContext";

function LogoutForm() {
  const router = useRouter();
  const { user, dispatch } = useContext(UserContext);

  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
    });
    router.push("/login");
  }
}
export default LogoutForm;
