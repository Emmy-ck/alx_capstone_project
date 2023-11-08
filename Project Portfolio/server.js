const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const bodyParser = require('body-parser');

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'kattie.yost76@ethereal.email',
    pass: 'k61tJHWPm7wfjkvazH',
  },
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/sendEmail', (req, res) => {
  const { firstname, lastname, email, subject, message } = req.body;

  const mailOptions = {
    from: 'chronicdev225@gmail.com',
    to: email,
    subject,
    text: `Name: ${firstname} ${lastname}\nEmail: ${email}\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to send email' });
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ success: 'Email sent successfully' });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
