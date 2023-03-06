const generateFile = require('../utils/generateFile');
const giveExtensionOfFile = require('../utils/giveExtensionOfFile');
const fs = require('fs');
const { v4: uuid } = require('uuid');
const {
    executeCppWithoutInputs,
    executeCppWithInputs,
} = require('../utils/executeCpp');
const {
    executePythonWithInputs,
    executePythonWithoutInputs,
} = require('../utils/executePython');
const {
    executeCWithoutInputs,
    executeCWithInputs,
} = require('../utils/executeC');
const {
    executeJavaWithoutInputs,
    executeJavaWithInputs,
} = require('../utils/executeJava');
const removeFiles = require('../utils/removeFiles');
const giveExtensionOfOutputs = require('../utils/giveExtensionOfOutputs');

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
    let inputPath;
    let filePath;
    let fileId;
    try {
        fileId = uuid();
        // note: for better performance make generateFile asynchronous afterwards.

        filePath = generateFile(fileId, code, ext, 'code');
        if (input) {
            inputPath = generateFile(fileId, input, 'txt', 'input');
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
            } else if (language === 'c') {
                startedAt = new Date();
                output = await executeCWithInputs(fileId, filePath, inputPath);
                completedAt = new Date();
            }
            if (language === 'java') {
                startedAt = new Date();
                startedAt = new Date();
                output = await executeJavaWithInputs(filePath, inputPath);
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
            } else if (language === 'c') {
                startedAt = new Date();
                output = await executeCWithoutInputs(fileId, filePath);
                completedAt = new Date();
            } else if (language === 'java') {
                startedAt = new Date();
                output = await executeJavaWithoutInputs(filePath);
                completedAt = new Date();
            }
        }

        removeFiles(
            filePath,
            inputPath,
            fileId,
            giveExtensionOfOutputs(language),
            true
        );

        const requiredTime = new Date(completedAt - startedAt).getTime();

        res.status(200).json({
            success: true,
            requiredTime,
            output,
        });
    } catch (err) {
        startedAt = new Date();
        output = JSON.stringify(err);
        removeFiles(
            filePath,
            inputPath,
            fileId,
            giveExtensionOfOutputs(language),
            false
        );
        return res.status(400).json({
            success: false,
            output,
        });
    }
};

module.exports = compile;
