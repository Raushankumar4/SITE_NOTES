import { Router } from "express";
import {
  approveNote,
  createNote,
  createSemesterSessionalNotes,
  deleteNote,
  deleteSessionalPaper,
  getAllNotes,
  getAllReportedNotes,
  getAllSessionalNotes,
  rejectNote,
  reportNote,
  reviewReportedNote,
  updateNotes,
  updateSessionalPaper,
} from "../controllers/notesController.js";
import { upload } from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = Router();

router
  .route("/createNote")
  .post(upload.single("notesPdf"), isAuthenticated, createNote);
router.put("/approve/:noteId", isAuthenticated, approveNote);
router.put("/reject/:noteId", isAuthenticated, rejectNote);
router.put("/report/:noteId", isAuthenticated, reportNote);
router.put("/review/:noteId", isAuthenticated, reviewReportedNote);
router.get("/reported", isAuthenticated, getAllReportedNotes);

router
  .route("/createSessional/:id")
  .post(
    upload.single("sessionalPdf"),
    isAuthenticated,
    createSemesterSessionalNotes
  );

router.route("/getALlPapers").get(isAuthenticated, getAllNotes);
router.route("/getALlSessional/:id").get(isAuthenticated, getAllSessionalNotes);
router
  .route("/updateNote/:id")
  .put(isAuthenticated, upload.single("notesPdf"), updateNotes);
router.route("/deleteNote/:id").delete(isAuthenticated, deleteNote);
router
  .route("/updateSessional/:id")
  .put(isAuthenticated, upload.single("sessionalPdf"), updateSessionalPaper);
router
  .route("/deleteSessional/:id")
  .delete(isAuthenticated, deleteSessionalPaper);

export default router;
