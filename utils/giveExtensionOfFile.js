module.exports = giveExtensionOfFile = (language) => {
    if (language === 'java') return 'java';
    if (language === 'python') return 'py';
    if (language === 'cpp') return 'cpp';
    if (language === 'c') return 'c';
};
