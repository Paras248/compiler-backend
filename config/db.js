const mongoose = require('mongoose');

exports.connectWithDB = async () => {
    await mongoose
        .connect('mongodb://127.0.0.1:27017/compilerdb', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(console.log('DATABASE CONNECTED SUCCESSFULLY'))
        .catch((err) => {
            console.log(err);
            process.exit(1);
        });
};
