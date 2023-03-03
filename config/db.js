const mongoose = require('mongoose');

exports.connectWithDB = async () => {
    await mongoose
        .connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(console.log('DATABASE CONNECTED SUCCESSFULLY'))
        .catch((err) => {
            console.log(err);
            process.exit(1);
        });
};
