const contactForm = document.querySelector('.contact-info');

const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

let firstName = document.getElementById('firstname');
let lastName = document.getElementById('lastname');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'kattie.yost76@ethereal.email',
      pass: 'k61tJHWPm7wfjkvazH'
  }
});

contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    let formData = {
        firstname: firstName.value,
        lastname: lastName.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    }
//     let xhr = new XMLHttpRequest();
//     xhr.open('POST', 'http://localhost:5000/');
//     xhr.setRequestHeader('content-type', 'application/json');
//     xhr.onload = function() {
//         console.log(xhr.responseText);
//         if(xhr.responseText == 'success') {
//             alert('Email sent successfully!');
//             firstName.value = '';
//             lastName.value = '';
//             email.value = '';
//             subject.value = '';
//             message.value = '';
//         } else {
//             alert('Submitted!')
//         }
//     }

//     xhr.send(JSON.stringify(formData));
// })