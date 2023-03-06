const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const executeJavaWithInputs = (filePath, className, inputPath) => {};

const executeJavaWithoutInputs = (filePath, className) => {
    return new Promise((resolve, reject) => {
        let cmd = `javac ${filePath}`;
        exec(cmd, (error, stdout, stderr) => {
            error && reject({ error, stderr });
            stderr && reject(stderr);
            cmd = `cd ${path.dirname(filePath)} && java ${className}`;
            const proc = exec(cmd, (error, stdout, stderr) => {
                error && reject({ error, stderr });
                stderr && reject(stderr);
                stdout && resolve(stdout);
            });
            setTimeout(() => {
                proc.kill(1);
                reject(
                    'Your program is paused! It can be paused if it expects input and input not provided program may contain a infinite loop or due to some unexpected behaviour'
                );
            }, 30 * 1000);
        });
    });
};

module.exports = {
    executeJavaWithInputs,
    executeJavaWithoutInputs,
};
