//import jwt_decode from "jwt-decode";

const decode = require("jwt-decode");

const User = require("../models/user");
const Team = require("../models/team");
const twilio = require("twilio"); //for whatsapp message
const axios = require("axios");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { google } = require("googleapis");

require("dotenv").config();

const { OAuth2Client } = require("google-auth-library");

// const { google } = require('googleapis');

const accountSid = "ACa8151b1bf11f84aea893b2f4a82e278c"; // Your Account SID from www.twilio.com/console  Test
const authToken = "0556640b2cbcddba3b7eff4073dc5865"; // Your Auth Token from www.twilio.com/console  Test


async function getEmailFromGoogleCredentials(clientId, credentials) {
    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({
        idToken: credentials,
        audience: clientId,
    });
    const payload = ticket.getPayload();
    const email = payload.email;
    return email;
}

function generateToken(payload, secret) {
    try {
        const token = jwt.sign(payload, secret);
        return token;
    } catch (error) {
        throw new Error('Failed to generate JWT token');
    }
}

exports.SentOtp = (req, res, next) => {
    // const sdk = require('api')('@gupshup/v1.0#3wb1b43l4wp80pp');

    // sdk.sendmessageGET()
    //     .then(({ data }) => console.log(data))
    //     .catch(err => console.error(err));

    // api
    //     .get(
    //         `http://media.smsgupshup.com/GatewayAPI/rest?method=OPT_IN&format=json&userid=2000213470&password=BtmxTFXyv&phone_number=91${'8413802010'}&v=1.1&auth_scheme=plain&channel=WHATSAPP`,
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         },
    //     )
    //     .subscribe();
    // api
    //     .get(
    //         `http://media.smsgupshup.com/GatewayAPI/rest?userid=2000213470&password=BtmxTFXyv&send_to=91${'8413802010'}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Welcome%20to%20Beyobo%20App.%20Your%20one%20time%20password%20is%20${'123456'}`,
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         },
    //     )
    //     .subscribe();
    // api
    //     .get(
    //         `http://enterprise.smsgupshup.com/GatewayAPI/rest?method=SendMessage&send_to=91${'8413802010'}&msg=Dear%20customer%2C%20Your%20OTP%20verification%20code%20for%20Sign-up%20on%20BEYOBO%20is%20${'123456'}.%20%20Please%20do%20not%20share%20this%20OTP%20with%20anyone%20to%20ensure%20account%20security.%20%0ATeam%20BEYOBO&msg_type=TEXT&userid=2000214026&auth_scheme=plain&password=vBBDIKPtl&v=1.1&format=text`,
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         },
    //     )
    //     .subscribe();

    try {
        const mobile = req.body.phone;
        const message = "welcome%to%GroGrip%your%otp%for%verification%is%12345";

        const url = `http://media.smsgupshup.com/GatewayAPI/rest?userid=${process.env.gupshup_id}&password=${process.env.gupshup_password}&send_to=+${mobile}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=${message}`;

        axios({
            method: "get",
            url,
        })
            .then(function (response) {
                res.status(200).json({
                    message: "OTP sent",
                    success: true,
                });
            })
            .catch(function (error) {
                console.log(error);
                res.status(404).json({
                    message: "some error ocurred",
                    success: true,
                });
            });
    } catch (error) {
        res.status(404).json({
            message: "some error ocurred",
            success: true,
        });
    }

    // return;
    // console.log("ok mf")
    // const number = req.body.phoneNumber

    // const client = new twilio(accountSid, authToken);
    // client.messages
    //     .create({
    //         from: 'whatsapp:+14155238886',
    //         body: 'Hello Tanmay, Grogrip wishing you Happy Birthday',
    //         to: `whatsapp:${number}`
    //     })
    //     .then((message) => {
    //         console.log(message)
    //         res.status(200).json({
    //             message: "Login successfull",
    //             success: true
    //         });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         res.status(200).json({
    //             message: err,
    //             success: false
    //         });
    //     });
};

exports.verifyOtp = async (req, res, next) => {
    const number = req.body.number;
    const otp = req.body.otp;

    if (number.length !== 12 || otp.length !== 6) {
        res.status(404).json({
            message: "Validation error",
            success: false,
        });
        return;
    }

    res.status(200).json({
        message: "Login successfull",
        success: true,
    });
};

exports.signIn = async (req, res, next) => {
    const {name, email, number, type, isAdmin, fbId, googleId  } = req.body
    // console.log("body :", req.body);

    try {
        const client = new OAuth2Client(process.env.google_ClientId);
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: googleId,
                audience: process.env.google_ClientId,
            });
            const payload = ticket.getPayload();
            const userid = payload["sub"];

            User.find({ email: email }, function (err, docs) {
                if (docs.length) {
                    console.log("exist");
                    res.status(200).json({
                        message: "Login successfull",
                        success: true,
                    });
                } else {
                    const user = new User();
                    user.name = name;
                    user.email = email;
                    user.number = number;
                    user.type = type;
                    user.isAdmin = isAdmin;
                    user.fbId = fbId;
                    user.googleId = googleId;
                    user.save();
                    console.log("user added successfully")
                    res.status(200).json({
                        message: "user added successfully",
                        success: true,
                    });
                }
            });
        }
        verify().catch(console.error);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: err,
            success: false,
        });
    }
};

exports.LoginEmployee = async (req, res, next) => {
    try {
        const clientId = req.body.clientId;
        const credential = req.body.credential;

        const email = await getEmailFromGoogleCredentials(clientId, credential);

        if (email) {
            Team.findOne({ email: email })
                .then((result) => {
                    if (result) {
                        const payload = { empId: result.id, email: result.email };
                        const secret = process.env.JWT_SECRET;

                        const token = generateToken(payload, secret);

                        res.status(200).json({ success: true, token: token, user: result });
                    } else {
                        res.status(400).json({
                            success: false,
                            message: "Email not Registered",
                        });
                    }
                })
                .catch((err) => {
                    res.status(400).json({
                        success: false,
                        message: err,
                    });
                });
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid email",
            });
        }
    } catch (err) {
        console.log("errrrrrrrrrrrr :", err);
        res.status(400).json({
            success: false,
            message: err,
        });
    }
};

exports.AddEmployee = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const type = req.body.type;
        const isAdmin = req.body.isAdmin;
        const name = req.body.name;

        const newTeam = new Team({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            password: password,
            type_: type,
            isAdmin: isAdmin,
            name: name,
            createdOn: new Date(),
            updatedOn: new Date(),
        });
        newTeam
            .save()
            .then((result) => {
                res.status(200).json({
                    message: "User created successfully",
                    success: true,
                });
            })
            .catch((err) => {
                console.error("Error in creating user", err);
                res.status(400).json({
                    message: "GGG",
                    success: false,
                });
            });
    } catch (err) {
        res.status(400).json({
            message: "PPP",
            success: false,
        });
        console.log("Error :", err);
    }
};

exports.getAllTeam = async (req, res, next) => {
    Team.find()
        .then((teams) => {
            let data = [];
            teams.forEach((x) => {
                let obj = {
                    id: x._id,
                    email: x.email,
                    type: x.type_,
                    name: x.name,
                    isAdmin: x.isAdmin,
                };
                data.push(obj);
            });
            res.status(200).json({
                data: data,
                success: true,
            });
            // console.log("success");
        })
        .catch((err) => {
            res.status(400).json(err);
            console.log(err);
        });
};

// exports.WorkspaceLogin = async (req, res, next) => {
//     try {
//         const email = req.query.email;
//         const key = req.query.key;

//         // const ticket = await client.verifyIdToken({
//         //     idToken: googleId,
//         //     audience: process.env.google_ClientId
//         // });
//         // const payload = ticket.getPayload();
//         // console.log("Payload :", payload);

//         Team.findOne({ email: email })
//             .then(team => {
//                 console.log("Team :", team)
//                 if (team) {

//                     const payload = {
//                         userId: team.id,
//                         username: 'john_doe',
//                     };
//                     console.log("Payload :", payload)

//                     const secretKey = process.env.JWT_SECRET;

//                     const options = {
//                         expiresIn: '1h', // Token expiration time
//                     };

//                     const token = jwt.sign(payload, secretKey, options);

//                     res.status(200).json({
//                         message: "Authentication successfull..............",
//                         token: token,
//                         // userType: team.type_
//                     })
//                 } else {
//                     res.status(200).json({
//                         message: "Invalid User !!!!!!!!!!"
//                     })
//                 }
//             })
//     } catch (err) {
//         console.log(err)
//         res.status(400).json({
//             message: "Some error occured !!!!!!!!"
//         })
//     }
// }
