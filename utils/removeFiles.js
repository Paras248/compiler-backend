const fs = require('fs');
const path = require('path');

const removeFiles = (filePath, inputPath, fileId, ext, isCompiled) => {
    const outputPath = path.join(process.cwd(), `outputs/${fileId}.${ext}`);
    fs.unlinkSync(filePath);
    inputPath && fs.unlinkSync(inputPath);
    isCompiled && ext && fs.unlinkSync(outputPath);
};

module.exports = removeFiles;
