import { createTransport } from "nodemailer";
import { generateForgotPasswordHtml, generateOtpHtml } from "../constant.js";

export const sendMail = async (email, subject, data) => {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const html = generateOtpHtml(data.name, data.otp);

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject,
    html,
  });
};

// forgot password

export const sendForgotPasswordmail = async (subject, data) => {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const html = generateForgotPasswordHtml(data.token);

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: data.email,
    subject,
    html,
  });
};
