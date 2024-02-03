var mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: false },
    favoriteColor: { type: String, required: false },
    birthday: { type: String, required: false },
});

module.exports = mongoose.model('Contact', contactSchema);