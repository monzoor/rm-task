const mongoose = require('mongoose');
const User = './User.model';
const connection = 'mongodb://mongo:27017/expressmongo';

const connectDb = () => {
    return mongoose.connect(connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDb;
