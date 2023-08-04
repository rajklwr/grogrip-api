const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: false,
        default: "",
    },
    email: {
        type: String,
        required: false,
        default: "",
    },
    number: {
        type: String,
        required: false,
        default: ""
    },
    type: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false,
    },
    fbId: {
        type: String,
        required: false,
        default: ""
    },
    googleId: {
        type: String,
        required: false,
        default: ""
    }

}); 

module.exports = mongoose.model('User', userSchema);