const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TeamSchema = new Schema({

    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        //default: "",
    },
    password: {
        type: String,
        required: true,
        // default: "",
    },
    type_: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Team', TeamSchema);