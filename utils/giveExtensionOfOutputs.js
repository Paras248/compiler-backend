module.exports = giveExtensionOfFile = (language) => {
    if (language === 'java') return undefined;
    if (language === 'python') return undefined;
    if (language === 'cpp' || language === 'c') return 'out';
};
