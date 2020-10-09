const mongoose = require('mongoose');
const User = './User.model';
let dbHost = process.env.DATABASE_HOST || 'localhost';

const connection = `mongodb://${dbHost}/expressmongo`;

const connectDb = () => {
    return mongoose.connect(connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDb;
