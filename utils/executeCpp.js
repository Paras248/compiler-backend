const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputDir = path.join(__dirname, '../outputs');

const executeCppWithoutInputs = (fileId, filePath) => {
    const outPath = path.join(outputDir, `${fileId}.out`);
    let cmd = `g++ ${filePath} -o ${outPath}`;
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.log(error);
                reject({ error, stderr });
            } else {
                cmd = `cd ${outputDir} && ./${fileId}.out`;
                exec(cmd, (error, stdout, stderr) => {
                    error && reject({ error, stderr });
                    stderr && reject(stderr);
                    stdout && resolve(stdout);
                });
            }
        });
    });
};

const executeCppWithInputs = (fileId, filePath, inputPath) => {
    const outPath = path.join(outputDir, `${fileId}.out`);
    let cmd = `g++ ${filePath} -o ${outPath}`;
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.log(error);
                reject({ error, stderr });
            } else {
                cmd = `cd ${outputDir} && ./${fileId}.out < ${inputPath}`;
                exec(cmd, (error, stdout, stderr) => {
                    error && reject({ error, stderr });
                    stderr && reject(stderr);
                    stdout && resolve(stdout);
                });
            }
        });
    });
};

module.exports = {
    executeCppWithoutInputs,
    executeCppWithInputs,
};
