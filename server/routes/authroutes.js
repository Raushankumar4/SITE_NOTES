import { Router } from "express";
import {
  loginUser,
  logOutUser,
  register,
} from "../controllers/authController.js";

const router = Router();

// register user
router.route("/register").post(register);
// login user
router.route("/login").post(loginUser);
// logout
router.route("/logout").get(logOutUser);

export default router;
