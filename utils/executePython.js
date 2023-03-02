const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const executePythonWithoutInputs = (filePath) => {
    return new Promise((resolve, reject) => {
        let cmd = `python3 ${filePath}`;
        exec(cmd, (error, stdout, stderr) => {
            error && reject({ error, stderr });
            stderr && reject(stderr);
            stdout && resolve(stdout);
        });
    });
};

const executePythonWithInputs = (filePath, inputPath) => {
    return new Promise((resolve, reject) => {
        let cmd = `python3 ${filePath} < ${inputPath}`;
        exec(cmd, (error, stdout, stderr) => {
            error && reject({ error, stderr });
            stderr && reject(stderr);
            stdout && resolve(stdout);
        });
    });
};

module.exports = {
    executePythonWithoutInputs,
    executePythonWithInputs,
};
