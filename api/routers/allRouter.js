const express = require('express');
const Router = express.Router();

const PerpertyController = require('../controller/Property.controller');

Router.get('/allProperties', PerpertyController.allProperties);
Router.post('/createProperty', PerpertyController.createProperties);

module.exports = Router;
