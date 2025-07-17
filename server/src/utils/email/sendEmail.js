const transporter = require("./emailTransporter");
const path = require("path");

// import the templates here, to make the templates load dynamically.
const templates = {
  resetPasswordTemplate: require("../templates/resetPasswordTemplate"),
};

async function sendEmail({ to, subject, templateName, templateData }) {
  const templateFn = templates[templateName];

  if (!templateFn) {
    throw new Error(`Email template '${templateName}' not found`);
  }

  const html = templateFn(templateData);

  const mailOptions = {
    from: `"Support Team" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
