const jwt = require('jsonwebtoken');
// const { respHndlr } = require('../common/resp-handler/index');
// var constant = require("../common/resp-handler/constants");
require("dotenv").config();


module.exports = function auth(req, res, next) {

    const tokenHeader = req.headers.authorization;
    try {
        if (!tokenHeader) {
            res.staus(400).json({
                success: false,
                message: "Authentication failed"
            })
            return
        }
        const token = tokenHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            res.staus(400).json({
                success: false,
                message: "Authentication failed"
            })
            return
        }
        req.id = decoded.empId
        // console.log(decoded);
        next();
    } catch (err) {
        console.log(err)
    }
}