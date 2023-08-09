const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LeadSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: ""
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

module.exports = mongoose.model('Lead', LeadSchema);