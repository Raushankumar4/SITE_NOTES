import { ErrorHandler } from "../middleware/errorHandler.js";
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import {
  GenerateToken,
  removeTokenCookie,
  setTokenCookie,
} from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendForgotPasswordmail } from "../middleware/nodeMailer.js";

dotenv.config();

export const register = ErrorHandler(async (req, res) => {
  const { name, email, password, role, selectBranch } = req.body;

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    selectBranch,
  });
  if (!newUser) {
    return res.status(500).json({ message: "Error creating user" });
  }

  return res.status(201).json({ message: "User created successfully" });
});

// login user

export const loginUser = ErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.role !== "student") {
    return res.status(403).json({ message: "Only students can login" });
  }
  const comparePasseord = await bcrypt.compare(password, user.password);
  if (!comparePasseord) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = GenerateToken(user);

  setTokenCookie(res, token);
  return res.status(200).json({
    message: "Login successful",
    token: token,
  });
});

// admin login

export const loginAsAdmin = ErrorHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.role !== "teacher") {
    return res.status(403).json({ message: "Only tecahers can login" });
  }
  const comparePasseord = await bcrypt.compare(password, user.password);
  if (!comparePasseord) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = GenerateToken(user);
  setTokenCookie(res, token);
  return res.status(200).json({
    message: "Login successful",
    token: token,
  });
});

// logout user

export const logOutUser = ErrorHandler(async (req, res) => {
  removeTokenCookie(res);
  return res.status(200).json({ message: "Logout successful" });
});

// change password

export const changePassword = ErrorHandler(async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  if (newPassword.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const comparePasseord = await bcrypt.compare(currentPassword, user.password);
  if (!comparePasseord) {
    return res.status(401).json({ message: "Invalid password" });
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();
  return res.status(200).json({ message: "Password changed successfully" });
});
// forgot password

export const forgotPassword = ErrorHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const token = jwt.sign({ email }, process.env.FORGOT_SECRET);

  const data = {
    email,
    token,
  };
  try {
    await sendForgotPasswordmail("Password reset link", data);
    return res.status(200).json({ message: "Password reset link sent" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Error sending email" });
  }
});
