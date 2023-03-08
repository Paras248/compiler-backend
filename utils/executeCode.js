const { spawn } = require('child_process');

const executeCode = (executeCommand, executeArgs, input) => {
    return new Promise((resolve, reject) => {
        let error = '',
            output = '';
        let startedAt;
        const execProc = spawn(executeCommand, executeArgs || []);
        execProc.on('spawn', () => {
            startedAt = new Date();
        });
        const timer = setTimeout(() => {
            execProc.kill(1);
            resolve({
                error: 'Your program is paused! It can be paused if it expects input and input not provided program may contain a infinite loop or due to some unexpected behaviour',
            });
        }, 30000);

        if (input) {
            input.split('\n').forEach((line) => {
                execProc.stdin.write(`${line}\n`);
            });
            execProc.stdin.end();
        }

        execProc.stdin.on('error', (err) => {});

        execProc.stdout.on('data', (data) => {
            output += data.toString();
        });

        execProc.stderr.on('data', (data) => {
            error += data.toString();
        });

        execProc.on('exit', (err) => {
            const completedAt = new Date();
            clearTimeout(timer);
            resolve({
                requiredTime: new Date(completedAt - startedAt).getTime(),
                output,
                error,
            });
        });
    });
};

module.exports = executeCode;
