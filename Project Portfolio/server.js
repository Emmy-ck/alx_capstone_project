const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

// Middleware and static file serving
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json())
app.use(bodyParser.json());
app.use(cors.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/contactform.html')
})

// Creating a POST route
app.post('/', (req, res)=>{
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'chronicdev225@gmail.com',
            pass: 'ChronicMangoes225'
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'chronicdev225@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    // Sending email using the preselected transport object
    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
        } else {
            // Displaying the error message if any
            console.log('Email sent: ' + info.response);
            res.send('success');
        }
    })
})
// Starting the server
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})