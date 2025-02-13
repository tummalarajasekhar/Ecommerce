const jwt = require("jsonwebtoken")
const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    // console.log(req.headers)

    if (!token) return res.status(401).json({ message: "Unauthorized, No Token" })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded)
        req.user = { id: decoded.id }
        next()
    } catch (error) {
        res.status(401).json({ message: "Invalid token" })
    }
}
module.exports = protect