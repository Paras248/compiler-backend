const { spawn } = require('child_process');

const compileCode = (compileCommand, compileArgs) => {
    return new Promise((resolve, reject) => {
        const compileProc = spawn(compileCommand, compileArgs);
        compileProc.stderr.on('data', (err) => {
            reject(err.toString());
        });
        compileProc.on('exit', () => resolve());
    });
};

module.exports = compileCode;
