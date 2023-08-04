const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SheetSchema = new Schema({
    data: {
        type: [[Object]],
       required: true,
        default: "",
    },
    type: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Sheet', SheetSchema);