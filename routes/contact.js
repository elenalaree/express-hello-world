const routes = require('express').Router();

const controls = require('../controllers/contacts.js')
// Get all contacts
routes.get("/", controls.getAll);

// // Get one contact

routes.get("/:id", controls.getContact);
routes.post("/", controls.createContact);

routes.put('/:id', controls.updateContact);
routes.delete('/:id', controls.deleteContact);


module.exports = routes;