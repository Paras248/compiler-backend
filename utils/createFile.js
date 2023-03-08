const fs = require('fs');

const createFile = async (filePath, code) => {
    await fs.writeFileSync(filePath, code);
};

module.exports = createFile;
