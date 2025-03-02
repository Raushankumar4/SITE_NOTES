import { createTransport } from "nodemailer";
import {
  generateForgotPasswordHtml,
  generateOtpHtml,
  Verification_Email_Template,
  Welcome_Email_Template,
} from "../constant.js";
import dotenv from "dotenv";

dotenv.config();

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Send OTP Email
export const sendMail = async (email, subject, data) => {
  try {
    const html = generateOtpHtml(data.name, data.otp);

    await transporter.sendMail({
      from: `"SITE NOTES" <${process.env.EMAIL}>`,
      to: email,
      subject,
      html,
    });

    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
};

// Send Email Verification Code
export const sendVerificationCode = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: `"SITE NOTES" <${process.env.EMAIL}>`,
      to: email,
      subject: "Verify Email",
      text: "Verify your Email",
      html: Verification_Email_Template.replace(
        "{verificationCode}",
        verificationCode
      ),
    });
    return response;
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

// Email Verified Message
export const emailVerifiedMessage = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: `"SITE NOTES" <${process.env.EMAIL}>`,
      to: email,
      subject: `Welcome ${name}`,
      text: `Email Verified ${email}`,
      html: Welcome_Email_Template.replace("{name}", name),
    });
    return response;
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

// Send Forgot Password Email
export const sendForgotPasswordmail = async (subject, data) => {
  try {
    const html = generateForgotPasswordHtml(data.token);

    await transporter.sendMail({
      from: `"Your App Name" <${process.env.EMAIL}>`,
      to: data.email,
      subject,
      html,
    });

    console.log("Forgot password email sent successfully");
  } catch (error) {
    console.error("Error sending forgot password email:", error);
  }
};
