const nodemailer = require('nodemailer');

// setup mailer
const gmailTransport = nodemailer.createTransport(
  `smtps://${process.env.MAILER_EMAIL}:${process.env.MAILER_PASSWORD}@smtp.gmail.com`
);

exports.sendMail = ({
  from = '"BBuck.io" <BBuck@BBuck.io>',
  toEmailArray,
  subject,
  text,
}) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from,
      to: toEmailArray.join(', '),
      subject,
      text,
    };
    gmailTransport.sendMail( mailOptions, ( err, info ) => {
      if ( err ) {
        console.log(err); // eslint-disable-line no-console
        reject(err);
        return;
      }
      console.log('Message sent: ' + info.response ); // eslint-disable-line no-console
      resolve();
    });
  });
};
