import { ErrorHandler } from "../middleware/errorHandler.js";
import { User } from "../models/userModel.js";

export const getProfile = ErrorHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user });
});

// update profile

export const updateProfile = ErrorHandler(async (req, res) => {
  const { name, email, selectBranch } = req.body;
  if (!name || !email || !selectBranch) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const user = await User.findByIdAndUpdate(req.user._id, {
    name,
    email,
    selectBranch,
  })
    .select("-password")
    .exec();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user });
});
