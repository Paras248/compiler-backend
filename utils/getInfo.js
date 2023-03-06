const getInfo = (fileId, language) => {
    const procCwd = process.cwd();
    const codeDir = `${procCwd}/codes`;
    const outputDir = `${procCwd}/outputs`;
    switch (language) {
        case 'cpp':
            return {
                filePath: `${codeDir}/${fileId}.cpp`,
                outputPath: `${outputDir}/${fileId}.out`,
                compileCommand: `g++ ${this.filePath} -o ${this.outputPath}`,
                executeCommand: `cd ${outputDir} && ./${fileId}.out`,
            };
        case 'java':
            return {
                filePath: `${codeDir}/${fileId}.java`,
                executeCommand: `cd ${codeDir} && java ${fileId}.java`,
            };
        case 'python':
            return {
                filePath: `${codeDir}/${fileId}.py`,
                executeCommand: `cd ${codeDir} && python3 ${fileId}.py`,
            };
        case 'c':
            return {
                filePath: `${codeDir}/${fileId}.c`,
                outputPath: `${outputDir}/${fileId}.out`,
                compileCommand: `gcc ${this.filePath} -o ${this.outputPath}`,
                executeCommand: `cd ${outputDir} && ./${fileId}.out`,
            };
    }
};
