const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputDir = path.join(__dirname, '../outputs');

const executeCppWithoutInputs = (fileId, filePath) => {
    const outPath = path.join(outputDir, `${fileId}.out`);
    let cmd = `g++ ${filePath} -o ${outPath}`;
    return new Promise((resolve, reject) => {
        let proc;
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                reject(stderr);
            } else {
                cmd = `cd ${outputDir} && ./${fileId}.out`;
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
                }, 20 * 1000);
            }
        });
    });
};

const executeCppWithInputs = (fileId, filePath, inputPath) => {
    const outPath = path.join(outputDir, `${fileId}.out`);
    let cmd = `g++ ${filePath} -o ${outPath}`;
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
                }, 20 * 1000);
            }
        });
    });
};

module.exports = {
    executeCppWithoutInputs,
    executeCppWithInputs,
};
