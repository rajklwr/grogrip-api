const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    _type: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    title: {
        type: String,
        required: false,
        default: ""
    },
    startingDate: {
        type: Date,
        required: false,
        default: Date.now
    },
    channelName: {
        type: String,
        required: false,
        default: ""
    },
    scriptStatus: {
        type: Number,
        required: true,
        default: 0
    },
    voiceOverStatus: {
        type: Number,
        required: true,
        default: 0
    },
    videoStatus: {
        type: Number,
        required: true,
        default: 0
    },
    thumbNailStatus: {
        type: Number,
        required: true,
        default: 0
    },
    uploaded: {
        type: Boolean,
        required: true,
        default: false
    },
    scriptPaid: {
        type: Boolean,
        default: null,
    },
    voiceOverPaid: {
        type: Boolean,
        default: null,
    },
    thumbnailPaid: {
        type: Boolean,
        default: null,
    },
    clientPaid: {
        type: Boolean,
        default: null,
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

const Task = mongoose.model('TaskV1', taskSchema);

module.exports = Task;
