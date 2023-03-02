const fs = require('fs');
const path = require('path');
const codesDir = path.join(__dirname, '../codes');

const generateFile = (fileId, code, ext) => {
    const filePath = path.join(codesDir, `${fileId}.${ext}`);
    console.log(filePath);
    fs.writeFileSync(filePath, code);
    return filePath;
};

module.exports = generateFile;
