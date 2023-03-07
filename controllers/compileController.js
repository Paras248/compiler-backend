const fs = require('fs');
const getInfo = require('../utils/getInfo');
const compileCodeAndExecute = require('../utils/compileCodeAndExecute');
const executeCode = require('../utils/executeCode');
const { spawn } = require('child_process');

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

    const { filePath, outputPath, compileCommand, executeCommand } =
        getInfo(language);

    fs.writeFileSync(filePath, code);

    try {
        if (!compileCommand) {
            output = await executeCode(executeCommand, input);
            fs.unlink(filePath, () => {});
        } else {
            output = await compileCodeAndExecute(
                compileCommand,
                executeCommand,
                input
            );
            fs.unlink(filePath, (err) => {});
            fs.unlink(outputPath, (err) => {});
        }

        res.status(200).json({
            success: true,
            output,
        });
    } catch (err) {
        fs.unlink(filePath, (err) => {});
        outputPath && fs.unlink(outputPath, (err) => {});
        return res.status(400).json({
            success: false,
            message: err.toString(),
        });
    }
};

module.exports = compile;
