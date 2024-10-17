import { Router } from "express";
import {
  getProfile,
  updateProfile,
  updateRole,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.route("/profile").get(isAuthenticated, getProfile);

router.route("/updateProfile").put(isAuthenticated,upload.single("profile"), updateProfile);
router.route("/updateRole/:id").put(isAuthenticated, updateRole);

export default router;
