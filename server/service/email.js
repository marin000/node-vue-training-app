const nodemailer = require('nodemailer');
const { simpleLogger } = require('../logger/logger');
const config = require('../config/index');
const emailDefault = require('../constants/email');

async function sendEmail(emailMessage,
  emailSubject = emailDefault.DEFAULT_EMAIL_SUBJECT,
  recipientAddress = config.mailRecipient) {

  const testAccount = await nodemailer.createTestAccount();
  const { user, pass } = testAccount;
  const { mailUsername, mailPassword, mailFrom, 
    mailConfig: { service, host, port, secure } } = config;

  const transporter = nodemailer.createTransport({
    service: service,
    host: host,
    port: port,
    secure: secure,
    auth: {
      user: mailUsername || user,
      pass: mailPassword || pass
    }
  });

  const mailOptions = {
    from: mailFrom,
    to: recipientAddress,
    subject: emailSubject,
    text: emailMessage 
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      simpleLogger.error(error);
    }
    else if(!mailOptions.text){
      throw new Error('Email text missing!');
    } 
    else {
      simpleLogger.info('Email sent: ' + info.response);
    }
  });
}
module.exports = { sendEmail };