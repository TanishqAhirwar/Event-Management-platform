const {createTransport} = require("nodemailer");
require("dotenv").config();

const transporter = createTransport({
  service : "gmail",
  auth : {
    user : process.env.EMAIL_USER,
    pass : process.env.EMAIL_PASS
  }
})

module.exports = transporter;