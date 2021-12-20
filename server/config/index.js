require('dotenv').config();

if(!process.env.DB_URL){
  throw new Error('DB url missing!');
}
else if(!process.env.MAIL_RECIPIENT){
  throw new Error('Recipient mail missing!');
}
const config = {
  port: process.env.PORT || 4101,
  dbUrl: process.env.DB_URL,
  mailUsername: process.env.MAIL_USERNAME,
  mailPassword: process.env.MAIL_PASSWORD,
  mailRecipient: process.env.MAIL_RECIPIENT,
  mailFrom: process.env.MAIL_USERNAME || 'test@gmail.com',
  mailConfig: {
    service: process.env.MAIL_USERNAME && process.env.MAIL_PASSWORD ?
      'gmail' : '',
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
  }
};

module.exports = config;