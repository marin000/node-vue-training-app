const nodemailer = require('nodemailer');
const { simpleLogger } = require('../logger/logger');

function sendEmail(emailSubject, emailMessage, recipientAddress) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: recipientAddress,
    subject: emailSubject,
    text: emailMessage
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      simpleLogger.error(error);
    } else {
      simpleLogger.info('Email sent: ' + info.response);
    }
  });
}
module.exports = { sendEmail };