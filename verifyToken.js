// Middleware for checking JWT
const jwt = require("jsonwebtoken");

//takes req (request object), res (response object),
// and next (callback function that moves the request to the next middleware in the stack).
function verifyToken(req, res, next) {
  console.log("req.headers", req.headers);
  const token = req.headers["authorization"];
  console.log("token in VERIFY JS", token);

  if (!token) {
    console.log("error on verifyToken");
    return res.status(403).send({ auth: false, message: "No token provided." });
  }

  jwt.verify(
    token.split(" ")[1],
    "patientPortalSecret",
    function (err, decoded) {
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
    }
  );
}

module.exports = verifyToken;
