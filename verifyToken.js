// Middleware for checking JWT
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
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
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
      }

      req.userId = decoded.id;
      next();
    }
  );
}

module.exports = verifyToken;
