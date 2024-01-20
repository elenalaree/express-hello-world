const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const dotenv = require('dotenv');
dotenv.config();
const {MongoClient} = require('mongodb');


async function main(){
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@schoolcluster.6srws6e.mongodb.net/ `
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();

    console.log("databases:");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`)
    })
}
// 
app.use('/', require('./routes'));

app.listen(port, () => console.log(`Listening on port ${port}!`));

