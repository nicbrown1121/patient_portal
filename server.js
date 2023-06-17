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
    expiresIn: 90000, // expires in 24 hours
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
  const { type, text, username, requestBody, completed } = req.body;
  const {
    frameSize,
    weightTrend,
    acutePOIntake,
    muscleMass,
    fatMass,
    hospitalizedLast30Days,
    skinIntegrity,
    comment,
    recommendations,
  } = requestBody;
  console.log({ type, requestBody, username, frameSize });

  const user = await Worker.findOne({ where: { username } });
  try {
    if (type === "note") {
      const note = await Note.create({
        patientId: patientId,
        text: text,
        workerId: user.id,
      });
      res.status(201).json({ note });
    } else if (type === "assessment") {
      console.log("creating a new assessment");
      const newAssessment = await Assessment.create({
        patientId: patientId,
        workerId: user.id,
        completed: completed,
        frameSize: frameSize,
        weightTrend: weightTrend,
        acutePOIntake: acutePOIntake,
        muscleMass: muscleMass,
        fatMass: fatMass,
        hospitalizedLast30Days: hospitalizedLast30Days,
        skinIntegrity: skinIntegrity,
        comment: comment,
        recommendations: recommendations,
      });
      const patient = await Patient.findByPk(patientId);
      const reassessmentDate = new Date();
      reassessmentDate.setDate(reassessmentDate.getDate() + 7);
      await patient.update({ seen: true, reassessmentDate: reassessmentDate });
      res.status(201).json({ assessment: newAssessment });
    } else {
      res.status(400).json({ message: "Invalid type" });
    }
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
    res.end();
  }
});

// app.put("/api/patient/:patientId", async (req, res) => {
//   const patientId = req.params.patientId;

//   try {
//     await Patient.update(
//       { assessments },
//       { where: { patientId } }
//     );
//     await Note.update(
//       { notes },
//       { where: { patientId } }
//     );

//     res.json({
//       message: "Assessments and notes for patient " + patientId + " updated successfully",
//     });
//   } catch (error) {
//     console.log("error on route");
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

app.put("/api/patient/:patientId", async (req, res) => {
  const patientId = req.params.patientId;
  const { requestBody } = req.body;
  const { dietOrder, fluidRestriction } = requestBody;
  console.log(req.body, dietOrder, fluidRestriction);

  try {
    const patient = await Patient.findByPk(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    // console.log( patient );
    // Update the dietOrder and fluidRestriction fields
    patient.dietOrder = dietOrder;
    patient.fluidRestriction = fluidRestriction;

    // Save the changes to the database
    await patient.save();

    res.json({
      message:
        "Diet order and fluid restriction for patient " +
        patientId +
        " updated successfully",
      patient,
    });
  } catch (error) {
    console.log("error on route");
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
