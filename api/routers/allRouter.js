const express = require('express');
const Router = express.Router();

const PerpertyController = require('../controller/Property.controller');

Router.get('/allProperties', PerpertyController.allProperties);
Router.post('/createProperty', PerpertyController.createProperties);
Router.get('/deleteAll', PerpertyController.deleteAll);

module.exports = Router;
