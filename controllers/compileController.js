const generateFile = require('../utils/generateFile');
const giveExtensionOfFile = require('../utils/giveExtensionOfFile');
const { v4: uuid } = require('uuid');
const Job = require('../models/job');

const compile = async (req, res, next) => {
    const { code, language, input } = req.body;
    if (!code) {
        return res.status(400).json({
            success: false,
            message: 'Please provide the code to compile',
        });
    }
    if (!language) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a language',
        });
    }
    const ext = giveExtensionOfFile(language);
    if (ext === undefined) {
        return res.status(400).json({
            success: false,
            message: 'Please select an appropriate language',
        });
    }

    try {
        const fileId = uuid();
        // note: for better performance make generateFile asynchronous afterwards.
        const filePath = generateFile(fileId, code, ext);
        let job;
        if (input) {
            const inputPath = generateFile(fileId, input, 'txt');
            job = await new Job({ language, filePath, inputPath }).save();
        } else {
            job = await new Job({ language, filePath }).save();
        }

        res.status(200).json({
            success: true,
            job,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
        });
    }
};

module.exports = compile;
