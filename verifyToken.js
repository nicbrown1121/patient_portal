// Middleware for checking JWT
const jwt = require("jsonwebtoken");

// Takes req (request object), res (response object), and next
// (callback function that moves the request to the next middleware in the stack)
function verifyToken(req, res, next) {
  const bearerToken = req.headers["authorization"];
  const token = bearerToken.split(" ")[1];
  console.log("token in VERIFY JS", token);

  if (token === "null") {
    console.log("you have no token, redirect to login");
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
    // console.log("token doesn't exist");
    // return res.status(403).send({ auth: false, message: "No token provided." });
  } else {
    // "patientPortalSecret" is the secret key used to sign and verify the token.
    // function provided as the last argument is a callback that handles the verification result
    // If successfule, userId is assigned decoded.id to allow middleware to access the authenticated
    // user's ID. next() is called to pass the request to middleware.
    jwt.verify(token, "patientPortalSecret", function (err, decoded) {
      console.log("in jwt verify function");
      if (err) {
        console.log("Error while verifying token: ", err.message); // add this
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      }
      console.log("Token is verified, decoded information: ", decoded); // add this
      req.userId = decoded.id;
      next();
    });
  }
}

module.exports = verifyToken;
