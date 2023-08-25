const Cart = require('../models/cart');
const Order = require('../models/order');
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
        price,
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
            price,
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


exports.removeFromCart = async (req, res, next) => {
    const email = req.user;
    const { id } = req.body; // Assuming you're sending the id in the request body to determine which item to remove

    try {
        // Find and remove the item based on the email and id
        const removedItem = await Cart.findOneAndDelete({ email: email, id: id });

        if(removedItem) {
            res.status(200).json({ message: 'Item removed from cart successfully', data: removedItem });
        } else {
            res.status(404).json({ message: 'Item not found in the cart' });
        }

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};



exports.createOrder = async (req, res, next) => {
        const email = req.user;
        const { cart, orderValue, paymentDetails} = req.body;
    
        try {
            // Ensure all required fields are provided
            if (!cart || !orderValue || !email) {
                return res.status(400).json({ message: "Required fields missing" });
            }
    
            // Create a new order
            const newOrder = new Order({
                cart,
                orderValue,
                paymentDetails,
                email
            });
    
            // Save the new order to the database
            const savedOrder = await newOrder.save();
    
            // Send a successful response with the saved order
            res.status(201).json({ message: "Order created successfully", order: savedOrder });
    
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
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

