const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    Product: {
        type: Object,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: false,
        default: 55
    },
    id: {
        type: Number,
        required: true,
    },
    voice: {
        type: Object,
        required: false,
        default: null
    },
    topic: {
        type: String,
        required: false,
        default: ""
    },
    referral: {
        type: String,
        required: false,
        default: ""
    },
    Contact: {
        type: String,
        required: false,
        default: ""
    },
    doc: {
        type: String,
        required: false,
        default: ""
    },
    email: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('Cart', cartSchema);