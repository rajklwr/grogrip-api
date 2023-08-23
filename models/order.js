const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    cart: {
        type: Object,
        required: true,
    },
    orderValue: {
        type: Number,
        required: true,
    },
    paymentDetails : {
        type: Object,
        required: false, 
    },
    email : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Order', orderSchema);