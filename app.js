const express = require("express");
const port = process.env.PORT || 3001;
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const mongodb = require("./database/contactsDB")


const app = express();
app.use(bodyParser.json()).use('/', require('./routes'));



// 

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});