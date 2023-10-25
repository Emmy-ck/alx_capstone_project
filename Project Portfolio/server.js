const http = require('http');
const fs = require('fs');
const url = require('url');
const nodemailer = require('nodemailer');
const qs = require('querystring');

const port = 5501;

// Serve the HTML page
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    if (path === '/') {
        fs.readFilefs.readFile('public/index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
});

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ckenduiwa9876@gmail.com',
        pass: 'SeptembeR11!'
    }
});

// Handling form submission
server.on('request', (req, res) => {
    if (req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            const formData = qs.parse(body);
            const email = formData.email;

            // Validation
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailRegex.test(email)) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Enter correct email format');
                return;
            }

            // Email options
            const mailOptions = {
                from: 'ckenduiwa9876@gmail.com',
                to: email,
                subject: 'Thank you for subscribing to my blog',
                text: 'Thank you for visiting my page! Looking forward to partnerships and forming more networks. Good day!'
            };

            // Sending the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error sending email');
                } else {
                    console.log('Email sent: ' + info.response);
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('Email sent successfully!');
                }
            });
        });
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});