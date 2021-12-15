const nodemailer = require('nodemailer');
const { simpleLogger } = require('../logger/logger');

async function sendEmail(emailMessage,
  emailSubject = 'Notice from Agilathon To Do app',
  recipientAddress = process.env.MAIL_RECIPIENT) {

  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_USERNAME && process.env.MAIL_PASSWORD ?
      'gmail' : '',
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME || testAccount.user,
      pass: process.env.MAIL_PASSWORD || testAccount.pass
    }
  });

  const mailOptions = {
    from: process.env.MAIL_USERNAME || 'test@gmail.com',
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