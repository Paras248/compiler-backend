const Job = require('../models/job');

const checkStatus = async (req, res, next) => {
    const jobId = req.body.id || req.query.id;
    if (!jobId) {
        return res.status(400).json({
            success: false,
            message: 'Job id is missing! pass id via query param or via body',
        });
    }
    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found',
            });
        }
        res.status(200).json({
            success: true,
            job,
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: JSON.stringify(err),
        });
    }
};

module.exports = checkStatus;
