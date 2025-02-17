const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const User = require('../models/User')
const crypto = require("crypto");
require("dotenv").config();
const nodemailer = require('nodemailer')



const router = express.Router()
let otpStore = {}
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use an "App Password" if using Gmail
    },
});
router.post('/register', async (req, res) => {
    const { name, email, password, otp } = req.body

    try {
        const userExists = await User.findOne({ email })

        if (userExists) return res.status(400).json({ message: "User already exists" })
        if (!otpStore[email]) return res.status(400).json({ message:"OTP expired or invalid OTP"})
        if (otpStore[email].otp!==otp) return res.status(400).json({message:"OTP Expired or invalid OTP"})
        
        delete otpStore[email]
        const user = new User({ name, email, password })
        user.save()
        const token = jwt.sign({
            id: user._id, email: user.email
        },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )




        res.status(202).json({ token, user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } })
    } catch (error) {

        res.status(500).json({ message: "Server Error", error })
    }

})
router.post('/login', async (req, res) => {

    const { email, password ,otp,login} = req.body
   
    try {
        if (login){
            const userExists = await User.findOne({email});
            if (!otpStore[email]) return res.status(400).json({ message:"OTP expired or invalid OTP"})
                if (otpStore[email].otp!==otp) return res.status(400).json({message:"OTP Expired or invalid OTP"})
                delete otpStore[email]
            userExists.password=password
            await userExists.save();
            const token = jwt.sign({ id: userExists._id, isAdmin: userExists.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' })
        // console.log(token)
        res.json({ token, user: { id: userExists._id, name: userExists.name, email: userExists.email, isAdmin: userExists.isAdmin } })
        }
        else{
        const userExists = await User.findOne({ email })
        // console.log(userExists)
        if (!userExists) return res.status(400).json({ message: "invalid Email or Password" })

        const isMatch = await bcrypt.compare(password, userExists.password)
        // console.log(isMatch)
        if (!isMatch) return res.status(400).json({ message: "invalid Email or Password" })
        const token = jwt.sign({ id: userExists._id, isAdmin: userExists.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' })
        // console.log(token)
        res.json({ token, user: { id: userExists._id, name: userExists.name, email: userExists.email, isAdmin: userExists.isAdmin } })
}
    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: error }, error)

    }
})
router.post("/generate-otp", async (req, res) => {



    const { email ,signup} = req.body
    // console.log(email);
    const userExists = await User.findOne({ email })
    if (signup){
    

    if (userExists) return res.status(400).json({ message: "you already have a account go to login" })
    }else{
        if (!userExists) return res.status(400).json({ message: "No user Change mail and try again" })
    }
    // if (!email) return res.status(400).json({ message: "Email is required" })
    const otp = crypto.randomInt(100000, 999999).toString()
    otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code",
            text: `your OTP code is ${otp} It expires in 5 minutes.`

        })

        res.json({ message: "OTP sent successfully!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: " Error sending OTP", error })
    }
})
module.exports = router;


