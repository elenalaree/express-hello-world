const routes = require('express').Router();
const controls = require('../controllers')


routes.get("/", controls.returnName);
// Get all contacts

routes.use('/contacts', require('./contact.js'))
module.exports = routes;