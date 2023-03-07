const fs = require('fs');
const { workerData } = require('worker_threads');

const removeFilesWorker = () => {
    // const { filePath, outputPath } = workerData;
    // console.log(filePath, outputPath);
    console.log(workerData);
};
removeFilesWorker();

module.exports = removeFilesWorker;
