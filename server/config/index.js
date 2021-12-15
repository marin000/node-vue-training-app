require('dotenv').config();

const config = {
  port: process.env.PORT || 4101,
  dbUrl: process.env.DB_URL,
  mailUsername: process.env.MAIL_USERNAME,
  mailPassword: process.env.MAIL_PASSWORD,
  mailRecipient: process.env.MAIL_RECIPIENT,
  mailConfig: {
    service: process.env.MAIL_USERNAME && process.env.MAIL_PASSWORD ?
      'gmail' : '',
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
  }
};

module.exports = config;