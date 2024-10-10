import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use(cookieParser());

// auth routes
import authRoutes from "./routes/authroutes.js";

app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export { app };
