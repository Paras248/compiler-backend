const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const outputDir = path.join(__dirname, '../outputs');

const executeCppWithoutInputs = (job) => {
    const { filePath, fileId } = job;

    let cmd = `cd ${outputDir} && g++ ${filePath} -o ${fileId}.out`;
    exec(cmd, (error, stdout, stderr) => {
        job.submi;
        if (error) {
            return JSON.stringify(stderr);
        } else {
            cmd = `cd ${outputDir} && ./${fileId}.out`;
            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    if (
                        error
                            .toString()
                            .includes('Error: stdout maxBuffer exceeded.')
                    ) {
                        return 'max buffer exceeded! program in infinite loop';
                    } else {
                        return JSON.stringify(stderr);
                    }
                } else {
                    return JSON.stringify(stdout);
                }
            });
        }
    });
};

module.exports = {
    executeCppWithoutInputs,
    executeCppWithInputs,
};
