const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Contact = require('./models/contact');

const app = express();

mongoose.connect(process.env.MONGO_ATLAS_URL)
    .then(() => {
        console.log('connected to database')
    })
    .catch(() => {
        console.log('database connection failed')
    })

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
    next();
});

// app.post('/api/contacts', (req, res, next) => {
//     const contact = new Contact({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         occupation: req.body.occupation,
//         phoneNumber: req.body.phoneNumber,
//         streetAddress: req.body.streetAddress,
//         city: req.body.city,
//         state: req.body.state,
//         zipCode: req.body.zipCode,
//     });
//     contact.save();
//     res.status(201).json({
//         message: 'contacts added successfully'
//     });
// });

app.get('/api/contacts', (req, res, next) => {
    Contact.find()
        .then(documents => {
            res.status(200).json({
                message: 'contacts fetched successfully',
                contacts: documents
            });
        });
});

module.exports = app;