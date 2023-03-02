const app = require('./app');
const { connectWithDB } = require('./config/db');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 4000;

connectWithDB();
const codesPath = path.join(__dirname, 'codes');
const outputsPath = path.join(__dirname, 'outputs');
const inputsPath = path.join(__dirname, 'inputs');

if (!fs.existsSync(codesPath)) {
    fs.mkdirSync(codesPath, { recursive: true });
}

if (!fs.existsSync(outputsPath)) {
    fs.mkdirSync(outputsPath);
}

if (!fs.existsSync(inputsPath)) {
    fs.mkdirSync(inputsPath);
}

app.listen(PORT, () => {
    console.log('Server started successfully at ' + PORT);
});
