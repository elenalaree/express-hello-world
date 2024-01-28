const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const dotenv = require('dotenv');
dotenv.config();
const { MongoClient, ObjectId } = require('mongodb');
const { connect } = require("./routes");
const bodyParser = require('body-parser');

const mongoConnect = process.env.MONGODB_URI

MongoClient.connect(mongoConnect, { useUnifiedTopology: true }).then(
    client => {

        console.log('Connected to Database');
        app.use(bodyParser.json());
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
        app.post("/contacts", async (req, res) => {
            const contact = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                favoriteColor: req.body.favoriteColor,
                birthday: req.body.birthday
            };
            const response = await db.collection('Contacts').insertOne(contact);
            if (response.acknowledged) {
                res.status(201).json(response);
            } else {
                res.status(500).json(response.error || 'Some error occurred while creating the contact.');
            }
        });

        app.put('/contact/:id', async (req, res) => {
            const contactId = req.params.id;
            const updatedContactData = req.body; // Get the updated contact data from the request body
            try {
                // Check if any required properties are missing
                if (!updatedContactData.firstName || !updatedContactData.lastName || !updatedContactData.email) {
                    return res.status(400).json({ error: 'Missing required fields' });
                }

                // Update the contact in the database
                const result = await db.collection('Contacts').updateOne(
                    { _id: new ObjectId(contactId) },
                    { $set: updatedContactData } // Use $set to update specific fields
                );

                if (result.matchedCount === 0) {
                    // No contact with the specified ID was found
                    return res.status(404).json({ message: 'Contact not found' });
                }

                console.log("Contact updated successfully");
                res.status(200).json({ message: 'Contact updated successfully' });
            } catch (error) {
                console.error('Error updating contact:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
        app.delete('/contact/:id', async (req, res) => {
            const contactId = req.params.id; // Get the ID from the URL parameter
        
            try {
                // Check if the contact exists in the database
                const existingContact = await db.collection('Contacts').findOne({ _id: new ObjectId(contactId) });
        
                if (!existingContact) {
                    // If no contact with the specified ID is found, return a 404 response
                    return res.status(404).json({ message: 'Contact not found' });
                }
        
                // Delete the contact from the database
                const result = await db.collection('Contacts').deleteOne({ _id: new ObjectId(contactId) });
        
                if (result.deletedCount === 1) {
                    console.log("Contact deleted successfully");
                    res.status(200).json({ message: 'Contact deleted successfully' });
                } else {
                    console.error('Error deleting contact');
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            } catch (error) {
                console.error('Error deleting contact:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    });
// 


app.listen(port, () => console.log(`Listening on port ${port}!`));

