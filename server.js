const express = require("express");
const { Patient, Worker } = require("./models"); // Assuming models folder is in the same directory as server.js
const bcrypt = require("bcrypt"); // bcrypt will be used for hashing passwords
const verifyToken = require("./verifyToken");
const cors = require("cors"); // new line
const jwt = require("jsonwebtoken");

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json()); // for parsing application/json

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
  const token = jwt.sign(payload, "your-secret-key", {
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

// PATIENTS
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

// app.use("/api", router);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
