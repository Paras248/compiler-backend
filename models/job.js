const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true,
        enum: ['cpp', 'java', 'python', 'c'],
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
