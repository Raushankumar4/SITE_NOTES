import { ErrorHandler } from "../middleware/errorHandler.js";
import { User } from "../models/userModel.js";
import uploadOnCloudnary from "../utils/cloudinary.js";

export const getProfile = ErrorHandler(async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user });
});

// update profile

export const updateProfile = ErrorHandler(async (req, res) => {
  const { fullName, email, phoneNumber } = req.body;
  let profileImageUrl;
  if (req.file) {
    const profileImageLocalPath = req.file.path;
    try {
      const uploadProfile = await uploadOnCloudnary(profileImageLocalPath);
      if (uploadProfile && uploadProfile.url) {
        profileImageUrl = uploadProfile.url;
      } else {
        return res
          .status(500)
          .json({ message: "Error uploading file to Cloudinary" });
      }
    } catch (error) {
      console.log("Error uploading file to Cloudinary:", error.message);
    }
  }

  const user = await User.findByIdAndUpdate(req.user, {
    fullName,
    email,
    phoneNumber,
    profile: profileImageUrl || null,
  })
    .select("-password")
    .exec();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user });
});

// get other user

export const getOtherUser = ErrorHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById({ _id: { $ne: id } }).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user });
});

// update role

export const updateRole = ErrorHandler(async (req, res) => {
  if (req.user.role !== "teacher") {
    return res
      .status(403)
      .json({ message: "You are not authorized to update role" });
  }
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const newRole = user.role === "student" ? "teacher" : "student";
  user.role = newRole;

  await user.save();

  return res.status(200).json({ message: ` role updated to ${newRole}` });
});
