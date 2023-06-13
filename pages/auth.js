const jwt = require("jsonwebtoken");

export function checkTokenExpiration() {
  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken = jwt.decode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      // Token has expired
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect the user to the login page
    }
  } else {
    // Token doesn't exist in localStorage, redirect to login page
    window.location.href = "/login";
  }
}

// import jwt from "jsonwebtoken";

// export function checkTokenExpiration() {
//   return new Promise((resolve) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       const decodedToken = jwt.decode(token);
//       const currentTime = Date.now() / 1000;

//       if (decodedToken.exp < currentTime) {
//         // Token has expired
//         localStorage.removeItem("token");
//         resolve(true); // Resolve the Promise indicating token expiration
//       } else {
//         resolve(false); // Resolve the Promise indicating token is still valid
//       }
//     } else {
//       resolve(true); // Resolve the Promise indicating token is not present
//     }
//   });
// }
