const nodemailer = require("nodemailer")

const emailManager = async (to, text, html, subject) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a4e7bc0a0ade23",
      pass: "6fba3bb4dfa3b0",
    },
  });

  await transport.sendMail({
    to: to,
    from: "info@expensetracker.com",
    html: html,
    text: text,
    subject: subject,
  });
};
module.exports = emailManager;
