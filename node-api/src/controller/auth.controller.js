require("dotenv").config();
const modelUser = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const [cekUser] = await modelUser.getUserByEmail(email);

    if (cekUser.length > 0) {
      return res.status(400).json({
        message: "email sudah terdaftar",
        success: false,
      });
    }

    await modelUser.addUser(username, email, password);
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [found] = await modelUser.getUserByEmail(username);
    console.log('User found:', found); // Debugging log
    if (found.length > 0) {
      const user = found[0];
      const match = await bcrypt.compare(password, user.password);
      console.log('Password match:', match); // Debugging log
      if (match) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
        return res.status(200).json({
          message: "Login successful",
          token,
        });
      }
    }
    return res.status(400).json({
      message: "Username or password is incorrect",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const me = async (req, res) => {
  try {
    const response = await modelUser.getUserByID(req.id);
    if (!response) {
      return res.status(404).json({ message: "User not found", data: null });
    }
    res.status(200).json({ message: "User found", data: response });
  } catch (error) {
    res.status(500).json({ message: error.message, data: null });
  }
};

module.exports = {
  login,
  me,
  signup,
};
