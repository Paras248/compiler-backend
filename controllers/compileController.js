const fs = require('fs');
const getInfo = require('../utils/getInfo');
const compileCode = require('../utils/compileCode');
const executeCode = require('../utils/executeCode');
const createFile = require('../utils/createFile');

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
    if (!['c', 'java', 'cpp', 'python'].includes(language)) {
        return res.status(400).json({
            success: false,
            message: 'Please select an appropriate language',
        });
    }

    const {
        filePath,
        outputPath,
        compileCommand,
        executeCommand,
        executeArgs,
        compileArgs,
    } = getInfo(language);

    await createFile(filePath, code);

    try {
        compileCommand && (await compileCode(compileCommand, compileArgs));
        const { output, error, requiredTime } = await executeCode(
            executeCommand,
            executeArgs,
            input
        );

        fs.unlink(filePath, () => {});
        outputPath && fs.unlink(outputPath, () => {});
        res.status(200).json({
            success: true,
            requiredTime,
            output,
            error,
        });
    } catch (err) {
        fs.unlink(filePath, () => {});
        let error = err.toString();
        while (error.includes(filePath)) {
            error = error.replace(`${filePath}:`, '');
        }
        return res.status(400).json({
            success: false,
            message: error,
        });
    }
};

module.exports = compile;
