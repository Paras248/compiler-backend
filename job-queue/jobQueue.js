const Queue = require('bull');
const Job = require('../models/job');
const {
    executeCppWithoutInputs,
    executeCppWithInputs,
} = require('../utils/executeCpp');
const {
    executePythonWithInputs,
    executePythonWithoutInputs,
} = require('../utils/executePython');

const jobQueue = new Queue('job-queue');

const NUM_WORKERS = 5;

jobQueue.process(NUM_WORKERS, async ({ data }) => {
    const { id: jobId } = data;
    const job = await Job.findById(jobId);
    if (!job) {
        throw new Error('Job not found');
    }
    try {
        if (job.language === 'cpp' && !job.hasInputFile) {
            job.startedAt = new Date();
            job.output = await executeCppWithoutInputs(
                job.fileId,
                job.filePath
            );
            job.completedAt = new Date();
            job.status = 'success';
            await job.save();
        } else if (job.language === 'cpp' && job.hasInputFile) {
            job.startedAt = new Date();
            job.output = await executeCppWithInputs(
                job.fileId,
                job.filePath,
                job.inputPath
            );
            job.completedAt = new Date();
            job.status = 'success';
            await job.save();
        } else if (job.language === 'python' && !job.hasInputFile) {
            job.startedAt = new Date();
            job.output = await executePythonWithoutInputs(job.filePath);
            job.completedAt = new Date();
            job.status = 'success';
            await job.save();
        } else if (job.language === 'python' && job.hasInputFile) {
            job.startedAt = new Date();
            job.output = await executePythonWithInputs(
                job.filePath,
                job.inputPath
            );
            job.completedAt = new Date();
            job.status = 'success';
            await job.save();
        }
    } catch (err) {
        job.startedAt = new Date();
        job.output = JSON.stringify(err);
        job.status = 'error';
        await job.save();
    }
});

const addToJobQueue = async (jobId) => {
    await jobQueue.add({ id: jobId });
};

jobQueue.on('failed', (error) => {
    console.log(error.data.id, 'failed', error.failedReason);
});

module.exports = {
    addToJobQueue,
};
