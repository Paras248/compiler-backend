const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputDir = path.join(__dirname, '../outputs');

const executeCWithoutInputs = (fileId, filePath) => {
    const outPath = path.join(outputDir, `${fileId}.out`);
    let cmd = `gcc ${filePath} -o ${outPath}`;
    return new Promise((resolve, reject) => {
        let proc;
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                reject({ error, stderr });
            } else {
                cmd = `cd ${outputDir} && ./${fileId}.out`;
                proc = exec(cmd, (error, stdout, stderr) => {
                    error && reject({ error, stderr });
                    stderr && reject(stderr);
                    stdout && resolve(stdout);
                });
            }
            setTimeout(() => {
                proc.kill(1);
                reject(
                    'Your program is paused! make sure you have provided input in case of taking input or the program is paused because of unexpected behaviour'
                );
            }, 30 * 1000);
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
                reject({ error, stderr });
            } else {
                cmd = `cd ${outputDir} && ./${fileId}.out < ${inputPath}`;
                proc = exec(cmd, (error, stdout, stderr) => {
                    error && reject({ error, stderr });
                    stderr && reject(stderr);
                    stdout && resolve(stdout);
                });
            }
        });
        setTimeout(() => {
            proc.kill();
            reject(
                'Your program is paused! make sure you have provided input in case of taking input or the program is paused because of unexpected behaviour'
            );
        }, 30 * 1000);
    });
};

module.exports = {
    executeCWithoutInputs,
    executeCWithInputs,
};
