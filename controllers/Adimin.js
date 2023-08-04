const User = require('../models/user');
const Task = require('../models/task');

exports.addUser = (req, res, next) => {
    // console.log("Body :", req.body)
    const name = req.body.name;
    const email = req.body.email;
    const isAdmin = req.body.isAdmin;
    User.findOne({ email: email })
        .then(exist => {
            if (exist) {
                res.status(400).json({
                    message: "User Already exist",
                    success: false
                });
            } else {
                const user = new User({
                    name: name,
                    email: email,
                    isAdmin: isAdmin
                })

                user.save()
                    .then(result => {
                        res.status(200).json({
                            message: "User Added Successfully",
                            success: true
                        });
                    })
                    .catch(err => {
                        res.status(400).json(err);
                        console.log(err);
                    });
            }

        }).catch(err => {
            console.log(err)
        })
};

exports.addTask = (req, res, next) => {
    const title = req.body.title;
    const channelName = req.body.channelName;
    const completed = req.body.completed;
    const clientType = req.body.clientType
    const task = new Task({
        title: title,
        channelName: channelName,
        completed: completed,
        clientType: clientType
    })

    task.save()
        .then(result => {
            res.status(200).json({
                message: "Task Added Successfully",
                success: true
            });
        })
        .catch(err => {
            res.status(400).json(err);
            console.log(err);
            // console.log("User Creation Error :", err.errors);
        });
};