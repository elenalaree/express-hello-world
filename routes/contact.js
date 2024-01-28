const routes = require('express').Router();

const controls = require('../controllers/contacts.js')
// Get all contacts
routes.get("/contacts", controls.getAllContacts);

// // Get one contact
// routes.get('/contacts/:id', controls.contact);

module.exports = routes;