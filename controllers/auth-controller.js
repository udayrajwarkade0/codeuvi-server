const User = require("../models/user-model");

const home = (req, res) => {
  res.send("Welcome to home page using auth-router!");
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    if (!username || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ username, email, phone, password });

    return res.status(201).json({
      msg: "User registered successfully",
      token: user.generateToken(),
      userId: user._id.toString(),
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password " });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateToken();

    return res.status(200).json({
      msg: "Login successful",
      token,
      userId: user._id.toString(),
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// to send user data --- user logic ..module.......................................

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);

    return res.status(200).json({ userData });

    
  } catch (error) {
    console.log(`error form the user root ${error}`);
  }
};

module.exports = { home, register, login, user };
