// import React, { useContext } from "react";
// import UserContext from "../../contexts/UserContext";

// const { user } = useContext(UserContext);

//HomePage.js
// export const fetchPatients = async () => {
//   const res = await fetch("http://localhost:3001/api/patient", {
//     headers: {
//       Authorization: `Bearer ${user.token}`,
//     },
//   });
//   const data = await res.json();
//   return data;
// };

//LoginForm.js
export const loginPost = async () => {
  const res = await fetch("http://localhost:3001/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: userState.username,
      password: userState.password,
    }),
  });
};

//Patient.js
export const fetchNotesandAssessments = async (id) => {
  const res = await fetch(`http://localhost:3001/api/patient/${id}`);
  if (!res.ok) {
    console.log("Failed to fetch notes data");
  }
  const data = await res.json();
  console.log({ data });
  return data;
};
