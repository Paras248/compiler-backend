const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputDir = path.join(__dirname, '../outputs');

const executeCWithoutInputs = (fileId, filePath) => {
    const outPath = path.join(outputDir, `${fileId}.out`);
    let cmd = `gcc ${filePath} -o ${outPath}`;
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                reject(stderr);
            } else {
                cmd = `cd ${outputDir} && ./${fileId}.out`;
                const proc = exec(cmd, (error, stdout, stderr) => {
                    stdout && resolve(stdout);
                    error && reject(stderr);
                    stderr && reject(stderr);
                });
                setTimeout(() => {
                    proc.kill(1);
                    reject(
                        'Your program is paused! It can be paused if it expects input and input not provided program may contain a infinite loop or due to some unexpected behaviour'
                    );
                }, 10 * 1000);
            }
        });
    });
};

const executeCWithInputs = (fileId, filePath, inputPath) => {
    const outPath = path.join(outputDir, `${fileId}.out`);
    let cmd = `gcc ${filePath} -o ${outPath}`;
    return new Promise((resolve, reject) => {
        let proc;
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                reject(stderr);
            } else {
                cmd = `cd ${outputDir} && ./${fileId}.out < ${inputPath}`;
                proc = exec(cmd, (error, stdout, stderr) => {
                    error && reject(stderr);
                    stderr && reject(stderr);
                    stdout && resolve(stdout);
                });
                setTimeout(() => {
                    proc.kill(1);
                    reject(
                        'Your program is paused! It can be paused if it expects input and input not provided program may contain a infinite loop or due to some unexpected behaviour'
                    );
                }, 10 * 1000);
            }
        });
    });
};

module.exports = {
    executeCWithoutInputs,
    executeCWithInputs,
};
