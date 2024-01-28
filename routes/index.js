const routes = require('express').Router();

const controls = require('../controllers')
const controllers = require('../controllers/contacts.js')
routes.get("/", controls.returnName);
// Get all contacts

module.exports = routes;