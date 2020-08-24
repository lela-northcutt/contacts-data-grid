const faker = require("faker");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const _ = require("lodash");
const { detectBufferEncoding } = require('tslint/lib/utils');

const url = process.env.MONGO_ATLAS_URL;
const dbName = "myContacts";

MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);

    const db = client.db(dbName);
    const contactsCollection = db.collection("contacts");

    let contacts = [];
    for (let i = 0; i < 10; i += 1) {
        person = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            occupation: faker.name.jobTitle(),
            phoneNumber: faker.phone.phoneNumber(),
            streetAddress: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            zipCode: faker.address.zipCode()
        }
        contacts.push(person);
        console.log(person.firstName);
    }
    contactsCollection.insertMany(contacts);

    console.log("Database seeded! :)");
    client.close();
});
