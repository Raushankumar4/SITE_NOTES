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
import {
  emailVerifiedMessage,
  sendForgotPasswordmail,
  sendVerificationCode,
} from "../middleware/nodeMailer.js";
import { UserActivity } from "../models/userActivity.js";

dotenv.config();

export const register = ErrorHandler(async (req, res) => {
  const {
    fullName,
    email,
    password,
    role,
    selectBranch,
    selectYear,
    phoneNumber,
  } = req.body;

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  if (phoneNumber.length !== 10) {
    return res
      .status(400)
      .json({ message: "Phone number must be exactly 10 digits long" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Email already exists. Please log in." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
  const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  await sendVerificationCode(email, verificationCode);

  req.session.tempUser = {
    fullName,
    email,
    hashedPassword,
    role,
    selectBranch,
    selectYear,
    phoneNumber,
    verificationCode,
    otpExpiresAt,
  };

  // ✅ Explicitly save session
  req.session.save((err) => {
    if (err) {
      console.error("Session save error:", err);
      return res.status(500).json({ message: "Session error. Try again." });
    }
    return res
      .status(200)
      .json({ message: "OTP sent. Please verify your email." });
  });
});

export const verifyOtp = ErrorHandler(async (req, res) => {
  const { otp } = req.body;

  console.log("Session Data:", req.session); // Debugging

  if (!req.session.tempUser) {
    return res
      .status(400)
      .json({ message: "No OTP request found. Please register again." });
  }

  const {
    fullName,
    email,
    hashedPassword,
    role,
    selectBranch,
    selectYear,
    phoneNumber,
    profile,
    verificationCode,
    otpExpiresAt,
  } = req.session.tempUser;

  if (Date.now() > new Date(otpExpiresAt).getTime()) {
    return res
      .status(400)
      .json({ message: "OTP has expired. Please request a new one." });
  }

  if (otp !== verificationCode) {
    return res.status(400).json({ message: "Invalid OTP. Please try again." });
  }

  const newUser = await User.create({
    fullName,
    email,
    password: hashedPassword,
    role,
    selectBranch,
    selectYear,
    phoneNumber,
    profile,
    isVerified: true,
  });

  req.session.tempUser = null; // Clear session after verification

  emailVerifiedMessage(newUser.email, newUser.fullName);

  return res.status(201).json({ message: "Email verified successfully!" });
});

// login user
export const loginUser = ErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  console.log(user);

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT token
  const token = GenerateToken(user);
  setTokenCookie(res, token);

  // Capture login details
  const ipAddress = req.ip; // Gets user IP
  const deviceInfo = req.headers["user-agent"]; // Gets device details

  // Save login activity in the database
  await UserActivity.create({
    userId: user._id,
    ipAddress,
    deviceInfo,
    loginTime: new Date(),
  });

  return res.status(200).json({
    message: "Login successful",
    token,
  });
});

// logout user
export const logOutUser = ErrorHandler(async (req, res) => {
  const { userId } = req.body;

  // Update the last login session
  await UserActivity.findOneAndUpdate(
    { userId, logoutTime: null }, // Find the last active session
    { logoutTime: new Date() }, // Set logout time
    { new: true }
  );

  // Clear cookie/token
  removeTokenCookie(res);

  return res.status(200).json({ message: "Logout successful" });
});

// Get Activity
export const getUserActivity = ErrorHandler(async (req, res) => {
  const activities = await UserActivity.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: "$userDetails", // Convert userDetails array into an object
    },
    {
      $sort: { loginTime: -1 }, // Sort by latest login first
    },
    {
      $project: {
        _id: 1,
        loginTime: 1,
        logOutTime: 1,
        ipAddress: 1,
        deviceInfo: 1,
        userName: "$userDetails.fullName",
        userEmail: "$userDetails.email",
        userBranch: "$userDetails.selectBranch",
        userselectYear: "$userDetails.selectYear",
        userRole: "$userDetails.role",
        userPhoneNumber: "$userDetails.phoneNumber",
      },
    },
  ]);

  if (!activities.length) {
    return res.status(404).json({ message: "No activity found" });
  }

  res.status(200).json({ activities });
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

// reset password

export const resetPassword = ErrorHandler(async (req, res) => {
  const decodedData = jwt.verify(req.query.token, process.env.FORGOT_SECRET);
  if (!decodedData) {
    return res.status(400).json({ message: "Invalid token" });
  }
  const user = await User.findOne({ email: decodedData.email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.resetPasswordExpire < Date.now()) {
    return res.status(400).json({ message: "Token expired" });
  }
  if (user.resetPasswordExpire === null) {
    return res.status(400).json({ message: "Token expired" });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  user.password = hashedPassword;
  user.resetPasswordExpire = null;
  await user.save();
  return res.status(200).json({ message: "Password changed successfully" });
});

// Resend Otp
export const resendOTP = ErrorHandler(async (req, res) => {
  const { email } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Generate a new 6-digit OTP
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
  const otpExpiresAt = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

  // Update user with new OTP
  user.verificationCode = verificationCode;
  user.otpExpiresAt = otpExpiresAt;
  await user.save();

  // Send OTP email
  await sendVerificationCode(user.email, verificationCode);

  return res.status(200).json({ message: "OTP resent successfully." });
});
