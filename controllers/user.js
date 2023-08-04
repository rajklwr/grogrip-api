const User = require('../models/user');
const team = require('../models/team');

exports.addUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const isAdmin = req.body.isAdmin;
    const user = new User({
        name: name,
        email: email,
        isAdmin: isAdmin
    })

    user.save()
        .then(result => {
            // console.log("User created")
            res.status(200).json({
                message: "User Added Successfully"
            });
        })
        .catch(err => {
            res.status(400).json(err);
            // console.log("User Creation Error :", err.errors);
        });
};

exports.getUserDetail = async(req, res, next) => {
    const userId = req.id
    try {
        const userDetail = await team.findOne({ _id: userId })
        if (userDetail) {
            const obj = {
                id : userDetail.id,
                email : userDetail.email,
                type: userDetail.type_,
                isAdmin: userDetail.isAdmin,
                name : userDetail.name
            }
            res.status(200).json({ success: true, data: obj })
        }
    } catch (err) {
        res.status(400).json({ message: err })
    }
}