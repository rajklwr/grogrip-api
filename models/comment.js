const mongoose = require('mongoose');

const comment = new mongoose.Schema({ 
    // _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        // default: Date.now
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        default: null
    },
    file: {
        type: String,
        required: false,
        default: null
    },
    createdAt: {
        type: Date,
        // required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        // required: true,
        default: Date.now
    },
    seenBy: {
        type: Number,
        required: true,
        default: 0
    },
    message: {
        type: String,
        required: false,
        default: null
    },
});

const Comment = mongoose.model('Comment', comment);

module.exports = Comment;
