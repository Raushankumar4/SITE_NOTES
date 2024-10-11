import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  loginAsAdmin,
  loginUser,
  logOutUser,
  register,
} from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = Router();

// register user
router.route("/register").post(register);
// login user
router.route("/students/login").post(loginUser);
// login as admin
router.route("/teachers/login").post(loginAsAdmin);
// logout
router.route("/logout").get(isAuthenticated, logOutUser);
// change password
router.route("/change-password/:id").put(isAuthenticated, changePassword);

// forgot password
router.route("/forgotPassword").post(forgotPassword);

export default router;
