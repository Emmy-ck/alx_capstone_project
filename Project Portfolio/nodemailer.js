const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'kattie.yost76@ethereal.email',
      pass: 'k61tJHWPm7wfjkvazH'
  }
});

app.use(express.json());

app.post('/', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'chronicdev225@gmail.com',
    to: req.body.email,
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error, info);
      res.status(500).json({ error: 'Failed to send email', info: info });
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

// Start app: node index.js
// Send email:
//curl -X POST -H "Content-Type: application/json" -d '{
//   "to": "recipient@example.com",
//   "subject": "Hello from Nodemailer",
//   "text": "This is a test email sent from Node.js and Nodemailer."
// }' http://localhost:3000/send-email