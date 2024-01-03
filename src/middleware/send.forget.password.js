const nodemailer = require('nodemailer');

const SendForgetPasswordLink = async (email) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            secure: true,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.pass,
            },
        });
        const resetLink = 'http://localhost:5000/reset-password'
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'No reply <classicIt@gmail.com>', // sender address
            to: email, // list of receivers
            subject: `Send link to set new password in your Ecommerce APP`,
            html: `<h5>Go to <a href="${resetLink}">link</a> reset your password</h5>`, // html body
        });
        return info;
    } catch (error) {
        return error;
    }
};

module.exports = {
    SendForgetPasswordLink,
};