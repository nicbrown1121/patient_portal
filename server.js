const express = require("express");
const next = require("next");
const { Patient, Worker } = require("./models"); // Assuming models folder is in the same directory as server.js
const bcrypt = require("bcrypt"); // bcrypt will be used for hashing passwords
const verifyToken = require("./verifyToken");
const cors = require("cors"); // new line
const jwt = require("jsonwebtoken");

const app = express();
// const dev = process.env.NODE_ENV !== "production";
// const nextApp = next({ dev });
// const handle = nextApp.getRequestHandler();

app.use(cors());
app.use(express.json()); // for parsing application/json

// app.prepare().then(() => {
//   // Middleware to check if the user has a bearer token or if it is expired
//   const checkAuth = (req, res, next) => {
//     const bearerToken = req.headers["authorization"];
//     const token = bearerToken.split(" ")[1];

//     if (token === "null") {
//       console.log("token is null, redirect to login", token);
//       return res.redirect("/login");
//     }

//     // Check if the token is expired (you need to implement your token expiration logic here)
//     // If the token is expired, remove it and redirect to the login page
//     const isTokenExpired = (token) => {
//       try {
//         const decoded = jwt.verify(token, "patientPortalSecret");
//         const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

//         // Check if the token's expiration time (exp) is less than the current time
//         return decoded.exp < currentTime;
//       } catch (error) {
//         console.log("error in tokenExpire func", error);
//         // An error occurred while decoding the token
//         // It could be an invalid token format or a signature verification failure
//         return true; // Treat the token as expired in case of any error
//       } // Your token expiration check logic here
//     };
//     if (isTokenExpired) {
//       console.log("token expired");
//       res.setHeader("Authorization", "");
//       return res.redirect("/login");
//     }

//     // Token is valid, continue to the next middleware or route handler
//     next();
//   };

//   app.use(checkAuth);

// LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // Query the database and verify the user
  const user = await Worker.findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ message: "No such user found." });
  }
  // Compare the password with the hashed password stored in the database
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Incorrect password." });
  }
  // If user is found and password is right, create a token
  const payload = { id: user.id, username: user.username };
  const token = jwt.sign(payload, "patientPortalSecret", {
    expiresIn: 86400, // expires in 24 hours
  });
  // return the information including token as JSON
  res.status(200).json({ auth: true, token: token });
});

// REGISTER
app.post("/register", async (req, res) => {
  console.log("POST request");
  try {
    console.log("Hitting /register route");
    const { username, password } = req.body;
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert the new user into the database
    await Worker.create({
      username: username,
      password: hashedPassword,
    });
    // Return a response
    return res.status(201).json({ username: username });
  } catch (e) {
    console.log("ERROR IN /register route");
    console.error("Error: ", e);
  }
});

//To use middleware function that checks and verifies the
//token on the request header before proceeding to endpoint logic
app.get("/patient", verifyToken, async (req, res) => {
  console.log("patient route");
  try {
    const patients = await Patient.findAll();
    // If the token is successfully verified, we can send the protected info
    res.json({
      data: patients,
      message: "This is protected data.",
      userId: req.userId,
    });
  } catch (error) {
    console.log("error on route");
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// app.all("*", (req, res) => {
//   return handle(req, res);
// });

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
// });

// NOT WORKING::

// const express = require("express");
// const next = require("next");
// const { Patient, Worker } = require("./models"); // Assuming models folder is in the same directory as server.js
// const bcrypt = require("bcrypt"); // bcrypt will be used for hashing passwords
// // const verifyToken = require("./verifyToken");
// const cors = require("cors"); // new line
// const jwt = require("jsonwebtoken");

// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handle = app.getRequestHandler();

// // app.use(cors());
// // app.use(express.json());
// // for parsing application/json

// app.prepare().then(() => {
//   const server = express();
//   // Middleware to check if the user has a bearer token or if it is expired
//   const checkAuth = (req, res, next) => {
//     const bearerToken = req.headers["authorization"];
//     const token = bearerToken.split(" ")[1];

//     if (token === "null") {
//       console.log("token is null, redirect to login", token);
//       return res.redirect("/login");
//     }

//     // Check if the token is expired (you need to implement your token expiration logic here)
//     // If the token is expired, remove it and redirect to the login page
//     const isTokenExpired = (token) => {
//       try {
//         const decoded = jwt.verify(token, "patientPortalSecret");
//         const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

//         // Check if the token's expiration time (exp) is less than the current time
//         return decoded.exp < currentTime;
//       } catch (error) {
//         console.log("error in tokenExpire func", error);
//         // An error occurred while decoding the token
//         // It could be an invalid token format or a signature verification failure
//         return true; // Treat the token as expired in case of any error
//       } // Your token expiration check logic here
//     };
//     if (isTokenExpired) {
//       console.log("token expired");
//       res.setHeader("Authorization", "");
//       return res.redirect("/login");
//     }

//     // Token is valid, continue to the next middleware or route handler
//     next();
//   };

//   server.use(checkAuth);

//   // LOGIN
//   server.post("/login", async (req, res) => {
//     const { username, password } = req.body;
//     // Query the database and verify the user
//     const user = await Worker.findOne({ where: { username } });
//     if (!user) {
//       return res.status(401).json({ message: "No such user found." });
//     }
//     // Compare the password with the hashed password stored in the database
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(401).json({ message: "Incorrect password." });
//     }
//     // If user is found and password is right, create a token
//     const payload = { id: user.id, username: user.username };
//     const token = jwt.sign(payload, "patientPortalSecret", {
//       expiresIn: 86400, // expires in 24 hours
//     });
//     // return the information including token as JSON
//     res.status(200).json({ auth: true, token: token });
//   });

//   // REGISTER
//   server.post("/register", async (req, res) => {
//     console.log("POST request");
//     try {
//       console.log("Hitting /register route");
//       const { username, password } = req.body;
//       // Hash the password before storing it in the database
//       const hashedPassword = await bcrypt.hash(password, 10);
//       // Insert the new user into the database
//       await Worker.create({
//         username: username,
//         password: hashedPassword,
//       });
//       // Return a response
//       return res.status(201).json({ username: username });
//     } catch (e) {
//       console.log("ERROR IN /register route");
//       console.error("Error: ", e);
//     }
//   });

//   //To use middleware function that checks and verifies the
//   //token on the request header before proceeding to endpoint logic
//   server.get("/patient", async (req, res) => {
//     console.log("patient route");
//     try {
//       const patients = await Patient.findAll();
//       // If the token is successfully verified, we can send the protected info
//       res.json({
//         data: patients,
//         message: "This is protected data.",
//         userId: req.userId,
//       });
//     } catch (error) {
//       console.log("error on route");
//       console.error(error);
//       res.status(500).json({ message: "Server error" });
//     }
//   });

//   server.all("*", (req, res) => {
//     return handle(req, res);
//   });

//   server.listen(3001, () => {
//     console.log("Server is running on port 3001");
//   });
// });
