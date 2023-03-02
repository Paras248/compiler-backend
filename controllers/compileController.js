const generateFile = require('../utils/generateFile');
const giveExtensionOfFile = require('../utils/giveExtensionOfFile');
const { v4: uuid } = require('uuid');

const compile = async (req, res, next) => {
    const { code, language, input } = req.body;
    if (!code) {
        return res.status(400).json({
            success: false,
            message: 'Please provide the code to compile',
        });
    }
    if (!language) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a language',
        });
    }
    const ext = giveExtensionOfFile(language);
    if (ext === undefined) {
        return res.status(400).json({
            success: false,
            message: 'Please select an appropriate language',
        });
    }

    const fileId = uuid();

    // note: make it asynchronous afterwards
    const filePath = generateFile(fileId, code, ext);
    res.status(200).json({
        success: true,
        filePath,
    });
};

module.exports = compile;
