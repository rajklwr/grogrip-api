const Lead = require('../models/leads');
const mongoose = require("mongoose");

exports.leadsData = async (req, res, next) => {
    const { name, email, phone, countryCode } = req.body
    try {
        const lead = new Lead({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            name: name,
            phone: phone,
            countryCode : countryCode
        });

        lead
            .save()
            .then((result) => {
                if (result){
                    console.log("Result :", result)
                    res.status(200).json({
                        message: "Lead generated successfully",
                        success: true
                    });
                }
            })
            .catch((err) => {
                console.error("Error in creating Lead", err);
                res.status(400).json({ err: err });
            })

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error });
    }
};