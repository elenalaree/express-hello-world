const routes = require('express').Router();

const controls = require('../controllers')
routes.get("/", controls.returnName);

module.exports = routes;