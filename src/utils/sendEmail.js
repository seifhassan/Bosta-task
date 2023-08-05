const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendStatusChangeNotification = async (check, userEmail) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: userEmail,
            subject: `Status change for URL check "${check.name}"`,
            text: `The status for your check "${check.name}" has changed to "${check.status}".`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Notification email sent to ${userEmail}`);
    } catch (err) {
        console.log(`Error sending notification email to ${userEmail}: ${err.message}`);
    }
};

const sendStatusChangeNotificationSingup = async (email, verificationLink) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'Email Verification',
            html: `<p>Please click the following link to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`,
        };

        await transporter.sendMail(mailOptions);
       
    } catch (err) {
        console.log(`Error sending notification email to ${email}: ${err.message}`);
    }
};

module.exports = {
    sendStatusChangeNotification,
    sendStatusChangeNotificationSingup
};
