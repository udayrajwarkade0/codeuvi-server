const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization") || req.header("authorization");

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not Provided" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const jwtToken = authHeader.replace("Bearer ", "").trim();

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    const userData = await User.findOne({ email: isVerified.email }).select(
      "-password"
    );
    if (!userData) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = userData;
    req.token = jwtToken;
    req.userId = userData._id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token" });
  }
};

module.exports = authMiddleware;
