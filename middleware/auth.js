const jsonwebtoken = require("jsonwebtoken");
const auth = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    const jwt_payload = jsonwebtoken.verify(accessToken, process.env.jwt_salt);

    req.user = jwt_payload;
  } catch (err) {
    res.status(401).json({
      success: "false",
      message: "unauthorized access",
    });
    return;
  }

  next();
};

module.exports = auth;
