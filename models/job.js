const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    fileId: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
        enum: ['cpp', 'java', 'python', 'c'],
    },
    hasInputFile: {
        type: Boolean,
        default: false,
    },
    filePath: {
        type: String,
        required: true,
    },
    inputPath: {
        type: String,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
    startedAt: {
        type: Date,
    },
    completedAt: {
        type: Date,
    },
    output: {
        type: String,
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'success', 'error'],
    },
});

const Job = new mongoose.model('job', jobSchema);

module.exports = Job;
