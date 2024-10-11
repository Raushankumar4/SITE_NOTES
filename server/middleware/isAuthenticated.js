import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isAuthenticated = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: " Unauthorized" });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// is Admin

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user.role !== "teacher") {
    return res.status(403).json({ message: "Only teachers can access this" });
  }
  next();
};
