const nodemailer = require('nodemailer');


// setup mailer
const gmailTransport = nodemailer.createTransport(
  `smtps://${process.env.MAILER_EMAIL}:${process.env.MAILER_PASSWORD}@smtp.gmail.com`
);
const base_url = process.env.MAILER_BASE;

function sendMail({
  from = '"BBuck.io" <BBuck@BBuck.io>',
  toEmailArray,
  subject,
  text,
  html,
}) {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from,
      to: toEmailArray.join(', '),
      subject,
      text,
      html,
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
}

function sendVerifyEmail( fortnite_username, email ) {
  sendMail({
    toEmailArray: [ email ],
    subject: 'Welcome to BBuck.io!',
    html: `<h3>Thanks for verifying your account, ${fortnite_username}!</h3>
<p>To complete the final step of the signup process, \
please <a href="${base_url}/api/verify?fortnite_username=${fortnite_username}"> \
click this link to log in </a></p>.`,
  });
};

exports.sendVerifyEmail = sendVerifyEmail;
exports.sendMail = sendMail;
