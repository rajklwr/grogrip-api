// const Lead = require('../models/leads');
const Cart = require('../models/cart');
const mongoose = require("mongoose");

exports.getUserDetail = async (req, res, next) => {

    try {

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error });
    }
};

exports.getCart = async (req, res, next) => {
        const email = req.user;
    
        try {
            console.log("email:", email);

            const items = await Cart.find({ email: email });
    
            if(items.length > 0) {
                res.status(200).json({ message: 'Items fetched successfully', data: items });
            } else {
                res.status(404).json({ message: 'No items found for the provided email' });
            }
    
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
};

exports.AddToCart = async (req, res, next) => {
    const email = req.user;
    const {
        Product,
        quantity,
        id,
        voice,
        topic,
        referral,
        Contact,
        doc
    } = req.body;

    try {
        const criteria = {
            id: id,
            email: email
        };

        const updateData = {
            Product,
            quantity,
            voice,
            topic,
            referral,
            Contact,
            doc
        };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true }; 
        const updatedCart = await Cart.findOneAndUpdate(criteria, updateData, options);

        if(updatedCart) {
            res.status(200).json({ message: 'Cart updated successfully', data: updatedCart });
        } else {
            res.status(201).json({ message: 'Added to cart successfully', data: updatedCart });
        }

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};


exports.createOrder = async (req, res, next) => {

    try {

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error });
    }
};
exports.gerOrders = async (req, res, next) => {

    try {

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error });
    }
};

exports.SubmitContactForm = async (req, res, next) => {

    try {

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error });
    }
};

