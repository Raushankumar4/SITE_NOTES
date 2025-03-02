import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import session from "express-session";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🛠 Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS Configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Frontend origin (e.g., http://localhost:3000)
    credentials: true, // Allows cookies/session sharing
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ✅ Static file serving (for uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Session Configuration
app.use(
  session({
    secret: "dspiuiofgus7957ufsdi",
    resave: false,
    saveUninitialized: false, // ✅ Prevents empty sessions from being saved
    cookie: { secure: false }, // ✅ Set true if using HTTPS
  })
);

// 🛠 Import & Use Routes
import authRoutes from "./routes/authroutes.js";
import noteRoutes from "./routes/notesRoutes.js";
import userRoutes from "./routes/userRoutes.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notes", noteRoutes);
app.use("/api/v1/users", userRoutes);

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Export the app for server setup
export { app };
