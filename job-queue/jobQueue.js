const Queue = require('bull');
const Job = require('../models/job');
const { executeCppWithoutInputs } = require('../utils/executeCpp');
const jobQueue = new Queue('job-queue');

const NUM_WORKERS = 5;

jobQueue.process(NUM_WORKERS, async ({ data }) => {
    const { id: jobId } = data;
    const job = await Job.findById(jobId);
    if (!job) {
        throw new Error('Job not found');
    }
    try {
        job.startedAt = new Date();
        if (job.language === 'cpp') {
            job.output = await executeCppWithoutInputs(
                job.fileId,
                job.filePath
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

jobQueue.on('failed', (error) => {
    console.log(error.data.id, 'failed', error.failedReason);
});

const addToJobQueue = async (jobId) => {
    await jobQueue.add({ id: jobId });
};

module.exports = {
    addToJobQueue,
};
