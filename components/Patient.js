import React, { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function Patient({ id }) {
  const { user, dispatch } = useContext(UserContext);
  const queryClient = useQueryClient();
  console.log("id pn Patient.js", id);
  return <div>Hi</div>;
}

export default Patient;
