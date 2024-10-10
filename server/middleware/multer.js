import multer, { diskStorage } from "multer";
import { v4 as uuid } from "uuid";

const allowedMimetypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
];

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuid() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (allowedMimetypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only PDFs and images are allowed."),
      false
    );
  }
};

export const upload = multer({ storage, fileFilter });
