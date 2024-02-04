const routes = require('express').Router();
const controls = require('../controllers')


// Get all contacts
routes.use('/contacts', require('./contact.js'));
routes.use('/', require('./swagger.js'));
routes.get("/", controls.returnName);



module.exports = routes;