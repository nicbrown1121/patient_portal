const express = require("express");
const next = require("next");
const { Patient, Worker, Assessment, Note } = require("./models");
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
    expiresIn: 86400, // expires in 24 hours
  });
  // return the information including token as JSON
  res.status(200).json({ auth: true, token: token });
  res.end();
});

// REGISTER
app.post("/api/register", async (req, res) => {
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
    console.error("Error in /register route: ", e);
    res.end();
  }
});

//To use middleware function that checks and verifies the
//token on the request header before proceeding to endpoint logic
app.get("/api/patient", verifyToken, async (req, res) => {
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
    console.log("error on /patient route");
    console.error(error);
    res.status(500).json({ message: "Server error" });
    res.end();
  }
});

app.get("/api/patient/:patientId", async (req, res) => {
  const patientId = req.params.patientId;
  try {
    const assessments = await Assessment.findAll({
      where: { patientId: patientId },
    });
    const notes = await Note.findAll({
      where: { patientId: patientId },
    });

    // If the token is successfully verified, you can send the assessments
    res.json({
      auth: "true",
      assessments: assessments,
      notes: notes,
      message: "Assessments for patient " + patientId,
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

app.post("/api/patient/:patientId", async (req, res) => {
  const { patientId } = req.params;
  const { type, text, username } = req.body;
  const user = await Worker.findOne({ where: { username } });
  try {
    if (type === "note") {
      const note = await Note.create({
        patientId: patientId,
        text: text,
        workerId: user.id,
      });
      res.status(201).json({ note });
    }
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
    res.end();
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
