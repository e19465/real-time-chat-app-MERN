const nodemailer = require("nodemailer");

const sendEmail = async ({ email, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com", // Corrected SMTP host for Gmail
    port: 465,
    secure: true,
    auth: {
      user: process.env.APP_EMAIL, // Sender Gmail
      pass: process.env.APP_EMAIL_PASSWORD, // Sender Gmail password
    },
  });

  const mailOptions = {
    from: {
      name: "SD CHAT App",
      address: process.env.APP_EMAIL,
    },
    to: email,
    subject: subject,
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    throw new Error(`Error sending email: ${err}`);
  }
};

module.exports = sendEmail;
