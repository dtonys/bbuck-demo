// const lodash = require('lodash');
// const queryString = require('querystring');
// const superagent = require('superagent');
const nodemailer = require('nodemailer');


// setup mailer
const gmailTransport = nodemailer.createTransport(
  `smtps://${process.env.MAILER_EMAIL}:${process.env.MAILER_PASSWORD}@smtp.gmail.com`
);

function sendMail({
  from = '"HomeLeads" <homeleads@gmail.com>',
  toEmailArray,
  subject,
  text,
}) {
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
}

module.exports = ( app ) => {
  // api routes
  app.post('/api/login', ( req, res ) => {
    res.send('Login API');
  });

  app.post('/api/signup', ( req, res ) => {
    res.send('Signup API');
  });

  app.get('/api/session', ( req, res ) => {
    res.send('Session API');
  });

  app.get('/api/logout', ( req, res ) => {
    res.send('Logout API');
  });
};
