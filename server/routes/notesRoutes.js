import { Router } from "express";
import {
  createNote,
  createSemesterSessionalNotes,
  deleteNote,
  deleteSessionalPaper,
  getAllNotes,
  getAllSessionalNotes,
  updateNotes,
  updateSessionalPaper,
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
router
  .route("/updateNote/:id")
  .put(isAuthenticated, isAdmin, upload.single("notesPdf"), updateNotes);
router.route("/deleteNote/:id").delete(isAuthenticated, isAdmin, deleteNote);
router
  .route("/updateSessional/:id")
  .put(
    isAuthenticated,
    isAdmin,
    upload.single("sessionalPdf"),
    updateSessionalPaper
  );
router
  .route("/deleteSessional/:id")
  .delete(isAuthenticated, isAdmin, deleteSessionalPaper);

export default router;
