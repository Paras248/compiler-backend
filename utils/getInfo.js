const { v4: uuid } = require('uuid');

const getInfo = (language) => {
    const fileId = uuid();
    const procCwd = process.cwd();
    const codeDir = `${procCwd}/codes`;
    const outputDir = `${procCwd}/outputs`;
    let filePath,
        outputPath,
        compileCommand,
        executeCommand,
        executeArgs,
        compileArgs;
    switch (language) {
        case 'cpp': {
            filePath = `${codeDir}/${fileId}.cpp`;
            outputPath = `${outputDir}/${fileId}.out`;
            compileCommand = `g++`;
            compileArgs = [filePath, '-o', outputPath];
            executeCommand = outputPath;
            break;
        }
        case 'java': {
            filePath = `${codeDir}/${fileId}.java`;
            executeCommand = `java`;
            executeArgs = [filePath];
            break;
        }
        case 'python': {
            filePath = `${codeDir}/${fileId}.py`;
            executeCommand = `python3`;
            executeArgs = [filePath];
            break;
        }
        case 'c': {
            filePath = `${codeDir}/${fileId}.c`;
            outputPath = `${outputDir}/${fileId}.out`;
            compileCommand = `gcc`;
            compileArgs = [filePath, '-o', outputPath];
            executeCommand = outputPath;
            break;
        }
    }
    return {
        filePath,
        outputPath,
        compileCommand,
        executeCommand,
        executeArgs,
        compileArgs,
    };
};

module.exports = getInfo;
