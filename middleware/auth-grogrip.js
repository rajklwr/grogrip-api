
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.decode(token);
        req.user = decoded.email
        next()
    } catch (err) {
        console.log("unauthorized error")
        res.staus(400).json({
            success: false,
            message: "Authentication failed"
        })
    }
}