const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: false,
        default: "",
    },
    registeredEmail: {
        type: String,
        required: false,
        default: ""
    },
}); 

module.exports = mongoose.model('Contact-Form', contactSchema);