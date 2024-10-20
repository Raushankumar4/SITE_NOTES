import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());

// Auth routes
import authRoutes from "./routes/authroutes.js";
app.use("/api/v1/auth", authRoutes);

// Notes Routes
import noteRoutes from "./routes/notesRoutes.js";
app.use("/api/v1/notes", noteRoutes);

// User routes
import userRoutes from "./routes/userRoutes.js";
app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export { app };
