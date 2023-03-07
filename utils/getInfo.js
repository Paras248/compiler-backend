const { v4: uuid } = require('uuid');

const getInfo = (language) => {
    const fileId = uuid();
    const procCwd = process.cwd();
    const codeDir = `${procCwd}/codes`;
    const outputDir = `${procCwd}/outputs`;
    let filePath, outputPath, compileCommand, executeCommand;
    switch (language) {
        case 'cpp': {
            filePath = `${codeDir}/${fileId}.cpp`;
            outputPath = `${outputDir}/${fileId}.out`;
            compileCommand = `g++ ${filePath} -o ${outputPath}`;
            executeCommand = `cd ${outputDir} && ./${fileId}.out`;
            break;
        }
        case 'java': {
            filePath = `${codeDir}/${fileId}.java`;
            executeCommand = `cd ${codeDir} && java ${fileId}.java`;
            break;
        }
        case 'python': {
            filePath = `${codeDir}/${fileId}.py`;
            executeCommand = `python3 ${filePath}`;
            break;
        }
        case 'c': {
            filePath = `${codeDir}/${fileId}.c`;
            outputPath = `${outputDir}/${fileId}.out`;
            compileCommand = `gcc ${filePath} -o ${outputPath}`;
            executeCommand = `cd ${outputDir} && ./${fileId}.out`;
            break;
        }
    }
    return {
        fileId,
        filePath,
        outputPath,
        compileCommand,
        executeCommand,
    };
};

module.exports = getInfo;
