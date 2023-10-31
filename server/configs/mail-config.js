const nodemailer = require("nodemailer");
const { EMAIL_USER, EMAIL_PASS } = process.env;
const Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const sendOtpOnMail = async (email, otp) => {
  try {
    let send_mail = await Transporter.sendMail({
      from: "a@gmail.com",
      to: email,
      subject: "Forgot password otp",
      html: `<p>This is your one time otp for forgot password valid 2 minitues ${otp}</p>`,
    });
    console.log(send_mail);
    return send_mail;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = sendOtpOnMail;
