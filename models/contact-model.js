'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ContactSchema = new Schema({
    _id: Number,
    firstName: String,
    lastName: String,
    email: String,
    favoriteColor: String,
    birthday: String,
});

const Contact = mongoose.model('Contact', ContactSchema, "Contacts");
module.exports = Contact