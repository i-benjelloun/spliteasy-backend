const nodemailer = require('nodemailer');

exports.notify = (members, group, joinLink) => {
  // Create the transporter with the required configuration for Outlook
  // change the user and pass !
  var transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com', // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: 'SSLv3',
    },
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PWD,
    },
  });

  // setup e-mail data, even with unicode symbols
  var mailOptions = {
    from: `"SplitEasy" <${process.env.EMAIL}>`, // sender address (who sends)
    to: recipient, // list of receivers (who receives)
    subject: 'You have been added to a new group on SplitEasy', // Subject line
    // text: 'Hello world ', // plaintext body
    html: `<p>Hello ${recipient}<br>,
    ${sender} added you to the group ${group}.<br>
    Go ahead and start sharing your expenses through the following link : <a>${joinLink}</a>
    </p>`, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }

    console.log('Message sent: ' + info.response);
  });
};
