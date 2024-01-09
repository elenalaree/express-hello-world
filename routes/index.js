const routes = require('express').Router();

const myController = require('../controllers')
routes.get("/", myController.awesomeFunction);
routes.get("/otherPerson", myController.anotherPerson);

module.exports = routes;