import { Router } from "express";
import {
  createNote,
  createSemesterSessionalNotes,
  getAllNotes,
  getAllSessionalNotes,
} from "../controllers/notesController.js";
import { upload } from "../middleware/multer.js";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";

const router = Router();

router
  .route("/createNote")
  .post(upload.single("notesPdf"), isAuthenticated, isAdmin, createNote);
router
  .route("/createSessional/:id")
  .post(
    upload.single("sessionalPdf"),
    isAuthenticated,
    isAdmin,
    createSemesterSessionalNotes
  );

router.route("/getALlPapers").get(isAuthenticated, getAllNotes);
router.route("/getALlSessional/:id").get(isAuthenticated, getAllSessionalNotes);
export default router;
