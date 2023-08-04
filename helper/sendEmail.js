const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
    host: process.env.emailHost,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.email, // Your GoDaddy email address
        pass: process.env.emailPass, // Your GoDaddy email password
    },
    debug: true,
});

async function sendEmail(sender, recipient, subject, message) {
    try {
        await transporter.sendMail({
            from: sender, // Sender email address
            to: recipient, // Recipient email address
            subject: subject, // Email subject
            text: message, // Plain text body
        });

        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Failed to send email. Error:', error);
    }
}


module.exports = {
    sendEmail
}