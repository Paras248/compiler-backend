const fs = require('fs');

const removeFiles = async (filePath, outputPath) => {
    await fs.unlinkSync(filePath);
    outputPath && (await fs.unlinkSync(outputPath));
};

module.exports = removeFiles;
