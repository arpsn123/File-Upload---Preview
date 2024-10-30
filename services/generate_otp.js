const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_TRAP_HOST,
  port: process.env.MAIL_TRAP_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_TRAP_USERNAME,
    pass: process.env.MAIL_TRAP_PASSWORD,
  },
});

const sendOTP = (dest_email, randomstring) => {
  const mailOptions = {
    from: process.env.SOURCE_MAIL,
    to: dest_email,
    subject: "Sending OTP:",
    text: `The OTP is: ${randomstring}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendOTP };
