import { ErrorHandler } from "../middleware/errorHandler.js";
import { Note } from "../models/notesModels.js";
import { Sessional } from "../models/sessionalModel.js";
import { User } from "../models/userModel.js";

export const createNote = ErrorHandler(async (req, res) => {
  const { title, description, branch, selectYear } = req.body;
  const user = await User.findById(req.user);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Determine the status based on role
  const status = user.role === "teacher" ? "approved" : "pending";

  // Create a new note
  const newNote = await Note.create({
    title,
    description,
    branch,
    selectYear,
    notesPdf: req.file.path.replace("\\", "/"),
    userId: req.user,
    status,
  });

  if (!newNote) {
    return res.status(500).json({ message: "Error creating note" });
  }

  return res.status(201).json({
    message:
      status === "approved"
        ? "Note created and approved successfully"
        : "Note submitted for approval",
    note: newNote,
  });
});

// Approve Notes
export const approveNote = ErrorHandler(async (req, res) => {
  const { noteId } = req.params;
  const user = await User.findById(req.user);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.role !== "teacher") {
    return res.status(403).json({ message: "Only teachers can approve notes" });
  }

  const note = await Note.findById(noteId);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  if (note.status === "approved") {
    return res.status(400).json({ message: "Note is already approved" });
  }

  // Update status to approved
  note.status = "approved";
  note.rejectionReason = null; // Remove any previous rejection reason
  await note.save();

  return res.status(200).json({ message: "Note approved successfully", note });
});

// Notes Rejection
export const rejectNote = ErrorHandler(async (req, res) => {
  const { noteId } = req.params;
  const { reason } = req.body;
  const user = await User.findById(req.user);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.role !== "teacher") {
    return res.status(403).json({ message: "Only teachers can reject notes" });
  }

  const note = await Note.findById(noteId);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  if (note.status === "approved") {
    return res
      .status(400)
      .json({ message: "Approved notes cannot be rejected" });
  }

  if (!reason) {
    return res.status(400).json({ message: "Rejection reason is required" });
  }

  // Update status to rejected
  note.status = "rejected";
  note.rejectionReason = reason;
  await note.save();

  return res.status(200).json({ message: "Note rejected successfully", note });
});

//reportNote
export const reportNote = ErrorHandler(async (req, res) => {
  const { noteId } = req.params;
  const { reason } = req.body;
  const user = await User.findById(req.user);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const note = await Note.findById(noteId);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  if (note.status === "reported") {
    return res.status(400).json({ message: "Note is already reported" });
  }

  if (!reason) {
    return res.status(400).json({ message: "Report reason is required" });
  }

  // Update status to reported
  note.status = "reported";
  note.reportReason = reason;
  note.reportedBy = user._id;
  await note.save();

  return res.status(200).json({
    message: "Note reported successfully",
    note,
  });
});

// reviewReportedNote
export const reviewReportedNote = ErrorHandler(async (req, res) => {
  const { noteId } = req.params;
  const { action } = req.body;
  const user = await User.findById(req.user);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.role !== "teacher" && user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Only teachers or admins can review reported notes" });
  }

  const note = await Note.findById(noteId);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  if (note.status !== "reported") {
    return res
      .status(400)
      .json({ message: "Only reported notes can be reviewed" });
  }

  if (action === "approve") {
    note.status = "approved";
    note.reportReason = null;
    note.reportedBy = null;
  } else if (action === "reject") {
    note.status = "rejected";
  } else {
    return res.status(400).json({ message: "Invalid action" });
  }

  await note.save();

  return res.status(200).json({
    message: `Note ${
      action === "approve" ? "approved" : "rejected"
    } successfully`,
    note,
  });
});

//getAllReportedNotes
export const getAllReportedNotes = ErrorHandler(async (req, res) => {
  const user = await User.findById(req.user);

  // Only admin or teacher can view reported notes
  if (user.role !== "admin" && user.role !== "teacher") {
    return res
      .status(403)
      .json({ message: "Access denied! You are not authorized." });
  }

  const reportedNotes = await Note.find({ status: "reported" }).populate(
    "reportedBy",
    "fullName email"
  );

  if (!reportedNotes.length) {
    return res.status(404).json({ message: "No reported notes found" });
  }

  return res
    .status(200)
    .json({ message: "Reported notes fetched successfully", reportedNotes });
});

// create semester sessional notes

export const createSemesterSessionalNotes = ErrorHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, branch, selectYear } = req.body;

  const user = await User.findById(req.user);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!title || !description || !req.file || !branch || !selectYear) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const semester = await Note.findById(id);
  if (!semester) {
    return res
      .status(404)
      .json({ message: "No semester found", success: false });
  }

  const status = user.role === "teacher" ? "approved" : "pending";

  const createSessional = await Sessional.create({
    title,
    description,
    branch,
    sessionalPdf: req.file.path.replace("\\", "/"),
    user: req.user,
    note: semester._id,
    selectYear,
    status,
  });

  if (!createSessional) {
    return res.status(500).json({ message: "Error creating createSessinal" });
  }

  return res.status(200).json({
    message:
      status === "approved"
        ? "created and approved successfully"
        : "submitted for approval",
    createSessional,
  });
});

// get all notes
export const getAllNotes = ErrorHandler(async (req, res) => {
  const user = await User.findById(req.user);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  let notes;
  if (user.role === "teacher") {
    notes = await Note.find()
      .populate("sessionalPaper")
      .populate({ path: "userId", select: "fullName role" }); // Selecting only fullName & role
  } else {
    notes = await Note.find({ status: "approved" })
      .populate("sessionalPaper")
      .populate({ path: "userId", select: "fullName role" });
  }

  return res.status(200).json({ notes });
});

// all sessionalPapers by Semester

export const getAllSessionalNotes = ErrorHandler(async (req, res) => {
  const { id } = req.params;
  const semester = await Note.findById(id);
  if (!semester) {
    return res
      .status(404)
      .json({ message: "No semester found", success: false });
  }
  const allSessionalNotes = await Sessional.find({ note: id });
  if (!allSessionalNotes || allSessionalNotes.length === 0) {
    return res.status(404).json({ message: "No Sessional Found" });
  }
  return res.status(200).json({ message: "success", allSessionalNotes });
});

// update Note
export const updateNotes = ErrorHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, branch, selectYear } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const notes = await Note.findById(id);
  if (!notes) {
    return res.status(404).json({ message: "Not found" });
  }

  let localFilePath = req.file ? req.file.path : null;

  const updatedNote = await Note.findByIdAndUpdate(
    id,
    {
      title,
      description,
      branch,
      notesPdf: localFilePath.replace("\\", "/"),
      selectYear,
    },
    { new: true }
  );

  if (!updatedNote) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "Updated", updatedNote });
});

// delete Note
export const deleteNote = ErrorHandler(async (req, res) => {
  const { id } = req.params;
  const deletedNote = await Note.findByIdAndDelete(id);
  const sessional = await Sessional.deleteMany({ note: id });
  if (!deletedNote || !sessional) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "Deleted" });
});

// update Sessional Paper

export const updateSessionalPaper = ErrorHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, branch, selectYear } = req.body;
  const sessionalPaper = await Sessional.findById(id);
  if (!sessionalPaper) {
    return res.status(404).json({ message: "Not found" });
  }
  let fileLocalPath = req.file ? req.file.path : null;
  const updateSessional = await Sessional.findByIdAndUpdate(
    id,
    {
      title,
      description,
      branch,
      sessionalPdf: fileLocalPath,
      selectYear,
    },
    { new: true }
  );
  if (!updateSessional) {
    return res.status(402).json({ message: "Error While Updating" });
  }
  return res.status(200).json({ message: "updated", updateSessional });
});

// deleteSessional paper

export const deleteSessionalPaper = ErrorHandler(async (req, res) => {
  const { id } = req.params;
  const deletedSessional = await Sessional.findByIdAndDelete(id);
  if (!deletedSessional) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "Deleted" });
});

// dashboards

export const getDashboardStats = ErrorHandler(async (req, res) => {
  try {
    const totalTeachers = await User.countDocuments({ role: "teacher" });
    const totalStudents = await User.countDocuments({ role: "student" });

    const totalNotes = await Note.countDocuments();
    const totalSessionalNotes = await Sessional.countDocuments();

    const totalReports = await Note.countDocuments({ status: "reported" });
    const totalRejects = await Note.countDocuments({ status: "rejected" });

    const totalPendings = await Note.countDocuments({ status: "pending" });
    const totalApproved = await Note.countDocuments({ status: "approved" });

    return res.status(200).json({
      message: "Dashboard stats fetched successfully",
      totalTeachers,
      totalStudents,
      totalNotes,
      totalSessionalNotes,
      totalReports,
      totalRejects,
      totalApproved,
      totalPendings,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching dashboard stats" });
  }
});
