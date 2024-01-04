const nodemailer = require('nodemailer');

const SendOTP = async (otp, email) => {
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

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'No reply <classicIt@gmail.com>', // sender address
            to: email, // list of receivers
            subject: `Send Your Classic Ecommerce APP Registration OTP`,
            html: `
                <h5>Your OTP IS ${otp}</h5>
            `, // html body
        });
        console.log(info)
        return info;
    } catch (error) {
        console.log(error)
        return error;
    }
};

module.exports = {
    SendOTP,
};
