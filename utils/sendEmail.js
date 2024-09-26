const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

const createTransporter = () => {
    let transporterOptions;

    // Configure transporter for Gmail and Outlook
    if (
        process.env.EMAIL_SERVICE === "gmail" ||
        process.env.EMAIL_SERVICE === "outlook"
    ) {
        transporterOptions = {
            service: process.env.EMAIL_SERVICE, // 'gmail' or 'outlook'
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        };
    } else if (process.env.EMAIL_SERVICE === "custom") {
        // Configure transporter for custom organization SMTP settings
        transporterOptions = {
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_SECURE === "true", // Convert string to boolean
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        };
    } else {
        throw new Error("Invalid email service in .env");
    }

    return nodemailer.createTransport(transporterOptions);
};

const sendEmail = async (to, subject, text) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender's email address
        to, // Receiver's email address
        subject, // Subject of the email
        text, // Email content
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
    } catch (error) {
        console.error(`Error sending email to ${to}:`, error);
    }
};

module.exports = sendEmail;
