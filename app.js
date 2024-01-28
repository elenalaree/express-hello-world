const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const dotenv = require('dotenv');
dotenv.config();
const { MongoClient, ObjectId } = require('mongodb');
const { connect } = require("./routes");

const mongoConnect = process.env.MONGODB_URI

MongoClient.connect(mongoConnect, { useUnifiedTopology: true }).then(
    client => {
        console.log('Connected to Database')
        const db = client.db('school-Database');
        app.get('/', (req, res, next) => { res.json('Elena Rogers'); });
        app.get("/contacts", (req, res) => {
            db.collection('Contacts').find().toArray().then(results => {
                res.json(results)
            }).catch(error => console.error(error));

        })
        app.get("/contact/:id", (req, res) => {
            const contactId = req.params.id; // Get the ID from the URL parameter
            db.collection('Contacts').findOne({ _id: new ObjectId(contactId) })
                .then(contact => {
                    if (!contact) {
                        // If no contact with the specified ID is found, return a 404 response
                        return res.status(404).json({ message: 'Contact not found' });
                    }
                    res.json(contact);
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).json({ error: 'Internal server error' });
                });
        });
    })
// 


app.listen(port, () => console.log(`Listening on port ${port}!`));

