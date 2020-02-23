const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const compression = require('compression');
require('dotenv').config();

const PORT = 8080;

const connectDb = require('./config/db.config');
const routers = require('./routers/allRouter');
const { handleError } = require('./utils/errorHandle');

const app = express();

app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
app.use(compression());

app.use('/api', routers);
app.use((err, req, res, next) => {
    handleError(err, res);
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.listen(PORT, function() {
    console.log(`Listening on ${PORT}`);
    connectDb().then(() => {
        console.log('MongoDb connected');
    });
});
