const Task = require('../models/task');
const nodemailer = require('nodemailer');

const Client = require('../models/clients');
const Sheet = require('../models/sheet');
const Contents = require('../models/contents');
const mongoose = require('mongoose');
const team = require('../models/team');
const Comment = require('../models/comment');
require('dotenv').config();


const transporter = nodemailer.createTransport({
    host: process.env.emailHost,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.email, // Your GoDaddy email address
        pass: process.env.emailPass, // Your GoDaddy email password
    },
});

async function sendEmail(sender, recipient, subject, message) {
    try {
        await transporter.sendMail({
            from: sender, // Sender email address
            to: recipient, // Recipient email address
            subject: subject, // Email subject
            text: message, // Plain text body
        });

        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Failed to send email. Error:', error);
    }
}

// Call the sendEmail function with appropriate parameters


// exports.getTask = (req, res, next) => {
//     let data = []
//     Task.find()
//         .then(tasks => {
//             let data = []
//             tasks.forEach(x => {
//                 let obj = {
//                     id: x._id,
//                     title: x.title,
//                     completed: x.completed,
//                     clientType: x.clientType,
//                     Script: "Done",
//                     VoiceOver: "Approval",
//                     video: "working on it",
//                     Thumbnail: "working on it",
//                     channelName: x.channelName,
//                     ScriptAssigned: "Jaitn Rai",
//                     ScriptAssignedToMe: true,
//                     VoiceOverAssigned: "Tonmoy Ghosh",
//                     VoiceOverAssignedToMe: false,
//                     VideoAssigned: "Rajkiran kalowar",
//                     VideoAssignedToMe: false,
//                     ThumbnailAssigned: "Jaitn Rai",
//                     ThumbnailAssignedToMe: true,
//                     ScriptUploaded: true,
//                     VoiceOverUploaded: false,
//                     VideoUploaded: false,
//                     ThumbnailUploaded: false,
//                 }
//                 data.push(obj);
//             })
//             res.status(200).json({
//                 data: data,
//                 success: true
//             });
//             // console.log("success")
//         })
//         .catch(err => {
//             res.status(400).json(err);
//             console.log(err);
//         });
//     // res.status(404).json({
//     //     message: "This spi is not in use anymore"
//     // });
// };

// exports.getSheet = (req, res, next) => {
//     try {
//         const type = req.body.type
//         Sheet.findOne({ type: type }).then(sheet => {
//             res.status(200).json({
//                 data: sheet,
//                 success: true
//             });
//         })
//     } catch (err) {
//         res.status(404).json({
//             data: [],
//             success: false
//         });
//         console.log(err);
//     }
//     // res.status(404).json({
//     //     message: "This spi is not in use anymore"
//     // });
// }

// exports.updateTask = (req, res, next) => {

//     // console.log("body :", req.body.type);
//     // return
//     try {
//         const data = req.body.data;
//         // const type = "Tech";
//         const type = req.body.type;
//         const completed = false;
//         // console.log("data :", data);
//         // console.log("Type", type)
//         // return;

//         const filter = { type: type };
//         const update = { data: data };

//         Sheet.findOne({ type: type }).then(exist => {
//             if (exist) {
//                 //console.log('if')
//                 Sheet.findOneAndUpdate(filter, update, function (err, docs) {
//                     if (err) {
//                         console.log(err)
//                     }
//                     else {
//                         //  console.log("Original Doc : ", docs);
//                     }
//                 })
//             } else {
//                 const sheet = new Sheet;
//                 sheet.data = data;
//                 sheet.type = type;
//                 sheet.save();
//                 // console.log('else')
//             }
//             res.status(200).json({
//                 success: true
//             });
//         })
//     } catch (err) {
//         res.status(404).json({
//             success: false
//         });
//         console.log(err)
//     }
// }

exports.getClientType = (req, res, next) => {
    Client.find()
        .then(tasks => {
            res.status(200).json({
                data: tasks,
                success: true
            });
        })
        .catch(err => {
            res.status(400).json(err);
            console.log(err);
            // console.log("User Creation Error :", err.errors);
        });

}

exports.createTask = async (req, res, next) => {
    try {
        const clientType = req.body.clientType;
        const title = req.body.title;
        const channelName = req.body.channelName;
        const startingDate = req.body.startingDate;
        const scriptStatus = req.body.scriptStatus;
        const voiceOverStatus = req.body.voiceOverStatus;
        const videoStatus = req.body.videoStatus;
        const thumbNailStatus = req.body.thumbNailStatus;
        const userId = req.id;
        const userDetail = await team.findOne({ _id: userId })


        const newTask = new Task({
            _id: new mongoose.Types.ObjectId(),
            _type: clientType,
            title: title,
            startingDate: startingDate,
            channelName: channelName,
            scriptStatus: scriptStatus,
            voiceOverStatus: voiceOverStatus,
            videoStatus: videoStatus,
            thumbNailStatus: thumbNailStatus,
            uploaded: false,
            scriptPaid: false,
            voiceOverPaid: false,
            thumbnailPaid: false,
            clientPaid: false,
            createdOn: new Date(),
            updatedOn: new Date()
        });
        newTask.save()
            .then(async result => {
                const newContent = new Contents({
                    TaskId: result.id
                })
                newContent.save()
                const Task_ = await Task.find();
                if (userDetail.type_ === 'admin') {
                    res.status(200).json({
                        message: "task created successfully",
                        data: Task_,
                        success: true
                    });
                } else {
                    res.status(400).json({
                        message: "Permission denied",
                        success: false
                    });
                }
            })
            .catch(err => {
                console.error("Error in creating Task", err);
                res.status(400).json({
                    message: err,
                    success: false
                });
            });
    } catch (err) {
        console.error("Error in creating Task", err);
        res.status(400).json({
            message: err,
            success: false
        });

    }
}

exports.updateTaskV1 = (req, res, next) => {
    try {
        const taskId = req.body.id;
        const body = req.body.body;
        // console.log("body :", body);
        Task.findByIdAndUpdate(taskId, body)
            .then(updatedTask => {
                // console.log("updated successfully");
                res.status(200).json({
                    message: "task updated successfully",
                    success: true
                });
            })
            .catch(err => {
                console.error(err);
                res.status(400).json({
                    message: "failed",
                    success: false
                });
            });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            message: "failed",
            success: false
        });
    }
}


exports.deleteTask = async (req, res, next) => {
    try {
        const userId = req.id
        const taskIds = req.body.id;
        const userDetail = await team.findOne({ _id: userId })
        Task.deleteMany({ _id: { $in: taskIds } })
            .then(async result => {
                // console.log(result);

                Contents.deleteMany({ TaskId: { $in: taskIds } })
                    .catch(err => {
                        console.log("Contents delete error :", err)
                        res.status(400).json({
                            message: err,
                            success: false
                        });
                    })
                Comment.deleteMany({ taskId: { $in: taskIds } })
                    .catch(err => {
                        console.log("Comment delete error :", err)
                        res.status(400).json({
                            message: err,
                            success: false
                        });
                    })
                const Task_ = await Task.find();
                if (userDetail.type_ === 'admin') {
                    res.status(200).json({
                        message: "task deleted successfully",
                        data: Task_,
                        success: true
                    });
                } else {
                    res.status(400).json({
                        message: "Permission denied",
                        success: false
                    });
                }

                // res.status(200).json({
                //     message: "deleted successfully",
                //     success: true
                // });
            })
            .catch(err => {
                console.error(err);
                res.status(400).json({
                    message: err,
                    success: false
                });
            });
    } catch (e) {
        res.status(400).json({
            message: err,
            success: false
        });
    }
}



exports.getAllTask = async (req, res, next) => {
    const userId = req.id
    try {
        const userDetail = await team.findOne({ _id: userId })

        const Task_ = await Task.find();

        if (userDetail.type_ === 'admin') {
            res.status(200).json({
                data: Task_,
                success: true
            });
        } else {
            let filteredTask = [];
            for (let i = 0; i < Task_.length; i++) {
                const Contents_ = await Contents.findOne({ TaskId: Task_[i].id })
                if (Contents_) {
                    // filteredTask.push(Contents_)
                    if (Contents_.scriptAssignedTo === userDetail.email || Contents_.voiceOverAggignedTo === userDetail.email || Contents_.VideoAssignedTo === userDetail.email || Contents_.thumbnailAssignedTo === userDetail.email) {
                        filteredTask.push(Task_[i])
                    }
                }
            }
            // console.log("Filtered Task :", filteredTask)
            res.status(200).json({
                data: filteredTask,
                success: true
            });
        }

        // Task.find()
        //     .then(async tasks => {
        //         if (userDetail.type_ === 'admin') {
        //             res.status(200).json({
        //                 data: tasks,
        //                 success: true
        //             });
        //             return
        //         } else {
        //             for (let i = 0; i < tasks.length; i++) {
        //                 const Contents_ = await Contents.findOne({ TaskId: tasks[i].id })
        //                 if (Contents_) {
        //                     if (Contents_.scriptAssignedTo === userDetail.email || Contents_.voiceOverAggignedTo === userDetail.email || Contents_.VideoAssignedTo === userDetail.email || Contents_.thumbnailAssignedTo === userDetail.email) {
        //                         filteredTask.push(Contents_)
        //                     }
        //                 }
        //             }
        //             res.status(200).json({
        //                 data: filteredTask,
        //                 success: true
        //             });
        //             return
        //         }
        //     })
        //     .catch(err => {
        //         console.error(err);
        //         res.status(400).json({
        //             data: err,
        //             success: false
        //         });
        //     });
    } catch (err) {
        res.status(400).json({
            message: err,
            success: false
        });
    }
}

exports.getContentbyId = (req, res, next) => {
    try {
        const taskId = req.body.videoId;

        Contents.findOne({ TaskId: taskId })
            .then((obj) => {
                if (obj) {
                    res.status(200).json({
                        data: obj,
                        success: true
                    });
                } else {
                    res.status(200).json({
                        data: null,
                        success: true
                    });
                }
            })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: err,
            success: false
        });
    }
}

exports.updateContent = (req, res, next) => {
    try {
        const taskId = req.body.videoId;
        const scriptAssignedTo = req.body.scriptAssignedTo;
        const voiceOverAggignedTo = req.body.voiceOverAggignedTo;
        const VideoAssignedTo = req.body.VideoAssignedTo;
        const thumbnailAssignedTo = req.body.thumbnailAssignedTo;
        const scriptAssignedName = req.body.scriptAssignedName;
        const voiceOverAggignedName = req.body.voiceOverAggignedName;
        const VideoAssignedName = req.body.VideoAssignedName;
        const thumbnailAssignedName = req.body.thumbnailAssignedName;

        const payload = req.body.payload

        // console.log("Payload :", payload);
        // sendEmail(
        //     'support@grogrip.com',
        //     scriptAssignedTo,
        //     'Task Assigned',
        //     'A new Task has been assigned to you'
        // );

        Contents.findOne({ TaskId: taskId })
            .then((obj) => {
                if (obj) {
                    Contents.findOneAndUpdate(
                        { TaskId: taskId }, // find document with this TaskId
                        { $set: payload }, // update scriptAssigned field to 'newScript'
                        { new: true } // return the updated document
                    )
                        .then((updatedTask) => {
                            // console.log(updatedTask);
                            res.status(200).json({
                                message: "Contents updated succesfully",
                                success: true
                            });
                            return
                        })
                        .catch((err) => {
                            console.error(err);
                            res.status(400).json({
                                message: err,
                                success: false
                            });
                            return
                        });
                } else {
                    const newTask = new Contents({
                        TaskId: taskId,
                        scriptAssignedTo: scriptAssignedTo,
                        voiceOverAggignedTo: voiceOverAggignedTo,
                        VideoAssignedTo: VideoAssignedTo,
                        thumbnailAssignedTo: thumbnailAssignedTo,
                        scriptAssignedName: scriptAssignedName,
                        voiceOverAggignedName: voiceOverAggignedName,
                        VideoAssignedName: VideoAssignedName,
                        thumbnailAssignedName: thumbnailAssignedName
                    });

                    newTask.save((err, task) => {
                        if (err) {
                            res.status(400).json({
                                message: err,
                                success: false
                            });
                            return
                        } else {
                            res.status(200).json({
                                message: "contents added succesfully",
                                success: true
                            });
                            return
                        }
                    });
                }
            })
            .catch((err) => {
                res.status(400).json({
                    message: err,
                    success: false
                });
            });

    } catch (err) {
        res.status(400).json({
            message: err,
            success: false
        });
    }
}

exports.AssignTask = (req, res, next) => {
    try {
        const { taskId, type, assignedTo, assignedName, cancel } = req.body

        let payload
        let subject
        let message

        if (cancel) {
            if (type === "script") {
                payload = {
                    scriptAssignedTo: "",
                    scriptAssignedName: "",
                }
                // subject = "New Task Assigned"
                // message = `Hello ${assignedName} a new Script has been assigned to you please visit Tanmay's workspace to see `
            }
            if (type === "voice") {
                payload = {
                    voiceOverAggignedTo: "",
                    voiceOverAggignedName: "",
                }
                // subject = "New Task Assigned"
                // message = `Hello ${assignedName} a new VoiceOver has been assigned to you please visit Tanmay's workspace to see `
            }
            if (type === "video") {
                payload = {
                    VideoAssignedTo: "",
                    VideoAssignedName: "",
                }
                // subject = "New Task Assigned"
                // message = `Hello ${assignedName} a new Video has been assigned to you please visit Tanmay's workspace to see `
            }
            if (type === "thumbnail") {
                payload = {
                    thumbnailAssignedTo: "",
                    thumbnailAssignedName: "",
                }
                // subject = "New Task Assigned"
                // message = `Hello ${assignedName} a new Thumbnail has been assigned to you please visit Tanmay's workspace to see `
            }
        } else {
            if (type === "script") {
                payload = {
                    scriptAssignedTo: assignedTo,
                    scriptAssignedName: assignedName,
                }
                subject = "New Task Assigned"
                message = `Hello ${assignedName} a new Script has been assigned to you please visit Tanmay's workspace to see `
            }
            if (type === "voice") {
                payload = {
                    voiceOverAggignedTo: assignedTo,
                    voiceOverAggignedName: assignedName,
                }
                subject = "New Task Assigned"
                message = `Hello ${assignedName} a new VoiceOver has been assigned to you please visit Tanmay's workspace to see `
            }
            if (type === "video") {
                payload = {
                    VideoAssignedTo: assignedTo,
                    VideoAssignedName: assignedName,
                }
                subject = "New Task Assigned"
                message = `Hello ${assignedName} a new Video has been assigned to you please visit Tanmay's workspace to see `
            }
            if (type === "thumbnail") {
                payload = {
                    thumbnailAssignedTo: assignedTo,
                    thumbnailAssignedName: assignedName,
                }
                subject = "New Task Assigned"
                message = `Hello ${assignedName} a new Thumbnail has been assigned to you please visit Tanmay's workspace to see `
            }
        }

        Contents.findOneAndUpdate(
            { TaskId: taskId }, // find document with this TaskId
            { $set: payload }, // update scriptAssigned field to 'newScript'
            { new: true } // return the updated document
        )
            .then((updatedTask) => {
                // console.log(updatedTask);
                if (!cancel) {
                    sendEmail(
                        'support@grogrip.com',
                        assignedTo,
                        subject,
                        message
                    );
                }
                res.status(200).json({
                    message: "Contents updated succesfully",
                    data: updatedTask,
                    success: true
                });
                return
            })
            .catch((err) => {
                console.error(err);
                res.status(400).json({
                    message: err,
                    success: false
                });
                return
            });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            message: err,
            success: false
        });
        return
    }
}

exports.UploadFile = async (req, res, next) => {
    try {
        const { taskId, type, url, remove } = req.body
        const user = req.id

        const updatedBy = await team.findById(user)
        const admins = await team.find({ type_: "admin" })

        let payload
        if (remove) {
            if (type === "script") {
                payload = {
                    scriptUrl: "",
                }
            }
            if (type === "voice") {
                payload = {
                    voiceOverUrl: "",
                }
            }
            if (type === "video") {
                payload = {
                    videoUrl: "",
                }
            }
            if (type === "thumbnail") {
                payload = {
                    ThumbnailUrl: "",
                }
            }
        } else {
            if (type === "script") {
                payload = {
                    scriptUrl: url,
                }
            }
            if (type === "voice") {
                payload = {
                    voiceOverUrl: url,
                }
            }
            if (type === "video") {
                payload = {
                    videoUrl: url,
                }
            }
            if (type === "thumbnail") {
                payload = {
                    ThumbnailUrl: url,
                }
            }
        }


        Contents.findOneAndUpdate(
            { TaskId: taskId }, // find document with this TaskId
            { $set: payload }, // update scriptAssigned field to 'newScript'
            { new: true } // return the updated document
        )
            .then((updatedTask) => {
                // console.log(updatedTask);
                if (!remove) {
                    admins.forEach((x) => {
                        sendEmail(
                            'support@grogrip.com',
                            x.email,
                            "Task Update",
                            `A new File uploaded by ${updatedBy.name} Visit Tanmay's workspace to see more details.`
                        );
                    })
                }
                res.status(200).json({
                    message: "Contents updated succesfully",
                    data: updatedTask,
                    success: true
                });
                return
            })
            .catch((err) => {
                console.error(err);
                res.status(400).json({
                    message: err,
                    success: false
                });
                return
            });

    } catch (err) {
        res.status(400).json({
            message: err,
            success: false
        });
        return
    }
}

