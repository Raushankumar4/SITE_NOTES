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
  const { fullName, email, password, role, selectBranch, phoneNumber } =
    req.body;

  // Validate password length
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  // Validate phone number length
  if (phoneNumber.length < 10) {
    return res
      .status(400)
      .json({ message: "Phone number must be at least 10 characters long" });
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate a 6-digit OTP
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
  const otpExpiresAt = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

  // Handle file upload if exists
  let localFilePath = req.file ? req.file.path : null;

  // Create new user
  const newUser = await User.create({
    fullName,
    email,
    password: hashedPassword,
    role,
    selectBranch,
    phoneNumber,
    profile: localFilePath,
    verificationCode,
    otpExpiresAt,
  });

  // Send OTP email
  await sendVerificationCode(newUser.email, verificationCode);

  return res
    .status(201)
    .json({ message: "User registered. Please verify your email." });
});

// ✅ Verify OTP
export const verifyOtp = ErrorHandler(async (req, res) => {
  const { otp } = req.body;

  // Find user by email
  const user = await User.findOne({ verificationCode: otp });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if OTP has expired
  if (Date.now() > user.otpExpiresAt) {
    return res
      .status(400)
      .json({ message: "OTP has expired. Please request a new one." });
  }

  // Check if OTP is correct
  if (user.verificationCode !== otp) {
    return res.status(400).json({ message: "Invalid OTP. Please try again." });
  }

  // Mark user as verified
  user.isVerified = true;
  user.verificationCode = null;
  user.otpExpiresAt = null;
  await user.save();
  emailVerifiedMessage(user.email, user.name);

  return res.status(200).json({ message: "Email verified successfully!" });
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

  const comparePasseord = await bcrypt.compare(password, user.password);
  if (!comparePasseord) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = GenerateToken(user);
  setTokenCookie(res, token);
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
