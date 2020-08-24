const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    occupation: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
});

module.exports = mongoose.model('Contact', contactSchema);