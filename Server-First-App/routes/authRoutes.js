const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//
require('dotenv').config();
//
const nodemailer = require('nodemailer');

// nodemailer
async function mailer(receiveremail, code) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        requireTLS: true,
        auth: {
            user: "prathamkandari123@gmail.com", // generated ethereal user
            pass: "eknkyhjkdqmylzdg", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'prathamkandari123@gmail.com', // sender address
        to: `${receiveremail}`, // list of receivers
        subject: "Signup Verification", // Subject line
        text: `Your verification code is ${code}`, // plain text body
        html: `<b>Your verification code is ${code}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
//
router.post('/signup', async(
    req, res) => {
    // console.log('sent by client -', req.body);
    const { name, email, password, dob } = req.body;


    const user = new User({
        name,
        email,
        password,
        dob
    })

    try {
        await user.save();
        // res.send({ message: 'User saved successfully'});
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.send({message: "User Registered Successfully", token });
    }
    catch (err) {
        console.log('db err', err);
        return res.status(422).send({ error: err.message });
    }

}
)

router.post('/verify', (req, res) => {
    console.log('sent by client -', req.body);
    const { name, email, password, dob } = req.body;
    if (!email || !password || !name || !dob) {
        return res.status(422).send({ error: "Please fill all the fields" });
    }

    User.findOne({ email: email })
        .then(
            async (savedUser) => {
                if (savedUser) {
                    return res.status(422).send({ error: "Invalid Credentials" });
                }
                try {
                    let VerificationCode = Math.floor(100000 + Math.random() * 900000);
                    let user = [
                        {
                            name,
                            email,
                            password,
                            dob,
                            VerificationCode
                        }
                    ]
                    await mailer(email, VerificationCode);
                    res.send({ message: "Verification Code Sent to your Email", udata: user });
                }
                catch (err) {
                    console.log(err);
                }
            }
        )

})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please add email or password" });
    }
    const savedUser = await User.findOne({ email: email })

    if (!savedUser) {
        return res.status(422).json({ error: "Invalid Credentials" });
    }

    try {
        bcrypt.compare(password, savedUser.password, (err, result) => {
            if (result) {
                console.log("Password Matched");
                const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
                res.send({ token });
            }
            else {
                console.log("Password does not match");
                return res.status(422).json({ error: "Invalid Credentials" });
            }
        })
    }
    catch (err) {
        console.log(err);
    }
})

module.exports = router;