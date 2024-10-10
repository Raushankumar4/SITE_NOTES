import { ErrorHandler } from "../middleware/errorHandler.js";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import {
  GenerateToken,
  removeTokenCookie,
  setTokenCookie,
} from "../utils/generateToken.js";

export const register = ErrorHandler(async (req, res) => {
  const { name, email, password, role, selectBranch } = req.body;

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
