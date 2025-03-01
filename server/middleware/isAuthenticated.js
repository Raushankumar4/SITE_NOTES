import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded._id;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const isTeacherOrAdmin = (req, res, next) => {
  if (req.user.role !== "teacher" && req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied! You are not authorized." });
  }
  next();
};
