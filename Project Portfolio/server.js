const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/contactform.html')
})

// Creating a POST route
app.post('/submit', (req, res)=>{
    console.log(req.body);

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

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('success');
        }
    });
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})