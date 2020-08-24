const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Contact = require('./models/contact');

// const faker = require("faker");
// const MongoClient = require("mongodb").MongoClient;
// const assert = require("assert");
// const _ = require("lodash");

// const { detectBufferEncoding } = require('tslint/lib/utils');

const app = express();

mongoose.connect('mongodb+srv://lela:Ws0GSob8JShrseYQ@cluster0.wdzc0.mongodb.net/myContacts?retryWrites=true&w=majority')
    .then(() => {
        console.log('connected to database!!!!')
    })
    .catch(() => {
        console.log('connection failed!!!!!')
    })

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
    next();
});

app.post('/api/contacts', (req, res, next) => {
    const contact = new Contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        occupation: req.body.occupation,
        phoneNumber: req.body.phoneNumber,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
    });
    contact.save();
    res.status(201).json({
        message: 'contacts added successfully'
    });
});

app.get('/api/contacts', (req, res, next) => {
    Contact.find()
        .then(documents => {
            res.status(200).json({
                message: 'contacts fetched successfully',
                contacts: documents
            });
        });

});




///////////////////////////////////////////


// // Connection URL
// const url = "mongodb+srv://lela:Ws0GSob8JShrseYQ@cluster0.wdzc0.mongodb.net/myContacts?retryWrites=true&w=majority";

// // Database Name
// const dbName = "myContacts";

// // Use connect method to connect to the server
// MongoClient.connect(url, function (err, client) {
//     assert.equal(null, err);

//     const db = client.db(dbName);

//     // get access to the relevant collections
//     const contactsCollection = db.collection("contacts");
//     // make a bunch of users
//     let contacts = [];
//     for (let i = 0; i < 10; i += 1) {
//         person = {
//             firstName: faker.name.firstName(),
//             lastName: faker.name.lastName(),
//             occupation: faker.name.jobTitle(),
//             phoneNumber: faker.phone.phoneNumber(),
//             streetAddress: faker.address.streetAddress(),
//             city: faker.address.city(),
//             state: faker.address.state(),
//             zipCode: faker.address.zipCode()
//         }
//         contacts.push(person);

//         // visual feedback always feels nice!
//         console.log(person.firstName);
//     }
//     contactsCollection.insertMany(contacts);


//     console.log("Database seeded! :)");
//     client.close();
// });
///////////////////////////////////////////////////////////////////////////////////////

module.exports = app;