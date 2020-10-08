const mongoose = require('mongoose');
const User = './User.model';
const connection = 'mongodb://localhost:27017/expressmongo';

const connectDb = () => {
    return mongoose.connect(connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDb;
