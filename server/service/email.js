const nodemailer = require('nodemailer');
const { simpleLogger } = require('../logger/logger');
const config = require('../config/index');
const emailDefault = require('../constants/email');

async function sendEmail(emailMessage,
  emailSubject = emailDefault.DEFAULT_EMAIL_SUBJECT,
  recipientAddress = config.mailRecipient) {

  const testAccount = await nodemailer.createTestAccount();
  const { mailConfig: { service, host, port, secure } } = config;

  const transporter = nodemailer.createTransport({
    service: service,
    host: host,
    port: port,
    secure: secure,
    auth: {
      user: config.mailUsername || testAccount.user,
      pass: config.mailPassword || testAccount.pass
    }
  });

  const mailOptions = {
    from: config.mailFrom,
    to: recipientAddress,
    subject: emailSubject,
    text: emailMessage || emailDefault.DEFAULT_EMAIL_MESSAGE
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