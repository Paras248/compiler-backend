const { exec } = require('child_process');

const executeCode = (executeCommand, input) => {
    return new Promise((resolve, reject) => {
        const execProc = exec(executeCommand, (error, stdout, stderr) => {
            stdout && resolve(stdout);
            error && reject(error);
            stderr && reject(stderr);
        });
        const timer = setTimeout(() => {
            execProc.kill(1);
            resolve(
                'Your program is paused! It can be paused if it expects input and input not provided program may contain a infinite loop or due to some unexpected behaviour'
            );
        }, 10000);

        if (input) {
            input.split('\n').forEach((line) => {
                execProc.stdin.write(`${line}\n`);
            });
            execProc.stdin.end();
        }
    });
};

module.exports = executeCode;
