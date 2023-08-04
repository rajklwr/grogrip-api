const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    clientType: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Client', ClientSchema);