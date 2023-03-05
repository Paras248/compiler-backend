const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const executePythonWithoutInputs = (filePath) => {
    return new Promise((resolve, reject) => {
        let cmd = `python3 ${filePath}`;
        const proc = exec(cmd, (error, stdout, stderr) => {
            error && reject({ error, stderr });
            stderr && reject(stderr);
            stdout && resolve(stdout);
        });
        setTimeout(() => {
            proc.kill(1);
            reject(
                'Your program is paused! make sure you have provided input in case of taking input or the program is paused because of unexpected behaviour'
            );
        }, 30 * 1000);
    });
};

const executePythonWithInputs = (filePath, inputPath) => {
    return new Promise((resolve, reject) => {
        let cmd = `python3 ${filePath} < ${inputPath}`;
        const proc = exec(cmd, (error, stdout, stderr) => {
            error && reject({ error, stderr });
            stderr && reject(stderr);
            stdout && resolve(stdout);
        });
        setTimeout(() => {
            proc.kill(1);
            reject(
                'Your program is paused! make sure you have provided input in case of taking input or the program is paused because of unexpected behaviour'
            );
        }, 30 * 1000);
    });
};

module.exports = {
    executePythonWithoutInputs,
    executePythonWithInputs,
};
