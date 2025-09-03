const User = require("../models/User");
const hash = require("../utils/hash");
const generateToken = require("../utils/genreteToken");
exports.register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ name: req.body.name });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hash.hashPassword(req.body.password);
    const newUser = new User({
      name: req.body.name,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.loginByGoogle = (req, res) => {
  const token = generateToken.generateToken({ id: req.user._id });
  res.status(200).json({ token, user: req.user });
};
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const isMatch = await hash.comparePassword(
      req.body.password,
      user.password
    );
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = generateToken.generateToken({
      id: user._id,
      name: user.name,
      role: user.role,
    });
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
