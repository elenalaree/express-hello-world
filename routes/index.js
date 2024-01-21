const routes = require('express').Router();
const controller = require('../controllers');
// Get all contacts
routes.get("/", controller.returnName);
routes.get("/contacts/", controller.getContacts);

// Get one contact
routes.get('/contacts/:id', controller.singleContact);

module.exports = routes;