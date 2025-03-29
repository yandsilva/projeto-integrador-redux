import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendPasswordResetEmail = async (email: string, token: String) => {
  const resetUrl = `http://localhost:5173/password/reset/${token}`;

  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "Password Reset",
    html: `
      <p>You have requested a password reset. Please click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
    `,
  });
};
