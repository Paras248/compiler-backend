const generateFile = require('../utils/generateFile');
const giveExtensionOfFile = require('../utils/giveExtensionOfFile');
const { v4: uuid } = require('uuid');
const {
    executeCppWithoutInputs,
    executeCppWithInputs,
} = require('../utils/executeCpp');
const {
    executePythonWithInputs,
    executePythonWithoutInputs,
} = require('../utils/executePython');
const { executeCWithoutInputs } = require('../utils/executeC');

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
    let startedAt;
    let output;
    let completedAt;

    try {
        const fileId = uuid();
        // note: for better performance make generateFile asynchronous afterwards.
        const filePath = generateFile(fileId, code, ext, 'code');

        if (input) {
            const inputPath = generateFile(fileId, input, 'txt', 'input');
            if (language === 'cpp') {
                startedAt = new Date();
                output = await executeCppWithInputs(
                    fileId,
                    filePath,
                    inputPath
                );
                completedAt = new Date();
            } else if (language === 'python') {
                startedAt = new Date();
                output = await executePythonWithInputs(filePath, inputPath);
                completedAt = new Date();
            } else if (language === 'C') {
                startedAt = new Date();
                output = await executeCWithInputs(filePath);
                completedAt = new Date();
            }
        } else {
            if (language === 'cpp') {
                startedAt = new Date();
                output = await executeCppWithoutInputs(fileId, filePath);
                completedAt = new Date();
            } else if (language === 'python') {
                startedAt = new Date();
                output = await executePythonWithoutInputs(filePath);
                completedAt = new Date();
            } else if (language === 'C') {
                startedAt = new Date();
                output = await executeCWithoutInputs(filePath);
                completedAt = new Date();
            }
        }
        res.status(201).json({
            success: true,
            startedAt,
            completedAt,
            output,
        });
    } catch (err) {
        startedAt = new Date();
        output = JSON.stringify(err);
        return res.status(400).json({
            success: false,
            startedAt,
            output,
        });
    }
};

module.exports = compile;
