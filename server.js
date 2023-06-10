const express = require("express");
const next = require("next");
const { Patient, Worker } = require("./models");
const bcrypt = require("bcrypt"); // bcrypt will be used for hashing passwords
const verifyToken = require("./verifyToken");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
// const dev = process.env.NODE_ENV !== "production";
// const nextApp = next({ dev });
// const handle = nextApp.getRequestHandler();

app.use(cors());
app.use(express.json()); // for parsing application/json

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  // Query the database and verify the user
  const user = await Worker.findOne({ where: { username } });
  if (!user) {
    return res.status(403).json({ message: "No such user found." });
  }
  // Compare the password with the hashed password stored in the database
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Incorrect password." });
  }
  // If user is found and password is right, create a token
  const payload = { id: user.id, username: user.username };
  const token = jwt.sign(payload, "patientPortalSecret", {
    expiresIn: 30, // expires in 24 hours
  });
  console.log("token from /api/login", token);
  // return the information including token as JSON
  res.status(200).json({ auth: true, token: token });
  res.end();
});

// REGISTER
app.post("/api/register", async (req, res) => {
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
    res.status(201).json({ username: username });
    res.end();
  } catch (e) {
    console.log("ERROR IN /register route");
    console.error("Error: ", e);
    res.end();
  }
});

//To use middleware function that checks and verifies the
//token on the request header before proceeding to endpoint logic
app.get("/api/patient", verifyToken, async (req, res) => {
  console.log("patient route");
  try {
    const patients = await Patient.findAll();
    // If the token is successfully verified, we can send the protected info
    res.json({
      auth: "true",
      data: patients,
      message: "This is protected data.",
      userId: req.userId,
    });
    res.end();
  } catch (error) {
    console.log("error on route");
    console.error(error);
    res.status(500).json({ message: "Server error" });
    res.end();
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

// app.prepare().then(() => {
//   const server = express();

//   // Middleware to check if the token has expired
//   const checkTokenExpiration = (req, res, next) => {
//     const bearerToken = req.headers["authorization"];
//     const token = bearerToken.split(" ")[1];

//     if (!token) {
//       return res.redirect("/login");
//     }

//     try {
//       const decoded = jwt.verify(token, "patientPortalSecret");
//       const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

//       if (decoded.exp < currentTime) {
//         // Token expired, remove token and redirect to login page
//         res.clearCookie("token");
//         return res.redirect("/login");
//       }
//     } catch (error) {
//       console.error("Error verifying token:", error);
//       // Error occurred while decoding or verifying the token, redirect to login page
//       res.clearCookie("token");
//       return res.redirect("/login");
//     }

//     // Token is valid, continue to the next middleware or route handler
//     next();
//   };

//   // Apply the checkTokenExpiration middleware to all routes
//   server.use(checkTokenExpiration);

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
//       expiresIn: 60, // expires in 24 hours
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
//   server.get("/patient", verifyToken, async (req, res) => {
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

//   // Handle all Next.js routes
//   server.all("*", (req, res) => {
//     return handle(req, res);
//   });

//   server.listen(3001, () => {
//     console.log("Server is running on port 3001");
//   });
// });
