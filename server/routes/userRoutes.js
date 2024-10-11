import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = Router();

router.route("/profile").get(isAuthenticated, getProfile);

router.route("/updateProfile").put(isAuthenticated, updateProfile);

export default router;
