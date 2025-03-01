import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  getUserActivity,
  loginUser,
  logOutUser,
  register,
  resendOTP,
  resetPassword,
  verifyOtp,
} from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { upload } from "../middleware/multer.js";

const router = Router();

// register user
router.route("/register").post(upload.single("profile"), register);
// login user
router.route("/login").post(loginUser);
// logout
router.route("/logout").get(isAuthenticated, logOutUser);
// change password
router.route("/change-password/:id").put(isAuthenticated, changePassword);
// get-activity
router.route("/user-activity").get(isAuthenticated, getUserActivity);

// forgot password
router.route("/forgotPassword").post(forgotPassword);
// reset password
router.route("/resetPassword").post(resetPassword);
router.route("/verify-email").post(verifyOtp);
router.route("/resend-otp").post(resendOTP);

export default router;
