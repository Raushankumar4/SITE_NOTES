import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const GenerateToken = (user) => {
  const data = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };

  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  return token;
};

// set toke cookies

export const setTokenCookie = (res, token) => {
  return res.cookie("token", token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
};
// remove token
export const removeTokenCookie = (res) => {
  return res.cookie("token", "", {
    maxAge: 0, // expires in 0
  });
};
