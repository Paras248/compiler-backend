const fs = require('fs');
const path = require('path');
const codesDir = path.join(__dirname, '../codes');
const inputsDir = path.join(__dirname, '../inputs');

const generateFile = (fileId, code, ext, type, className) => {
    if (className) {
        folderPath = path.join(codesDir, fileId);
        fs.mkdirSync(folderPath);
        filePath = path.join(folderPath, `${className}.java`);
        fs.writeFileSync(filePath, code);
        return filePath;
    }
    if (type === 'input') {
        const inputPath = path.join(inputsDir, `${fileId}.txt`);
        fs.writeFileSync(inputPath, code);
        return inputPath;
    }
    if (type === 'code') {
        const filePath = path.join(codesDir, `${fileId}.${ext}`);
        fs.writeFileSync(filePath, code);
        return filePath;
    }
};

module.exports = generateFile;
