const express = require('express');
const Router = express.Router();
const path = require('path');
const { ErrorHandler } = require('../utils/errorHandle');

const PerpertyController = require('../controller/Property.controller');

Router.get('/allProperties/:itemType?', PerpertyController.allProperties);
Router.get('/details/:id', PerpertyController.allProperties);
Router.post('/createProperty', PerpertyController.createProperties);
Router.post('/createProperty/:image?', PerpertyController.createProperties);
Router.get('/deleteAll', PerpertyController.deleteAll);
Router.post('/img/upload', PerpertyController.imageUpload);
Router.post('/booking', PerpertyController.booking);

Router.get('/*', (res, req, next) => {
    throw new ErrorHandler(404, 'Invalid URL');
    next();
});

module.exports = Router;
