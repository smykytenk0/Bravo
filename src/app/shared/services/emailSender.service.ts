const nodemailer = require('nodemailer');

const mailTransporter = nodemailer.createTransport({
  service: 'hotmail',
  host: 'smtp.gmail.com',
  secure: false,
  auth: {
    user: 'mykytenk00s@outlook.com',
    pass: 'JDVbrbntyrj'
  }
});


let mailDetails = {
  from: 'mykytenk00s@outlook.com',
  to: 'mykytenk00s@gmail.com',
  subject: 'Test mail',
  text: 'Hello, it is test mail'
};

mailTransporter.sendMail(mailDetails);
