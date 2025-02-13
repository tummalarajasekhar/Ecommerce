const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const User = require('../models/User')


const router = express.Router()

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    try {
        const userExists = await User.findOne({ email })

        if (userExists) return res.status(400).json({ message: "User already exists" })
        const user = new User({ name, email, password })
        user.save()
        const token = jwt.sign({
            id: user._id, email: user.email
        },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )


        res.status(202).json({ token, user: { id: user._id, name: user.name, email: user.email,isAdmin:user.isAdmin } })
    } catch (error) {

        res.status(500).json({ message: "Server Error", error })
    }

})
router.post('/login', async (req, res) => {

    const { email, password } = req.body
    try {
        const userExists = await User.findOne({ email })
        // console.log(userExists)
        if (!userExists) return res.status(400).json({ message: "invalid Email or Password" })

        const isMatch = await bcrypt.compare(password, userExists.password)
        // console.log(isMatch)
        if (!isMatch) return res.status(400).json({ message: "invalid Email or Password" })
        const token = jwt.sign({ id: userExists._id, isAdmin: userExists.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' })
        // console.log(token)
        res.json({ token, user: { id: userExists._id, name: userExists.name, email: userExists.email ,isAdmin:userExists.isAdmin} })
    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: error }, error)

    }
})
module.exports = router;