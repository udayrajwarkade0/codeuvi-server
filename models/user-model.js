const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const saltRounds = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Generate JWT token (synchronous now)
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { userId: this._id.toString(), email: this.email, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "30d" }
  );
};

const User = mongoose.model("User", userSchema);
module.exports = User;
